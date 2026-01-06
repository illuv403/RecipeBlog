using System.ComponentModel.DataAnnotations;

namespace RecipeBlog.API.DTO;

public record LoginDTO(
    [Required(ErrorMessage = "Email must be provided."),
     EmailAddress(ErrorMessage = "Provide a valid email address.")]
    string Email,
    [Required(ErrorMessage = "Password must be provided."),
    MinLength(6, ErrorMessage = "Password must be at least 6 characters long.")]
    string Password);