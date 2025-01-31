using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FinanceManager.Web.Migrations
{
    /// <inheritdoc />
    public partial class AddWebAuthNCredentialRecord : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CredentialRecords",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    RpId = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    UserHandle = table.Column<byte[]>(type: "varbinary(128)", maxLength: 128, nullable: false),
                    CredentialId = table.Column<byte[]>(type: "varbinary(1024)", maxLength: 1024, nullable: false),
                    Type = table.Column<int>(type: "int", nullable: false),
                    Kty = table.Column<int>(type: "int", nullable: false),
                    Alg = table.Column<int>(type: "int", nullable: false),
                    Ec2Crv = table.Column<int>(type: "int", nullable: true),
                    Ec2X = table.Column<byte[]>(type: "varbinary(256)", maxLength: 256, nullable: true),
                    Ec2Y = table.Column<byte[]>(type: "varbinary(256)", maxLength: 256, nullable: true),
                    RsaModulusN = table.Column<byte[]>(type: "varbinary(1024)", maxLength: 1024, nullable: true),
                    RsaExponentE = table.Column<byte[]>(type: "varbinary(32)", maxLength: 32, nullable: true),
                    OkpCrv = table.Column<int>(type: "int", nullable: true),
                    OkpX = table.Column<byte[]>(type: "varbinary(32)", maxLength: 32, nullable: true),
                    SignCount = table.Column<long>(type: "bigint", nullable: false),
                    Transports = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UvInitialized = table.Column<bool>(type: "bit", nullable: false),
                    BackupEligible = table.Column<bool>(type: "bit", nullable: false),
                    BackupState = table.Column<bool>(type: "bit", nullable: false),
                    AttestationObject = table.Column<byte[]>(type: "varbinary(max)", nullable: true),
                    AttestationClientDataJson = table.Column<byte[]>(type: "varbinary(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    CreatedAtUnixTime = table.Column<long>(type: "bigint", nullable: false),
                    UpdatedAtUnixTime = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CredentialRecords", x => x.Id);
                    table.CheckConstraint("Transports should be formatted as JSON", "ISJSON(Transports) = 1");
                });

            migrationBuilder.CreateIndex(
                name: "IX_CredentialRecords_CredentialId_RpId",
                table: "CredentialRecords",
                columns: new[] { "CredentialId", "RpId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_CredentialRecords_UserHandle_CredentialId_RpId",
                table: "CredentialRecords",
                columns: new[] { "UserHandle", "CredentialId", "RpId" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CredentialRecords");
        }
    }
}
