
namespace HighCapital.Exception.ExceptionBase;

public  class ErrorOnValidationException : HighCapitalBotException
{
    public List<string> Errors { get; set; }     

    public ErrorOnValidationException(List<string> errorMessages) { 
        Errors = errorMessages;
    }
}
