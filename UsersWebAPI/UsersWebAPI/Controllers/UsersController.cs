using Dapper;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using UsersWebAPI.Models;

namespace UsersWebAPI.Controllers
{
    public class UsersController : ApiController
    {
        // GET: api/Users
        public IEnumerable<User> Get()
        {
            List<User> users = new List<User>();
            using (IDbConnection db = new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
            {
                users = db.Query<User>("SELECT * FROM Users").ToList();
            }
            return users;
        }

        // GET: api/Users/5
        public User Get(int id)
        {
            User user = null;
            using (IDbConnection db = new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
            {
                user = db.Query<User>("SELECT * FROM Users WHERE Id = @id", new { id }).FirstOrDefault();
            }
            return user;
        }

        // POST: api/Users
        public string Post([FromBody]User user)
        {
            using (IDbConnection db = new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
            {                
                var sqlQuery = "INSERT INTO Users(Name) VALUES(@Name)";
                db.Execute(sqlQuery, new { Name = user.Name });                
            }
            return "Added successfully";
        }

        // PUT: api/Users
        public string Put([FromBody]User user)
        {
            using (IDbConnection db = new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
            {
                var sqlQuery = "UPDATE Users SET Name = @Name WHERE Id = @Id";
                db.Execute(sqlQuery, new { Name = user.Name, Id = user.Id});
            }
            return "Updated successfully";
        }

        // DELETE: api/Users/5
        public string Delete(int id)
        {
            using (IDbConnection db = new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
            {
                var sqlQuery = "DELETE FROM Users WHERE Id = @id";
                db.Execute(sqlQuery, new { id });
            }
            return "Deleted successfully";
        }
    }
}
