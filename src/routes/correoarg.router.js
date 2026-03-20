import { Router } from "express";
import { chequearEstadoCorreoArgentino } from "../controllers/correoArgentinoController.js";

const correoargRouter = Router();

correoargRouter.get("/check-estado/:codigo", chequearEstadoCorreoArgentino);

export default correoargRouter;
