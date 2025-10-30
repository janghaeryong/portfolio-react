import { useEffect, useRef } from 'react';
import type { ProjectEntity } from '@features/projects/domain/entities/project_entity';

interface ProjectMarqueeProps {
  projects: ProjectEntity[];
  speedMs?: number;
}

export default function ProjectMarquee({
  projects,
  speedMs = 20000,
}: ProjectMarqueeProps) {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = marqueeRef.current;
    if (!el) return;

    // 애니메이션 루프
    el.animate(
      [{ transform: 'translateX(0)' }, { transform: 'translateX(-50%)' }],
      { duration: speedMs, iterations: Infinity, easing: 'linear' }
    );
  }, [speedMs]);

  return (
    <div className="overflow-hidden mt-12 border-t border-white/10 pt-6">
      <div ref={marqueeRef} className="flex gap-6 whitespace-nowrap">
        {/* 같은 리스트를 두 번 렌더링해서 무한 루프처럼 보이게 */}
        {[...projects, ...projects].map((p) => (
          <div
            key={`${p.id}-${Math.random()}`}
            className="flex-shrink-0 px-4 py-2 border border-white/20 rounded-xl bg-black/20"
          >
            <span className="text-sm">{p.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
