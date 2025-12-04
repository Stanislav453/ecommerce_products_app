import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { shopRepository } from "./shopRepository";

type AnyFunction = (...args: unknown[]) => unknown;

export const createUseRepositoryQuery = <RepositoryRegistry>(
  repository: RepositoryRegistry
) =>
  <
    MethodName extends keyof RepositoryRegistry,
    Method extends RepositoryRegistry[MethodName] extends AnyFunction
      ? RepositoryRegistry[MethodName]
      : never,
    Data = Awaited<ReturnType<Method>>,
    Params = Parameters<Method>[0],
  >(
    methodName: MethodName,
    params: Params,
    queryOptions?: Omit<
      UseQueryOptions<Awaited<ReturnType<Method>>, Error, Data>,
      "queryKey" | "queryFn"
    >
  ) => {
    return useQuery({
      queryKey: [methodName, params],
      queryFn: async (): Promise<Awaited<ReturnType<Method>>> => {
        const method = repository[methodName];
        if (typeof method !== "function") {
          return await Promise.reject(
            new Error(`Method ${String(methodName)} is not a function`)
          );
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (method as any)(params) as Promise<Awaited<ReturnType<Method>>>;
      },
      ...queryOptions,
    });
  };

export const useRepositoryQuery = createUseRepositoryQuery<typeof shopRepository>(shopRepository);