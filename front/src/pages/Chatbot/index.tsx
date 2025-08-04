import { useParams } from 'react-router-dom';

export default function Chatbot() {
  const { botId } = useParams(); // Pega o ID do bot da URL

  return (
    <div>
      <h1>Conversa com o Bot {botId}</h1>
      <p>Esta é a interface de chat. O ID do bot é: {botId}</p>
      {/* Aqui irá a interface de chat, com campo de mensagem, histórico, etc. */}
    </div>
  );
}