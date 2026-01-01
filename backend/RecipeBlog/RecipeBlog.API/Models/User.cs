namespace RecipeBlog.API.Models;

public class User
{
    public int Id { get; set; }
    public string FullName { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string? Password { get; set; } = null;
    
    public ICollection<Recipe> Recipes { get; set; } = new List<Recipe>();
}