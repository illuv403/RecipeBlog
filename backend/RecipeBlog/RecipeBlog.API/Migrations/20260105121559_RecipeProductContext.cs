using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RecipeBlog.API.Migrations
{
    /// <inheritdoc />
    public partial class RecipeProductContext : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RecipeProduct_Products_ProductId",
                table: "RecipeProduct");

            migrationBuilder.DropForeignKey(
                name: "FK_RecipeProduct_Recipes_RecipeId",
                table: "RecipeProduct");

            migrationBuilder.DropPrimaryKey(
                name: "PK_RecipeProduct",
                table: "RecipeProduct");

            migrationBuilder.RenameTable(
                name: "RecipeProduct",
                newName: "RecipeProducts");

            migrationBuilder.RenameIndex(
                name: "IX_RecipeProduct_ProductId",
                table: "RecipeProducts",
                newName: "IX_RecipeProducts_ProductId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_RecipeProducts",
                table: "RecipeProducts",
                columns: new[] { "RecipeId", "ProductId" });

            migrationBuilder.AddForeignKey(
                name: "FK_RecipeProducts_Products_ProductId",
                table: "RecipeProducts",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RecipeProducts_Recipes_RecipeId",
                table: "RecipeProducts",
                column: "RecipeId",
                principalTable: "Recipes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RecipeProducts_Products_ProductId",
                table: "RecipeProducts");

            migrationBuilder.DropForeignKey(
                name: "FK_RecipeProducts_Recipes_RecipeId",
                table: "RecipeProducts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_RecipeProducts",
                table: "RecipeProducts");

            migrationBuilder.RenameTable(
                name: "RecipeProducts",
                newName: "RecipeProduct");

            migrationBuilder.RenameIndex(
                name: "IX_RecipeProducts_ProductId",
                table: "RecipeProduct",
                newName: "IX_RecipeProduct_ProductId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_RecipeProduct",
                table: "RecipeProduct",
                columns: new[] { "RecipeId", "ProductId" });

            migrationBuilder.AddForeignKey(
                name: "FK_RecipeProduct_Products_ProductId",
                table: "RecipeProduct",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RecipeProduct_Recipes_RecipeId",
                table: "RecipeProduct",
                column: "RecipeId",
                principalTable: "Recipes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
