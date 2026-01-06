namespace RecipeBlog.API.DTO;

public record RecipeDTO(int Id, string Title, string Description, DateTime CreatedAt, string AuthorName, string Email, List<Task<ResponseProductDTO>> Products);