using BarukaLab.API.Models;

namespace BarukaLab.API.DataAccess
{
  public interface IDataAccess
  {

    List<ProductCategory> GetProductCategories();
    ProductCategory GetProductCategory(int id);
    Offer GetOffer(int id);
    List<Product> GetProducts(string category, string subcategory, int count);
    Product GetProduct(int id);
    bool InsertUser(User user);
    string IsUserPresent(string email, string password);
  }
}
