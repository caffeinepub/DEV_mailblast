import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useActor } from "@caffeineai/core-infrastructure";
import { createActor } from "../backend";
import type { SubscriberView } from "../types";

function useBackendActor() {
  return useActor(createActor);
}

export function useSubscribers() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<SubscriberView[]>({
    queryKey: ["subscribers"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listSubscribers();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddSubscriber() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ name, email }: { name: string; email: string }) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.addSubscriber(name, email);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscribers"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}

export function useToggleSubscriberStatus() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.toggleSubscriberStatus(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscribers"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}

export function useBulkImportSubscribers() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (entries: Array<[string, string]>) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.bulkImportSubscribers(entries);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscribers"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}
