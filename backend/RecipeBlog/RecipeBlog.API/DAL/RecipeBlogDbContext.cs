using Microsoft.EntityFrameworkCore;
using RecipeBlog.API.Models;

namespace RecipeBlog.API.DAL;

public class RecipeBlogDbContext : DbContext
{
    public RecipeBlogDbContext(DbContextOptions<RecipeBlogDbContext> options) : base(options) { }
    
    public DbSet<Product> Products { get; set; }
    public DbSet<Recipe> Recipes { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<RecipeProduct> RecipeProducts { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<RecipeProduct>(entity =>
        {
            entity.ToTable("RecipeProducts");
            entity.HasKey(rp => new { rp.RecipeId, rp.ProductId });
            entity.HasOne(rp => rp.Recipe)
                .WithMany(r => r.RecipeProducts)
                .HasForeignKey(rp => rp.RecipeId);
            entity.HasOne(rp => rp.Product)
                .WithMany(p => p.RecipeProducts)
                .HasForeignKey(rp => rp.ProductId);
        });
    }
}