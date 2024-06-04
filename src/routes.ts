import { Router } from "express";
import UsersController from "./modules/controllers/UsersController";
import AuthController from "./modules/controllers/AuthController";
import { validAuth } from "./lib/jwt";

const routes = Router();

routes.get('/users', validAuth, UsersController.getUserController);
routes.post('/users', UsersController.createUser);
routes.post('/authenticate', AuthController.authenticate);

export default routes;
