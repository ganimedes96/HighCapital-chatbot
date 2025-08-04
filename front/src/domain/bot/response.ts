import type { IResponseBotsJson } from "./types";

const BASE_URL = 'https://localhost:7185/api/Bot';

export async function getAllBots(): Promise<IResponseBotsJson> {
  const response = await fetch(BASE_URL);

  if (response.status === 204) {
    return { bot: [] };
  }

  if (!response.ok) {
    throw new Error('Erro ao buscar os bots.');
  }

  return response.json();
}