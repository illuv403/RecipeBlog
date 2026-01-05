namespace RecipeBlog.API.Models;

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string MeasureUnit { get; set; }
    
    public ICollection<RecipeProduct> RecipeProducts { get; set; } = new List<RecipeProduct>();
}