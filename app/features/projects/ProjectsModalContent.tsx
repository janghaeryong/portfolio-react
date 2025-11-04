import { useState } from 'react';

export default function ProjectsModalContent({
  project,
  allProjects,
  onProjectChange,
  onClose,
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [selectedYear, setSelectedYear] = useState('all');

  if (!project) {
    return (
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">프로젝트를 선택해주세요</h2>
      </section>
    );
  }

  // 전체 연도 목록 추출
  const allYears = Array.from(new Set(allProjects.flatMap((p) => p.year))).sort(
    (a, b) => b - a
  );

  // 선택된 연도에 따라 프로젝트 필터링 및 정렬
  const filteredProjects =
    selectedYear === 'all'
      ? allProjects
      : allProjects
          .filter((p) => p.year.includes(Number(selectedYear)))
          .sort((a, b) => a.id.localeCompare(b.id));

  // 프로젝트 변경 시 이미지 인덱스 리셋
  const handleProjectChange = (newProject) => {
    setCurrentImageIndex(0);
    onProjectChange(newProject);
  };

  const hasImages = project.images && project.images.length > 0;
  const totalImages = hasImages ? project.images.length : 0;

  const goToNextImage = () => {
    if (currentImageIndex < totalImages - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const goToPrevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  // 스와이프 이벤트 처리
  const handleTouchStart = (e) => {
    setTouchEnd(0); // 리셋
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50; // 최소 스와이프 거리

    if (distance > minSwipeDistance) {
      // 왼쪽으로 스와이프 (다음 이미지)
      goToNextImage();
    } else if (distance < -minSwipeDistance) {
      // 오른쪽으로 스와이프 (이전 이미지)
      goToPrevImage();
    }
  };

  return (
    <section className="max-w-6xl relative">
      {/* 닫기 버튼 */}
      <button
        onClick={onClose}
        className="absolute -top-4 -right-4 z-50 bg-white hover:bg-gray-100 text-gray-600 hover:text-gray-900 rounded-full p-2 shadow-lg transition-all"
        aria-label="닫기"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {/* 연도 탭 */}
      <div className="mb-6">
        <div className="flex gap-2 flex-wrap justify-center">
          <button
            onClick={() => setSelectedYear('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedYear === 'all'
                ? 'bg-blue-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            전체
          </button>
          {allYears.map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(String(year))}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedYear === String(year)
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {year}
            </button>
          ))}
        </div>
      </div>

      {/* 프로젝트 썸네일 스크롤 */}
      <div className="mb-6">
        <div
          className="flex gap-3 overflow-x-auto pb-3 px-3 py-2"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#CBD5E0 #F7FAFC',
          }}
        >
          {filteredProjects.map((p) => (
            <div
              key={p.id}
              onClick={() => handleProjectChange(p)}
              className="shrink-0 cursor-pointer"
            >
              <div
                className={`rounded-lg overflow-hidden transition-all ${
                  p.id === project.id
                    ? 'ring-4 ring-blue-500 shadow-lg scale-105'
                    : 'ring-2 ring-gray-200 hover:ring-blue-300 hover:shadow-md'
                }`}
              >
                {p.images?.[0] && (
                  <img
                    src={p.images[0]}
                    alt={p.title}
                    className="w-20 h-28 object-cover"
                  />
                )}
              </div>
              <p
                className={`text-xs text-center mt-1.5 font-medium truncate w-20 ${
                  p.id === project.id ? 'text-blue-600' : 'text-gray-600'
                }`}
              >
                {p.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* 왼쪽: 이미지 캐러셀 */}
        <div className="lg:w-1/2">
          {hasImages && (
            <div className="relative">
              {/* 이미지 컨테이너 */}
              <div
                className="overflow-hidden rounded-lg border border-gray-200 shadow-lg max-h-[45vh] touch-pan-y"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <div
                  className="flex transition-transform duration-300 ease-in-out h-full"
                  style={{
                    transform: `translateX(-${currentImageIndex * 100}%)`,
                  }}
                >
                  {project.images.map((img, idx) => (
                    <div
                      key={idx}
                      className="w-full shrink-0 flex items-center justify-center bg-gray-100"
                    >
                      <img
                        src={img}
                        alt={`${project.title} ${idx + 1}`}
                        className="w-full h-auto max-h-[45vh] object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* 이전/다음 버튼 */}
              {totalImages > 1 && (
                <>
                  <button
                    onClick={goToPrevImage}
                    disabled={currentImageIndex === 0}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    ←
                  </button>
                  <button
                    onClick={goToNextImage}
                    disabled={currentImageIndex === totalImages - 1}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    →
                  </button>
                </>
              )}

              {/* 페이지 인디케이터 */}
              {totalImages > 1 && (
                <div className="flex justify-center gap-2 mt-4">
                  {project.images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        idx === currentImageIndex
                          ? 'bg-blue-500 w-8'
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* 오른쪽: 설명 */}
        <div className="lg:w-1/2">
          {/* 서비스 명 */}
          <div className="mb-8">
            <div className="inline-block">
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2 block">
                Project
              </span>
              <h2 className="text-3xl font-bold text-gray-900">
                {project.title}
              </h2>
              <div className="h-1 w-12 bg-blue-500 mt-2 rounded-full"></div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mt-3">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>
                {project.period.startDate} ~{' '}
                {project.period.endDate ?? '진행중'}
              </span>
            </div>
          </div>

          {/* 서비스 설명 */}
          {project.description && (
            <div className="mb-8 pb-8 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-blue-500">📋</span>
                서비스 설명
              </h3>
              <p className="text-gray-700 leading-relaxed text-[15px]">
                {project.description}
              </p>
            </div>
          )}

          {/* 나의 역할 */}
          {project.contributionRole && project.contributionRole.length > 0 && (
            <div className="mb-8 pb-8 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-blue-500">👨‍💻</span>
                나의 역할
              </h3>
              <ul className="space-y-2.5">
                {project.contributionRole.map((role, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-gray-700 text-[15px]"
                  >
                    <span className="text-blue-500 shrink-0 font-bold mt-0.5">
                      •
                    </span>
                    <span className="leading-relaxed">{role}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 기술 스택 */}
          {project.skills && project.skills.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-blue-500">🛠️</span>
                기술 스택
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
