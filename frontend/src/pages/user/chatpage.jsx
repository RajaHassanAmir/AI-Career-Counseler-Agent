import { useEffect, useRef, useState } from "react";

import {
  ref,
  push,
  onValue
} from "firebase/database";

import { db } from "../../firebase";

import { useAuth } from "../../Context/AuthContext";

function ChatPage() {

  const { user } = useAuth();

  const messagesEndRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "👋 Welcome to CareerAI Assistant. Ask me anything about careers, jobs, skills, AI, internships, or future opportunities.",
    },
  ]);

  const [input, setInput] = useState("");

  const [loading, setLoading] = useState(false);

  // 🔥 AUTO SCROLL
  useEffect(() => {

    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });

  }, [messages]);

  // 🔥 LOAD CHAT HISTORY
  useEffect(() => {

    if (!user) return;

    const chatRef = ref(db, `chatHistory/${user.uid}`);

    const unsubscribe = onValue(chatRef, (snapshot) => {

      const data = snapshot.val();

      if (data) {

        const loadedMessages = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));

        setMessages(loadedMessages);

      }

    });

    return () => unsubscribe();

  }, [user]);

  // 🚀 SEND MESSAGE
  const sendMessage = async () => {

    if (!input.trim()) return;

    const userMsg = {
      role: "user",
      text: input,
    };

    const chatRef = ref(db, `chatHistory/${user.uid}`);

    // SAVE USER MESSAGE
    await push(chatRef, userMsg);

    setMessages((prev) => [...prev, userMsg]);

    const currentInput = input;

    setInput("");

    setLoading(true);

    try {

      const response = await fetch(
        "https://ai-career-counseler-agent.onrender.com/api/upload-cv",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: currentInput,
          }),
        }
      );

      const data = await response.json();

      const aiMsg = {
        role: "ai",
        text: data.reply,
      };

      await push(chatRef, aiMsg);

      setMessages((prev) => [...prev, aiMsg]);

    } catch (error) {

      const errorMsg = {
        role: "ai",
        text: "❌ Error connecting to AI server.",
      };

      await push(chatRef, errorMsg);

      setMessages((prev) => [...prev, errorMsg]);
    }

    setLoading(false);
  };

  return (

    <div className="min-h-screen bg-[#07111f] text-white flex relative overflow-hidden">

      {/* GLOW EFFECTS */}
      <div className="absolute w-[500px] h-[500px] bg-green-500/10 rounded-full blur-3xl top-[-100px] left-[-100px]" />

      <div className="absolute w-[400px] h-[400px] bg-emerald-400/10 rounded-full blur-3xl bottom-[-100px] right-[-100px]" />

      {/* SIDEBAR */}
      <div className="hidden md:flex w-[280px] backdrop-blur-xl bg-white/5 border-r border-white/10 flex-col p-6 relative z-10">

        <h1 className="text-3xl font-extrabold mb-8">
          CareerAI
        </h1>

        <div className="space-y-4">

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4">

            <p className="text-sm text-gray-400">
              Logged In As
            </p>

            <p className="mt-2 font-semibold break-all">
              {user?.email}
            </p>

          </div>

          <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/20 rounded-2xl p-4">

            <h2 className="font-bold text-lg mb-2">
              AI Suggestions
            </h2>

            <ul className="text-sm text-gray-300 space-y-2">
              <li>• Best AI careers</li>
              <li>• Roadmaps for developers</li>
              <li>• CV improvement tips</li>
              <li>• Future tech trends</li>
            </ul>

          </div>

        </div>

      </div>

      {/* CHAT AREA */}
      <div className="flex-1 flex flex-col relative z-10">

        {/* TOP BAR */}
        <div className="backdrop-blur-xl bg-white/5 border-b border-white/10 p-5">

          <h2 className="text-2xl font-bold">
            AI Career Assistant
          </h2>

          <p className="text-gray-400 text-sm mt-1">
            Powered by AI Career Guidance Engine
          </p>

        </div>

        {/* MESSAGES */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">

          {messages.map((msg, index) => (

            <div
              key={index}
              className={`flex ${
                msg.role === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >

              <div
                className={`max-w-[80%] rounded-3xl px-5 py-4 shadow-lg whitespace-pre-line leading-7 ${
                  msg.role === "user"
                    ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                    : "backdrop-blur-xl bg-white/5 border border-white/10 text-gray-200"
                }`}
              >

                <div className="flex items-center gap-2 mb-2">

                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      msg.role === "user"
                        ? "bg-white text-green-600"
                        : "bg-green-500 text-white"
                    }`}
                  >

                    {msg.role === "user" ? "U" : "AI"}

                  </div>

                  <span className="text-sm opacity-80">

                    {msg.role === "user"
                      ? "You"
                      : "CareerAI"}

                  </span>

                </div>

                {msg.text}

              </div>

            </div>
          ))}

          {/* AI LOADER */}
          {loading && (

            <div className="flex justify-start">

              <div className="backdrop-blur-xl bg-white/5 border border-white/10 px-6 py-4 rounded-3xl">

                <div className="flex gap-2">

                  <div className="w-3 h-3 bg-green-400 rounded-full animate-bounce" />

                  <div className="w-3 h-3 bg-green-400 rounded-full animate-bounce delay-100" />

                  <div className="w-3 h-3 bg-green-400 rounded-full animate-bounce delay-200" />

                </div>

              </div>

            </div>
          )}

          <div ref={messagesEndRef} />

        </div>

        {/* INPUT AREA */}
        <div className="p-5 border-t border-white/10 backdrop-blur-xl bg-white/5">

          <div className="flex gap-4">

            <input
              className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-green-400 text-white placeholder-gray-400"
              placeholder="Ask CareerAI anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {

                if (e.key === "Enter") {
                  sendMessage();
                }

              }}
            />

            <button
              onClick={sendMessage}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-105 transition-all px-8 rounded-2xl font-bold"
            >
              Send
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ChatPage;
