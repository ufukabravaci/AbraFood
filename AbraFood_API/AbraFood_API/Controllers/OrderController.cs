using AbraFood_API.Data;
using AbraFood_API.Models;
using AbraFood_API.Models.Dto;
using AbraFood_API.Services;
using AbraFood_API.Utility;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace AbraFood_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        private readonly IBlobService _blobService;
        private ApiResponse _response;
        public OrderController(ApplicationDbContext db,IBlobService blobService)
        {
            _db = db;
            _blobService = blobService;
            _response = new ApiResponse();
        }



        [HttpGet]
        public async Task<ActionResult<ApiResponse>> GetOrders(string? userId)
        {
            try
            {
                var orderHeaders = _db.OrderHeaders
                      .Include(u => u.OrderDetails)
                      .ThenInclude(u => u.MenuItem)
                      .OrderByDescending(u => u.OrderHeaderId)
                      .AsQueryable(); // We need to hold it as queryable or it errors.


                if (!string.IsNullOrWhiteSpace(userId))
                {
                    orderHeaders = orderHeaders.Where(u => u.ApplicationUserId == userId);
                }

                var orders = await orderHeaders.ToListAsync(); // Now we can implement the query
                _response.Result = orders;
                _response.StatusCode = HttpStatusCode.OK;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string>() { ex.ToString() };
            }

            return _response;
        }


        [HttpGet("{id:int}")] // Specific orderId
        public async Task<ActionResult<ApiResponse>> GetOrders(int? id)
        {
            try
            {
                if(id == 0)
                {
                    _response.StatusCode= HttpStatusCode.BadRequest;
                    return BadRequest(_response);
                }
                var orderHeaders = _db.OrderHeaders.Include(u => u.OrderDetails).ThenInclude(u => u.MenuItem)
                    .Where(u => u.OrderHeaderId == id);
                if(orderHeaders == null)
                {
                _response.StatusCode = HttpStatusCode.NotFound;
                    return NotFound(_response);
                }
                _response.StatusCode = HttpStatusCode.OK;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string>() { ex.ToString() };
            }

            return _response;
        }

        [HttpPost]
        public async Task<ActionResult<ApiResponse>> CreateOrder([FromBody] OrderHeaderCreateDTO orderHeaderDTO)
        {
            try
            {
                OrderHeader order = new()
                {
                    ApplicationUserId = orderHeaderDTO.ApplicationUserId,
                    PickupMail = orderHeaderDTO.PickupMail,
                    PickupName = orderHeaderDTO.PickupName,
                    PickupPhoneNumber = orderHeaderDTO.PickupPhoneNumber,
                    OrderTotal = orderHeaderDTO.OrderTotal,
                    OrderDate = DateTime.Now,
                    StripePaymentIntentId = orderHeaderDTO.StripePaymentIntentId,
                    TotalItems = orderHeaderDTO.TotalItems,
                    Status = String.IsNullOrEmpty(orderHeaderDTO.Status) ? SD.status_pending : orderHeaderDTO.Status,
                };
                if(ModelState.IsValid)
                {
                    _db.OrderHeaders.Add(order);
                    _db.SaveChanges();
                    foreach(var orderDetailDTO in orderHeaderDTO.OrderDetailsDTO) //orderheader added. Now we can loop through every orderDetail in orderheader
                    {
                        OrderDetails orderDetails = new()
                        {
                            OrderHeaderId = order.OrderHeaderId,
                            ItemName = orderDetailDTO.ItemName,
                            MenuItemId = orderDetailDTO.MenuItemId,
                            Price = orderDetailDTO.Price,
                            Quantity = orderDetailDTO.Quantity,
                        };
                        _db.OrderDetails.Add(orderDetails);
                    }
                    _db.SaveChanges();// save them together.
                    _response.Result = order;
                    order.OrderDetails = null;
                    _response.StatusCode = HttpStatusCode.Created;
                    return Ok(_response);
                }
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string> { ex.ToString() };
                throw;
            }

            return _response;
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult<ApiResponse>> UpdateOrderHeader(int id, [FromBody]OrderHeaderUpdateDTO orderHeaderUpdateDTO)
        {
            try
            {
                if (orderHeaderUpdateDTO == null || id != orderHeaderUpdateDTO.OrderHeaderId)
                {
                    _response.IsSuccess = false;
                    _response.StatusCode = HttpStatusCode.BadRequest;
                    return BadRequest();
                }
                OrderHeader orderFromDb = _db.OrderHeaders.FirstOrDefault(o => id == o.OrderHeaderId);
                if (orderFromDb == null)
                {
                    _response.IsSuccess = false;
                    _response.StatusCode = HttpStatusCode.BadRequest;
                    return BadRequest();
                }
                if (!string.IsNullOrEmpty(orderHeaderUpdateDTO.PickupName))
                {
                    orderFromDb.PickupName = orderHeaderUpdateDTO.PickupName;
                }
                if (!string.IsNullOrEmpty(orderHeaderUpdateDTO.PickupPhoneNumber))
                {
                    orderFromDb.PickupPhoneNumber = orderHeaderUpdateDTO.PickupPhoneNumber;
                }
                if (!string.IsNullOrEmpty(orderHeaderUpdateDTO.PickupMail))
                {
                    orderFromDb.PickupMail = orderHeaderUpdateDTO.PickupMail;
                }
                if (!string.IsNullOrEmpty(orderHeaderUpdateDTO.Status))
                {
                    orderFromDb.Status = orderHeaderUpdateDTO.Status;
                }
                if (!string.IsNullOrEmpty(orderHeaderUpdateDTO.StripePaymentIntentId))
                {
                    orderFromDb.StripePaymentIntentId = orderHeaderUpdateDTO.StripePaymentIntentId;
                }
                _db.SaveChanges();
                _response.IsSuccess = true;
                _response.StatusCode = HttpStatusCode.NoContent;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string>() { ex.ToString() };
            }
            return _response;
        }
    }
}
