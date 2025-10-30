import {
  HeroSection,
  AboutSection,
  SkillsSection,
  ProjectsSection,
} from '@features/index';

export function meta() {
  return [
    { title: "장해룡 포트폴리오 :: JHR's Portfolio" },
    {
      name: 'description',
      content: '더 나은 구조를 고민하는 모바일 개발자 장해룡의 포트폴리오',
    },
  ];
}

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
    </div>
  );
}
