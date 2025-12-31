using Microsoft.EntityFrameworkCore;
using RecipeBlog.API.DAL;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("RecipeDB")
                       ?? throw new InvalidOperationException("No connection string provided.");

builder.Services.AddDbContext<RecipeBlogDbContext>(options => options.UseMySQL(connectionString));

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.MapControllers();

app.Run();
