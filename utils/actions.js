"use server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// export const generateChatResponse = async (chatMessage) => {
//   console.log(chatMessage);
//   try {
//     const response = await openai.chat.completions.create({
//       messages: [
//         { role: "system", content: "you are a helpful assistant" },
//         { role: "user", content: chatMessage },
//       ],
//       model: "gpt-3.5-turbo",
//       temperature: 0,
//       max_tokens: 100,
//     });
//     console.log(response.choices[0].message);
//     console.log(response);
//     return "awesome";
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// };

export const generateChatResponse = async (chatMessages) => {
  //console.log(chatMessages);
  try {
    const response = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "you are a helpful assistant" },
        ...chatMessages,
      ],
      model: "gpt-3.5-turbo",
      temperature: 0,
      max_tokens: 100,
    });
    return {
      message: response.choices[0].message,
      tokens: response.usage.total_tokens,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};
