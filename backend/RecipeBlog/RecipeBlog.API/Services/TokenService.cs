using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using RecipeBlog.API.Helpers.Options;

namespace RecipeBlog.API.Services;

public class TokenService : ITokenService
{
    private readonly JWTOptions _jwtOptions;

    public TokenService(IOptions<JWTOptions> options)
    {
        _jwtOptions = options.Value;
    }
    
    public string GenerateToken(string email) 
    {
        var handler = new JwtSecurityTokenHandler();
        var key = Encoding.UTF8.GetBytes(_jwtOptions.Key);

        var claims = new List<Claim>
        {
            new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new(JwtRegisteredClaimNames.Sub, email)
        };
        
        var notBefore = DateTime.UtcNow;
        var expires = notBefore.AddHours(2);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Issuer = _jwtOptions.Issuer,
            Audience = _jwtOptions.Audience,
            NotBefore = notBefore,
            Expires = expires,
            SigningCredentials =
                new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };
        
        var token = handler.CreateToken(tokenDescriptor);
        string jwt = handler.WriteToken(token);
        
        return jwt;
    }
}