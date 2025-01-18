import { get } from "mongoose";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import cloudinary from "cloudinary";
import { getReceiverSocketId , io } from "../lib/socket.js";


export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUser = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    res.status(200).json(filteredUser);
  } catch (error) {
    console.log("Error in getUsersForSidebar", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });
    res.status(200).json(messages);
  } catch (error) {
    console.log("Error In getMessages Controller ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const sendMessages = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params; // Fixed spelling to match the model
    const senderId = req.user._id;

    let imageUrl;

    if (image) {
      const uploadResponce = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponce.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId, // Updated spelling
      text,
      image: imageUrl,
    });

    await newMessage.save();

    // Real-time functionality goes here (like socket.io)
    const reciverSocketId = getReceiverSocketId(receiverId);
    if(reciverSocketId){
      io.to(reciverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessages Controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
