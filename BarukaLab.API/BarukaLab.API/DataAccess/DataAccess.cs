using System.Data.Common;
using System.Data.SqlClient;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BarukaLab.API.Models;
using Microsoft.IdentityModel.Tokens;

namespace BarukaLab.API.DataAccess
{
  public class DataAccess : IDataAccess
  {
    private readonly IConfiguration configuration;
    private readonly string dbconnection;
    private readonly string dateformat;
    public DataAccess(IConfiguration configuration)
    {
      this.configuration = configuration;
      dbconnection = this.configuration["ConnectionStrings:DB"];
      dateformat = this.configuration["Constants:DateFormat"];
    }

    public Offer GetOffer(int id)
    {
      var offer = new Offer();
      using (SqlConnection connection = new(dbconnection))
      {
        SqlCommand command = new()
        {
          Connection = connection
        };

        string query = "SELECT * FROM Offers WHERE OfferId=" + id + ";";
        command.CommandText = query;

        connection.Open();
        SqlDataReader r = command.ExecuteReader();
        while (r.Read())
        {
          offer.Id = (int)r["OfferId"];
          offer.Title = (string)r["Title"];
          offer.Discount = (int)r["Discount"];
        }


      }
        return offer;
    }
    public Product GetProduct(int id)
    {
      var product = new Product();
      using (SqlConnection connection = new(dbconnection))
      {
        SqlCommand command = new()
        {
          Connection = connection
        };

        string query = "SELECT * FROM Products WHERE ProductId=" + id + ";";
        command.CommandText = query;

        connection.Open();
        SqlDataReader reader = command.ExecuteReader();
        while (reader.Read())
        {
          product.Id = (int)reader["ProductId"];
          product.Title = (string)reader["Title"];
          product.Description = (string)reader["Description"];
          product.Price = (double)reader["Price"];
          product.Quantity = (int)reader["Quantity"];
          product.ImageName = (string)reader["ImageName"];

          var categoryid = (int)reader["CategoryId"];
          product.ProductCategory = GetProductCategory(categoryid);

          var offerid = (int)reader["OfferId"];
          product.Offer = GetOffer(offerid);
        }
      }
      return product;
    }
    public List<ProductCategory> GetProductCategories()
    {
      var productCategories = new List<ProductCategory>();
      using (SqlConnection connection = new(dbconnection))
      {
        SqlCommand command = new()
        {
          Connection = connection
        };
        string query = "SELECT * FROM ProductCategories;";
        command.CommandText = query;

        connection.Open();
        SqlDataReader reader = command.ExecuteReader();
        while (reader.Read())
        {
          var category = new ProductCategory()
          {
            Id = (int)reader["CategoryId"],
            Category = (string)reader["Category"],
            SubCategory = (string)reader["SubCategory"]
          };
          productCategories.Add(category);
        }
      }
        return productCategories;
    }

    public ProductCategory GetProductCategory(int id)
    {
      var productCategory = new ProductCategory();

      using (SqlConnection connection = new(dbconnection))
      {
        SqlCommand command = new()
        {
          Connection = connection
        };

        string query = "SELECT * FROM ProductCategories WHERE CategoryId=" + id + ";";
        command.CommandText = query;

        connection.Open();
        SqlDataReader r = command.ExecuteReader();
        while (r.Read())
        {
          productCategory.Id = (int)r["CategoryId"];
          productCategory.Category = (string)r["Category"];
          productCategory.SubCategory = (string)r["SubCategory"];
        }
      }

      return productCategory;
    }

    public List<Product> GetProducts(string category, string subcategory, int count)
    {
      var products = new List<Product>();
      using (SqlConnection connection = new(dbconnection))
      {
        SqlCommand command = new()
        {
          Connection = connection
        };

        string query = "SELECT TOP " + count + " * FROM Products WHERE CategoryId=(SELECT CategoryId FROM ProductCategories WHERE Category=@c AND SubCategory=@s) ORDER BY newid();";
        command.CommandText = query;
        command.Parameters.Add("@c", System.Data.SqlDbType.NVarChar).Value = category;
        command.Parameters.Add("@s", System.Data.SqlDbType.NVarChar).Value = subcategory;

        connection.Open();
        SqlDataReader reader = command.ExecuteReader();
        while (reader.Read())
        {
          var product = new Product()
          {
            Id = (int)reader["ProductId"],
            Title = (string)reader["Title"],
            Description = (string)reader["Description"],
            Price = (double)reader["Price"],
            Quantity = (int)reader["Quantity"],
            ImageName = (string)reader["ImageName"]
          };

          var categoryid = (int)reader["CategoryId"];
          product.ProductCategory = GetProductCategory(categoryid);

          var offerid = (int)reader["OfferId"];
          product.Offer = GetOffer(offerid);

          products.Add(product);
        }
      }
      return products;
    }

