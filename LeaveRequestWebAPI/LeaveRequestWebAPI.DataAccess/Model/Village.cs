﻿using LeaveRequestWebAPI.Core.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LeaveRequestWebAPI.DataAccess.Model
{
    public class Village : BaseModel
    {
        public string Name { get; set; }
        public virtual District Districts { get; set; }
    }
}
