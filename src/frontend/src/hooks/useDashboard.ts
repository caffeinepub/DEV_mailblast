import { useQuery } from "@tanstack/react-query";
import { useActor } from "@caffeineai/core-infrastructure";
import { createActor } from "../backend";
import type { DashboardStats } from "../types";

export function useDashboardStats() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<DashboardStats>({
    queryKey: ["dashboard"],
    queryFn: async () => {
      if (!actor) {
        return {
          activeSubscribers: 0n,
          totalCampaignsSent: 0n,
          totalSubscribers: 0n,
          lastCampaign: undefined,
        };
      }
      return actor.getDashboardStats();
    },
    enabled: !!actor && !isFetching,
  });
}
