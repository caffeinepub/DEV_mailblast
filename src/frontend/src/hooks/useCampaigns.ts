import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useActor } from "@caffeineai/core-infrastructure";
import { createActor } from "../backend";
import type { CampaignView } from "../types";

function useBackendActor() {
  return useActor(createActor);
}

export function useCampaigns() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<CampaignView[]>({
    queryKey: ["campaigns"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listCampaigns();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateCampaign() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      name,
      subject,
      senderName,
      body,
    }: {
      name: string;
      subject: string;
      senderName: string;
      body: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.createCampaign(name, subject, senderName, body);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}

export function useSendCampaign() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.sendCampaign(id);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}
