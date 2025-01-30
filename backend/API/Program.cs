using System.Security.Cryptography;
using Core.Entities;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews(options =>
{
    options.Filters.Add(new AutoValidateAntiforgeryTokenAttribute());
});
builder.Services.AddOpenApiDocument();
builder.Services.AddCors();

builder.Services.AddAntiforgery(options => options.HeaderName = "X-XSRF-TOKEN");
builder.Services.AddDbContext<StoreContext>(opt =>
{
    opt.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));

builder.Services.AddAuthorization();
builder.Services.AddIdentityApiEndpoints<AppUser>()
    .AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<StoreContext>();


var app = builder.Build();


app.MapGet("api/antiforgery/token", (IAntiforgery forgeryService, HttpContext context) =>
{
    var tokens = forgeryService.GetAndStoreTokens(context);
    context.Response.Cookies.Append("XSRF-TOKEN", tokens.RequestToken!,
        new CookieOptions { HttpOnly = false });

    return Results.Ok();
});

app.UseCors(x =>
{
    x.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins("http://localhost:4200", "https://localhost:4200");
});

app.Use((context, next) =>
{
    context.Response.Headers.Append("Content-Security-Policy","default-src 'self'; " +
        "script-src 'self' 'sha256-6x6g2SYysPsSMI15om2cLqbYnqaoyjXQD+Aivk9OP4U=' 'unsafe-hashes';" +
        "style-src 'self' 'sha256-iRMiNe2NwxqT2S5ArUB2WrcT6nRR9eWw1E2VYNE3NUU=' 'sha256-AyW2Lr6xuHNclI4AsbSA2JlIfpAeaMyAzVjMfg02th8=' 'sha256-gfWbSqMaIhzFDWotFPK6wVQzZM9xlfkylhex2HcTSlg=' 'sha256-XZCCkbk2oiC1+DykvuORc/ItGr2/wJRwtFSnvjvR8uo=' 'sha256-rVW3NLobSEoK7uC3PFZuUl+zbIEVsk/gxEzmzKTWlWM=' 'sha256-VSFKhBqYhZMSIzZXZWOxo+WXpcuQAF4enn12FU2lq8Y=' 'sha256-MEKPoHUt+IjUsM5J8OeWtb71ENjttY2FlU58K0YKAD4=' 'sha256-alaPYKGJRxnofSpeQbi63K4FJdm+ToFKXLPJ5wFktoo=' 'sha256-CBA9zLtZY8+BbJ1ul2Jy7nmf/efAHAORq/YYRAjoKLY=' 'sha256-vmRnG8lm0sh/u0IQDbbxJCWeiVR1lEaJrK0QtS9e7LA=' 'sha256-Rmg6xaLOiZ1aYmwiE9tCm3QOytO40eewnqL5z202A8E=' 'sha256-z7FI6PaAZCMqjhrcPhxCPWYtvLUDsjbzmrNneCtevBg=' 'sha256-47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=' 'sha256-WSx1iIx6Vs65WCkyoEshYTK4ELSPJbUtVvlMmpnZN4A=' 'sha256-AD5ceoa23Vw8BCfBxQU7PO1HTTTvPyKoHAY3srpeSd8=' 'sha256-n6eSA4JEz7Q1fuSBKy60EwwL9V+ouSg30bMLNfKSm38=' 'sha256-BFlTuVF512e8p4qpoVWklguRV1JobQs4MJY9d95THik=' 'sha256-F026EizKEISuDAWkjm4qLRMIDDk9pCcRlKjUxWyqNAo=' 'sha256-tnMNIZvZ3RrdRXFRfH0P4dSMV5GSTx+ba0EBiGH4Pz8=' 'sha256-xm1txALNKnpiRyvCh9CXokm2ywLffHpCo7nhSykzld4=' 'sha256-yn+fKNL6W3dHWqvat7GD14gkq78wYrEbPu49T75mI4c=' 'sha256-08kQ8chUlBbGQAlv06NoDrIs/M1C91bvBlneOOfrodI=' 'sha256-r4EahBTBzmXTvyDHgqP64fCFiCA8QxhvPfcniLICzRg=' 'sha256-X3UL3mZ1nLhAAai/WXqlwd8rNLKGSqGF3cH70jqE9wo=' 'sha256-zsMUAHlrvyNk8TKankS7tuqUQsfmsn9hNFAvx8ORU0c=' 'sha256-6+xrB84CYABvwa7VIETQdUCD3HStPhPSis77S9bcv5o=' 'sha256-6sIzcaul50U8AZICS7MRWYygQHY6bmXZwuQPBJPSbBU=' 'sha256-TnWqp2L5e1iIDB0Q0SazdjyDcat3AhigUWozxLuTRh8=' 'sha256-/UlHt8CzlAaH3BzCXTLsUa9rF0L33BOIclEX6QWD4bY=' 'sha256-lwJeVkZL3Zs5T16nPtplaIO3nHVCX2v1qEfNGVcWwpg=' 'sha256-lwJeVkZL3Zs5T16nPtplaIO3nHVCX2v1qEfNGVcWwpg=';" +
        "font-src 'self' https://fonts.gstatic.com;"
    );
    return next();
});

app.UseDefaultFiles();
app.UseStaticFiles();

app.MapGroup("api").MapIdentityApi<AppUser>();
app.MapControllers();

app.MapFallbackToController("Index", "Fallback");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseOpenApi();
    app.UseSwaggerUi();
}

try
{
    using var scope = app.Services.CreateScope();
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<StoreContext>();
    var userManager = services.GetRequiredService<UserManager<AppUser>>();
    await context.Database.MigrateAsync();
    await StoreContextSeed.SeedAsync(context, userManager);
}
catch (Exception ex)
{
    Console.WriteLine(ex);
    throw;
}

app.Run();
