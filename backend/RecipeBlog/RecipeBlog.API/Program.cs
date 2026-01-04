using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using RecipeBlog.API.DAL;
using RecipeBlog.API.Helpers.Options;
using RecipeBlog.API.Services;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("RecipeDB")
                       ?? throw new InvalidOperationException("No connection string provided.");

var JWTConfig = builder.Configuration.GetSection("JWT");
builder.Services.Configure<JWTOptions>(JWTConfig);

builder.Services.AddScoped<ITokenService, TokenService>();

builder.Services.AddDbContext<RecipeBlogDbContext>(options => options.UseMySQL(connectionString));

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey =  true,
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidIssuer = JWTConfig["Issuer"],
        ValidAudience = JWTConfig["Audience"], 
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(JWTConfig["Key"])),
        ValidateLifetime = true
    };
});

builder.Services.AddControllers();

builder.Services.AddCors(options => options.AddPolicy("AllowFrontend",
    p => p.WithOrigins("http://localhost:5173").AllowAnyMethod().AllowAnyHeader())
);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.MapControllers();

app.UseCors("AllowFrontend");
    
app.UseAuthentication();
app.UseAuthorization();

app.Run();