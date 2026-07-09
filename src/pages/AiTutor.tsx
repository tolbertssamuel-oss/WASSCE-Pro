import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { trpc } from "@/providers/trpc";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Send, User, Sparkles, BookOpen, Lightbulb,
  GraduationCap, Bot
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const suggestions = [
  "Explain photosynthesis",
  "Solve quadratic equation: x² - 5x + 6 = 0",
  "What is Ohm's Law?",
  "Explain mitosis and its stages",
  "Differentiate y = x³ + 2x²",
  "How does the nitrogen cycle work?",
];

export default function AiTutor() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hello! I'm your WASSCE AI Tutor. I can help you understand concepts, solve problems, explain topics, and generate practice questions. What would you like to learn today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [generatingQuestions, setGeneratingQuestions] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const askMutation = trpc.ai.ask.useMutation();
  const generateMutation = trpc.ai.generateQuestions.useMutation();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const result = await askMutation.mutateAsync({ question: text });
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: result.response,
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I'm sorry, I encountered an error. Please try again.",
      }]);
    }
    setIsLoading(false);
  };

  const generateQuestions = async (topic: string) => {
    setGeneratingQuestions(true);
    try {
      const result = await generateMutation.mutateAsync({ topic, count: 5 });
      let content = `Here are 5 practice questions on **${topic}**:\n\n`;
      result.questions.forEach((q, i) => {
        content += `${i + 1}. ${q.question}\n   *Hint: ${q.hint}*\n\n`;
      });
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: "assistant",
        content,
      }]);
    } catch {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: "assistant",
        content: "Sorry, I couldn't generate questions right now.",
      }]);
    }
    setGeneratingQuestions(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-4 py-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-[#0B5ED7] text-white rounded-full px-4 py-2 text-sm font-medium mb-2">
            <Sparkles className="w-4 h-4" /> AI-Powered Tutor
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">WASSCE AI Tutor</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Ask anything about your WASSCE subjects</p>
        </motion.div>

        <div className="flex-1 overflow-y-auto space-y-4 mb-4 min-h-0">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-[#0B5ED7] flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-[#0B5ED7] text-white"
                  : "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-100 dark:border-gray-700 shadow-sm"
              }`}>
                {msg.content.split("\n").map((line, i) => {
                  if (line.startsWith("**") && line.endsWith("**")) {
                    return <p key={i} className="font-semibold my-2">{line.replace(/\*\*/g, "")}</p>;
                  }
                  if (line.startsWith("*") && line.endsWith("*")) {
                    return <p key={i} className="italic text-gray-500 my-1">{line.replace(/\*/g, "")}</p>;
                  }
                  if (line.match(/^\d+\./)) {
                    return <p key={i} className="my-1">{line}</p>;
                  }
                  return line ? <p key={i} className="my-0.5">{line}</p> : <div key={i} className="h-1" />;
                })}
              </div>
              {msg.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-[#198754] flex items-center justify-center shrink-0">
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
            </motion.div>
          ))}
          {isLoading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-[#0B5ED7] flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-2xl px-4 py-3 border border-gray-100 dark:border-gray-700">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {messages.length === 1 && (
          <div className="mb-4">
            <p className="text-xs text-gray-500 mb-2">Try asking about:</p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="text-xs bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full px-3 py-1.5 text-gray-600 dark:text-gray-300 hover:border-[#0B5ED7] hover:text-[#0B5ED7] transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-2 mb-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => generateQuestions("Mathematics")}
            disabled={generatingQuestions}
            className="gap-1 text-xs"
          >
            <GraduationCap className="w-3 h-3" /> Math Questions
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => generateQuestions("Biology")}
            disabled={generatingQuestions}
            className="gap-1 text-xs"
          >
            <BookOpen className="w-3 h-3" /> Bio Questions
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => generateQuestions("English")}
            disabled={generatingQuestions}
            className="gap-1 text-xs"
          >
            <Lightbulb className="w-3 h-3" /> English Questions
          </Button>
        </div>

        <div className="flex gap-2">
          <Input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && sendMessage(input)}
            placeholder="Ask me anything about WASSCE..."
            className="flex-1"
          />
          <Button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isLoading}
            className="bg-[#0B5ED7] hover:bg-[#0a4bb8] px-4"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
