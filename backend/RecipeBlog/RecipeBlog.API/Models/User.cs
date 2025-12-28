namespace RecipeBlog.API.Models;

public class User
{
    public int Id { get; set; }
    public string FullName { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    
    public ICollection<Recipe> Recipes { get; set; } = new List<Recipe>();
}