using System.ComponentModel.DataAnnotations.Schema;

namespace AbraFood_API.Models
{
    public class ShoppingCart
    {
        public int Id { get; set; }
        public string UserId { get; set; }

        

        public ICollection<CartItem> CartItems { get; set; }

        [NotMapped] //Doesn't create a column in database.
        public double CartTotal { get; set; }
        [NotMapped]
        public string StripePaymentIntentId { get; set; }
        [NotMapped]
        public string ClientSecret { get; set; }
    }
    

}
