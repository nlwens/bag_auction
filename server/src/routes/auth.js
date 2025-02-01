import express from "express";
import * as usersController from "../controllers/users-controller.js";
const auth = express.Router();

// 注册路由
auth.post('/register', usersController.registerUser);

auth.post('/', usersController.loginUser);

export default auth
