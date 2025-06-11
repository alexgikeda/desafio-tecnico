namespace OperadoraServiceAPI.Models
{
    public class Contrato
    {
        public int Id { get; set; }
        public string NomeFilial { get; set; } = string.Empty;
        public string Plano { get; set; } = string.Empty;
        public DateTime DataInicio { get; set; }
        public DateTime DataVencimento { get; set; }
        public decimal ValorMensal { get; set; }
        public string Status { get; set; } = string.Empty;
        public int OperadoraId { get; set; }
        public Operadora Operadora { get; set; } = null!;
    }
}
