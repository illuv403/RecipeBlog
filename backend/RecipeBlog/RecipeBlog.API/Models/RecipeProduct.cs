namespace RecipeBlog.API.Models;

public class RecipeProduct
{
    public int RecipeId { get; set; }
    public Recipe Recipe { get; set; }
    
    public int ProductId { get; set; }
    public Product Product { get; set; }
    
    public int Amount { get; set; }
}