using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RecipeBlog.API.DAL;

namespace RecipeBlog.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SessionController : ControllerBase
    {
        private readonly RecipeBlogDbContext _context;
        
        public SessionController(RecipeBlogDbContext context)
        {
            _context = context;
        }
    }
}
