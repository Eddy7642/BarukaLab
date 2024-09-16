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

    [HttpGet("GetProducts")]
    public IActionResult GetProducts(string category, string subcategory, int count)
    {
      var result = dataAccess.GetProducts(category, subcategory, count);
      return Ok(result);
    }

    [HttpGet("GetProduct/{id}")]
    public IActionResult GetProduct(int id)
    {
      var result = dataAccess.GetProduct(id);
      return Ok(result);
    }
  }
}
