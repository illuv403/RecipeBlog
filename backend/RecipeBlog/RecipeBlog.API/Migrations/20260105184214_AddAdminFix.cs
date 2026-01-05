using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RecipeBlog.API.Migrations
{
    /// <inheritdoc />
    public partial class AddAdminFix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "isAdmin",
                table: "Users",
                newName: "IsAdmin");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsAdmin",
                table: "Users",
                newName: "isAdmin");
        }
    }
}
