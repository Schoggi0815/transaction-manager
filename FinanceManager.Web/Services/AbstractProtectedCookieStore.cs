using System.Diagnostics.CodeAnalysis;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.DataProtection;
using WebAuthn.Net.Services.Static;

namespace FinanceManager.Web.Services;

public abstract class AbstractProtectedCookieStore
{
    private readonly CookieBuilder cookieBuilder;
    private readonly ChunkingCookieManager cookieManager;
    private readonly string cookieName;
    private readonly IDataProtector protector;

    protected AbstractProtectedCookieStore(
        IDataProtectionProvider provider,
        string dataProtectionPurpose,
        string cookieName)
    {
        ArgumentNullException.ThrowIfNull(provider);
        if (string.IsNullOrEmpty(dataProtectionPurpose))
        {
            throw new ArgumentException("Value cannot be null or empty.", nameof(dataProtectionPurpose));
        }

        if (string.IsNullOrEmpty(cookieName))
        {
            throw new ArgumentException("Value cannot be null or empty.", nameof(cookieName));
        }

        protector = provider.CreateProtector(dataProtectionPurpose);
        cookieManager = new();
        cookieBuilder = new RequestPathBaseCookieBuilder
        {
            Name = cookieName,
            SameSite = SameSiteMode.None,
            HttpOnly = true,
            SecurePolicy = CookieSecurePolicy.Always,
            IsEssential = true
        };
        this.cookieName = cookieName;
    }

    protected void Save(HttpContext httpContext, byte[] payload)
    {
        ArgumentNullException.ThrowIfNull(payload);
        var protectedBytes = protector.Protect(payload);
        var encodedProtectedBytes = Base64Url.Encode(protectedBytes);
        var cookieOptions = cookieBuilder.Build(httpContext);
        cookieManager.AppendResponseCookie(
            httpContext,
            cookieName,
            encodedProtectedBytes,
            cookieOptions);
    }
    
    protected bool TryRead(HttpContext httpContext, [NotNullWhen(true)] out byte[]? payload)
    {
        try
        {
            var encodedProtectedBytes = cookieManager.GetRequestCookie(httpContext, cookieName);
            if (encodedProtectedBytes is null)
            {
                payload = null;
                return false;
            }

            if (!Base64Url.TryDecode(encodedProtectedBytes, out var protectedBytes))
            {
                payload = null;
                return false;
            }

            payload = protector.Unprotect(protectedBytes);
            return true;
        }
        catch
        {
            payload = null;
            return false;
        }
    }

    protected void Delete(HttpContext httpContext)
    {
        var cookieOptions = cookieBuilder.Build(httpContext);
        cookieManager.DeleteCookie(httpContext, cookieName, cookieOptions);
    }
}
