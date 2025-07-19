import React, { useState } from "react";
import axios from "axios";

export default function CRMChatWidget() {
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMsg = async () => {
    if (!msg.trim()) return;
    setLoading(true);
    const newChat = [...chat, { sender: "user", text: msg }];
    setChat(newChat);
    
    try {
      const res = await axios.post("http://localhost:8000/crm/", { message: msg });
      setChat([...newChat, { sender: "bot", text: res.data.reply }]);
    } catch (error) {
      const errorMsg = error.response?.data?.detail || "Error procesando la consulta CRM";
      setChat([...newChat, { sender: "bot", text: errorMsg }]);
    }
    
    setMsg("");
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
      sendMsg();
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-200">
      <div className="flex items-center mb-4">
        <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
        <h2 className="text-xl font-bold text-gray-800">CRM Bot</h2>
      </div>
      
      <div className="h-64 overflow-y-auto border border-gray-200 rounded-lg p-3 mb-4 bg-gray-50">
        {chat.length === 0 && (
          <div className="text-gray-500 text-sm text-center mt-8">
            Pregúntame sobre gestión de clientes, ventas, retención y más...
          </div>
        )}
        {chat.map((c, index) => (
          <div key={index} className={`mb-3 ${c.sender === "bot" ? "text-left" : "text-right"}`}>
            <div className={`inline-block max-w-xs p-3 rounded-lg text-sm ${
              c.sender === "bot" 
                ? "bg-blue-100 text-blue-900 rounded-bl-none" 
                : "bg-gray-200 text-gray-800 rounded-br-none"
            }`}>
              {c.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="text-left mb-3">
            <div className="inline-block bg-blue-100 text-blue-900 p-3 rounded-lg rounded-bl-none text-sm">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="flex space-x-2">
        <input
          className="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Escribe tu consulta CRM..."
          disabled={loading}
        />
        <button
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
          onClick={sendMsg}
          disabled={loading || !msg.trim()}
        >
          {loading ? "..." : "Enviar"}
        </button>
      </div>
    </div>
  );
}
