using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace LeaveRequestWebAPI.Client.Controllers
{
    public class ProvincesController : Controller
    {
        // GET: Provinces
        public ActionResult Index()
        {
            return View();
        }
    }
}