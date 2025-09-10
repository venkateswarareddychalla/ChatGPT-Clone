import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    userId: { type: String, ref: "User", required: true },
    userName: { type: String, required: true },
    name: { type: String, required: true },
    messages: [
      {
        isImage: { type: Boolean, required: true },
        isPublished: { type: Boolean, default: false },
        role: { type: String, required: true },
        content: { type: String, required: true },
        timestamp: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
); // timestamps are : createdAt, updatedAt
// timestamps: true → it will automatically stores the timestamps when the chats are created.

const chatModel = mongoose.model("Chat", chatSchema);

export default chatModel;