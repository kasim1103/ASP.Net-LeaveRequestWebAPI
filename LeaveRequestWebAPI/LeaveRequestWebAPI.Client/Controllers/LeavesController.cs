using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace LeaveRequestWebAPI.Client.Controllers
{
    public class LeavesController : Controller
    {
        // GET: Leaves
        public ActionResult Index()
        {
            return View();
        }
    }
}