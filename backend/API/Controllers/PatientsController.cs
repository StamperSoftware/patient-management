using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PatientManagement.DTOs;
using PatientManagement.Extensions;

namespace PatientManagement.Controllers;

[Authorize(Roles = "HealthCareProfessional")]
public class PatientsController(IGenericRepository<Patient> repo, IGenericRepository<Recommendation> recommendationRepo) : BaseController
{
    
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Patient>>> GetPatients([FromQuery]PatientSpecParams specParams)
    {
        var spec = new PatientSpecification(specParams);
        return await CreatePagedResult(repo, spec, specParams.PageIndex, specParams.PageSize);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<Patient>> GetPatient(int id)
    {
        var patient = await repo.GetByIdAsync(id);
        if (patient == null) return NotFound();
        return patient;
    }

    [HttpPost]
    public async Task<ActionResult<List<Patient>>> CreatePatient(Patient patient)
    {
        repo.Add(patient);
        if (await repo.SaveAllAsync())
        {
            return CreatedAtAction("GetPatient", new { id = patient.Id }, patient);
        }
        return BadRequest("Problem creating patient");
    }

    [HttpPost("{patientId:int}/recommendation")]
    public async Task<ActionResult<Recommendation>> AddRecommendation(RecommendationDto recommendationDto, int patientId)
    {
        var patient = await repo.GetByIdAsync(patientId);
        
        if (patient == null) return BadRequest("problem adding recommendation to patient");
        var newRecommendation = recommendationDto.ToEntity(patient);
        
        if (newRecommendation == null) return BadRequest("Could not create recommendation");
        patient.Recommendations?.Add(newRecommendation);
        await repo.SaveAllAsync();
        recommendationRepo.Add(newRecommendation);
        await recommendationRepo.SaveAllAsync();
        return Ok(newRecommendation);
    }
    
    [HttpGet("{patientId:int}/recommendation")]
    public async Task<ActionResult<List<Recommendation>>> GetRecommendationForPatient(int patientId)
    {
        var recommendations = await recommendationRepo.ListAllAsync();
        var patientRecommendations = recommendations.Where(r => r?.PatientId == patientId);
        return Ok(patientRecommendations);
    }
}