"use client";

import { useMutation } from "@tanstack/react-query";
import { generateChatResponse } from "@/utils/actions";
import { useState } from "react";
import toast from "react-hot-toast";

const Chat = () => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  const { mutate } = useMutation({
    mutationFn: async (query) => {
      //const currentTokens = await fetchUserTokensById(userId);

      // if (currentTokens < 100) {
      //   toast.error("Token balance too low....");
      //   return;
      // }

      const response = await generateChatResponse([...messages, query]);

      if (!response) {
        toast.error("Something went wrong...");
        return;
      }
      setMessages((prev) => [...prev, response.message]);
      //const newTokens = await subtractTokens(userId, response.tokens);
      //toast.success(`${newTokens} tokens remaining...`);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = { role: "user", content: text };
    mutate(query);
    setMessages((prev) => [...prev, query]);
    setText("");
  };

  console.log(messages);

  const isPending = false;

  return (
    <div className="min-h-[calc(100vh-6rem)] grid grid-rows-[1fr,auto]">
      <div>
        <h2 className="text-5xl">messages</h2>
      </div>
      <form onSubmit={handleSubmit} className="max-w-4xl pt-12">
        <div className="join w-full">
          <input
            type="text"
            placeholder="Message GeniusGPT"
            className="input input-bordered join-item w-full"
            value={text}
            required
            onChange={(e) => setText(e.target.value)}
          />
          <button
            className="btn btn-primary join-item"
            type="submit"
            // disabled={isPending}
          >
            {isPending ? "please wait..." : "ask question"}
          </button>
        </div>
      </form>
    </div>
  );
};
export default Chat;
