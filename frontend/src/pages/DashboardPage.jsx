import React from "react";
import ChatbotWidget from "../components/ChatbotWidget";

export default function DashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Panel MELANO INC</h1>
      <ChatbotWidget />
    </div>
  );
}