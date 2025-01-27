using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using PatientManagement.RequestHelpers;

namespace PatientManagement.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BaseController : ControllerBase
{
    protected async Task<ActionResult> CreatePagedResult<T>(IGenericRepository<T> repo, ISpecification<T> spec,
        int pageIndex, int pageSize)
    {
        var items = await repo.GetListAsyncWithSpec(spec);
        var count = await repo.CountAsync(spec);
        var pagination = new Pagination<T?>(pageIndex, pageSize, count, items);
        return Ok(pagination);
    }
}