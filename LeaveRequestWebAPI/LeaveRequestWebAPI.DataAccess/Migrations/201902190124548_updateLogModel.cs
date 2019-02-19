namespace LeaveRequestWebAPI.DataAccess.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class updateLogModel : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Logs", "Employees_Id", c => c.Int());
            CreateIndex("dbo.Logs", "Employees_Id");
            AddForeignKey("dbo.Logs", "Employees_Id", "dbo.Employees", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Logs", "Employees_Id", "dbo.Employees");
            DropIndex("dbo.Logs", new[] { "Employees_Id" });
            DropColumn("dbo.Logs", "Employees_Id");
        }
    }
}
