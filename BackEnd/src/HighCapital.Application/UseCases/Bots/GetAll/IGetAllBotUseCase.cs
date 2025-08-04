using HighCapital.Communication.Responses;

namespace HighCapital.Application.UseCases.Bots.GetAll;
public interface IGetAllBotUseCase
{
    Task<ResponseBotsJson> Exexute();

}
