using AutoMapper;
using OperadoraServiceAPI.DTOs;
using OperadoraServiceAPI.Models;

namespace OperadoraServiceAPI.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Operadora, OperadoraDto>().ReverseMap();
            CreateMap<Contrato, ContratoDto>().ReverseMap();
        }
    }
}
