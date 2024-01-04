import { v4 as uuidv4 } from "uuid";
import * as OpenAIService from "../services/openAI.service.js";
import * as CloudinaryService from "../services/cloudinary.service.js";

export const getImage = async (req, res) => {
  try {
    const base64ImageString = req.body.base64ImageString;
    const descriptionText = await OpenAIService.getImageDescription(base64ImageString);
    const paragraphs = descriptionText.split('\n\n');
    const outfitDescription = paragraphs[0];
    const individualDescription = paragraphs.length > 1 ? paragraphs[1] : '';
    const improvedOutfit = await OpenAIService.getOutfit(outfitDescription);
    const base64Image = await OpenAIService.getBase64Image(improvedOutfit, individualDescription);
    const imageUrl = await CloudinaryService.uploadBase64Image(base64Image);

    const data = JSON.parse(improvedOutfit);
    data.imageUrl = imageUrl;
    data.id = uuidv4();

    return res.json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};
