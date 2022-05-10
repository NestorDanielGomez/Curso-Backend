import { MessagesModel } from "../services/database";

export const getAllMessages = async () => {
  const products = await MessagesModel.get();

  return products;
};

export const AddMesage = async (author: string, text: string) => {
  const newMessage = await MessagesModel.create({
    author,
    text,
  });

  return newMessage;
};
