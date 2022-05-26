import express from "express";
import { getLanguage } from "../controllers/languages.js";
import {createLanguage} from "../controllers/languages.js";

const router = express.Router();

router.get('/',getLanguage);
router.post('/',createLanguage);

export default router;