import {
  addCollectionHandler,
  collectionAddPermitHandler,
  collectionRemovePermitHandler,
  deletCollectionHandler,
  getCollectionHandler,
} from "../controller/collection.controller";
import { roleValidator } from "../middleware/roleValidator";
import { validateAll, validateToken } from "../middleware/validator";
import { allSchemaId, rolePermitSchema, roleSchema } from "../schema/scheama";

const collectionRoute = require("express").Router();

collectionRoute.get(
  "/",
    validateToken,
  roleValidator(["admin","installer"]),
  getCollectionHandler
);

collectionRoute.post(
  "/",
    validateToken,
    roleValidator(["det"]),
  addCollectionHandler
);

collectionRoute.delete(
  "/",
    validateToken,
    roleValidator(["det"]),
  deletCollectionHandler
);

collectionRoute.patch(
  "/add/stations",
    validateToken,
    roleValidator(["det","admin"]),
  collectionAddPermitHandler
);

collectionRoute.patch(
  "/remove/stations",
    validateToken,
    roleValidator(["det","admin"]),
  collectionRemovePermitHandler
);

export default collectionRoute;
