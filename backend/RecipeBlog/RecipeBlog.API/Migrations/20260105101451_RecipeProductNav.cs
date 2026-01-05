using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RecipeBlog.API.Migrations
{
    /// <inheritdoc />
    public partial class RecipeProductNav : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_Recipes_RecipeId",
                table: "Products");

            migrationBuilder.DropForeignKey(
                name: "FK_RecipeProduct_Users_UserId",
                table: "RecipeProduct");

            migrationBuilder.DropIndex(
                name: "IX_RecipeProduct_UserId",
                table: "RecipeProduct");

            migrationBuilder.DropIndex(
                name: "IX_Products_RecipeId",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "RecipeProduct");

            migrationBuilder.DropColumn(
                name: "RecipeId",
                table: "Products");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "RecipeProduct",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "RecipeId",
                table: "Products",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_RecipeProduct_UserId",
                table: "RecipeProduct",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Products_RecipeId",
                table: "Products",
                column: "RecipeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_Recipes_RecipeId",
                table: "Products",
                column: "RecipeId",
                principalTable: "Recipes",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_RecipeProduct_Users_UserId",
                table: "RecipeProduct",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
