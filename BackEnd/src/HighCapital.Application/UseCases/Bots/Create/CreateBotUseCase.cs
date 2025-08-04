
using AutoMapper;
using HighCapital.Application.UseCases.Bot.CreateBot;
using HighCapital.Communication.Requests;
using HighCapital.Communication.Responses;
using HighCapital.Domain.Entities;
using HighCapital.Domain.Repositories;
using HighCapital.Domain.Repositories.Bots;
using HighCapital.Exception.ExceptionBase;



public class CreateBotUseCase : ICreateBotUseCase
{
    private readonly IBotsRepository _repository;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public CreateBotUseCase(IBotsRepository repository, IUnitOfWork unitOfWork, IMapper mapper)
    {
        _mapper = mapper;
        _repository = repository;
        _unitOfWork = unitOfWork;
    }

    public async Task<ResponseCreateBotJson> Execute(RequestCreateBotJson request)
    {
        validate(request);

        var entity = _mapper.Map<Bot>(request);

        await _repository.Add(entity);

        await _unitOfWork.Commit();

        return _mapper.Map<ResponseCreateBotJson>(entity);
    }

    private void validate(RequestCreateBotJson request)
    {
        var validator = new CreateBotValidator();

        var result = validator.Validate(request);

        if (result.IsValid == false)
        {
            var errorMessages = result.Errors.Select(f => f.ErrorMessage).ToList();

            throw new ErrorOnValidationException(errorMessages);
        }

    }

};