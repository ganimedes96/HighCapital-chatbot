
using AutoMapper;
using HighCapital.Communication.Responses;
using HighCapital.Domain.Repositories.Bots;

namespace HighCapital.Application.UseCases.Bots.GetAll;

public class GetAllBotUseCase : IGetAllBotUseCase
{

    private readonly IBotsRepository _repository;
    private readonly IMapper _mapper;

    public GetAllBotUseCase(IBotsRepository repository, IMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
    }


    public async Task<ResponseBotsJson> Exexute()
    {
        var result = await _repository.GetAll();

        return new ResponseBotsJson
        {
            Bot = _mapper.Map<List<ResponseShortBotJson>>(result)
        };
    }
}
;