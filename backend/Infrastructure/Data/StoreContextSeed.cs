using Core.Entities;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Data;

public class StoreContextSeed
{
    public static async Task SeedAsync(StoreContext context, UserManager<AppUser> userManager)
    {

        if (!context.Roles.Any())
        {
            var adminRole = new IdentityRole{Name="Admin", NormalizedName = "ADMIN"};
            var hcpRole = new IdentityRole{Name="HealthCareProfessional", NormalizedName = "HEALTHCAREPROFESSIONAL"};
            context.Roles.Add(adminRole);
            context.Roles.Add(hcpRole);
        }   
        
        if (!userManager.Users.Any(user => user.UserName == "admin@test.com"))
        {
            var user = new AppUser
            {
                UserName = "admin@test.com",
                Email = "admin@test.com",
                FirstName = "admin",
                LastName = "user",
            };
            await userManager.CreateAsync(user, "Pa$$w0rd");
            await userManager.AddToRoleAsync(user, "Admin");
        }
    }
}