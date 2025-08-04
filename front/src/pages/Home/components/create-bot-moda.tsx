import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { ControlledInput } from "../../../components/form/controllers/controlled-input";
import { ControlledTextarea } from "../../../components/form/controllers/controlled-text-area";
import { useCreateBot } from "../../../domain/bot/queries";

interface CreateBotModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const formSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatório"),
});

type FormValues = z.infer<typeof formSchema>;

export function CreateBotModal({ isOpen, setIsOpen }: CreateBotModalProps) {
  const { control, reset, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const { mutate, isPending } = useCreateBot();

  const handleCreateBot = async (data: FormValues) => {
    console.log(data);

    mutate(data, {
      onSuccess: () => {
        setIsOpen(false);
        reset(); // Reset o formulário no sucesso
      },
      onError: (error) => {
        console.error("Erro ao criar bot:", error);
      },
    });
  };


  return (
    <Dialog open={isOpen}>
      {" "}
      /
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Criar Novo Chatbot</DialogTitle>
          <DialogDescription>
            Configure seu chatbot personalizado definindo seu nome e contexto
            inicial.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleCreateBot)}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <ControlledInput
                control={control}
                name="name"
                label="Nome"
                type="text"
                placeholder="Ex: Chatbot de vendas"
              />
            </div>
            <div className="grid gap-2">
              <ControlledTextarea
                control={control}
                name="description"
                label="Contexto inicial"
                placeholder="Ex: Olá, como posso ajudar hoje?"
                limit={100}
              />
              <p className="text-sm text-gray-500">
                Este contexto será usado em todas as interações com o bot.
              </p>
            </div>
          </div>
          <DialogFooter>
           <Button
              type="button"
              variant="default"
              onClick={() => {
                setIsOpen(false);
                reset(); // Reset o formulário ao fechar/cancelar
              }}
            >
              Cancelar
            </Button>
           <Button
              type="submit"
              variant={"default"}
              disabled={isPending}
            >
              {isPending ? "Criando..." : "Criar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
