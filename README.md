# 🚀 장해룡 포트폴리오

더 나은 구조를 설계하는 모바일 개발자 장해룡의 포트폴리오 웹사이트입니다.

## ✨ 특징

- 🎨 **모던한 디자인** - Tailwind CSS v4를 활용한 세련된 UI/UX
- 📱 **반응형 레이아웃** - 모바일부터 데스크톱까지 완벽 대응
- ⚡ **빠른 성능** - React Router v7 기반의 SSR 지원
- 🎭 **인터랙티브** - Lucide React 아이콘과 부드러운 애니메이션
- 📝 **타입 안전** - TypeScript로 작성된 타입 세이프 코드
- 🎯 **섹션 구성**
  - About: 개발자 소개 및 연락처 정보
  - Skills: 기술 스택 및 역량
  - Projects: 주요 프로젝트 포트폴리오
  - Archiving: GitHub 등 아카이빙 링크

## 🛠️ 기술 스택

### Frontend
- **Framework**: React 19 + React Router v7
- **Language**: TypeScript 5.9
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Fonts**: Poppins (헤더), Pretendard (본문)

### Build Tools
- **Bundler**: Vite 7
- **Server**: @react-router/node
- **Dev Server**: @react-router/dev

## 🚀 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

개발 서버가 `http://localhost:5173`에서 실행됩니다.

### 프로덕션 빌드

```bash
npm run build
```

### 타입 체크

```bash
npm run typecheck
```

### 프로덕션 서버 실행

```bash
npm run start
```

## 📁 프로젝트 구조

```
portfolio-react/
├── app/
│   ├── features/           # 기능별 컴포넌트
│   │   ├── about/         # About 섹션
│   │   ├── skills/        # Skills 섹션
│   │   ├── projects/      # Projects 섹션
│   │   └── archiving/     # Archiving 섹션
│   ├── shared/            # 공유 컴포넌트
│   │   └── ui/            # UI 컴포넌트 (Header, Footer)
│   ├── components/        # 재사용 컴포넌트
│   ├── layouts/           # 레이아웃 컴포넌트
│   ├── routes/            # 라우트 페이지
│   ├── app.css           # 전역 스타일
│   └── root.tsx          # 루트 컴포넌트
├── public/               # 정적 파일
│   └── images/          # 이미지 리소스
└── package.json
```

## 🎨 커스터마이징

### 폰트 설정
- `app/app.css`에서 `@theme` 섹션을 수정하여 폰트 변경 가능
- 헤더는 Poppins, 본문은 Pretendard 사용

### 색상 테마
- Tailwind CSS v4의 테마 시스템 활용
- 다크모드 지원 준비됨

## 🐳 Docker 배포

```bash
# 이미지 빌드
docker build -t jhr-portfolio .

# 컨테이너 실행
docker run -p 3000:3000 jhr-portfolio
```

## 📞 연락처

- **Email**: jhr7124@gmail.com
- **Phone**: 010-8767-7124
- **GitHub**: [github.com/janghaeryong](https://github.com/janghaeryong)
- **Location**: 인천 광역시

---

© 2025 장해룡 (Jang HaeRyong). All rights reserved.
