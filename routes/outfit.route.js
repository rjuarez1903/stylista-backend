import multer from 'multer';
import { Router } from "express";
import { getImage } from "../controllers/outfit.controller.js";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });


// router.post("/", getOutfitData);
// router.post("/image", getImgDescription);
router.post("/", upload.single('img'), getImage)

export default router;