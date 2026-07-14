import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const OWNER_EMAIL = 'ufukguzel15@gmail.com';
const MAX_TEXT_LENGTH = 3000;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Geçersiz istek gövdesi.' }, { status: 400 });
  }

  const { email, idea, expectations, website } = (body ?? {}) as {
    email?: string;
    idea?: string;
    expectations?: string;
    website?: string; // honeypot
  };

  if (website) {
    return NextResponse.json({ ok: true });
  }

  if (!email || !EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: 'Geçerli bir e-posta adresi girin.' }, { status: 400 });
  }
  const trimmedIdea = (idea ?? '').trim();
  if (trimmedIdea.length < 10) {
    return NextResponse.json({ error: 'Fikrinizi biraz daha detaylı anlatın (en az 10 karakter).' }, { status: 400 });
  }

  let emailSent = false;
  try {
    const response = await fetch(`https://formsubmit.co/ajax/${OWNER_EMAIL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        _subject: `💡 Yeni Uygulama Fikri — ${email}`,
        _template: 'table',
        'E-posta': email.trim(),
        Fikir: trimmedIdea.slice(0, MAX_TEXT_LENGTH),
        Beklentiler: (expectations ?? '').trim().slice(0, MAX_TEXT_LENGTH) || '-',
        Tarih: new Date().toLocaleString('tr-TR', { timeZone: 'Europe/Istanbul' }),
      }),
    });
    emailSent = response.ok;
  } catch {
    emailSent = false;
  }

  if (!emailSent) {
    return NextResponse.json(
      { error: 'Mesaj gönderilemedi, lütfen daha sonra tekrar deneyin.' },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
