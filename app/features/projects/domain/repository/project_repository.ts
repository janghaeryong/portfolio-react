import type { ProjectEntity } from '@features/projects/domain/entities/project_entity';

export interface ProjectRepository {
  list(): Promise<ProjectEntity[]>;
}
