using HighCapital.Application.UseCases.Bot.CreateBot;
using HighCapital.Application.UseCases.Bots.GetAll;
using HighCapital.Communication.Requests;
using HighCapital.Communication.Responses;
using Microsoft.AspNetCore.Mvc;

namespace HighCapital.API.Controllers;
[Route("api/[controller]")]
[ApiController]
public class BotController : ControllerBase
{
    [HttpPost]
    [ProducesResponseType(typeof(ResponseCreateBotJson), StatusCodes.Status201Created)]
    [ProducesResponseType(typeof(ResponseErrorJson), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Create(
        [FromServices]  ICreateBotUseCase useCase,
        [FromBody] RequestCreateBotJson request) {
          
          var response = await useCase.Execute(request);
          return Created(string.Empty, response);

    }


    [HttpGet]
    [ProducesResponseType(typeof(ResponseBotsJson), StatusCodes.Status200OK )]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<IActionResult> GetAllBots(
       [FromServices] IGetAllBotUseCase useCase)
    {

        var response = await useCase.Exexute();
        if (response.Bot.Count != 0)
            return Ok(response);

        return NoContent();

    }

}
