
using HighCapital.Domain.Services;
using Microsoft.Extensions.Options;
using OpenAI.Chat;

namespace HighCapital.Infrastructure;

public class AIService : IAIService
{
    private readonly ChatClient _client;

    public AIService(IOptions<OpenAISettings> settings)
    {
       
        _client = new ChatClient("gpt-4o", settings.Value.OPENAI_API_KEY);
    }

    public async Task<string> GetChatResponseAsync(string prompt)
    {
        
        ChatCompletion completion = await _client.CompleteChatAsync(prompt);
        return completion.Content?[0]?.Text ?? "Desculpe, não consegui gerar uma resposta.";
    }
}