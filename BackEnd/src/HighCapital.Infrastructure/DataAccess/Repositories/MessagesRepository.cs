
using HighCapital.Domain.Entities;
using HighCapital.Domain.Repositories.Messages;
using Microsoft.EntityFrameworkCore;

namespace HighCapital.Infrastructure.DataAccess.Repositories;

internal class MessagesRepository : IMessagesRepository
{
    private readonly HighCapitalDbContext _dbContext;

    public MessagesRepository(HighCapitalDbContext dbContext) { 
    
        _dbContext = dbContext;
    }

    public async Task Add(Message message)
    {
        await _dbContext.messages.AddAsync(message);
    }

    public async Task<List<Message>> GetAllByBotIdAsync(long botId)
    {
        
        return await _dbContext
            .messages
            .Where(m => m.BotId == botId)
            .OrderBy(m => m.SentAt) 
            .ToListAsync();
    }

    
}
