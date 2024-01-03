import "dotenv/config";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const getImageDescription = async (base64ImageString) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      max_tokens: "500",
      messages: [
        {
          role: "system",
          content:
            "Provide a detailed description of the outfit worn by the individual in the image. Focus on the clothing elements, such as the type and color of the top, pants, shoes, and any additional accessories like jewelry, hats, or bags. Describe the style and specific details of each item, like patterns, materials, and unique features. Also, include a description of the person's physical characteristics, including gender, height, build, skin tone, hair type and color, and any distinctive facial or bodily features. Ensure the description is comprehensive enough to capture the essence of their appearance and outfit, without focusing on the background or pose.",
        },
        {
          role: "user",
          content: [
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64ImageString}`,
              },
            },
          ],
        },
      ],
    });
    console.log(response.choices[0]);
    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error getting image description from OpenAI:", error);
    throw new Error(error);
  }
};

export const getOutfit = async (outfitDescription) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-1106-preview",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `You're a fashion expert. You'll receive an outfit description and I need to give me tips to improve it, as well as a color palette (color name and hexadecimal code) to match the outfit. You can also suggest accessories of your preference.
              The output should follow this json format:
              {
                "description": "<description of the improved outfit>",
                "tips": [
                  "tip1",
                  "tip2",
                  "etc"
                ],
                "colorPalette": [
                  // include all the colors from the chosen palette
                  {"colorName": "<Color name 1>", "hexCode": "<Hex code 1>"},
                  {"colorName": "<Color name 2>", "hexCode": "<Hex code 2>"},
                ]
              }
              For example, this could be a great improved outfit description: 
              
              ###
    
              Experience comfort without sacrificing style with this ensemble, featuring a luxuriously soft, oversized sweater that drapes elegantly for a relaxed fit. Paired with sharply tailored trousers, the look achieves a harmonious balance between laid-back comfort and polished sophistication. The sweater's ribbed texture adds a touch of visual interest, while the pants provide a sleek silhouette, making this outfit versatile enough for a day at the office or a casual weekend brunch. Finish this outfit with a pair of classic loafers or ankle boots for a refined aesthetic that speaks volumes of your impeccable fashion sense.
    
              ###
              `,
        },
        {
          role: "user",
          content: outfitDescription,
        },
      ],
    });
    console.log(response.choices[0]);
    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error getting outfit from OpenAI:", error);
    throw new Error(error);
  }
};

export const getBase64Image = async (outfitData) => {
  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt:
        "Generate an image of a person wearing the described improved outfit and respecting the color palette provided: " +
        outfitData,
      n: 1,
      size: "1024x1792",
      style: "vivid",
      response_format: "url",
      quality: "hd",
      response_format: "b64_json",
    });
    console.log(response);
    return response.data[0].b64_json;
  } catch (error) {
    console.error("Error getting base64 image from OpenAI:", error);
    throw new Error(error);
  }
};
