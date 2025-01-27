using Core.Entities;

namespace Core.Specifications;

public class PatientSpecification : BaseSpecification<Patient>
{
    public PatientSpecification(PatientSpecParams specParams) : base(x => 
        string.IsNullOrEmpty(specParams.Search) || 
        (x.FirstName + " " + x.LastName).ToLower().Contains(specParams.Search) || 
        x.Id.ToString().Equals(specParams.Search)
    )
    {
        ApplyPaging(specParams.PageSize * specParams.PageIndex, specParams.PageSize);
        AddOrderBy(x=>x.Id);
        
    }
}