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
];