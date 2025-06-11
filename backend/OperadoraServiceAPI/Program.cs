using Microsoft.EntityFrameworkCore;
using OperadoraServiceAPI.Data;
using OperadoraServiceAPI.Mapping;
using AutoMapper;
using OperadoraServiceAPI.Services;
using OperadoraServiceAPI.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Configuration.AddUserSecrets<Program>();

var oracleConnection = builder.Configuration.GetConnectionString("OracleDb");
builder.Services.AddDbContext<AppDbContext>(options => options.UseInMemoryDatabase("MinhaBaseDeMemoria"));


builder.Services.AddAutoMapper(typeof(MappingProfile));

builder.Services.AddScoped<IOperadoraService, OperadoraService>();
builder.Services.AddScoped<IContratoService, ContratoService>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var corsDevelopmentPolicy = "AllowAngularApp";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: corsDevelopmentPolicy,
        policy =>
        {
            policy.WithOrigins("http://localhost:4200")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors(corsDevelopmentPolicy);
}

app.UseDefaultFiles();
app.UseStaticFiles();
app.UseRouting();
app.MapFallbackToFile("index.html");


app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
