using System.ComponentModel.DataAnnotations;

namespace RecipeBlog.API.DTO;


public record CreateRecipeDTO(
    [Required(ErrorMessage="Email can not be empty"), 
     EmailAddress(ErrorMessage="Provide a valid email address")]
    string Email,
    [Required(ErrorMessage = "Title can not be empty"),
     MinLength(1, ErrorMessage =  "Title must be at least 1 character long")]
    string Title, 
    [Required(ErrorMessage = "Description can not be empty"),
     MinLength(1, ErrorMessage =  "Description must be at least 1 character long")]
    string Description, 
    List<ProductDTO> Products);