namespace RecipeBlog.API.Services;

public interface ITokenService
{
    public string GenerateToken(string email);
}