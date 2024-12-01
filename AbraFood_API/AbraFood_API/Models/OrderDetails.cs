using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AbraFood_API.Models
{
    public class OrderDetails
    {
        [Key]
        public int OrderDetailId { get; set; }
        [Required]
        public int OrderHeaderId { get; set; }
        [Required]
        public int MenuItemId { get; set; }
        [ForeignKey(nameof(MenuItemId))]
        public MenuItem MenuItem { get; set; }
        [Required]
        public int Quantity { get; set; }
        [Required]
        public string ItemName { get; set; } // In case of itemname or price changes, these values shouldn't be change too.
        [Required]
        public double Price { get; set; }
    }
}
