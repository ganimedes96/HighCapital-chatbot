import type { ResponseServerAction } from "../../api/types";
import type { IRequestCreateBotJson, IResponseCreateBotJson } from "./types";


const BASE_URL = 'https://localhost:7185/api/Bot';

export async function createBot(request: IRequestCreateBotJson): Promise<ResponseServerAction<IResponseCreateBotJson>> {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    // Trate os erros, como o StatusCodes.Status400BadRequest
    const errorData = await response.json();
    return {
      status: 'error',
      message: errorData.message || 'Erro ao criar o bot.',
    };
  }

  const responseData: IResponseCreateBotJson = await response.json();
  
  // Mapeie a resposta do sucesso para o formato esperado
  return {
    status: 'success',
    message: 'Chatbot criado com sucesso!', // Defina uma mensagem de sucesso
    data: responseData,
  };
}