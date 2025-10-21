import { Router } from "express";
import * as controller from "./controller";

const v1 = Router();

v1.post("/register", controller.register);
v1.post("/login", controller.login);
v1.post("/logout", controller.logout);
v1.get("/me", controller.me);

export default v1;