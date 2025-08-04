
using HighCapital.Application.AutoMapper;
using HighCapital.Application.UseCases.Bot.CreateBot;
using HighCapital.Application.UseCases.Bots.GetAll;
using Microsoft.Extensions.DependencyInjection;

namespace HighCapital.Application;

public static class DependencyInjectionExtension
{

    public static void AddApplication(this IServiceCollection services) {

        AddAutoMapper(services);
        AddUseCases(services);
    }


    private static void AddAutoMapper(IServiceCollection services)
    {
        services.AddAutoMapper(cfg =>
    {
        cfg.AddProfile<AutoMapping>();
    });
    }


    private static void AddUseCases(IServiceCollection services) {

        services.AddScoped<ICreateBotUseCase, CreateBotUseCase>();
        services.AddScoped<IGetAllBotUseCase, GetAllBotUseCase>();
    }

}
