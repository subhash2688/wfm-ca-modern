import "server-only";
import { createCallerFactory, createTRPCContext } from "./init";
import { appRouter } from "./routers";

const createCaller = createCallerFactory(appRouter);

export async function serverTRPC() {
  const context = await createTRPCContext();
  return createCaller(context);
}
