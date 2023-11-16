import { Server } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import { deletePermissionService, getAClosePermissionService } from '../service/closePermission.service';

 
function setupSocket(server: Server): SocketIOServer {
    const io: SocketIOServer = new SocketIOServer(server);



  io.of("/change-mode").on("connection", (socket: any) => {
      socket.on("checkMode", async (data) => {
      console.log(data)
          let result = await getAClosePermissionService("kyaw_san", { stationDetailId: data });
          console.log(result);
    if (result) {
     await deletePermissionService(data,"kyaw_san");
      console.log("User send data", data);
      io.emit(data, result.stationDetailId);
    }
  });
  });
    
    io.on('connection', (socket: Socket) => {
        console.log('A user connected');

        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });

    return io;
}

export default setupSocket;
