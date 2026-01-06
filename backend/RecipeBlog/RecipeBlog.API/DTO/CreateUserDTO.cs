using System.ComponentModel.DataAnnotations;

namespace RecipeBlog.API.DTO;

public record CreateUserDTO(
    [Required(ErrorMessage = "Provide a name to proceed"), 
     MinLength(1, ErrorMessage = "Name can not be empty")]
    string FullName,
    [Required(ErrorMessage = "Provide an email to proceed"),
    EmailAddress(ErrorMessage = "Provide a valid email address")]
    string UserEmail,
    [Required(ErrorMessage = "Provide a password to proceed"),
     MinLength(6, ErrorMessage = "Password must be at least 6 characters long")]
    string UserPassword);