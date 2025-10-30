import { useState } from 'react';
import { Modal } from '@/shared/ui/overlay';
import ProjectsModalContent from '../../features/projects/ProjectsModalContent';
export default function ProjectsSection() {
  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <>
      <section id="projects">
        <div>
          <button onClick={() => setModalOpen(true)}>모달 열기</button>
        </div>

        <Modal open={isModalOpen} onClose={() => setModalOpen(false)}>
          <ProjectsModalContent />
        </Modal>
      </section>
    </>
  );
}
