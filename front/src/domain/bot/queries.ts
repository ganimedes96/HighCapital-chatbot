import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllBots } from "./response";
import type { IRequestCreateBotJson } from "./types";
import { createBot } from "./request";

import { QueryKeys } from "../../lib/tanstack-query/keys";

export const useListBots = () => {
  return useQuery({
     queryKey: [QueryKeys.bots],
    queryFn: () => getAllBots(),
  });
};

export const useCreateBot = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: IRequestCreateBotJson) => await createBot(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QueryKeys.bots],
      });
    },
  });
};