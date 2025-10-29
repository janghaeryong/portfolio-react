import AboutSection from '~/features/about/AboutSection';

import SkillsSection from '~/features/skills/SkillsSection';
import ProjectsSection from '~/features/projects/ProjectsSection';

export function meta() {
  return [
    { title: 'Home | RuntimeBoom' },
    { name: 'description', content: '포트폴리오 홈' },
  ];
}

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
    </div>
  );
}