    public bool InsertUser(User user)
    {
      using (SqlConnection connection = new(dbconnection))
      {
        SqlCommand command = new()
        {
          Connection = connection
        };
        connection.Open();

        string query = "SELECT COUNT(*) FROM Users WHERE Email='" + user.Email + "';";
        command.CommandText = query;
        int count = (int)command.ExecuteScalar();
        if (count > 0)
        {
          connection.Close();
          return false;
        }

        query = "INSERT INTO Users (FirstName, LastName, Address, Mobile, Email, Password, CreatedAt, ModifiedAt) values (@fn, @ln, @add, @mb, @em, @pwd, @cat, @mat);";

        command.CommandText = query;
        command.Parameters.Add("@fn", System.Data.SqlDbType.NVarChar).Value = user.FirstName;
        command.Parameters.Add("@ln", System.Data.SqlDbType.NVarChar).Value = user.LastName;
        command.Parameters.Add("@add", System.Data.SqlDbType.NVarChar).Value = user.Address;
        command.Parameters.Add("@mb", System.Data.SqlDbType.NVarChar).Value = user.Mobile;
        command.Parameters.Add("@em", System.Data.SqlDbType.NVarChar).Value = user.Email;
        command.Parameters.Add("@pwd", System.Data.SqlDbType.NVarChar).Value = user.Password;
        command.Parameters.Add("@cat", System.Data.SqlDbType.NVarChar).Value = user.CreatedAt;
        command.Parameters.Add("@mat", System.Data.SqlDbType.NVarChar).Value = user.ModifiedAt;

        command.ExecuteNonQuery();
      }
      return true;
    }

    public string IsUserPresent(string email, string password)
    {
      User user = new();
      using (SqlConnection connection = new(dbconnection))
      {
        SqlCommand command = new()
        {
          Connection = connection
        };

        connection.Open();
        string query = "SELECT COUNT(*) FROM Users WHERE Email='" + email + "' AND Password='" + password + "';";
        command.CommandText = query;
        int count = (int)command.ExecuteScalar();
        if (count == 0)
        {
          connection.Close();
          return "";
        }

        query = "SELECT * FROM Users WHERE Email='" + email + "' AND Password='" + password + "';";
        command.CommandText = query;

        SqlDataReader reader = command.ExecuteReader();
        while (reader.Read())
        {
          user.Id = (int)reader["UserId"];
          user.FirstName = (string)reader["FirstName"];
          user.LastName = (string)reader["LastName"];
          user.Email = (string)reader["Email"];
          user.Address = (string)reader["Address"];
          user.Mobile = (string)reader["Mobile"];
          user.Password = (string)reader["Password"];
          user.CreatedAt = (string)reader["CreatedAt"];
          user.ModifiedAt = (string)reader["ModifiedAt"];
        }

        string key = "MNU66iBl3T5rh6H52i69";
        string duration = "60";
        var symmetrickey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
        var credentials = new SigningCredentials(symmetrickey, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
                    new Claim("id", user.Id.ToString()),
                    new Claim("firstName", user.FirstName),
                    new Claim("lastName", user.LastName),
                    new Claim("address", user.Address),
                    new Claim("mobile", user.Mobile),
                    new Claim("email", user.Email),
                    new Claim("createdAt", user.CreatedAt),
                    new Claim("modifiedAt", user.ModifiedAt)
                };

        var jwtToken = new JwtSecurityToken(
            issuer: "localhost",
            audience: "localhost",
            claims: claims,
            expires: DateTime.Now.AddMinutes(Int32.Parse(duration)),
            signingCredentials: credentials);

        return new JwtSecurityTokenHandler().WriteToken(jwtToken);
      }
      return "";
    }
  }

}
