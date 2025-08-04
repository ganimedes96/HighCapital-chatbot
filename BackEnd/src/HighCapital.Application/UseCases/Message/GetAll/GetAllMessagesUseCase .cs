
using AutoMapper;
using HighCapital.Communication.Responses;
using HighCapital.Domain.Repositories.Messages;

namespace HighCapital.Application.UseCases.Message.GetAll;

public class GetAllMessagesUseCase : IGetAllMessagesUseCase
{
    private readonly IMessagesRepository _messagesRepository;
    private readonly IMapper _mapper;

    public GetAllMessagesUseCase(IMessagesRepository messagesRepository, IMapper mapper)
    {
        _messagesRepository = messagesRepository;
        _mapper = mapper;
    }

    public async Task<ResponseMessagesJson> Execute(long botId)
    {
        var messages = await _messagesRepository.GetAllByBotIdAsync(botId);

        if (messages.Count == 0)
        {
            return new ResponseMessagesJson { Message = new List<ResponseShortMessageJson>() };
        }

        var messagesResponse = _mapper.Map<List<ResponseShortMessageJson>>(messages);

        return new ResponseMessagesJson { Message = messagesResponse };
    }
}