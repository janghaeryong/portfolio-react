// src/features/skills/SkillsSection.tsx
import React from 'react';

type Skill = { name: string; note?: string };

const FAMILIAR: Skill[] = [
  { name: 'Android', note: 'Jetpack Compose · Hilt · Room · DataStore' },
  { name: 'iOS', note: 'SwiftUI · Combine' },
  { name: 'Flutter', note: 'Riverpod' },
  { name: 'React', note: 'TypeScript · Tailwind · Vite' },
];

const TRIED: Skill[] = [
  { name: 'Spring Boot', note: 'REST API · JPA(기초)' },
  { name: 'Firebase / Firestore' },
  { name: 'MySQL' },
  { name: 'Docker' },
];

const LANGUAGES: Skill[] = [
  { name: 'Kotlin' },
  { name: 'Swift' },
  { name: 'Dart' },
  { name: 'TypeScript' },
];

const ARCHITECTURE: string[] = [
  'Clean Architecture',
  'MVVM',
  'Modularization (멀티모듈 설계 경험)',
  'Reactive Programming',
];

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="py-16 sm:py-24 scroll-mt-15 md:scroll-mt-20"
    >
      <div className="container mx-auto px-4">
        <header className="mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            SKILLS
          </h2>
        </header>

        {/* 3열 그리드: Familiar / Tried / Language */}
        <div className="grid gap-6 lg:grid-cols-3">
          <SkillColumn title="Familiar" items={FAMILIAR} />
          <SkillColumn title="Tried" items={TRIED} />
          <SkillColumn title="Language" items={LANGUAGES} />

          {/* Architecture / Principles: 가로 전체 사용 */}
          <div className="lg:col-span-3 mt-2">
            <div className="rounded-2xl border border-black/10 bg-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.05)] backdrop-blur p-6 sm:p-8">
              <h3 className="text-lg font-semibold mb-4">
                Architecture / Principles
              </h3>
              <ul className="flex flex-wrap gap-2" role="list">
                {ARCHITECTURE.map((label) => (
                  <li
                    key={label}
                    className="rounded-full border border-black/10 px-3 py-1 text-sm bg-white"
                  >
                    {label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillColumn({ title, items }: { title: string; items: Skill[] }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.05)] backdrop-blur p-6 sm:p-8">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <ul className="space-y-3" role="list">
        {items.map((s) => (
          <li key={s.name} className="flex items-start gap-3">
            <span className="mt-1 inline-block size-2 rounded-full bg-black/60" />
            <div>
              <div className="font-medium">{s.name}</div>
              {s.note && (
                <div className="text-sm text-neutral-500">{s.note}</div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
