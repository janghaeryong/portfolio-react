// app/routes/_404.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function meta() {
  return [{ title: '404 | Page Not Found' }];
}

export default function NotFoundPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate('/'), 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-black">
      <h1 className="text-4xl font-bold mb-4">
        404 - 페이지를 찾을 수 없습니다.
      </h1>
      <p>잠시 후 메인으로 이동합니다...</p>
    </div>
  );
}
