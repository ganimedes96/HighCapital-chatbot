
using FluentValidation;
using HighCapital.Communication.Requests;

namespace HighCapital.Application.UseCases.Bot.CreateBot;

public class CreateBotValidator : AbstractValidator<RequestCreateBotJson>
{

    public CreateBotValidator() 
    {
        RuleFor(bot => bot.Name).NotEmpty().WithMessage("The name is required.");
        RuleFor(bot => bot.Description).NotEmpty().WithMessage("The description is required.");
    }

}
