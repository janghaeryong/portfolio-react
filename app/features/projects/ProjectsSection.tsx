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
  const [selectedYear, setSelectedYear] = useState<number | 'all'>('all');
  const [showGallery, setShowGallery] = useState(true);

  const handleCardClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  // 전체 연도 목록 추출 (중복 제거 및 정렬)
  const allYears = data
    ? Array.from(new Set(data.flatMap((p) => p.year))).sort((a, b) => b - a)
    : [];

  // 선택된 연도에 따라 프로젝트 필터링 및 정렬
  const filteredData = (
    selectedYear === 'all'
      ? data
      : data?.filter((p) => p.year.includes(selectedYear))
  )?.sort((a, b) => a.id.localeCompare(b.id));

  // 자동 스크롤 (requestAnimationFrame 사용)
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || isPaused || !filteredData || filteredData.length === 0)
      return;

    let animationId = 0;
    const scrollSpeed = 0.5; // px per frame

    const animate = () => {
      if (!container) return;

      // 첫 번째 세트 너비만큼 계산
      const firstChild = container.firstElementChild;
      if (!firstChild || !(firstChild instanceof HTMLElement)) return;

      const cardWidth = firstChild.offsetWidth;
      const gap = 24; // gap-6
      const singleSetWidth = (cardWidth + gap) * filteredData.length;

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
  }, [isPaused, filteredData]);

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
          <div className="flex items-center justify-between mb-8">
            <div className="flex-1"></div>
            <h2 className="text-3xl sm:text-4xl font-extrabold">
              PROJECTS
            </h2>
            <div className="flex-1 flex justify-end">
              <a
                href="/경력기술서_장해룡.pdf"
                download="경력기술서_장해룡.pdf"
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span className="hidden sm:inline">경력기술서</span>
              </a>
            </div>
          </div>

          {/* 연도 필터 탭 + 뷰 전환 버튼 */}
          <div className="flex justify-center items-center gap-4 mb-8 flex-wrap">
            {/* 연도 필터 */}
            <div className="flex gap-3 flex-wrap justify-center">
              <button
                onClick={() => setSelectedYear('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedYear === 'all'
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/50'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20'
                }`}
              >
                전체
              </button>
              {allYears.map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedYear === year
                      ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/50'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20'
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>

            {/* 구분선 */}
            <div className="hidden sm:block w-px h-8 bg-white/20"></div>

            {/* 뷰 전환 버튼 */}
            <button
              onClick={() => setShowGallery(!showGallery)}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-lg font-medium transition-all"
            >
              {showGallery ? (
                <>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                  <span className="hidden sm:inline">스크롤 뷰</span>
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                    />
                  </svg>
                  <span className="hidden sm:inline">갤러리 뷰</span>
                </>
              )}
            </button>
          </div>

          {/* 가로 스크롤 컨테이너 */}
          {!showGallery && (
            <>
              <div className="overflow-hidden pb-4">
                <div
                  ref={scrollContainerRef}
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                  className="flex gap-6 overflow-x-hidden"
                >
                  {/* 무한 스크롤을 위해 2번 렌더링 (프로젝트가 2개 이상일 때만) */}
                  {filteredData &&
                    (filteredData.length > 1
                      ? [...filteredData, ...filteredData]
                      : filteredData
                    ).map((p, idx) => (
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
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* 안내 메시지 */}
              <div className="mt-4 text-center text-sm text-gray-400">
                마우스를 올리면 멈춥니다
              </div>
            </>
          )}

          {/* 갤러리 뷰 */}
          {showGallery && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 pb-4">
              {filteredData &&
                filteredData.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => handleCardClick(p)}
                    className="relative group cursor-pointer rounded-xl overflow-hidden shadow-lg shadow-black/40 hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300"
                  >
                    {/* 썸네일 이미지 */}
                    {p.images?.[0] && (
                      <div className="aspect-9/16 overflow-hidden bg-gray-800">
                        <img
                          src={p.images[0]}
                          alt={p.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    )}

                    {/* 호버 오버레이 */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                      <h3 className="text-white font-bold text-sm mb-1">
                        {p.title}
                      </h3>
                      <p className="text-gray-300 text-xs">
                        {p.period.startDate} ~ {p.period.endDate ?? '진행중'}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          )}

        </div>

        {/* 상세보기 모달 */}
        <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <ProjectsModalContent
            project={selectedProject}
            allProjects={data || []}
            onProjectChange={setSelectedProject}
            onClose={() => setIsModalOpen(false)}
          />
        </Modal>
      </section>
    </>
  );
}
