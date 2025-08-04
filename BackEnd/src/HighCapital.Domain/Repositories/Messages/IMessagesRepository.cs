using HighCapital.Domain.Entities;

namespace HighCapital.Domain.Repositories.Messages;
public interface IMessagesRepository
{
    Task Add(Message message);
    Task<List<Message>> GetAllByBotIdAsync(long botId);

}
