namespace RecipeBlog.API.DTO;

public record CreateRecipeDTO(string Email, string Title, string Description, List<ProductDTO> Products);