import { useState, useRef, useEffect } from 'react';
import { Modal } from '~/core/ui/overlay';
import ProjectsModalContent from '@/features/projects/ProjectsModalContent';

import { useProjectsQuery } from '@features/projects/presentation/hooks/useProjectsQuery';

export default function ProjectsSection() {
  const { data, isLoading, error } = useProjectsQuery();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  // 자동 스크롤 (requestAnimationFrame 사용)
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || isPaused || !data || data.length === 0) return;

    let animationId = 0;
    const scrollSpeed = 0.5; // px per frame

    const animate = () => {
      if (!container) return;

      // 첫 번째 세트 너비만큼 계산
      const firstChild = container.firstElementChild;
      if (!firstChild || !(firstChild instanceof HTMLElement)) return;

      const cardWidth = firstChild.offsetWidth;
      const gap = 24; // gap-6
      const singleSetWidth = (cardWidth + gap) * data.length;

      // 첫 번째 세트를 다 지나가면 리셋
      if (container.scrollLeft >= singleSetWidth) {
        container.scrollLeft = 0;
      } else {
        container.scrollLeft += scrollSpeed;
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [isPaused, data]);

  if (isLoading) return <section>로딩 중...</section>;
  if (error) return <section>데이터를 불러오지 못했습니다.</section>;

  return (
    <>
      <section
        id="projects"
        className="relative py-20 scroll-mt-15 md:scroll-mt-20 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white"
      >
        {/* 상단 구분선 */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-12">
            PROJECTS
          </h2>

          {/* 가로 스크롤 컨테이너 */}
          <div className="overflow-hidden pb-4">
            <div
              ref={scrollContainerRef}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="flex gap-6 overflow-x-hidden"
            >
              {/* 무한 스크롤을 위해 2번 렌더링 */}
              {data &&
                [...data, ...data].map((p, idx) => (
                  <div
                    key={`${p.id}-${idx}`}
                    onClick={() => handleCardClick(p)}
                    className="relative shrink-0 w-[75vw] sm:w-[450px] md:w-[520px] group rounded-2xl border border-white/20 bg-white/5 backdrop-blur-sm p-5 flex flex-col sm:flex-row items-center sm:items-start gap-5 shadow-lg shadow-black/20 hover:bg-white/10 hover:border-blue-500/40 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 cursor-pointer overflow-hidden"
                  >
                    {/* 호버 시 딤 효과와 상세보기 */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-2xl z-10">
                      <span className="text-white text-xl font-bold">
                        상세보기
                      </span>
                    </div>
                    {/* 썸네일 이미지 */}
                    {p.images?.[0] && (
                      <div className="shrink-0 w-45 sm:w-28 md:w-32 overflow-hidden rounded-xl shadow-xl shadow-black/40 ring-1 ring-white/10">
                        <img
                          src={p.images[0]}
                          alt={p.title}
                          className="w-full aspect-9/16 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}

                    {/* 프로젝트 내용 */}
                    <div className="flex-1 flex flex-col gap-3 w-full text-left">
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
                      {p.description && (
                        <p className="text-gray-300 text-sm leading-relaxed line-clamp-2">
                          {p.description}
                        </p>
                      )}

                      {/* 역할 */}
                      {/* <div className="text-sm">
                        <span className="text-gray-400 font-medium block mb-1">
                          역할
                        </span>
                        <ul className="space-y-1">
                          {p.contributionRole.map((role, idx) => (
                            <li
                              key={idx}
                              className="text-gray-300 flex items-start gap-2"
                            >
                              <span className="text-gray-500 shrink-0">•</span>
                              <span>{role}</span>
                            </li>
                          ))}
                        </ul>
                      </div> */}

                      {/* 스킬 태그 */}
                      {/* <div className="flex flex-wrap gap-2 mt-auto pt-2">
                        {p.skills.map((s) => (
                          <span
                            key={s}
                            className="text-xs px-3 py-1.5 bg-blue-500/20 border border-blue-400/40 text-blue-200 rounded-full font-medium shadow-sm hover:bg-blue-500/30 hover:border-blue-400/60 hover:shadow-md hover:shadow-blue-500/20 transition-all"
                          >
                            {s}
                          </span>
                        ))}
                      </div> */}
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

        {/* 상세보기 모달 */}
        <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <ProjectsModalContent project={selectedProject} />
        </Modal>
      </section>
    </>
  );
}
