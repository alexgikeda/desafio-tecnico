using OperadoraServiceAPI.DTOs;

namespace OperadoraServiceAPI.Services
{
    public interface IOperadoraService
    {
        Task<IEnumerable<OperadoraDto>> ListarTodasOperadorasAsync();
        Task<OperadoraDto?> ListarOperadoraPorIdAsync(int id);
        Task<IEnumerable<OperadoraDto>> ListarOperadoraPorNomeAsync(string nome);
        Task<OperadoraDto> AdicionarOperadoraAsync(OperadoraDto dto);
        Task<OperadoraDto?> AlterarOperadoraAsync(int id, OperadoraDto dto);
        Task<bool> ExcluirOperadoraAsync(int id);
    }
}
