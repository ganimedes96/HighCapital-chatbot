
using HighCapital.Domain.Entities;
using HighCapital.Domain.Repositories.Bots;
using Microsoft.EntityFrameworkCore;

namespace HighCapital.Infrastructure.DataAccess.Repositories;
internal class BotsRepository : IBotsRepository
{
    private readonly HighCapitalDbContext _dbContext;
    public BotsRepository(HighCapitalDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task Add(Bot bot)
    {
        await _dbContext.bots.AddAsync(bot);
      
    }

    public async Task<List<Bot>> GetAll()
    {
        return await _dbContext.bots.AsNoTracking().ToListAsync();
    }
}
