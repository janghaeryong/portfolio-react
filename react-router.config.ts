import type { Config } from "@react-router/dev/config";

export default {
  // Config options...
  // GitHub Pages는 정적 호스팅만 지원하므로 SPA 모드 사용
  ssr: false,
} satisfies Config;
