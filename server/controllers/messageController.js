import imagekit from "../configs/imagekit.js";
import chatModel from "../models/chatModel.js";
import userModel from "../models/userModel.js";
import axios from "axios";
import openai from "../configs/openai.js";

// Text based AI chat message controller
export const textMessageController = async (req, res) => {
  try {
    const userId = req.user._id;
    
    // check credits
    if (req.user.credits < 1) {
      return res.json({
        success: false,
        message: "You don't have enough credits to use this feature",
      });
    }

    const { chatId, prompt } = req.body;

    const chat = await chatModel.findOne({ userId, _id: chatId });
    chat.messages.push({
      role: "user",
      content: prompt,
      timestamp: Date.now(),
      isImage: false,
    });

    const { choices } = await openai.chat.completions.create({
      model: "gemini-2.5-flash",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const reply = {
      ...choices[0].message,
      timestamp: Date.now(),
      isImage: false,
    };

    res.json({ success: true, reply });

    chat.messages.push(reply);
    await chat.save();
    await userModel.updateOne({ _id: userId }, { $inc: { credits: -1 } }); //decreasing a user’s credits by 1 in MongoDB.
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Image generation message controller
export const imageMessageController = async (req, res) => {
  try {
    const userId = req.user._id;
    // check credits
    if (req.user.credits < 2) {
      return res.json({
        success: false,
        message: "You don't have enough credits to use this feature",
      });
    }

    const { prompt, chatId, isPublished } = req.body;

    // Find chat
    const chat = await chatModel.findOne({ userId, _id: chatId });

    // Push user message
    chat.messages.push({
      role: "user",
      content: prompt,
      timestamp: Date.now(),
      isImage: false,
    });

    // Encode the prompt
    const encodedPrompt = encodeURIComponent(prompt);

    // Construct Imagekit AI generation URL
    const generatedImageURL = `${process.env.IMAGEKIT_URL_ENDPOINT}/ik-genimg-prompt-${encodedPrompt}/quickgpt/${Date.now()}.png?tr=w-800,h-800`;

    // Trigger image generation by fetching form Imagekit
    const aiImageResponse = await axios.get(generatedImageURL, {responseType: "arraybuffer"}) //arraybuffer = raw binary data in memory → essential for handling non-text data like images, videos, audio, PDFs.

    // Convert binary data to base64 string
    const base64Image = `data:image/png;base64,${Buffer.from(aiImageResponse.data,"binary").toString("base64")}`


    // upload to Imagekit media Library
    const uploadResponse = await imagekit.upload({
      file: base64Image,
      fileName: `${Date.now()}.png`,
      folder: "quickgpt"
    })


    const reply = {
      role: 'assistant',
      content: uploadResponse.url,
      timestamp: Date.now(),
      isImage: true,
      isPublished
    }

    res.json({success: true, reply});

    chat.messages.push(reply);

    await chat.save();

    await userModel.updateOne({ _id: userId }, { $inc: { credits: -2 } }); //decreasing a user’s credits by 2 in MongoDB.

  } catch (error) {
    res.json({success: false, message: error.message})
  }
};
