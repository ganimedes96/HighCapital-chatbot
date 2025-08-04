import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import { useCreateMessage, useMessages } from "../../domain/message/queries";
import type {
  IMessage,
  IRequestCreateMessageJson,
} from "../../domain/message/types";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import { ScrollArea } from "../../components/ui/scroll-area";
import { ControlledInput } from "../../components/form/controllers/controlled-input";
import { Button } from "../../components/ui/button";

const formSchema = z.object({
  content: z.string().min(1, "A mensagem não pode ser vazia."),
});

type FormValues = z.infer<typeof formSchema>;

export default function Chatbot() {
  const { botId } = useParams<{ botId: string }>();
  const id = Number(botId);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data, isLoading: isLoadingMessages, isError } = useMessages(id);
  const { mutate: sendMessage, isPending: isSendingMessage } =
    useCreateMessage(id);

  const { control, reset, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  const handleSendMessage = async (formData: FormValues) => {
    const requestData: IRequestCreateMessageJson = {
      botId: id,
      content: formData.content,
    };
    sendMessage(requestData);
    reset();
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [data]);

  const messages = data?.messages || [];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      <Card className="w-full max-w-2xl h-[calc(100vh-4rem)] my-8 flex flex-col">
        <CardHeader className="border-b">
          <h1 className="text-xl font-bold">Conversa com o Bot {botId}</h1>
        </CardHeader>
        <CardContent className="flex-1 p-4 flex flex-col overflow-hidden">
          <ScrollArea className="flex-1 pr-4" ref={scrollRef}>
            {isLoadingMessages ? (
              <div className="flex justify-center items-center h-full">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
              </div>
            ) : isError ? (
              <div className="text-center text-red-500">
                Erro ao carregar a conversa.
              </div>
            ) : messages.length === 0 ? (
              <div className="text-center text-gray-500">
                Comece a conversa!
              </div>
            ) : (
              messages.map((message: IMessage, index: number) => (
                <div
                  key={index}
                  className={`flex mb-4 ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%] p-3 rounded-lg text-sm ${
                      message.sender === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))
            )}
          </ScrollArea>
        </CardContent>
        <div className="p-4 border-t">
          <form
            onSubmit={handleSubmit(handleSendMessage)}
            className="w-full flex items-end justify-between gap-4"
          >
            {/* Remova a classe 'w-80' do ControlledInput */}
            {/* A classe 'flex-1' fará com que o input ocupe todo o espaço restante */}
            <div className="flex-1">
              <ControlledInput
                control={control}
                label="Mensagem"
                name="content"
                placeholder="Digite sua mensagem..."
                disabled={isSendingMessage}
              />
            </div>

            <Button type="submit" disabled={isSendingMessage}>
              {isSendingMessage ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Enviar"
              )}
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
