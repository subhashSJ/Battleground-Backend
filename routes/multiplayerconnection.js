import express from "express";
import { checkConnectionPool } from "../controllers/multiplayerconnection.js";
import { createConnectionPool } from "../controllers/multiplayerconnection.js";


const router = express.Router();

router.get('/check',checkConnectionPool);
router.get('/create',createConnectionPool);

export default router;