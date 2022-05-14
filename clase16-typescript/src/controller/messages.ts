import { MessagesModel } from "../services/database";

export const getAllMessages = async () => {
  const messages = await MessagesModel.get();

  return messages;
};

export const AddMesage = async (author: string, text: string) => {
  const newMessage = await MessagesModel.create({
    author,
    text,
  });

  return newMessage;
};
