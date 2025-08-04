
namespace HighCapital.Domain.Entities;

public class Message
{
    
    public long Id { get; set; }

    public long BotId { get; set; }

   
    public Bot Bot { get; set; }

    
    public string Content { get; set; } = string.Empty;

    
    public string Sender { get; set; } = string.Empty;


    public DateTime SentAt { get; set; }
}
