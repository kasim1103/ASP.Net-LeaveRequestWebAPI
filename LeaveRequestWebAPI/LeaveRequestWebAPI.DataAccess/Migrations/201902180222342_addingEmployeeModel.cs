namespace LeaveRequestWebAPI.DataAccess.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addingEmployeeModel : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Employees",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Gender = c.String(),
                        Address = c.String(),
                        Religion = c.String(),
                        Marriage = c.String(),
                        ChildrenTotal = c.Int(nullable: false),
                        LastYear = c.Int(nullable: false),
                        ThisYear = c.Int(nullable: false),
                        Username = c.String(),
                        Password = c.String(),
                        JoinDate = c.DateTimeOffset(nullable: false, precision: 7),
                        CreateDate = c.DateTimeOffset(nullable: false, precision: 7),
                        UpdateDate = c.DateTimeOffset(nullable: false, precision: 7),
                        DeleteDate = c.DateTimeOffset(nullable: false, precision: 7),
                        IsDelete = c.Boolean(nullable: false),
                        Divisions_Id = c.Int(),
                        Managers_Id = c.Int(),
                        Positions_Id = c.Int(),
                        Villages_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Divisions", t => t.Divisions_Id)
                .ForeignKey("dbo.Managers", t => t.Managers_Id)
                .ForeignKey("dbo.Positions", t => t.Positions_Id)
                .ForeignKey("dbo.Villages", t => t.Villages_Id)
                .Index(t => t.Divisions_Id)
                .Index(t => t.Managers_Id)
                .Index(t => t.Positions_Id)
                .Index(t => t.Villages_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Employees", "Villages_Id", "dbo.Villages");
            DropForeignKey("dbo.Employees", "Positions_Id", "dbo.Positions");
            DropForeignKey("dbo.Employees", "Managers_Id", "dbo.Managers");
            DropForeignKey("dbo.Employees", "Divisions_Id", "dbo.Divisions");
            DropIndex("dbo.Employees", new[] { "Villages_Id" });
            DropIndex("dbo.Employees", new[] { "Positions_Id" });
            DropIndex("dbo.Employees", new[] { "Managers_Id" });
            DropIndex("dbo.Employees", new[] { "Divisions_Id" });
            DropTable("dbo.Employees");
        }
    }
}
