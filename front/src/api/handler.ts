import { toast } from "sonner";
import type { QueryClient } from "@tanstack/react-query";
import type { ResponseServerAction } from "./types";
import { QueryKeys } from "../lib/tanstack-query/keys";

// Altere a importação para usar o useNavigate do React Router
import { useNavigate } from "react-router-dom";

export const handleServerActionResponse = async <T = undefined>(
  client: QueryClient,
  response: ResponseServerAction<T>,
  queryKeys?: (keyof typeof QueryKeys)[],
  // Mude o tipo do parâmetro para ReturnType<typeof useNavigate>
  router?: ReturnType<typeof useNavigate>,
  redirectUrl?: string
) => {
  if (response.status === 'empty') {
    return;
  }

  if (response.status === 'error') {
    if (response.message.includes("Limite")) {
      toast.error(response.message, {
        action: {
          label: "Upgrade",
          onClick: () => {
            if (router) {
              // O useNavigate tem uma sintaxe de chamada mais direta
              router("/upgrade");
            }
          },
        },
      });
      return;
    }
    toast.error(response.message);
  }
  if (response.status === 'success') {
    toast.success(response.message);
    if (queryKeys) {
      await Promise.all(
        queryKeys.map((key) =>
          client.invalidateQueries({
            queryKey: [QueryKeys[key]],
          })
        )
      );
    }
    if (router && redirectUrl) {
      // O useNavigate também é usado para navegação direta aqui
      router(redirectUrl);
    }
  }
};