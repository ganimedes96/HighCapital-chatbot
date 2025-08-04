
using HighCapital.Domain.Repositories;

namespace HighCapital.Infrastructure.DataAccess;

internal class UnitOfWork : IUnitOfWork
{
    private readonly HighCapitalDbContext _dbContext;

    public UnitOfWork(HighCapitalDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task Commit() => await _dbContext.SaveChangesAsync();
}

