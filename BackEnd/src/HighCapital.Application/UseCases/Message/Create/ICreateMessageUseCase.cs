using HighCapital.Communication.Requests;
using HighCapital.Communication.Responses;


namespace HighCapital.Application.UseCases.Message.Create;
public interface ICreateMessageUseCase
{

    Task<ResponseSendMessageJson> Execute(RequestCreateMessageJson request); 
 
}
