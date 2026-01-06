namespace RecipeBlog.API.DTO;

public record ResponseShortRecipeDTO(string Title, string Description, DateTime CreatedAt, string AuthorName);