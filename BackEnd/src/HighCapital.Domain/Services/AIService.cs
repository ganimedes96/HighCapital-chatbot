
namespace HighCapital.Domain.Services;

public interface IAIService
{
    Task<string> GetChatResponseAsync(string prompt);
}