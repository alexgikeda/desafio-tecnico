using Microsoft.AspNetCore.Mvc;
using OperadoraServiceAPI.DTOs;
using OperadoraServiceAPI.Services;

namespace OperadoraServiceAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OperadoraController : ControllerBase
    {
        private readonly IOperadoraService _operadoraService;

        public OperadoraController(IOperadoraService operadoraService)
        {
            _operadoraService = operadoraService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll() => Ok(await _operadoraService.ListarTodasOperadorasAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id) => Ok(await _operadoraService.ListarOperadoraPorIdAsync(id));

        [HttpGet("nome/{nome}")]
        public async Task<IActionResult> GetByNome(string nome) => Ok(await _operadoraService.ListarOperadoraPorNomeAsync(nome));

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] OperadoraDto dto) => Ok(await _operadoraService.AdicionarOperadoraAsync(dto));

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] OperadoraDto dto) => Ok(await _operadoraService.AlterarOperadoraAsync(id, dto));

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id) => Ok(await _operadoraService.ExcluirOperadoraAsync(id));
    }
}
