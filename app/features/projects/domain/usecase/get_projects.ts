import type { ProjectRepository } from '@features/projects/domain/repository/project_repository';
import type { ProjectEntity } from '@features/projects/domain/entities/project_entity';

/**
 * GetProjectsUseCase
 * - 모든 프로젝트 목록을 가져오는 도메인 유스케이스
 * - Repository 구현체(Local/Http)를 주입받아 실행
 */
export class GetProjectsUseCase {
  constructor(private repository: ProjectRepository) {}

  async execute(): Promise<ProjectEntity[]> {
    // 💡 여기에 비즈니스 로직이 들어갈 수 있음.
    // 예: 날짜 순 정렬, 필터링, 캐싱 등
    const projects = await this.repository.list();

    // 최근 프로젝트가 먼저 나오도록 정렬
    return projects.sort((a, b) =>
      (b.period.startDate ?? '').localeCompare(a.period.startDate ?? '')
    );
  }
}
