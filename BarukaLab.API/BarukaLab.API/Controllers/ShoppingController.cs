using BarukaLab.API.DataAccess;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BarukaLab.API.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class ShoppingController : ControllerBase
  {
    readonly IDataAccess dataAccess;
    private readonly string DateFormat;
    public ShoppingController(IDataAccess dataAccess, IConfiguration configuration)
    {
      this.dataAccess = dataAccess;
      DateFormat = configuration["Constants:DateFormat"];
    }

    [HttpGet("GetCategoryList")]
    public IActionResult GetCategoryList()
    {
      var result = dataAccess.GetProductCategories();
      return Ok(result);
    }
  }
}
