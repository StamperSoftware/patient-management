namespace PatientManagement.DTOs;

public class UserDto
{
    public required string Id { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? UserName { get; set; }
    public string? Roles { get; set; }
}