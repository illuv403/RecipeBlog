using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RecipeBlog.API.DAL;
using RecipeBlog.API.DTO;
using RecipeBlog.API.Models;

namespace RecipeBlog.API.Controllers
{
    [Route("api/session")]
    [ApiController]
    public class SessionController : ControllerBase
    {
        private readonly RecipeBlogDbContext _context;
        private readonly PasswordHasher<User> _passwordHasher = new();
        
        public SessionController(RecipeBlogDbContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public async Task<IActionResult> CheckUser([FromQuery] LoginDTO login)
        {
            var foundUser = await _context.Users.FirstOrDefaultAsync(x => string.Equals(x.Email, login.Email));

            if (foundUser == null) return NotFound();
            
            var passwordCheckResult = _passwordHasher.VerifyHashedPassword(foundUser, foundUser.Password, login.Password);
            
            if (passwordCheckResult == PasswordVerificationResult.Failed) return Unauthorized();
            
            return Ok();
        }
    }
}
