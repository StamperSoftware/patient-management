using Core.Entities;
using PatientManagement.DTOs;

namespace PatientManagement.Extensions;

public static class RecommendationMappingExtensions
{
    public static RecommendationDto? ToDto(this Recommendation? recommendation)
    {
        if (recommendation == null) return null;

        return new RecommendationDto
        {
            Title = recommendation.Title,
            Message = recommendation.Message,
            PatientId = recommendation.PatientId
        };
    }

    public static Recommendation? ToEntity(this RecommendationDto? recommendationDto, Patient patient)
    {
        
        if (recommendationDto == null) return null;
        
        return new Recommendation
        {
            Title = recommendationDto.Title,
            Message = recommendationDto.Message,
            PatientId = patient.Id,
        };
    }
}