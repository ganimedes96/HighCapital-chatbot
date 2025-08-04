
using HighCapital.Communication.Requests;

namespace HighCapital.Communication.Responses;

public class ResponseSendMessageJson
{
    public List<ResponseShortMessageJson> Message { get; set; } = new List<ResponseShortMessageJson>();
}
