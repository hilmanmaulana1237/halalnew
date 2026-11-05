import React, { useState, useEffect, useRef } from 'react';
import { Button, Card, Input } from '@heroui/react';
import { MessageSquare, X, Send, Bot, User, Headphones, Sparkles } from 'lucide-react';
import { api } from '@/services/api';

interface Message {
  id: string;
  sender: 'BOT' | 'USER' | 'ADMIN';
  text: string;
  time: string;
  canContactAdmin?: boolean;
  waUrl?: string;
}

export const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'BOT',
      text: 'Halo! Selamat datang di layanan informasi LPH UIN Sunan Gunung Djati Bandung. Ada yang bisa kami bantu seputar pendaftaran, persyaratan dokumen, atau tarif sertifikasi halal?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input.trim();
    setInput('');
    const userMsg: Message = {
      id: 'user_' + Date.now(),
      sender: 'USER',
      text: userText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await api.post('/chat/message', {
        message: userText,
        history: messages.slice(-4),
      });

      if (res.data?.success) {
        setMessages((prev) => [
          ...prev,
          {
            id: 'bot_' + Date.now(),
            sender: 'BOT',
            text: res.data.data.answer,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            canContactAdmin: res.data.data.canContactAdmin,
            waUrl: res.data.data.waUrl,
          },
        ]);
      } else {
        throw new Error('Fallback');
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: 'bot_' + Date.now(),
          sender: 'BOT',
          text:
            'Terima kasih atas pertanyaan Anda. Untuk informasi teknis sertifikasi halal reguler atau Self Declare lebih detail, Anda dapat menghubungi tim verifikator kami via WhatsApp resmi.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          canContactAdmin: true,
          waUrl: 'https://wa.me/6282118201232',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chat Trigger Button (Fixed left-bottom) */}
      <div className="fixed bottom-6 left-6 z-50">
        <Button
          variant="primary"
          aria-label="Tanya AI Halal"
          className="w-14 h-14 rounded-full bg-gradient-to-r from-[#6b1282] to-[#581c87] hover:from-[#581c87] hover:to-[#4a0d5c] text-white shadow-2xl flex items-center justify-center transition-transform hover:scale-110 border-2 border-emerald-400"
          onPress={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Bot className="w-7 h-7 text-emerald-300" />}
        </Button>
      </div>

      {/* Floating Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-24 left-6 z-50 w-[360px] sm:w-[400px] max-w-[calc(100vw-3rem)]">
          <Card className="rounded-3xl border border-neutral-200/90 bg-white shadow-2xl overflow-hidden flex flex-col h-[520px]">
            {/* Top Jewel Bar */}
            <div className="h-1 w-full bg-gradient-to-r from-[#6b1282] via-[#0284c7] via-[#10b981] to-[#f59e0b]" />

            {/* Header */}
            <div className="bg-gradient-to-r from-[#6b1282] to-[#4a0d5c] text-white px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#005a36] flex items-center justify-center text-white shadow-sm border border-emerald-300/40">
                  <Bot className="w-5 h-5 text-emerald-300" />
                </div>
                <div>
                  <h4 className="font-black text-sm text-white">Asisten Cerdas LPH</h4>
                  <div className="flex items-center gap-1.5 text-[11px] text-emerald-300">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Aktif 24/7 (AI SIHALAL)</span>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-white/80 hover:text-white p-1 min-w-0"
                onPress={() => setIsOpen(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Messages Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-neutral-50/70 text-xs">
              {messages.map((m) => {
                const isUser = m.sender === 'USER';
                return (
                  <div
                    key={m.id}
                    className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-[85%] ${
                      isUser ? 'ml-auto' : 'mr-auto'
                    }`}
                  >
                    <div
                      className={`px-4 py-2.5 rounded-2xl ${
                        isUser
                          ? 'bg-[#005a36] text-white rounded-br-xs'
                          : 'bg-white text-neutral-800 border border-neutral-200 rounded-bl-xs shadow-xs'
                      } leading-relaxed`}
                    >
                      {m.text}
                    </div>
                    <span className="text-[10px] text-neutral-400 mt-1 px-1">
                      {m.time}
                    </span>

                    {m.canContactAdmin && (
                      <div className="mt-2">
                        <a
                          href={m.waUrl || 'https://wa.me/6282118201232'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#25D366] text-white font-bold text-[11px] shadow-sm hover:bg-[#1ebd5b]"
                        >
                          <Headphones className="w-3.5 h-3.5" />
                          Hubungi Petugas via WA
                        </a>
                      </div>
                    )}
                  </div>
                );
              })}
              {loading && (
                <div className="flex items-center gap-2 text-xs text-neutral-400 bg-white p-3 rounded-2xl border border-neutral-100 shadow-xs max-w-[70%]">
                  <Sparkles className="w-4 h-4 text-amber-500 animate-spin" />
                  <span>Asisten sedang mengetik...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <div className="p-3 bg-white border-t border-neutral-100">
              <form onSubmit={handleSend} className="flex gap-2">
                <Input
                  placeholder="Ketik pertanyaan halal..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 text-xs"
                />
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  isPending={loading}
                  className="bg-[#6b1282] hover:bg-[#581c87] text-white px-4 rounded-xl"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </Card>
        </div>
      )}
    </>
  );
};

export default ChatbotWidget;
