using LeaveRequestWebAPI.DataAccess.Context;
using LeaveRequestWebAPI.DataAccess.Model;
using LeaveRequestWebAPI.DataAccess.Param;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LeaveRequestWebAPI.Common.Repository.Master
{
    public class HolidayRepository : IHolidayRepository
    {
        MyContext myContext = new MyContext();
        Holiday holiday = new Holiday();

        private bool status = false;
        public bool Delete(int? Id)
        {
            var result = 0;
            var HolidayId = Get(Id);
            HolidayId.IsDelete = true;
            HolidayId.DeleteDate = DateTimeOffset.UtcNow.LocalDateTime;
            result = myContext.SaveChanges();
            if (result > 0)
            {
                status = true;
            }

            return status;
        }

        public List<Holiday> Get()
        {
            return myContext.Holidays.Where(x => x.IsDelete == false).ToList();
        }

        public Holiday Get(int? Id)
        {
            return myContext.Holidays.Find(Id);
        }

        public bool Insert(HolidayParam holidayParam)
        {
            var result = 0;
            holiday.Name = holidayParam.Name;
            holiday.CreateDate = DateTimeOffset.UtcNow.LocalDateTime;
            myContext.Holidays.Add(holiday);
            result = myContext.SaveChanges();
            if (result > 0)
            {
                status = true;
            }
            return status;
        }

        public bool Update(int? Id, HolidayParam HolidayParam)
        {
            var result = 0;
            var HolidayId = Get(Id);
            HolidayId.Name = HolidayParam.Name;
            HolidayId.UpdateDate = DateTimeOffset.UtcNow.LocalDateTime;
            result = myContext.SaveChanges();
            if (result > 0)
            {
                status = true;
            }
            return status;
        }
    }
}
