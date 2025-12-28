using Microsoft.EntityFrameworkCore;
using RecipeBlog.API.Models;

namespace RecipeBlog.API.DAL;

public class RecipeBlogDbContext : DbContext
{
    public RecipeBlogDbContext(DbContextOptions<RecipeBlogDbContext> options) : base(options) { }
    
    public DbSet<Product> Products { get; set; }
    public DbSet<Recipe> Recipes { get; set; }
    public DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Product>()
            .HasMany(p => p.Recipes)
            .WithMany(r => r.Products);
    }
}