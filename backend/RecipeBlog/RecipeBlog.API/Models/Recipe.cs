namespace RecipeBlog.API.Models;

public class Recipe
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public DateTime CreatedAt { get; set; }
    
    public ICollection<RecipeProduct> RecipeProducts { get; set; } = new List<RecipeProduct>();
    public int UserId { get; set; }
    public User User { get; set; } = null!;
}