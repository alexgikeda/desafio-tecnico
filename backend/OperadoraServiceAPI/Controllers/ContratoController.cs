using Microsoft.AspNetCore.Mvc;
using OperadoraServiceAPI.DTOs;
using OperadoraServiceAPI.Services;

namespace OperadoraServiceAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContratoController : ControllerBase
    {
        private readonly IContratoService _contratoService;

        public ContratoController(IContratoService contratoService)
        {
            _contratoService = contratoService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll() => Ok(await _contratoService.ListarTodosContratosAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id) => Ok(await _contratoService.ListarContratosPorOperadoraIdAsync(id));

        [HttpGet("nome/{nome}")]
        public async Task<IActionResult> GetByNome(string nome) => Ok(await _contratoService.ListarContratoPorNomeAsync(nome));

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ContratoDto dto) => Ok(await _contratoService.AdicionarContratoAsync(dto));

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] ContratoDto dto) => Ok(await _contratoService.AlterarContratoAsync(id, dto));

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id) => Ok(await _contratoService.ExcluirContratoAsync(id));
    }
}
