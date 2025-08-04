
using HighCapital.Communication.Responses;

namespace HighCapital.Application.UseCases.Message.GetAll;

public interface IGetAllMessagesUseCase
{
    Task<ResponseMessagesJson> Execute(long botId);
}
