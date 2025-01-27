namespace Core.Entities;

public class Recommendation : BaseEntity
{
    public bool HasBeenCompleted { get; private set; }
    public required string Title { get; set; }
    public string? Message { get; set; }
    public int PatientId { get; set; }
    public void MarkAsCompleted()
    {
        HasBeenCompleted = true;
    }
}