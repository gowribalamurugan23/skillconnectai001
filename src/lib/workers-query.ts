import { queryOptions } from '@tanstack/react-query';
import { listWorkers } from './workers.functions';
export const workersQuery = queryOptions({queryKey:['workers'],queryFn:()=>listWorkers(),staleTime:30000});