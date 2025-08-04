import type { IMessage, IRequestCreateMessageJson } from "./types";


const BASE_URL = 'https://localhost:7185/api/Message';


export async function sendMessage(request: IRequestCreateMessageJson): Promise<IMessage> {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error sending message.');
  }

  // The API response should be directly castable to IMessage
  return response.json() as Promise<IMessage>;
}
