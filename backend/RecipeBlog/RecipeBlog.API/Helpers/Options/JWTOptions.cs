namespace RecipeBlog.API.Helpers.Options;

public class JWTOptions
{
    public required string Audience { get; set; }
    public required string Issuer { get; set; }
    public required string Key { get; set; }
}