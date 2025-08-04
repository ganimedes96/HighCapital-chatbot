import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { IMessage, IRequestCreateMessageJson, IResponseMessagesJson } from "./types";
import { getMessages } from "./response";
import { QueryKeys } from "../../lib/tanstack-query/keys";
import { sendMessage } from "./request";


export const useMessages = (botId: number) => {
  return useQuery<IResponseMessagesJson>({
    queryKey: [QueryKeys.messages, botId],
    queryFn: () => getMessages(botId),
    enabled: !!botId,
  });
};


export const useCreateMessage = (botId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: IRequestCreateMessageJson) => await sendMessage(data),

  
    onMutate: async (variables: IRequestCreateMessageJson) => {
      await queryClient.cancelQueries({ queryKey: [QueryKeys.messages, botId] });

      const previousMessages = queryClient.getQueryData<IResponseMessagesJson>([QueryKeys.messages, botId]);

      const userOptimisticMessage: IMessage = {
        id: -1, 
        botId: variables.botId,
        content: variables.content,
        sender: "user",
        sentAt: new Date().toISOString(),
      };

      queryClient.setQueryData<IResponseMessagesJson>([QueryKeys.messages, botId], (oldData) => {
        const oldMessages = oldData?.messages || [];
        return { messages: [...oldMessages, userOptimisticMessage] };
      });

      return { previousMessages };
    },

     onSuccess: (botResponse) => {
      queryClient.setQueryData<IResponseMessagesJson>([QueryKeys.messages, botId], (oldData) => {
        const oldMessages = oldData?.messages || [];

        
        const updatedMessages = oldMessages.filter((msg) => msg.id !== -1);
        
        return {
          messages: [...updatedMessages, botResponse]
        };
      });
    },

    onError: (error, variables, context) => {
      if (context?.previousMessages) {
        queryClient.setQueryData([QueryKeys.messages, botId], context.previousMessages);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.messages, botId] });
    },
  });
};