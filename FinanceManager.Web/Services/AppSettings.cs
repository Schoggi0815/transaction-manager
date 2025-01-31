namespace FinanceManager.Web.Services;

public class AppSettings
{
    private readonly IConfiguration config;

    public AppSettings(IConfiguration config)
    {
        this.config = config;
        Jwt = new JwtAppSettings
        {
            Secret = GetSetting<string>(nameof(Jwt), nameof(JwtAppSettings.Secret))
        };
    }

    private T GetSetting<T>(string sectionKey, string valueKey)
    {
        return config.GetSection(sectionKey).GetValue<T>(valueKey) ??
               throw new Exception($"config \"{sectionKey}:{valueKey}\" of type \"{typeof(T)}\" not found!");
    }

    public JwtAppSettings Jwt { get; set; }
}

public class JwtAppSettings
{
    public required string Secret { get; set; }
}