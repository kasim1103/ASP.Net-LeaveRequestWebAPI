﻿using LeaveRequestWebAPI.BussinessLogic.Service;
using LeaveRequestWebAPI.Common.Repository;
using LeaveRequestWebAPI.Common.Repository.Master;
using LeaveRequestWebAPI.DataAccess.Model;
using LeaveRequestWebAPI.DataAccess.Param;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace LeaveRequestWebAPI.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class TakeLeavesController : ApiController
    {
        private readonly ITakeLeaveService _takeLeaveService;
        public TakeLeavesController(ITakeLeaveService takeLeaveService)
        {
            _takeLeaveService = takeLeaveService;
        }
        // GET: api/TakeLeaves
        public IEnumerable<TakeLeave> Get()
        {
            return _takeLeaveService.Get();
        }

        // GET: api/TakeLeaves/5
        public TakeLeave Get(int Id)
        {
            return _takeLeaveService.Get(Id);
        }

        // POST: api/TakeLeaves
        public void Post(TakeLeaveParam takeLeaveParam)
        {
            _takeLeaveService.Insert(takeLeaveParam);
        }

        // PUT: api/TakeLeaves/5
        public void Put(int Id, TakeLeaveParam takeLeaveParam)
        {
            _takeLeaveService.Update(Id, takeLeaveParam);
        }

        // DELETE: api/TakeLeaves/5
        public void Delete(int Id)
        {
            _takeLeaveService.Delete(Id);
        }
    }
}
