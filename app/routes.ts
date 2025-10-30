import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  route('/', 'routes/_app.tsx', [index('routes/_index.tsx')]),
  route('*', 'routes/_404.tsx'),
] satisfies RouteConfig;
