import { GetMetada } from '@/lib/page-metadata';
import Head from 'next/head';
import HomeContent from '@/components/home-content';

export const metadata = GetMetada('home');

export default function Home() {
  return (
    <>
      <Head>
        <title>Ufuk Güzel | Software Developer & AI Specialist</title>
        <meta
          name="description"
          content="Ufuk Güzel is a software developer and AI specialist focused on modern web development, artificial intelligence, data science, and game development. Currently crafting user-centric products at Valde."
        />
        <meta
          name="keywords"
          content="Ufuk Güzel, Software Developer, AI Specialist, Web Development, Data Science, Turkey"
        />
      </Head>
      <HomeContent />
    </>
  );
}