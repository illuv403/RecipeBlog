using Microsoft.AspNetCore.Identity;
using RecipeBlog.API.DAL;
using RecipeBlog.API.Models;

namespace RecipeBlog.API.Helpers;

public static class DbSeeder
{
    public static async Task SeedAsync(RecipeBlogDbContext db)
    {
        // --- USERS ---
        if (!db.Users.Any())
        {
            var admin = new User
            {
                FullName = "Admin User",
                Email = "admin@example.com",
                IsAdmin = true
            };

            // Hash password
            var hasher = new PasswordHasher<User>();
            admin.Password = hasher.HashPassword(admin, "admin123");

            db.Users.Add(admin);
            await db.SaveChangesAsync();
        }

        // Get admin user reference
        var adminUser = db.Users.First(u => u.IsAdmin);

        // --- PRODUCTS ---
        if (!db.Products.Any())
        {
            var productsToAdd = new List<Product>
            {
                new Product { Name = "Spaghetti", MeasureUnit = "g" },
                new Product { Name = "Eggs", MeasureUnit = "pcs" },
                new Product { Name = "Parmesan Cheese", MeasureUnit = "g" },
                new Product { Name = "Pancetta", MeasureUnit = "g" },
                new Product { Name = "Chicken", MeasureUnit = "g" },
                new Product { Name = "Curry Powder", MeasureUnit = "g" },
                new Product { Name = "Avocado", MeasureUnit = "pcs" },
                new Product { Name = "Bread", MeasureUnit = "slice" }
            };

            db.Products.AddRange(productsToAdd);
            await db.SaveChangesAsync();
        }

        Recipe spaghetti;
        Recipe chickenCurry;
        Recipe avocadoToast;

        // --- RECIPES ---
        if (!db.Recipes.Any())
        {
            spaghetti = new Recipe
            {
                Title = "Spaghetti Carbonara",
                Description =
                    "Spaghetti Carbonara is a classic Italian pasta dish that combines al dente spaghetti with a rich and creamy sauce made from fresh eggs, sharp Parmesan cheese, and perfectly crisped pancetta. Each bite delivers a comforting balance of salty, savory, and subtly creamy flavors, making it a timeless favorite for both family dinners and special occasions. Preparing this dish is quick, yet it feels indulgent and sophisticated, capturing the essence of traditional Roman cuisine in every mouthful.",
                CreatedAt = DateTime.UtcNow,
                UserId = adminUser.Id
            };

            chickenCurry = new Recipe
            {
                Title = "Chicken Curry",
                Description =
                    "This Chicken Curry is a hearty and flavorful dish, featuring tender pieces of chicken simmered in a rich sauce of aromatic spices, onions, tomatoes, and a touch of cream or coconut milk. Every mouthful is infused with warmth from curry powder, turmeric, cumin, and other spices that create a deep, complex taste profile. Perfect for lunch or dinner, it can be served with rice, naan, or bread, making it a versatile dish that pleases both spice lovers and those seeking a comforting, home-cooked meal with vibrant, savory flavors.",
                CreatedAt = DateTime.UtcNow,
                UserId = adminUser.Id
            };

            avocadoToast = new Recipe
            {
                Title = "Avocado Toast",
                Description =
                    "Avocado Toast is a simple yet nutritious breakfast or snack, featuring ripe, creamy avocado spread generously over lightly toasted bread, often topped with a drizzle of olive oil, a sprinkle of salt, freshly ground black pepper, and optional garnishes like cherry tomatoes, radishes, or microgreens. This dish combines smooth, buttery textures with the crunch of toasted bread and can be customized with herbs, spices, or a squeeze of citrus for extra flavor. It’s a modern classic that is as satisfying as it is healthy, perfect for a quick, energizing start to the day.",
                CreatedAt = DateTime.UtcNow,
                UserId = adminUser.Id
            };

            db.Recipes.AddRange(spaghetti, chickenCurry, avocadoToast);
            await db.SaveChangesAsync();
        }
        else
        {
            spaghetti = db.Recipes.First(r => r.Title == "Spaghetti Carbonara");
            chickenCurry = db.Recipes.First(r => r.Title == "Chicken Curry");
            avocadoToast = db.Recipes.First(r => r.Title == "Avocado Toast");
        }

        // --- RECIPE PRODUCTS ---
        var products = db.Products.ToList();

        db.RecipeProducts.AddRange(
            new RecipeProduct
                { RecipeId = spaghetti.Id, ProductId = products.First(p => p.Name == "Spaghetti").Id, Amount = 200 },
            new RecipeProduct
                { RecipeId = spaghetti.Id, ProductId = products.First(p => p.Name == "Eggs").Id, Amount = 2 },
            new RecipeProduct
            {
                RecipeId = spaghetti.Id, ProductId = products.First(p => p.Name == "Parmesan Cheese").Id, Amount = 50
            },
            new RecipeProduct
                { RecipeId = spaghetti.Id, ProductId = products.First(p => p.Name == "Pancetta").Id, Amount = 100 },
            new RecipeProduct
                { RecipeId = chickenCurry.Id, ProductId = products.First(p => p.Name == "Chicken").Id, Amount = 500 },
            new RecipeProduct
            {
                RecipeId = chickenCurry.Id, ProductId = products.First(p => p.Name == "Curry Powder").Id, Amount = 20
            },
            new RecipeProduct
                { RecipeId = avocadoToast.Id, ProductId = products.First(p => p.Name == "Avocado").Id, Amount = 1 },
            new RecipeProduct
                { RecipeId = avocadoToast.Id, ProductId = products.First(p => p.Name == "Bread").Id, Amount = 2 }
        );

        await db.SaveChangesAsync();
    }
}