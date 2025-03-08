using AbraFood_API.Data;
using AbraFood_API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace AbraFood_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShoppingCartController : ControllerBase
    {
        protected ApiResponse _response;
        private readonly ApplicationDbContext _db;
        public ShoppingCartController(ApplicationDbContext db)
        {
            _response = new ApiResponse();
            _db = db;
        }

        [HttpGet]
        public async Task<ActionResult<ApiResponse>> GetShoppingCart(string userId)
        {
            try
            {
                ShoppingCart shoppingCart = new();
                if (string.IsNullOrEmpty(userId)) // if empty or null return a empty cart
                {
                    shoppingCart = new();
                }
                else { 
                shoppingCart = _db.ShoppingCarts.Include(u => u.CartItems)
                    .ThenInclude(u => u.MenuItem).FirstOrDefault(x => x.UserId == userId);
                }

                if(shoppingCart.CartItems != null && shoppingCart.CartItems.Count > 0)
                {
                    shoppingCart.CartTotal = shoppingCart.CartItems.Sum(u => u.Quantity * u.MenuItem.Price);
                }

                _response.Result = shoppingCart;
                _response.StatusCode = HttpStatusCode.OK;
                return Ok(_response);
            }
            catch (Exception ex) 
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string>() {ex.ToString()};
                _response.StatusCode = HttpStatusCode.BadRequest;
            }
            return _response;
        }
        [HttpPost]
        public async Task<ActionResult<ApiResponse>> AddOrUpdateItemInCart(string userId,int menuItemId, int updateQuantityBy)
        {
            //Shopping cart will have one entry per user even if a user has many items in cart.
            //Cart items will have all the items in shopping cart for a user
            //updatequantityby will have count by with an items quantity needs to be updated
            //if it is -1 that means we have lower a count if it is 5 it means we have to add 5 count to existing count.
            //if updatequantityby is 0 item will be removed.

            ShoppingCart shoppingCart = _db.ShoppingCarts.Include(u => u.CartItems).FirstOrDefault(u => u.UserId == userId);
            MenuItem menuItem = _db.MenuItems.FirstOrDefault(m => m.Id == menuItemId);
            if (menuItem == null)
            {
                return BadRequest();
            }
            if (shoppingCart == null && updateQuantityBy > 0) 
            //Means create a shopping cart & add cart item.
            {
                ShoppingCart newCart = new() {UserId = userId};
                _db.ShoppingCarts.Add(newCart);
                _db.SaveChanges();
                CartItem newCartItem = new() 
                { 
                    MenuItemId = menuItemId,
                    Quantity = updateQuantityBy,
                    ShoppingCartId = newCart.Id,
                    MenuItem = null

                };
                _db.CartItems.Add(newCartItem);
                _db.SaveChanges();
            }
            else
            {
                //shopping cart exist
                CartItem cartItemInCart = shoppingCart.CartItems.FirstOrDefault(u => u.MenuItemId == menuItemId);
                if (cartItemInCart == null) 
                {
                    //item does not exist in current cart
                    CartItem newCartItem = new()
                    {
                        MenuItemId = menuItemId,
                        Quantity = updateQuantityBy,
                        ShoppingCartId = shoppingCart.Id,
                        MenuItem = null
                    };
                    _db.CartItems.Add(newCartItem);
                    _db.SaveChanges();
                }
                else
                {
                    //item already exist in current cart uğdate quantity
                    int newQuantity = cartItemInCart.Quantity + updateQuantityBy;
                    if(updateQuantityBy == 0 || newQuantity <= 0)
                    {
                        //remove cartItem form cart and if it is the only item then remove cart
                        _db.CartItems.Remove(cartItemInCart);
                        if(shoppingCart.CartItems.Count() == 1) // if it is only item in cart (changes didn't saved yet. that's why it is 1)
                        {
                            _db.ShoppingCarts.Remove(shoppingCart);
                        }
                        _db.SaveChanges();
                    }
                    else
                    {
                        cartItemInCart.Quantity = newQuantity;
                        _db.SaveChanges();
                    }
                }
            }
            //when a user adds a new item to a new shopping cart for the first time
            //when a user adds a new item to an existing shopping cart(means user has other items in cart)
            //when a user updates an existing item count
            //when a user removes an existing item.
            return _response;
        }

        
    }
}
