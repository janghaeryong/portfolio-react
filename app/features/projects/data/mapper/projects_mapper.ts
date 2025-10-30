import type { ProjectEntity } from '@features/projects/domain/entities/project_entity';

import type { ProjectRowT } from '@features/projects/data/schemas';

export function toDomain(row: ProjectRowT): ProjectEntity {
  return {
    id: row.id,
    title: row.project_title,
    description: row.project_description,
    contributionRole: row.project_contributionRole,
    period: {
      startDate: row.project_s_date,
      endDate: row.project_e_date ?? undefined,
    },
    skills: row.project_skills,
    images: row.project_images,
  };
}
