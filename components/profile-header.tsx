"use client";

import Image from "next/image";

export function ProfileHeader() {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="relative w-20 h-20">
          <Image
            src="/images/ufuks.png"
            alt="Ufuk Güzel"
            width={80}
            height={80}
            className="rounded-full object-cover"
            priority
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Ufuk Güzel</h1>
          <p className="text-muted-foreground">Software Developer</p>
        </div>
      </div>
      
      <p className="text-lg leading-relaxed">
        Hi 👋 I'm Ufuk, a technology enthusiast and software developer based in Turkey, dedicated to building scalable applications and exploring web development and emerging technologies. I'm passionate about AI, data science, and game development, always seeking innovative solutions to elevate digital experiences.
      </p>
    </section>
  );
}