using System.Text;
using FinanceManager.Web.Constants;
using Microsoft.AspNetCore.DataProtection;

namespace FinanceManager.Web.Services;

public class AuthenticationCeremonyHandleService(IDataProtectionProvider provider)
    : AbstractProtectedCookieStore(provider, DataProtectionPurpose, CookieConstants.AuthenticationCeremonyId)
{
    private const string DataProtectionPurpose = "WebAuthn.Net.Demo.AuthenticationCeremonyHandle";

    public Task SaveAsync(HttpContext httpContext, string authenticationCeremonyId)
    {
        Save(httpContext, Encoding.UTF8.GetBytes(authenticationCeremonyId));
        return Task.CompletedTask;
    }

    public Task<string?> ReadAsync(HttpContext httpContext)
    {
        if (TryRead(httpContext, out var authenticationCeremonyId))
        {
            return Task.FromResult<string?>(Encoding.UTF8.GetString(authenticationCeremonyId));
        }

        return Task.FromResult<string?>(null);
    }

    public Task DeleteAsync(HttpContext httpContext)
    {
        Delete(httpContext);
        return Task.CompletedTask;
    }
}
