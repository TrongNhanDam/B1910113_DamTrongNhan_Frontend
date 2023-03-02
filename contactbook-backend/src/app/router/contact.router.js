import express from "express";

import contactController from "../controller/contact.controller";

const router = express.Router();

const initContactRouter = (app) => {
  router
    .route("/")
    .get(contactController.findAll)
    .post(contactController.create)
    .delete(contactController.deleteAll);
  router.route("/favorite").get(contactController.findAllFavorite);
  router
    .route("/:id")
    .get(contactController.findOne)
    .put(contactController.update)
    .delete(contactController.deleteOne);
  return app.use("/api/contacts", router);
};
export default initContactRouter;
