'use client';

import { useEffect, useRef, useState } from 'react';
import { Bot, Loader2, Send, User } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import type { LanguageKey } from '@/lib/i18n/config';

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

const chatTranslations: Record<
  LanguageKey,
  {
    greeting: string;
    placeholder: string;
    send: string;
    error: string;
    notConfigured: string;
  }
> = {
  en: {
    greeting: "Hi! I'm Ufuk's AI assistant. Ask me anything about his work, projects, or experience.",
    placeholder: 'Ask a question about Ufuk...',
    send: 'Send',
    error: 'Something went wrong. Please try again.',
    notConfigured: 'The chat assistant is not available right now. You can reach Ufuk at me@ufukguzel.com.tr.',
  },
  tr: {
    greeting: 'Merhaba! Ben Ufuk’un yapay zekâ asistanıyım. Çalışmaları, projeleri veya deneyimi hakkında bana soru sorabilirsin.',
    placeholder: 'Ufuk hakkında bir soru sor...',
    send: 'Gönder',
    error: 'Bir şeyler ters gitti. Lütfen tekrar dene.',
    notConfigured: 'Sohbet asistanı şu anda kullanılamıyor. Ufuk’a me@ufukguzel.com.tr adresinden ulaşabilirsin.',
  },
};

export function AiChat() {
  const { language } = useLanguage();
  const t = chatTranslations[language];

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, isLoading]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const content = input.trim();
    if (!content || isLoading) return;

    const nextMessages: ChatMessage[] = [...messages, { role: 'user', content }];
    setMessages(nextMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages, language }),
      });

      if (response.status === 503) {
        setMessages([...nextMessages, { role: 'assistant', content: t.notConfigured }]);
        return;
      }

      const data = await response.json();
      if (!response.ok || !data.reply) {
        setMessages([...nextMessages, { role: 'assistant', content: t.error }]);
        return;
      }

      setMessages([...nextMessages, { role: 'assistant', content: data.reply }]);
    } catch {
      setMessages([...nextMessages, { role: 'assistant', content: t.error }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl overflow-hidden rounded-3xl border border-border/60 bg-background/70 shadow-sm backdrop-blur">
      <div ref={scrollRef} className="flex h-80 flex-col gap-4 overflow-y-auto p-6">
        <Message role="assistant" content={t.greeting} />
        {messages.map((message, index) => (
          <Message key={index} role={message.role} content={message.content} />
        ))}
        {isLoading && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
          </div>
        )}
      </div>

      <form onSubmit={sendMessage} className="flex items-center gap-2 border-t border-border/60 p-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t.placeholder}
          maxLength={1000}
          className="flex-1 rounded-full border border-border/60 bg-background/80 px-4 py-2 text-sm outline-none transition focus:border-primary/50"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          aria-label={t.send}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm transition hover:scale-[1.05] disabled:opacity-40 disabled:hover:scale-100"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}

function Message({ role, content }: ChatMessage) {
  const isAssistant = role === 'assistant';
  return (
    <div className={`flex items-start gap-3 ${isAssistant ? '' : 'flex-row-reverse'}`}>
      <span
        className={`mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
          isAssistant ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
        }`}
      >
        {isAssistant ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
      </span>
      <p
        className={`max-w-[80%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          isAssistant
            ? 'bg-muted/50 text-foreground'
            : 'bg-primary/10 text-foreground'
        }`}
      >
        {content}
      </p>
    </div>
  );
}
