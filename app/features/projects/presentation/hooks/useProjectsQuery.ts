import { useQuery } from '@tanstack/react-query';
import { GetProjectsUseCase } from '@features/projects/domain/usecase/get_projects';
import { LocalProjectRepository } from '@features/projects/data/repository/local_project_repository';

const repo = new LocalProjectRepository();
const getProjects = new GetProjectsUseCase(repo);

export function useProjectsQuery() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: () => getProjects.execute(), // ← use case 호출
  });
}
