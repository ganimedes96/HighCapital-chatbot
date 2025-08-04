using HighCapital.Domain.Entities;

namespace HighCapital.Domain.Repositories.Bots;
public interface IBotsRepository
{
    Task Add(Bot bot);
    Task<List<Bot>> GetAll();

}


