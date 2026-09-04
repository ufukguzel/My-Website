import { type Project } from "@/types/project";

const imageFolderPath = '/images/projects';

export const ProjectList: Project[] = [
  {
    title: "TaskPilot — Automation Dashboard",
    description: "Full-stack automation dashboard to schedule (cron), run and monitor tasks with real-time WebSocket logs, JWT auth, metrics & charts, and failure notifications (webhook/email). Built with FastAPI + React/TypeScript, containerized with Docker and deployed on Vercel + Render.",
    image: `${imageFolderPath}/taskpilot.png`,
    demoUrl: "https://taskpilot-eta-six.vercel.app",
    sourceUrl: "https://github.com/ufukguzel/taskpilot"
  },
  {
    title: "Synapse — English Learning App",
    description: "A mobile app for learning English through short daily sessions, spaced-repetition vocabulary review, streaks and XP. Built with React Native (bare CLI) and Supabase.",
    image: `${imageFolderPath}/synapse.png`,
    sourceUrl: "https://github.com/ufukguzel/synapse"
  },
  {
    title: "LangChain Chatbot (RAG)",
    description: "A CLI + FastAPI chatbot with streaming responses, retrieval-augmented generation over TXT/MD/PDF documents (FAISS), clickable sources, and a graceful offline mock mode. Built with Python and LangChain.",
    image: `${imageFolderPath}/chatbot-langchain.png`,
    sourceUrl: "https://github.com/ufukguzel/ChatBot_LangChain"
  },
  {
    title: "Personal Website",
    description: "ufukguzel.com - Built with Next.js, TypeScript, and Tailwind CSS",
    image: `${imageFolderPath}/ufuk-website.jpg`,
    demoUrl: "https://ufukguzel.com",
    sourceUrl: "https://github.com/ufukguzel/My-Website"
  },
  {
    title: "İş Takip Sistemi (Task Management System)",
    description: "It is a task management system developed with ASP.NET MVC and Entity Framework. It is used to manage the tasks of the ICT department in Turkcell.",
    image: `${imageFolderPath}/is-takip-sistemi.jpg`,
    demoUrl: "#",
    sourceUrl: "https://github.com/ufukguzel/Is-Takip-Sistemi"
  },
  {
    title: "Tarife Asistanı (Recipe Assistant)",
    description: "A mobile app that suggests recipes from the ingredients you have, powered by an AI language model (Cohere). Built with React Native and Expo, with favorites and step-by-step recipe details.",
    image: `${imageFolderPath}/yemek-tarif-asistani.jpg`,
    demoUrl: "#",
    sourceUrl: "https://github.com/ufukguzel/TarifeAsistani"
  },
  {
    title: "Hastane Otomasyon Sistemi (Hospital Automation)",
    description: "A desktop hospital automation application built with C# and Windows Forms (.NET Framework). Handles patient records, doctor management, appointment scheduling and reporting.",
    image: `${imageFolderPath}/hastane-randevu-sistemi.jpg`,
    demoUrl: "#",
    sourceUrl: "https://github.com/ufukguzel/Hastane-Otomasyon"
  },
  {
    title: "Öğrenci Bilgi Sistemi (Medipol University)",
    description: "A web-based student information system built with ASP.NET Core (Razor Pages) and Entity Framework Core. Manages students, courses and enrollments over a code-first SQL Server database.",
    image: `${imageFolderPath}/medipol.jpg`,
    demoUrl: "#",
    sourceUrl: "https://github.com/ufukguzel/MedipolUniversity"
  },
  {
    title: "Video Günlüğü (Video Diary)",
    description: "A mobile video journaling app built with React Native and Expo — record, trim and edit videos with metadata management for a modern journaling experience.",
    image: `${imageFolderPath}/video-diary.jpg`,
    demoUrl: "#",
    sourceUrl: "https://github.com/ufukguzel/React-Video-Diary-App"
  },
  {
    title: "TabuAI — AI Taboo Game",
    description: "An AI-powered Taboo word game where a language model (Gemini) generates and evaluates cards. Built with React and TypeScript.",
    image: `${imageFolderPath}/tabu-ai.jpg`,
    demoUrl: "#",
    sourceUrl: "https://github.com/ufukguzel/TabuAi"
  },
  {
    title: "Toplantı Odası Rezervasyon (Meeting Room Booking)",
    description: "A real-time meeting room reservation app built with Firebase (Realtime Database) and React — book rooms by date and hourly slots with live sync across users.",
    image: `${imageFolderPath}/toplanti-oda.jpg`,
    demoUrl: "#",
    sourceUrl: "https://github.com/ufukguzel/toplant-oda"
  },
];