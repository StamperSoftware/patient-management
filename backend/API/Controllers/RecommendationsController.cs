using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace PatientManagement.Controllers;

[Authorize(Roles = "HealthCareProfessional")]
public class RecommendationsController(IGenericRepository<Recommendation> repo) : BaseController
{
    [HttpPost("{id:int}/mark-as-completed")]
    public async Task<ActionResult<Recommendation>> MarkAsCompleted(int id)
    {
        var recommendation = await repo.GetByIdAsync(id);
        
        if (recommendation == null) throw new Exception("Could not find recommendation");
        
        recommendation.MarkAsCompleted();
        await repo.SaveAllAsync();
        return Ok(recommendation);
    }
    
    [HttpGet("{id:int}")]
    public async Task<ActionResult<Recommendation>> GetRecommendation(int id)
    {
        var recommendation = await repo.GetByIdAsync(id);
        
        if (recommendation == null) throw new Exception("Could not find recommendation");
        
        return Ok(recommendation);
    }
    
    [HttpGet]
    public async Task<ActionResult<List<Recommendation>>> GetRecommendations()
    {
        var recommendations = await repo.ListAllAsync();
        
        if (recommendations == null) throw new Exception("Could not find recommendation");
        
        return Ok(recommendations);
    }
    
}