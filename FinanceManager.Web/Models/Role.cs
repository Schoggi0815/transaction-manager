using Microsoft.AspNetCore.Identity;

namespace FinanceManager.Web.Models;

public class Role : IdentityRole<Guid>
{
    public List<User> Users { get; set; } = null!;
}