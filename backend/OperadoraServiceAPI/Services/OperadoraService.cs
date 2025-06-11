using OperadoraServiceAPI.Data;
using OperadoraServiceAPI.DTOs;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using OperadoraServiceAPI.Models;

namespace OperadoraServiceAPI.Services
{
    public class OperadoraService : IOperadoraService
    {

        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public OperadoraService(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<OperadoraDto>> ListarTodasOperadorasAsync()
        {
            var operadoras = await _context.Operadoras.OrderBy(o => o.Nome)
                                                      .ToListAsync();
            return _mapper.Map<IEnumerable<OperadoraDto>>(operadoras);
        }

        public async Task<OperadoraDto?> ListarOperadoraPorIdAsync(int id)
        {
            var operadora = await _context.Operadoras.FindAsync(id);
            return operadora == null ? null : _mapper.Map<OperadoraDto>(operadora);
        }

        public async Task<IEnumerable<OperadoraDto>> ListarOperadoraPorNomeAsync(string nome)
        {
            var operadoras = await _context.Operadoras.Where(o => o.Nome.Contains(nome)).ToListAsync();
            return _mapper.Map<IEnumerable<OperadoraDto>>(operadoras);
        }

        public async Task<OperadoraDto> AdicionarOperadoraAsync(OperadoraDto dto)
        {
            var operadora = _mapper.Map<Operadora>(dto);
            _context.Operadoras.Add(operadora);
            await _context.SaveChangesAsync();
            return _mapper.Map<OperadoraDto>(operadora);
        }

        public async Task<OperadoraDto?> AlterarOperadoraAsync(int id, OperadoraDto dto)
        {
            var operadora = await _context.Operadoras.FindAsync(id);
            if (operadora == null) return null;

            _mapper.Map(dto, operadora);
            await _context.SaveChangesAsync();
            return _mapper.Map<OperadoraDto>(operadora);
        }

        public async Task<bool> ExcluirOperadoraAsync(int id)
        {
            var operadora = await _context.Operadoras.FindAsync(id);
            if (operadora == null) return false;

            _context.Operadoras.Remove(operadora);
            await _context.SaveChangesAsync();
            return true;
        }

    }
}
