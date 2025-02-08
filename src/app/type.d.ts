import { inferRouterOutputs } from '@trpc/server';
import { AppRouter } from '~/server/api/root';

type RouterOutputs = inferRouterOutputs<AppRouter>;

export type Post = RouterOutputs['post']['get'][number];
