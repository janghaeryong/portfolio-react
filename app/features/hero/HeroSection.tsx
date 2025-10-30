import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section id="hero" className="relative w-full min-h-screen overflow-hidden">
      {/* 다크 그라데이션 배경 - AboutSection과 자연스럽게 연결 */}
      <div className="absolute inset-0 bg-linear-to-b from-slate-950 via-slate-900 to-[#0b1020]" />

      {/* 미세한 그리드 패턴 */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          color: 'rgba(255,255,255,0.1)',
        }}
      />

      {/* 콘텐츠 */}
      <div className="relative flex items-center justify-center min-h-screen px-6 md:px-12">
        <div className="max-w-7xl w-full">
          {/* 상단 레이블 */}
          <div className="mb-8 md:mb-12">
            <span className="inline-block text-sm md:text-base font-mono text-blue-400 tracking-wider">
              PORTFOLIO 2025
            </span>
          </div>

          {/* 메인 타이포그래피 */}
          <div className="space-y-4 md:space-y-6">
            {/* 이름 - 대형 타이포그래피 */}
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white leading-none tracking-tight">
              장해룡
            </h1>

            {/* 영문 이름 */}
            <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-white/60 tracking-wide">
              JANG HAERYONG
            </p>

            {/* 직무 */}
            <div className="pt-6 md:pt-8">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                Mobile Developer
              </h2>
            </div>

            {/* 서브 텍스트 */}
            <p className="text-lg sm:text-xl md:text-2xl text-white/70 max-w-3xl pt-4 md:pt-6 leading-relaxed">
              Clean Architecture로 더 나은 구조를 설계하는 개발자입니다.
            </p>
          </div>

          {/* CTA 영역 */}
          <div className="mt-12 md:mt-16 flex flex-wrap gap-4">
            <a
              href="#about"
              className="group inline-flex items-center gap-2 px-8 py-4 text-base md:text-lg font-semibold text-white bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-300"
            >
              더 알아보기
              <svg
                className="w-5 h-5 group-hover:translate-y-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </a>

            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-8 py-4 text-base md:text-lg font-semibold text-white border-b-2 border-transparent hover:border-blue-400 transition-all duration-300"
            >
              프로젝트 보기
            </a>
          </div>

          {/* 스크롤 인디케이터 */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-white/40">
            <span className="text-xs font-mono tracking-wider">SCROLL</span>
            <div className="w-px h-16 bg-gradient-to-b from-white/40 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
