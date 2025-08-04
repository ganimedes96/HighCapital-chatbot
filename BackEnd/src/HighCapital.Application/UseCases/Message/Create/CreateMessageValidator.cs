
using FluentValidation;
using HighCapital.Communication.Requests;

namespace HighCapital.Application.UseCases.Message.Create;

public class CreateMessageValidator : AbstractValidator<RequestCreateMessageJson>
{
    public CreateMessageValidator()
    {
        RuleFor(request => request.BotId).NotEmpty().WithMessage("The bot id is required.");
        RuleFor(request => request.Content).NotEmpty().WithMessage("The message content is required.");
    }

}
