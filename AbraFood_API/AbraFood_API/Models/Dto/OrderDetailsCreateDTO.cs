using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace AbraFood_API.Models.Dto
{
    public class OrderDetailsCreateDTO
    {
        [Required]
        public int MenuItemId { get; set; }
        [Required]
        public int Quantity { get; set; }
        [Required]
        public string ItemName { get; set; } // In case of itemname or price changes, these values shouldn't be change too.
        [Required]
        public double Price { get; set; }
    }
}
