using RecipeBlog.API.Models;

namespace RecipeBlog.API.Services;

public interface ITokenService
{
    public string GenerateToken(User user);
}