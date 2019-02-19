namespace LeaveRequestWebAPI.DataAccess.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class updateEmployeeModel : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Employees", "FirstName", c => c.String());
            AddColumn("dbo.Employees", "LastName", c => c.String());
            AddColumn("dbo.Employees", "Picture", c => c.String());
            AddColumn("dbo.Employees", "Religions_Id", c => c.Int());
            CreateIndex("dbo.Employees", "Religions_Id");
            AddForeignKey("dbo.Employees", "Religions_Id", "dbo.Religions", "Id");
            DropColumn("dbo.Employees", "Name");
            DropColumn("dbo.Employees", "Religion");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Employees", "Religion", c => c.String());
            AddColumn("dbo.Employees", "Name", c => c.String());
            DropForeignKey("dbo.Employees", "Religions_Id", "dbo.Religions");
            DropIndex("dbo.Employees", new[] { "Religions_Id" });
            DropColumn("dbo.Employees", "Religions_Id");
            DropColumn("dbo.Employees", "Picture");
            DropColumn("dbo.Employees", "LastName");
            DropColumn("dbo.Employees", "FirstName");
        }
    }
}
