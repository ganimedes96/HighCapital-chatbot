
using HighCapital.Domain.Repositories;
using HighCapital.Domain.Repositories.Bots;
using HighCapital.Domain.Repositories.Messages;
using HighCapital.Infrastructure.DataAccess;
using HighCapital.Infrastructure.DataAccess.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace HighCapital.Infrastructure;

public static class DependencyInjectionExtension
{

    public  static void AddInfrastructure(this IServiceCollection services, IConfiguration configuration) {

        AddDbContext(services, configuration);
        AddRepositories(services);
    }


    private static void AddRepositories(IServiceCollection services) {

        services.AddScoped<IUnitOfWork , UnitOfWork>();
        services.AddScoped<IBotsRepository, BotsRepository>();
        services.AddScoped<IMessagesRepository, MessagesRepository>();

    }

    private static void AddDbContext(IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("connection");

        var version = new Version(8, 0);
        var serverVersion = new MySqlServerVersion(version);
        services.AddDbContext<HighCapitalDbContext>(config => config.UseMySql(connectionString, serverVersion));

    }
}
