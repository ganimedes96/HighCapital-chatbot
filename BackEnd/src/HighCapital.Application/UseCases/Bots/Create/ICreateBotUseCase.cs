using HighCapital.Communication.Requests;
using HighCapital.Communication.Responses;

namespace HighCapital.Application.UseCases.Bot.CreateBot;
public interface ICreateBotUseCase
{
    Task<ResponseCreateBotJson> Execute(RequestCreateBotJson request);



}
