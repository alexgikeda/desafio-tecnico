using System.Diagnostics.Contracts;

namespace OperadoraServiceAPI.Models
{
    public class Operadora
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string TipoServico { get; set; } = string.Empty;
        public string? Contato { get; set; }
        public ICollection<Contrato> Contratos { get; set; } = new List<Contrato>();
    }
}
