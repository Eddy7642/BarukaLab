using BarukaLab.API.Models;

namespace BarukaLab.API.DataAccess
{
  public interface IDataAccess
  {

    List<ProductCategory> GetProductCategories();
  }
}
