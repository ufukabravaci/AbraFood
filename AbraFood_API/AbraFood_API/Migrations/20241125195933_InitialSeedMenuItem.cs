using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AbraFood_API.Migrations
{
    /// <inheritdoc />
    public partial class InitialSeedMenuItem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 2,
                column: "Image",
                value: "https://abrafoodimages.blob.core.windows.net/redmango/idli.jpg");

            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 3,
                column: "Image",
                value: "https://abrafoodimages.blob.core.windows.net/redmango/pani puri.jpg");

            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 4,
                column: "Image",
                value: "https://abrafoodimages.blob.core.windows.net/redmango/hakka noodles.jpg");

            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 5,
                column: "Image",
                value: "https://abrafoodimages.blob.core.windows.net/redmango/malai kofta.jpg");

            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 6,
                column: "Image",
                value: "https://abrafoodimages.blob.core.windows.net/redmango/paneer pizza.jpg");

            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 7,
                column: "Image",
                value: "https://abrafoodimages.blob.core.windows.net/redmango/paneer tikka.jpg");

            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 8,
                column: "Image",
                value: "https://abrafoodimages.blob.core.windows.net/redmango/carrot love.jpg");

            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 9,
                column: "Image",
                value: "https://abrafoodimages.blob.core.windows.net/redmango/rasmalai.jpg");

            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 10,
                column: "Image",
                value: "https://abrafoodimages.blob.core.windows.net/redmango/sweet rolls.jpg");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 2,
                column: "Image",
                value: "https://dotnetmasteryimages.blob.core.windows.net/redmango/idli.jpg");

            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 3,
                column: "Image",
                value: "https://dotnetmasteryimages.blob.core.windows.net/redmango/pani puri.jpg");

            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 4,
                column: "Image",
                value: "https://dotnetmasteryimages.blob.core.windows.net/redmango/hakka noodles.jpg");

            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 5,
                column: "Image",
                value: "https://dotnetmasteryimages.blob.core.windows.net/redmango/malai kofta.jpg");

            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 6,
                column: "Image",
                value: "https://dotnetmasteryimages.blob.core.windows.net/redmango/paneer pizza.jpg");

            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 7,
                column: "Image",
                value: "https://dotnetmasteryimages.blob.core.windows.net/redmango/paneer tikka.jpg");

            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 8,
                column: "Image",
                value: "https://dotnetmasteryimages.blob.core.windows.net/redmango/carrot love.jpg");

            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 9,
                column: "Image",
                value: "https://dotnetmasteryimages.blob.core.windows.net/redmango/rasmalai.jpg");

            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 10,
                column: "Image",
                value: "https://dotnetmasteryimages.blob.core.windows.net/redmango/sweet rolls.jpg");
        }
    }
}
