namespace HighCapital.Domain.Repositories;

public interface IUnitOfWork
{

    Task Commit();
}
