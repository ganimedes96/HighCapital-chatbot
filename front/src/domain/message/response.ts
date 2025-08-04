import type { IResponseMessagesJson } from "./types";

const BASE_URL = 'https://localhost:7185/api/Message';

export async function getMessages(botId: number): Promise<IResponseMessagesJson> {
  const response = await fetch(`${BASE_URL}/${botId}`);

  if (response.status === 204) {
    return { messages: [] };
  }

  if (!response.ok) {
    throw new Error('Erro ao buscar histórico de mensagens.');
  }

  return response.json();
}