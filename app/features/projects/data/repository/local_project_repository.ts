import raw from '@features/projects/data/fixtures/projects.json';
import { toDomain } from '@features/projects/data/mapper/projects_mapper';
import type { ProjectEntity } from '@features/projects/domain/entities/project_entity';
import type { ProjectRepository } from '@features/projects/domain/repository/project_repository';
import { ProjectTable } from '@features/projects/data/schemas';

/**
 * LocalProjectRepository
 * - 임시 JSON 데이터를 기반으로 ProjectRepository 인터페이스 구현
 * - Zod 스키마로 데이터 검증 후, DTO → Domain 매핑
 */
export class LocalProjectRepository implements ProjectRepository {
  async list(): Promise<ProjectEntity[]> {
    try {
      // ✅ Zod 스키마 검증 (parse는 개발용, 운영은 safeParse 권장)
      const result = ProjectTable.safeParse(raw);
      if (!result.success) {
        console.error('Invalid project data:', result.error.flatten());
        return [];
      }

      // ✅ DTO → Domain 매핑
      return result.data.map(toDomain);
    } catch (err) {
      console.error('LocalProjectRepository.list error:', err);
      return [];
    }
  }
}
