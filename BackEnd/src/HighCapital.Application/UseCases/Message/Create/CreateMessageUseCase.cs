
using AutoMapper;
using HighCapital.Communication.Requests;
using HighCapital.Communication.Responses;
using HighCapital.Domain.Repositories;
using HighCapital.Domain.Repositories.Messages;
using HighCapital.Domain.Services;
using HighCapital.Exception.ExceptionBase;

namespace HighCapital.Application.UseCases.Message.Create;

class CreateMessageUseCase : ICreateMessageUseCase 
{
    private readonly IMessagesRepository _messagesRepository;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;
    private readonly IAIService _aiService;

    public CreateMessageUseCase(IMessagesRepository messagesRepository, IUnitOfWork unitOfWork, IMapper mapper, IAIService aiService)
    {
        _mapper = mapper;
        _messagesRepository = messagesRepository;
        _unitOfWork = unitOfWork;
        _aiService = aiService;
    }

    public async Task<ResponseSendMessageJson> Execute(RequestCreateMessageJson request)
    {
        validate(request);


        var userMessage = _mapper.Map<Domain.Entities.Message>(request);
        userMessage.Sender = "user";
        userMessage.SentAt = DateTime.UtcNow;

        await _messagesRepository.Add(userMessage);


        string botResponseContent = await _aiService.GetChatResponseAsync(request.Content);

        var botMessage = new Domain.Entities.Message
        {
            BotId = request.BotId,
            Content = botResponseContent,
            Sender = "bot",
            SentAt = DateTime.UtcNow
        };

        await _messagesRepository.Add(botMessage);


        await _unitOfWork.Commit();


        return _mapper.Map<ResponseSendMessageJson>(botMessage);
    }



    private void validate(RequestCreateMessageJson request)
    {
        var validator = new CreateMessageValidator();

        var result = validator.Validate(request);

        if (result.IsValid == false)
        {
            var errorMessages = result.Errors.Select(f => f.ErrorMessage).ToList();

            throw new ErrorOnValidationException(errorMessages);
        }
    }

   


}
