using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RecipeBlog.API.DAL;
using RecipeBlog.API.DTO;
using RecipeBlog.API.Models;
using DeepL;
using Microsoft.AspNetCore.Authorization;

namespace RecipeBlog.API.Controllers
{
    [Route("api/recipes")]
    [ApiController]
    [Authorize]
    public class RecipesController : ControllerBase
    {
        private readonly RecipeBlogDbContext _context;
        private readonly IConfiguration _config;
        
        public RecipesController(RecipeBlogDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        // GET: api/Recipe
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<Recipe>>> GetRecipes([FromQuery] int page, [FromQuery] string lang, [FromQuery] string? title)
        {
            var authKey = _config.GetValue<string>("DeeplAPIKey");
            var client = new DeepLClient(authKey);
            
            if (page < 1) return BadRequest();
           
            var query = _context.Recipes.Include(r => r.User)
                .Include(r => r.RecipeProducts)
                .ThenInclude(rp => rp.Product).AsQueryable();
            
            if (!string.IsNullOrEmpty(title))
            {
                query = query.Where(r =>
                    r.Title.ToLower().Contains(title.ToLower()));
            }
            
            var total = await query.CountAsync();
            
            var recipes = await query
                .Skip((page - 1) * 6)
                .Take(6)
                .ToListAsync();

            var recipesToReturn = recipes.Select(async r  => new RecipeDTO(
                Id: r.Id,
                Title: lang=="pl" ? (await client.TranslateTextAsync(r.Title, LanguageCode.English, LanguageCode.Polish)).ToString() : r.Title,
                Description: lang=="pl" ? (await client.TranslateTextAsync(r.Description, LanguageCode.English, LanguageCode.Polish)).ToString() : r.Description,
                CreatedAt: r.CreatedAt,
                AuthorName: r.User.FullName,
                Email: r.User.Email,
                Products: r.RecipeProducts.Select(async rp => new ResponseProductDTO(
                        ProductId: rp.ProductId,
                        Name: lang=="pl" ? (await client.TranslateTextAsync(rp.Product.Name, LanguageCode.English, LanguageCode.Polish)).ToString() : rp.Product.Name,
                        Amount: rp.Amount,
                        MeasureUnit: lang=="pl" ? (await client.TranslateTextAsync(rp.Product.MeasureUnit, LanguageCode.English, LanguageCode.Polish)).ToString() : rp.Product.MeasureUnit
                    )).ToList()
            )).ToList();
            
            var totalPages = (int)Math.Ceiling((double)total / 6);

            var returnBody = new
            {
                totalPages,
                recipesToReturn
            };
            
            return Ok(returnBody);
        }

        // GET: api/Recipe/5
        [HttpGet("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<Recipe>> GetRecipe(int id)
        {
            var recipe = await _context.Recipes.FindAsync(id);

            if (recipe == null)
            {
                return NotFound();
            }

            return recipe;
        }

        // PUT: api/Recipe/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize(Roles = "User,Admin")]
        public async Task<IActionResult> PutRecipe(int id, [FromBody]CreateRecipeDTO recipe)
        {
            var recipeToUpdate = await _context.Recipes.Include(r => r.RecipeProducts).FirstOrDefaultAsync(r => r.Id == id);
            if (recipeToUpdate == null) return NotFound();
            
            recipeToUpdate.Title = recipe.Title;
            recipeToUpdate.Description = recipe.Description;
            recipeToUpdate.RecipeProducts.Clear();

            foreach (var product in recipe.Products)
            {
                recipeToUpdate.RecipeProducts.Add(new RecipeProduct
                {
                   RecipeId = id,
                   ProductId = product.ProductId,
                   Amount = product.Amount
                });
            }
            
            await _context.SaveChangesAsync();
            
            return NoContent();
        }

        // POST: api/Recipe
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Authorize(Roles = "User,Admin")]
        public async Task<ActionResult> PostRecipe([FromBody]CreateRecipeDTO recipe)
        {   
            var user = _context.Users.SingleOrDefault(u => u.Email == recipe.Email);
            
            if (user == null) return NotFound();

            var newRecipe = new Recipe
            {
                Title = recipe.Title,
                Description = recipe.Description,
                UserId = user.Id,
                CreatedAt = DateTime.UtcNow
            };
            
            _context.Recipes.Add(newRecipe);
            await _context.SaveChangesAsync();

            foreach (var product in recipe.Products)
            {
                var rp = new RecipeProduct
                {
                    RecipeId = newRecipe.Id,
                    ProductId = product.ProductId,
                    Amount = product.Amount
                };
                
                _context.RecipeProducts.Add(rp);
            }
            
            await _context.SaveChangesAsync();

            return Ok();
        }

        // DELETE: api/Recipe/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "User,Admin")]
        public async Task<IActionResult> DeleteRecipe(int id)
        {
            var recipe = await _context.Recipes.FindAsync(id);
            if (recipe == null)
            {
                return NotFound();
            }

            _context.Recipes.Remove(recipe);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RecipeExists(int id)
        {
            return _context.Recipes.Any(e => e.Id == id);
        }
    }
}
