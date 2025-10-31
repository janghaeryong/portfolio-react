// src/features/skills/SkillsSection.tsx
import React from 'react';

type Skill = { name: string; note?: string };

const FAMILIAR: Skill[] = [
  { name: 'Android', note: 'Jetpack Compose · Hilt · Room · DataStore' },
  { name: 'iOS', note: 'SwiftUI · Combine' },
  { name: 'Flutter', note: 'Riverpod' },
];

const TRIED: Skill[] = [
  { name: 'React', note: 'TypeScript · Tailwind · Vite' },
  { name: 'Spring Boot', note: 'REST API · JPA' },
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
      className="relative py-16 sm:py-24 scroll-mt-16 md:scroll-mt-20 bg-white text-neutral-900"
    >
      {/* 상단 구분선 */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
      <div className="container mx-auto max-w-6xl px-4">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-12">
          SKILLS
        </h2>

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
            {/* size-2는 v3 이상 필요. 이슈 시 w-2 h-2로 교체 */}
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
