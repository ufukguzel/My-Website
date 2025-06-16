import { type Highlight } from "@/types/highlight";

const imageFolderPath = '/images/highlights';

export const HighlightList: Highlight[] = [
    {
        year: "2025",
        events: [
            {
                title: "Dikont - Software Developer",
                description: "Currently working as a software developer at Dikont, building a digital document editor and e-signature platform using React, Strapi (Node.js), and PostgreSQL. Responsible for developing drag-and-drop form elements, advanced PDF processing, and integrating OpenAI-powered features.",
                imageUrl: "/images/highlights/2025_dikont.jpg"
            }
        ]
    },
    {
        year: "2024",
        events: [
            {
                title: "Turkcell - Intern / Information & Communication Technologies",
                description: "Within the scope of Turkcell Gncytnk program, I did an internship in the ICT department. I contributed to process planning, development and monitoring. I developed the task management system using ASP.NET MVC and Entity Framework",
                imageUrl: "/images/highlights/2024_turkcell.jpg"
            }
        ]
    },
    {
        year: "2023",
        events: [
            {
                title: "İstanbul Medipol Üniversitesi - Intern / Web Development",
                description: "I worked as an intern for the university's web development team. I contributed to the update and development of the university's website. I have developed projects using both Frontend and Backend technologies.",
                imageUrl: "/images/highlights/2023_medipol_web_dev.jpg"
            },
        ]
    },
    {
        year: "2022",
        events: [
            {
                title: "Alim Production - Intern / Information Technology",
                description: "I took part in the company's IT projects and supported system maintenance. I gained experience in IT infrastructure management, problem solving and software development.",
            
            }
        ]
    },
    {
        year: "2021 - Present",
        events: [
            {
                title: "Geleceğin Yıldızları - Mentor (Seasonal)",
                description: "Every year I gave leadership trainings to more than 100 participants from different countries. I planned the educational contents, made crisis management and took an active role in the organization processes.",
                imageUrl: "/images/highlights/gelecegin_yildizlari.jpg"
            }
        ]
    }
];
