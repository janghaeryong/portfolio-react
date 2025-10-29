import { Mail, Github, Phone, Calendar, MapPin } from 'lucide-react';

export default function AboutSection() {
  return (
    <section
      id="about"
      className="
        relative w-full min-h-screen
        bg-gradient-to-br from-[#0b1020] via-[#0c1222] to-[#0e1626]
        text-white
        flex items-center
      "
    >
      {/* 아주 미세한 도트 그리드 패턴 */}
      <div
        aria-hidden
        className="
          pointer-events-none absolute inset-0
          bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_1px)]
          bg-[length:24px_24px]
        "
      />
      {/* 은은한 상단 라이트 (비네팅 느낌) */}
      <div
        aria-hidden
        className="
          pointer-events-none absolute inset-0
          bg-[radial-gradient(80%_50%_at_50%_10%,rgba(255,255,255,0.08),transparent_60%)]
        "
      />

      {/* 콘텐츠 */}
      <div className="relative w-full max-w-6xl mx-auto px-6 md:px-12 lg:px-16 py-20 md:py-32">
        {/* 타이틀 */}
        {/* <div className="text-center mb-16 md:mb-20">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
            더 나은 구조를 고민하는 개발자
          </h1>
        </div> */}

        {/* <div className="text-left mb-16 md:mb-20">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
            ABOUT ME
          </h1>
        </div> */}
        <h2 className="text-4xl font-extrabold text-white relative inline-block mb-10">
          ABOUT ME
          <span className="absolute bottom-[-6px] left-0 w-2/3 h-[3px] bg-blue-500 rounded"></span>
        </h2>

        {/* 프로필 섹션 */}
        <div className="flex flex-col md:flex-row items-center md:items-end gap-12 md:gap-16 lg:gap-30">
          {/* 사진 */}
          <div className="flex-shrink-0">
            <div className="w-64 h-80 md:w-72 md:h-96 lg:w-80 lg:h-[28rem] rounded-2xl overflow-hidden border-2 border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.5)] hover:scale-105 transition-transform duration-300">
              <img
                src="/images/profile.png"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* 정보 */}
          <div className="flex-1 max-w-xl">
            <div className="mb-10 md:mb-14">
              <div className="flex items-baseline gap-3 mb-4">
                <h2 className="text-4xl md:text-5xl font-bold">장해룡</h2>
                <p className="text-white/60 text-xl md:text-2xl italic">
                  Jang HaeRyong
                </p>
              </div>
              <span className="inline-block bg-gradient-to-r from-blue-600 to-blue-500 text-white text-base md:text-lg font-semibold px-6 py-1.5 rounded-lg shadow-lg">
                Mobile Developer
              </span>
            </div>

            <div className="space-y-4 text-lg md:text-1xl">
              <div className="flex items-center gap-3 text-white/90">
                <Calendar className="shrink-0" />
                <span>1988.06.21</span>
              </div>
              <div className="flex items-center gap-3 text-white/90">
                <MapPin className="shrink-0 " />
                <span>인천 광역시</span>
              </div>
              <a
                href="mailto:jhr7124@gmail.com"
                className="flex items-center gap-3 text-white/90 hover:text-blue-300 transition group"
              >
                <Mail className="shrink-0" />
                <span className="group-hover:underline">jhr7124@gmail.com</span>
              </a>
              <div className="flex items-center gap-3 text-white/90">
                <Phone className="shrink-0" />
                <span>010-8767-7124</span>
              </div>
              <a
                href="https://github.com/janghaeryong"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/90 hover:text-blue-300 transition group"
              >
                <Github className="shrink-0" />
                <span className="group-hover:underline">
                  github.com/janghaeryong
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
