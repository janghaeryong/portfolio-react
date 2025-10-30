export type ProjectId = string;

export interface ProjectPeriod {
  startDate: string; // ISO yyyy-MM-dd
  endDate?: string; // 진행중이면 undefined
}

export interface ProjectEntity {
  id: ProjectId;
  title: string;
  description: string;
  contributionRole: string; // 나의 역할
  period: ProjectPeriod;
  skills: string[];
  images: string[]; // URL 목록
}
