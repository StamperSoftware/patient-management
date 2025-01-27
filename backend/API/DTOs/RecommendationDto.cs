namespace PatientManagement.DTOs;

public class RecommendationDto
{
    public required string Title { get; set; }
    public string? Message { get; set; }
    public int PatientId { get; set; }
}