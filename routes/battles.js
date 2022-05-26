import express from "express";
import { getRandomBattle } from "../controllers/battles.js";
import { getBattles } from "../controllers/battles.js"
import { getBattleData } from "../controllers/battles.js";

const router = express.Router();

router.get('/random',getRandomBattle);
router.get('/allBattles',getBattles);
router.get('/battleData', getBattleData)

export default router;