using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace LeaveRequestWebAPI.Client.Controllers
{
    public class VillagesController : Controller
    {
        // GET: Villages
        public ActionResult Index()
        {
            return View();
        }
    }
}