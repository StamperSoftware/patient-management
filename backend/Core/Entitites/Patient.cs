namespace Core.Entities;

public class Patient : BaseEntity
{
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public List<Recommendation>? Recommendations { get; set; }

}