using System.Diagnostics.Contracts;
using Microsoft.EntityFrameworkCore;
using OperadoraServiceAPI.Models;

namespace OperadoraServiceAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Operadora> Operadoras { get; set; }
        public DbSet<Contrato> Contratos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Operadora>().ToTable("OPERADORA");
            modelBuilder.Entity<Operadora>().Property(o => o.Id).HasColumnName("ID").IsRequired();
            modelBuilder.Entity<Operadora>().Property(o => o.Nome).HasColumnName("NOME").IsRequired();
            modelBuilder.Entity<Operadora>().Property(o => o.TipoServico).HasColumnName("TIPO_SERVICO").IsRequired();
            modelBuilder.Entity<Operadora>().Property(o => o.Contato).HasColumnName("CONTATO");

            modelBuilder.Entity<Contrato>().ToTable("CONTRATO");
            modelBuilder.Entity<Contrato>().Property(c => c.Id).HasColumnName("ID").IsRequired();
            modelBuilder.Entity<Contrato>().Property(c => c.NomeFilial).HasColumnName("NOME_FILIAL").IsRequired();
            modelBuilder.Entity<Contrato>().Property(c => c.Plano).HasColumnName("PLANO").IsRequired();
            modelBuilder.Entity<Contrato>().Property(c => c.DataInicio).HasColumnName("DATA_INICIO").IsRequired();
            modelBuilder.Entity<Contrato>().Property(c => c.DataVencimento).HasColumnName("DATA_VENCIMENTO").IsRequired();
            modelBuilder.Entity<Contrato>().Property(c => c.ValorMensal).HasColumnName("VALOR_MENSAL").IsRequired();
            modelBuilder.Entity<Contrato>().Property(c => c.Status).HasColumnName("STATUS").IsRequired();
            modelBuilder.Entity<Contrato>().Property(c => c.OperadoraId).HasColumnName("OPERADORA_ID").IsRequired();

            modelBuilder.Entity<Contrato>()
                .HasOne(c => c.Operadora)
                .WithMany(o => o.Contratos)
                .HasForeignKey(c => c.OperadoraId);
        }
    }
}
