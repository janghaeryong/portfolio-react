// app/routes/_404.tsx
import { Link } from 'react-router-dom';

export function meta() {
  return [{ title: '404 | Page Not Found' }];
}

export default function NotFoundPage() {
  return (
    <main style={{ padding: 24 }}>
      <h1>404 - 페이지를 찾을 수 없어요.</h1>
      <p>
        <Link to="/">홈으로 돌아가기</Link>
      </p>
    </main>
  );
}
