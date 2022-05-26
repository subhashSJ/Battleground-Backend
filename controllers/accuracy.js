import nodeHtmlToImage from "node-html-to-image";
import cloudinary from "cloudinary";
import dotenv from "dotenv";
dotenv.config();
import deepai from "deepai";
deepai.setApiKey("35061e80-aca4-4050-bb48-9e2d58c4c741");

import streamifier from "streamifier";

export const compareImages = async (req, res) => {
  let link1 = req.query.target;
  let link2 = req.query.output;
  var resp = await deepai.callStandardApi("image-similarity", {
    image1: link1,
    image2: link2,
  });
  res.json(resp.output.distance);
};

export const convert = async function (req, res) {
  let { code } = req.body;
  
  const image = await nodeHtmlToImage({
    html: code,
    type: "jpeg",
  });
  let cld_upload_stream = cloudinary.uploader.upload_stream((result, error) => {
    if (error) {
      res.json({
        status: "failed",
      });
    } else {
      res.json({
        url: result.url,
        status: "success",
      });
    }
  });
  streamifier.createReadStream(image).pipe(cld_upload_stream);
};

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
