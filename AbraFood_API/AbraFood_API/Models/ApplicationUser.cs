using Microsoft.AspNetCore.Identity;

namespace AbraFood_API.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string Name { get; set; }
    }
}
