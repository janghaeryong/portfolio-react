import { z } from 'zod';

export const ProjectRow = z.object({
  id: z.string(),
  project_title: z.string(),
  project_description: z.string(),
  project_contributionRole: z.array(z.string()),
  project_s_date: z.string(), // yyyy-MM-dd
  project_e_date: z.string().nullable(), // null or yyyy-MM-dd
  project_year: z.array(z.number()), // 프로젝트 진행 연도
  project_skills: z.array(z.string()),
  project_images: z.array(z.string()),
});
export const ProjectTable = z.array(ProjectRow);
export type ProjectRowT = z.infer<typeof ProjectRow>;
