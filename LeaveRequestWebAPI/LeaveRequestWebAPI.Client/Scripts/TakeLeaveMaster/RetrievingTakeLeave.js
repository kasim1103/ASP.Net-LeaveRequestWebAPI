$(document).ready(function () {
//    LoadIndexEmployee();
//    LoadLeaveCombo();
//    LoadProvinceCombo();
//    LoadPositionCombo();
//    LoadDivisionCombo();
//    LoadManagerCombo();
//    $('#table').DataTable({
//        "ajax": LoadIndexEmployee()
//    })
//    ClearScreen();
})

function LoadLeaveCombo() {
    $.ajax({
        url: "http://localhost:18565/api/Leaves/",
        type: "GET",
        dataType: "json",
        success: function (result) {
            var leave = $('#TakeLeave');
            leave.empty();
            $("<option></option>").text("Select Leave").appendTo(leave);
            $.each(result, function (i, Leave) {
                $("<option></option>").val(Leave.Id).text(Leave.Name).appendTo(leave);
            });
        }
    });
}