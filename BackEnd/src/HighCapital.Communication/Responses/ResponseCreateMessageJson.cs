
namespace HighCapital.Communication.Responses;

public class ResponseCreateMessageJson
{
    public long Id { get; set; }

    
    public string Content { get; set; } = string.Empty;

    
    public string Sender { get; set; } = string.Empty;

    
    public DateTime SentAt { get; set; }
}
