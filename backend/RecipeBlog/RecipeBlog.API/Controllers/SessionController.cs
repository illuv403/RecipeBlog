using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RecipeBlog.API.DAL;
using RecipeBlog.API.DTO;
using RecipeBlog.API.Models;
using RecipeBlog.API.Services;

namespace RecipeBlog.API.Controllers
{
    [Route("api/session")]
    [ApiController]
    public class SessionController : ControllerBase
    {
        private readonly RecipeBlogDbContext _context;
        private readonly ITokenService _tokenService;
        private readonly PasswordHasher<User> _passwordHasher = new();
        
        public SessionController(RecipeBlogDbContext context, ITokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> CheckUser([FromQuery] LoginDTO login)
        {
            var foundUser = await _context.Users.FirstOrDefaultAsync(x => string.Equals(x.Email, login.Email));

            if (foundUser == null) return NotFound();
            
            var passwordCheckResult = _passwordHasher.VerifyHashedPassword(foundUser, foundUser.Password, login.Password);
            
            if (passwordCheckResult == PasswordVerificationResult.Failed) return Unauthorized();
            
            return Ok(new {Token = _tokenService.GenerateToken(foundUser.Email)});
        }
    }
}
