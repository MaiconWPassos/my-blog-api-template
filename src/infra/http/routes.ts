import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { AuthController } from "./controllers/AuthController";


const router = Router();

const userController = new UserController();
const authController = new AuthController();


router.get("/", (req, res) => {
  return res.send({
    message: "Welcome to the application",
  });
});

router.post("/users", userController.create);

router.post("/login", authController.create);


export { router };
