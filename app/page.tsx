import { MediumPosts } from '@/components/medium-posts';
import { FeaturedProjects } from '@/components/featured-projects';
import { getMediumPosts } from '@/lib/medium';
import { GetMetada } from '@/lib/page-metadata';
import PlayAIEmbed from "@/components/playai-embed";
import Head from 'next/head';

export const metadata = GetMetada('home');

export default async function Home() {
  const { posts: mediumPosts } = await getMediumPosts(4);

  return (
    <>
      <Head>
        <title>Ufuk Güzel | Yazılım Geliştirici ve Yapay Zeka Uzmanı</title>
        <meta name="description" content="Ufuk Güzel - Yazılım Geliştirici ve Yapay Zeka Uzmanı. Web geliştirme, yapay zeka, veri bilimi ve oyun geliştirme alanlarında uzman. Dikont'ta yazılım geliştirici olarak çalışıyor." />
        <meta name="keywords" content="Ufuk Güzel, Yazılım Geliştirici, Yapay Zeka Uzmanı, Web Geliştirme, Veri Bilimi, Türkiye" />
      </Head>
      <div className="space-y-16">
        <section className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            Ufuk Güzel
          </h1>
          <h2 className="text-2xl font-semibold text-muted-foreground">
            Yazılım Geliştirici ve Yapay Zeka Uzmanı
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Türkiye'de yaşayan bir teknoloji tutkunu ve yazılım geliştiricisiyim. Web geliştirme, yapay zeka ve veri bilimi alanlarında ölçeklenebilir uygulamalar geliştiriyorum. Oyun geliştirme ve dijital deneyimleri geliştirmek için yenilikçi çözümler üretmeye odaklanıyorum.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Uzmanlık Alanları</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Web Geliştirme (React, Next.js)</li>
                <li>Yapay Zeka ve Makine Öğrenmesi</li>
                <li>Veri Bilimi ve Analizi</li>
                <li>Oyun Geliştirme</li>
              </ul>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">İletişim</h3>
              <ul className="space-y-1">
                <li>LinkedIn: <a href="https://www.linkedin.com/in/ufukguzel/" className="text-primary hover:underline">ufukguzel</a></li>
                <li>GitHub: <a href="https://github.com/ufukguzel" className="text-primary hover:underline">ufukguzel</a></li>
              </ul>
            </div>
          </div>
        </section>
        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">Let's chat with PlayAI</h2>
          <div className="flex justify-center">
            <PlayAIEmbed />
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-medium tracking-tight">Latest Posts</h2>
            <a href="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              View all →
            </a>
          </div>
          <MediumPosts />
        </section>

        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-medium tracking-tight">Featured Projects</h2>
            <a href="/projects" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              View all →
            </a>
          </div>
          <FeaturedProjects />
        </section>
      </div>
    </>
  );
}