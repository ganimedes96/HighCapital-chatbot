
namespace HighCapital.Communication.Requests;

public class RequestCreateMessageJson
{
    public long BotId { get; set; }
    public string Content { get; set; } = string.Empty;
}
