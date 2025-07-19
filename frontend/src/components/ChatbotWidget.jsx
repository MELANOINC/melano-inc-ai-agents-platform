import React, { useState } from "react";
import axios from "axios";

export default function ChatbotWidget() {
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMsg = async () => {
    if (!msg) return;
    setLoading(true);
    setChat([...chat, { sender: "user", text: msg }]);
    const res = await axios.post("http://localhost:8000/chatbot/", { message: msg });
    setChat([...chat, { sender: "user", text: msg }, { sender: "bot", text: res.data.reply }]);
    setMsg(""); setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-4">
      <div className="h-64 overflow-y-auto border mb-2 p-2">
        {chat.map((c, i) => (
          <div key={i} className={c.sender === "bot" ? "text-right" : "text-left"}>
            <span className={c.sender === "bot" ? "bg-blue-100" : "bg-gray-100"}>{c.text}</span>
          </div>
        ))}
      </div>
      <input
        className="border px-2 py-1 w-3/4"
        value={msg}
        onChange={e => setMsg(e.target.value)}
        placeholder="Escribí tu mensaje..."
      />
      <button className="ml-2 px-3 py-1 bg-blue-600 text-white rounded" onClick={sendMsg} disabled={loading}>
        {loading ? "..." : "Enviar"}
      </button>
    </div>
  );
}