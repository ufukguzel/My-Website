import { NextResponse } from 'next/server';
import { ProjectList } from '@/lib/projects-data';

const MAX_MESSAGE_LENGTH = 1000;
const MAX_HISTORY = 12;

const GEMINI_MODEL = 'gemini-2.5-flash';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

function buildSystemPrompt(language: string) {
  const projects = ProjectList.map((p) => `- ${p.title}: ${p.description}`).join('\n');

  return `You are the friendly AI assistant on Ufuk Güzel's personal website (ufukguzel.com.tr).
Answer visitors' questions about Ufuk based on the information below. Keep answers short (2-4 sentences), warm, and helpful.
${language === 'tr' ? 'Answer in Turkish.' : 'Answer in English.'}
If asked something unrelated to Ufuk or his work, politely steer the conversation back.

About Ufuk:
- Product-minded software developer, currently Junior Software Developer at Valde.
- Designs scalable web applications and AI-powered experiences; crafts data-centric modules for SaaS platforms.
- Expertise: React & Next.js, TypeScript, UI engineering, AI & LLM integrations, data analytics, cloud architecture.
- 40+ shipped projects and open-source contributions.
- Contact: me@ufukguzel.com.tr · GitHub: github.com/ufukguzel · LinkedIn: linkedin.com/in/ufukguzel

Projects:
${projects}`;
}

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'not_configured' }, { status: 503 });
  }

  let body: { messages?: ChatMessage[]; language?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid_request' }, { status: 400 });
  }

  const messages = (body.messages ?? [])
    .filter(
      (m): m is ChatMessage =>
        (m?.role === 'user' || m?.role === 'assistant') &&
        typeof m?.content === 'string' &&
        m.content.trim().length > 0,
    )
    .slice(-MAX_HISTORY)
    .map((m) => ({ ...m, content: m.content.slice(0, MAX_MESSAGE_LENGTH) }));

  if (messages.length === 0 || messages[messages.length - 1].role !== 'user') {
    return NextResponse.json({ error: 'invalid_request' }, { status: 400 });
  }

  const language = body.language === 'tr' ? 'tr' : 'en';

  try {
    const response = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: buildSystemPrompt(language) }] },
        contents: messages.map((m) => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }],
        })),
        generationConfig: { maxOutputTokens: 2048, temperature: 0.7 },
      }),
    });

    if (!response.ok) {
      console.error('Gemini API error:', response.status, await response.text());
      return NextResponse.json({ error: 'upstream_error' }, { status: 502 });
    }

    const data = await response.json();
    const reply = data?.candidates?.[0]?.content?.parts
      ?.map((part: { text?: string }) => part.text ?? '')
      .join('')
      .trim();

    if (!reply) {
      return NextResponse.json({ error: 'empty_response' }, { status: 502 });
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({ error: 'upstream_error' }, { status: 502 });
  }
}
