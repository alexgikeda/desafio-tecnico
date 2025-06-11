using OperadoraServiceAPI.Data;
using OperadoraServiceAPI.DTOs;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using OperadoraServiceAPI.Models;

namespace OperadoraServiceAPI.Services
{
    public class ContratoService : IContratoService
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public ContratoService(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ContratoDto>> ListarTodosContratosAsync()
        {
            var contratos = await _context.Contratos.Include(c => c.Operadora).ToListAsync();
            return _mapper.Map<IEnumerable<ContratoDto>>(contratos);
        }

        public async Task<IEnumerable<ContratoDto>> ListarContratosPorOperadoraIdAsync(int id)
        {
            var contratos = await _context.Contratos.Include(c => c.Operadora).Where(c => c.OperadoraId == id).ToListAsync();
            return _mapper.Map<IEnumerable<ContratoDto>>(contratos);
        }

        public async Task<IEnumerable<ContratoDto>> ListarContratoPorNomeAsync(string nomeFilial)
        {
            var contratos = await _context.Contratos.Where(c => c.NomeFilial.Contains(nomeFilial)).ToListAsync();
            return _mapper.Map<IEnumerable<ContratoDto>>(contratos);
        }

        public async Task<ContratoDto> AdicionarContratoAsync(ContratoDto dto)
        {
            var contrato = _mapper.Map<Contrato>(dto);
            _context.Contratos.Add(contrato);
            await _context.SaveChangesAsync();
            return _mapper.Map<ContratoDto>(contrato);
        }

        public async Task<ContratoDto?> AlterarContratoAsync(int id, ContratoDto dto)
        {
            var contrato = await _context.Contratos.FindAsync(id);
            if (contrato == null) return null;

            _mapper.Map(dto, contrato);
            await _context.SaveChangesAsync();
            return _mapper.Map<ContratoDto>(contrato);
        }

        public async Task<bool> ExcluirContratoAsync(int id)
        {
            var contrato = await _context.Contratos.FindAsync(id);
            if (contrato == null) return false;

            _context.Contratos.Remove(contrato);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
