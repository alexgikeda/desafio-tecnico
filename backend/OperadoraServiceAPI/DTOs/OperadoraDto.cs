namespace OperadoraServiceAPI.DTOs
{
    public class OperadoraDto
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string TipoServico { get; set; } = string.Empty;
        public string? Contato { get; set; }
    }
}
