import {
  HeroSection,
  AboutSection,
  SkillsSection,
  ProjectsSection,
} from '~/features';

export function meta() {
  return [
    { title: 'Home | RuntimeBoom' },
    { name: 'description', content: '포트폴리오 홈' },
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
