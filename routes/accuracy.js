import express from "express";
import { convert,compareImages } from '../controllers/accuracy.js'

const router = express.Router();

router.post('/convert', convert);
router.get('/compare', compareImages);


export default router;