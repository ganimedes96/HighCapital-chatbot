
using AutoMapper;
using HighCapital.Communication.Requests;
using HighCapital.Communication.Responses;
using HighCapital.Domain.Entities;

namespace HighCapital.Application.AutoMapper;

internal class AutoMapping : Profile
{

    public AutoMapping()
    {
        RequestToEntity();
        EntityToResponse();
    }


    private void RequestToEntity()
    {

        CreateMap<RequestCreateBotJson, Bot>();
        CreateMap<RequestCreateMessageJson, Message>();

    }


    private void EntityToResponse()
    {
        CreateMap<Message, ResponseShortBotJson>();
        CreateMap<Message, ResponseCreateMessageJson>();
        CreateMap<Bot, ResponseCreateBotJson>();
        CreateMap<Bot, ResponseShortBotJson>();

        CreateMap<List<Message>, ResponseMessagesJson>()
           .ForMember(dest => dest.Message, opt => opt.MapFrom(src => src));

    }

}
