using System.Security.Claims;
using Core.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PatientManagement.DTOs;

namespace PatientManagement.Controllers;

public class AccountsController(SignInManager<AppUser> signInManager, UserManager<AppUser> userManager) : BaseController
{
    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<ActionResult<IdentityResult>> Register(RegisterDto registerDto)
    {
        var user = new AppUser
        {
            FirstName = registerDto.FirstName,
            LastName = registerDto.LastName,
            Email = registerDto.Email,
            UserName = registerDto.Email
        };
        
        var result = await signInManager.UserManager.CreateAsync(user, registerDto.Password);
        if (!result.Succeeded)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(error.Code, error.Description);
            }
            return ValidationProblem();
        }

        await userManager.AddToRoleAsync(user, "HEALTHCAREPROFESSIONAL");
        
        return Ok(result);
    }
    
    [Authorize]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [HttpPost("logout")]
    public async Task<NoContentResult> Logout()
    {
        await signInManager.SignOutAsync();
        return NoContent();
    }

    [HttpGet("user-info")]
    public async Task<ActionResult<UserDto>> GetUserInfo()
    {
        if (User.Identity?.IsAuthenticated == false) return NoContent();
        var user = await signInManager.UserManager.GetUserAsync(User);
        if (user == null) return NoContent();
        
        return Ok(new UserDto
        {
            Id = user.Id,
            FirstName = user.FirstName,
            LastName = user.LastName,
            UserName = user.UserName,
            Roles = User.FindFirstValue(ClaimTypes.Role)
        });
    }
    
    [Authorize(Roles = "Admin")]
    [HttpGet]
    public ActionResult<List<UserDto>> GetUsers()
    {

        var users = userManager.Users.Select(user => new UserDto
        {
            Id = user.Id,
            FirstName = user.FirstName,
            LastName = user.LastName,
            UserName = user.UserName
        });
        
        return Ok(users);
    }

    [HttpGet("auth-status")]
    public ActionResult<IsAuthenticatedDto> GetAuthState()
    {
        return Ok(new IsAuthenticatedDto
        {
            IsAuthenticated = User.Identity?.IsAuthenticated ?? false,
        });
    }
}

