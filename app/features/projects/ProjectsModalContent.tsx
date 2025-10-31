import { useState } from 'react';

export default function ProjectsModalContent({ project }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!project) {
    return (
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">프로젝트를 선택해주세요</h2>
      </section>
    );
  }

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

  return (
    <section className="max-w-6xl">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* 왼쪽: 이미지 캐러셀 */}
        <div className="lg:w-1/2">
          {hasImages && (
            <div className="relative">
              {/* 이미지 컨테이너 */}
              <div className="overflow-hidden rounded-lg border border-gray-200 shadow-lg max-h-[60vh]">
                <div
                  className="flex transition-transform duration-300 ease-in-out h-full"
                  style={{
                    transform: `translateX(-${currentImageIndex * 100}%)`,
                  }}
                >
                  {project.images.map((img, idx) => (
                    <div key={idx} className="w-full shrink-0 flex items-center justify-center bg-gray-100">
                      <img
                        src={img}
                        alt={`${project.title} ${idx + 1}`}
                        className="w-full h-auto max-h-[60vh] object-contain"
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
        <div className="lg:w-1/2 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* 프로젝트 제목 */}
          <div>
            <h2 className="text-3xl font-bold mb-2">{project.title}</h2>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>
                {project.period.startDate} ~{' '}
                {project.period.endDate ?? '진행중'}
              </span>
            </div>
          </div>

          {/* 프로젝트 설명 */}
          {project.description && (
            <div>
              <h3 className="text-lg font-semibold mb-2">프로젝트 설명</h3>
              <p className="text-gray-700 leading-relaxed">
                {project.description}
              </p>
            </div>
          )}

          {/* 역할 */}
          {project.contributionRole && project.contributionRole.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2">담당 역할</h3>
              <ul className="space-y-2">
                {project.contributionRole.map((role, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-gray-700"
                  >
                    <span className="text-blue-500 shrink-0">•</span>
                    <span>{role}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 기술 스택 */}
          {project.skills && project.skills.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">기술 스택</h3>
              <div className="flex flex-wrap gap-2">
                {project.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-sm font-medium"
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
