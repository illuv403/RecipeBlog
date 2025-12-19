var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("RecipeDB")
                       ?? throw new InvalidOperationException("No connection string provided.");



var app = builder.Build();

app.UseHttpsRedirection();

app.Run();
