import { useState } from 'react';
import ProjectMarquee from '@/features/projects/ProjectMarquee';
import { Modal } from '~/core/ui/overlay';
import ProjectsModalContent from '../../features/projects/ProjectsModalContent';

import { useProjectsQuery } from '@features/projects/presentation/hooks/useProjectsQuery';

export default function ProjectsSection() {
  const { data, isLoading, error } = useProjectsQuery();
  const [isModalOpen, setModalOpen] = useState(false);

  if (isLoading) return <section>로딩 중...</section>;
  if (error) return <section>데이터를 불러오지 못했습니다.</section>;
  return (
    <>
      <section id="projects" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Projects</h2>
          <ul className="grid gap-6 md:grid-cols-2">
            {data?.map((p) => (
              <li key={p.id} className="rounded-xl border border-white/10 p-4">
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="text-lg font-semibold">{p.title}</h3>
                  <span className="text-sm text-gray-400">
                    {p.period.startDate} ~ {p.period.endDate ?? '진행중'}
                  </span>
                </div>
                <p className="opacity-80 mb-3">{p.description}</p>
                <p className="text-sm mb-2">역할: {p.contributionRole}</p>
                <div className="flex flex-wrap gap-2">
                  {p.skills.map((s) => (
                    <span key={s} className="text-xs px-2 py-1 border rounded">
                      {s}
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* 🎬 프로젝트 마퀴 영역 */}
        {data && <ProjectMarquee projects={data} speedMs={26000} />}
      </section>
    </>
  );
}

{
  /* <div>
          <button onClick={() => setModalOpen(true)}>모달 열기</button>
        </div>

        <Modal open={isModalOpen} onClose={() => setModalOpen(false)}>
          <ProjectsModalContent />
        </Modal> */
}
