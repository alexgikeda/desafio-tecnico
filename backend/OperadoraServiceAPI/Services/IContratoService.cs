using OperadoraServiceAPI.DTOs;

namespace OperadoraServiceAPI.Services
{
    public interface IContratoService
    {
        Task<IEnumerable<ContratoDto>> ListarTodosContratosAsync();
        Task<IEnumerable<ContratoDto>> ListarContratosPorOperadoraIdAsync(int id);
        Task<IEnumerable<ContratoDto>> ListarContratoPorNomeAsync(string nomeFilial);
        Task<ContratoDto> AdicionarContratoAsync(ContratoDto dto);
        Task<ContratoDto?> AlterarContratoAsync(int id, ContratoDto dto);
        Task<bool> ExcluirContratoAsync(int id);
    }
}
