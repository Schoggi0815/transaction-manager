using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace FinanceManager.Web.Models;

public class FinanceManagerContext(DbContextOptions<FinanceManagerContext> options) : IdentityDbContext<User, Role, Guid>(options)
{
    public DbSet<CredentialRecord> CredentialRecords { get; set; }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        const string aspNetTablePrefix = "AspNet";
        foreach (var entityType in modelBuilder.Model.GetEntityTypes())
        {
            var tableName = entityType.GetTableName();
            if (tableName != null && tableName.StartsWith(aspNetTablePrefix))
                entityType.SetTableName(tableName[aspNetTablePrefix.Length..]);

        }

        modelBuilder
                .Entity<User>()
                .HasMany<Role>(u => u.Roles)
                .WithMany(r => r.Users)
                .UsingEntity<IdentityUserRole<Guid>>(
                    userRole =>
                        userRole
                            .HasOne<Role>()
                            .WithMany()
                            .HasForeignKey(ur => ur.RoleId)
                            .IsRequired(),
                    userRole =>
                        userRole
                            .HasOne<User>()
                            .WithMany()
                            .HasForeignKey(ur => ur.UserId)
                            .IsRequired()
                );
        
        modelBuilder.Entity<CredentialRecord>(entity =>
        {
            // Composite index on UserHandle, CredentialId, and RpId
            entity.HasIndex(e => new { e.UserHandle, e.CredentialId, e.RpId })
                .IsUnique()
                .HasDatabaseName("IX_CredentialRecords_UserHandle_CredentialId_RpId");

            // Composite index on CredentialId and RpId
            entity.HasIndex(e => new { e.CredentialId, e.RpId })
                .IsUnique()
                .HasDatabaseName("IX_CredentialRecords_CredentialId_RpId");

            // Check constraint for JSON validation on Transports
            entity.ToTable(t => t.HasCheckConstraint("Transports should be formatted as JSON", "ISJSON(Transports) = 1"));
        });
        
        
    }
}