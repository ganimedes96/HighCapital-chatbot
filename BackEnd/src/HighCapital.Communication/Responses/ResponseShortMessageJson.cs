
namespace HighCapital.Communication.Responses;

public class ResponseShortMessageJson
{
   
    public long Id { get; set; }

   
    public string Content { get; set; } = string.Empty;

    
    public string Sender { get; set; } = string.Empty;

    
    public DateTime SentAt { get; set; }
}
