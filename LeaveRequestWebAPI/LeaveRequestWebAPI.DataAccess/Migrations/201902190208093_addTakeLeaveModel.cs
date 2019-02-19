namespace LeaveRequestWebAPI.DataAccess.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addTakeLeaveModel : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.TakeLeaves",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Description = c.String(),
                        DateStart = c.DateTimeOffset(nullable: false, precision: 7),
                        DateEnd = c.DateTimeOffset(nullable: false, precision: 7),
                        ApprovalStatus = c.String(),
                        Difference = c.Int(nullable: false),
                        DateStartSpecial = c.DateTimeOffset(nullable: false, precision: 7),
                        DateEndSpecial = c.DateTimeOffset(nullable: false, precision: 7),
                        DifferenceSpecial = c.Int(nullable: false),
                        CreateDate = c.DateTimeOffset(nullable: false, precision: 7),
                        UpdateDate = c.DateTimeOffset(nullable: false, precision: 7),
                        DeleteDate = c.DateTimeOffset(nullable: false, precision: 7),
                        IsDelete = c.Boolean(nullable: false),
                        Employees_Id = c.Int(),
                        Leaves_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Employees", t => t.Employees_Id)
                .ForeignKey("dbo.Leaves", t => t.Leaves_Id)
                .Index(t => t.Employees_Id)
                .Index(t => t.Leaves_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.TakeLeaves", "Leaves_Id", "dbo.Leaves");
            DropForeignKey("dbo.TakeLeaves", "Employees_Id", "dbo.Employees");
            DropIndex("dbo.TakeLeaves", new[] { "Leaves_Id" });
            DropIndex("dbo.TakeLeaves", new[] { "Employees_Id" });
            DropTable("dbo.TakeLeaves");
        }
    }
}
