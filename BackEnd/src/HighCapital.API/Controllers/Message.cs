using HighCapital.Application.UseCases.Message.Create;
using HighCapital.Application.UseCases.Message.GetAll;
using HighCapital.Communication.Requests;
using HighCapital.Communication.Responses;
using Microsoft.AspNetCore.Mvc;

namespace HighCapital.API.Controllers;
[Route("api/[controller]")]
[ApiController]
public class Message : ControllerBase
{

    [HttpPost]
    [ProducesResponseType(typeof(ResponseMessagesJson), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ResponseErrorJson), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Create(
        [FromServices] ICreateMessageUseCase useCase,
        [FromBody] RequestCreateMessageJson request)
    {
        var response = await useCase.Execute(request);
        return Ok(response);
    }


    [HttpGet("{botId}")]
    [ProducesResponseType(typeof(ResponseMessagesJson), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<IActionResult> GetAll(
        [FromServices] IGetAllMessagesUseCase useCase,
        [FromRoute] long botId)
    {
        var response = await useCase.Execute(botId);

        if (response.Message.Count == 0)
        {
            return NoContent();
        }

        return Ok(response);
    }

}
