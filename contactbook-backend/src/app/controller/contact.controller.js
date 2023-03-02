import apiError from "../api-error";

import ContactService from "../services/contact.service";

import MongoDB from "../utils/mongodb.util";

const create = async (req, res, next) => {
  if (!req.body?.name) {
    return next(new apiError(400, "Name cannot be empty"));
  }
  try {
    const contactService = new ContactService(MongoDB.client);
    const document = await contactService.create(req.body);
    return res.send(document);
  } catch (err) {
    console.log(err);
    return next(
      new apiError(500, "An error occurred while creating the contact")
    );
  }
};
const findAll = async (req, res, next) => {
  let documents = [];
  try {
    const contactService = new ContactService(MongoDB.client);
    const { name } = req.query;
    if (name) {
      documents = await contactService.findByName(name);
    } else {
      documents = await contactService.find({});
    }
  } catch (err) {
    return next(
      new apiError(500, "An error occurred while retrieving contacts")
    );
  }
  return res.send(documents);
};
const findOne = async (req, res, next) => {
  try {
    const contactService = new ContactService(MongoDB.client);
    const document = await contactService.findById(req.params.id);
    if (!document) {
      return next(new apiError(404, "Contact not found"));
    }
    return res.send(document);
  } catch (error) {
    return next(
      new apiError(500, `Error retrieving contact with id = ${req.params.id}`)
    );
  }
};
const update = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new apiError(400, "Data to update cannot be empty"));
  }
  try {
    const contactService = new ContactService(MongoDB.client);
    const document = await contactService.update(req.params.id, req.body);
    if (!document) {
      return next(new apiError(400, "Contact not found"));
    }
    return res.send({ message: "Contact was updated successfully" });
  } catch (err) {
    return next(
      new apiError(500, `Error updating contact with id = ${req.params.id}`)
    );
  }
};
const deleteOne = async (req, res, next) => {
  try {
    const contactService = new ContactService(MongoDB.client);
    const document = await contactService.delete(req.params.id);
    if (!document) {
      return next(new apiError(400, "Contact not found"));
    }
    return res.send({ message: "Contact was deleted successfully" });
  } catch (err) {
    return next(
      new apiError(500, `Could not delete contact with id = ${req.params.id}`)
    );
  }
};
const deleteAll = async (req, res, next) => {
  try {
    const contactService = new ContactService(MongoDB.client);
    const deletedCount = await contactService.deleteAll();
    return res.send({
      message: `${deletedCount} contacts were deleted successfully`,
    });
  } catch (err) {
    return next(
      new apiError(500, "An error occurred while removing all contacts")
    );
  }
};
const findAllFavorite = async (req, res, next) => {
  try {
    const contactService = new ContactService(MongoDB.client);
    const documents = await contactService.findFavorite();
    return res.send(documents);
  } catch (err) {
    return next(
      new apiError(500, "An occured while retrieving favorite contacts")
    );
  }
};
module.exports = {
  create,
  findAll,
  findOne,
  update,
  deleteOne,
  deleteAll,
  findAllFavorite,
};
