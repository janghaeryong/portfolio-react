import { useState, useRef, useEffect } from 'react';
import ProjectMarquee from '@/features/projects/ProjectMarquee';

import { useProjectsQuery } from '@features/projects/presentation/hooks/useProjectsQuery';

export default function ProjectsSection() {
  const { data, isLoading, error } = useProjectsQuery();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const animationRef = useRef<Animation | null>(null);

  // 자동 스크롤 (CSS Animation 사용 - 무한 반복)
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || !data || data.length === 0) return;

    // 컨테이너 너비 계산 (카드 너비 + gap을 고려)
    const cardWidth = 520; // md 기준
    const gap = 24; // gap-6
    const totalWidth = (cardWidth + gap) * data.length;

    // CSS Animation 생성
    const animation = container.animate(
      [
        { transform: 'translateX(0)' },
        { transform: `translateX(-${totalWidth}px)` },
      ],
      {
        duration: 50000, // 50초에 한 사이클
        iterations: Infinity,
        easing: 'linear',
      }
    );

    animationRef.current = animation;

    // 일시정지 상태 반영
    if (isPaused) {
      animation.pause();
    }

    return () => {
      animation.cancel();
      animationRef.current = null;
    };
  }, [data]);

  // isPaused 상태 변경 시 애니메이션 제어
  useEffect(() => {
    if (animationRef.current) {
      if (isPaused) {
        animationRef.current.pause();
      } else {
        animationRef.current.play();
      }
    }
  }, [isPaused]);

  if (isLoading) return <section>로딩 중...</section>;
  if (error) return <section>데이터를 불러오지 못했습니다.</section>;

  return (
    <>
      <section id="projects" className="py-20 scroll-mt-15 md:scroll-mt-20">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Projects</h2>

          {/* 가로 스크롤 컨테이너 */}
          <div className="overflow-hidden pb-4">
            <div
              ref={scrollContainerRef}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="flex gap-6"
            >
              {/* 무한 스크롤을 위해 2번 렌더링 */}
              {data &&
                [...data, ...data].map((p, idx) => (
                  <div
                    key={`${p.id}-${idx}`}
                    className="shrink-0 w-[90vw] sm:w-[450px] md:w-[520px] group rounded-2xl border border-white/20 bg-white/5 backdrop-blur-sm p-5 flex flex-col sm:flex-row gap-5 shadow-lg shadow-black/20 hover:bg-white/10 hover:border-blue-500/40 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300"
                  >
                    {/* 썸네일 이미지 */}
                    {p.images?.[0] && (
                      <div className="shrink-0 w-full sm:w-28 md:w-32 overflow-hidden rounded-xl shadow-xl shadow-black/40 ring-1 ring-white/10">
                        <img
                          src={p.images[0]}
                          alt={p.title}
                          className="w-full aspect-9/16 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}

                    {/* 프로젝트 내용 */}
                    <div className="flex-1 flex flex-col gap-3">
                      {/* 제목 */}
                      <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                        {p.title}
                      </h3>

                      {/* 기간 */}
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-400">📅</span>
                        <span className="text-gray-300">
                          {p.period.startDate}
                        </span>
                        <span className="text-gray-500">→</span>
                        <span className="text-gray-300">
                          {p.period.endDate ?? (
                            <span className="text-blue-400 font-medium">
                              진행중
                            </span>
                          )}
                        </span>
                      </div>

                      {/* 설명 */}
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {p.description}
                      </p>

                      {/* 역할 */}
                      <div className="flex items-start gap-2 text-sm">
                        <span className="text-gray-400 font-medium">역할:</span>
                        <span className="text-gray-300">
                          {p.contributionRole}
                        </span>
                      </div>

                      {/* 스킬 태그 */}
                      <div className="flex flex-wrap gap-2 mt-auto pt-2">
                        {p.skills.map((s) => (
                          <span
                            key={s}
                            className="text-xs px-3 py-1.5 bg-blue-500/20 border border-blue-400/40 text-blue-200 rounded-full font-medium shadow-sm hover:bg-blue-500/30 hover:border-blue-400/60 hover:shadow-md hover:shadow-blue-500/20 transition-all"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* 안내 메시지 */}
          <div className="mt-4 text-center text-sm text-gray-400">
            마우스를 올리면 멈춥니다
          </div>
        </div>
      </section>
    </>
  );
}
