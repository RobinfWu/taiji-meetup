import type {
  D1Database,
  EventContext,
  Response as WorkerResponse,
} from "@cloudflare/workers-types";

export interface Env {
  DB: D1Database;
  ADMIN_API_TOKEN?: string;
}

export type AppEventContext<
  P extends string = string,
  Data extends Record<string, unknown> = Record<string, unknown>,
> = EventContext<Env, P, Data>;

export type AppPagesFunction<
  P extends string = string,
  Data extends Record<string, unknown> = Record<string, unknown>,
> = (
  context: AppEventContext<P, Data>
) => Response | WorkerResponse | Promise<Response | WorkerResponse>;

export function getDb(context: { env: Env }): D1Database {
  if (!context.env?.DB) {
    throw new Error("D1 database binding 'DB' is not configured.");
  }
  return context.env.DB;
}
