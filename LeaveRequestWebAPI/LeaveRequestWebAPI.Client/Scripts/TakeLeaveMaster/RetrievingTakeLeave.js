$(document).ready(function () {
    LoadIndexTakeLeave();
    ClearScreen();
})

function LoadIndexTakeLeave() {
    $.ajax({
        type: "GET",
        url: "http://localhost:18565/api/TakeLeaves/",
        //solving data table
        async: false,
        datatype: "JSON",
        success: function (data) {
            var html = '';
            var i = 1;
            $.each(data, function (index, val) {
                html += '<tr>';
                // untuk menampilkan no
                html += '<td>' + i + '</td>';
                html += '<td>' + val.Description + '</td>';
                html += '<td>' + val.Leaves.Status + '</td>';
                html += '<td>' + val.DateStart + '</td>';
                html += '<td>' + val.DateEnd + '</td>';
                html += '<td>' + val.Difference + '</td>';
                html += '<td>' + val.ApprovalStatus + '</td>';
                //nampilin foreign key
                //html += '<td>' + val.Regency.Name + '</td>';
                html += '<td> <a href="#" onclick="return GetById(' + val.Id + ')">Re-schedule</a>';
                html += ' | <a href="#" onclick="return Delete(' + val.Id + ')">Cancel</a> </td>';
                html += '</tr>';
                i++;
            });
            $('.tbody').html(html);
        }
    });
}

function LoadLeaveCombo() {
    $.ajax({
        url: "http://localhost:18565/api/Leaves/GetType/GetType?Type=" + $('#TakeLeaveType').val(),
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

function LoadLeaveComboEdit() {
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

function CountDifference() {
    var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    var firstDate = new Date($('#DateStart').val());
    var secondDate = new Date($('#DateEnd').val());

    if (firstDate <= secondDate) {
        var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay))) + 1;
        $('#Difference').val(diffDays);
        $('#DateEnd').siblings('span.error').css('visibility', 'hidden');
        document.getElementById("Save").disabled = false;
    } else {
        $('#DateEnd').siblings('span.error').css('visibility', 'visible');
        document.getElementById("Save").disabled = true;
    }
}

function Save() {
    var takeLeave = new Object();
    takeLeave.Description = $('#Description').val();
    takeLeave.DateStart = $('#DateStart').val();
    takeLeave.DateEnd = $('#DateEnd').val();
    takeLeave.ApprovalStatus = "Submitted";
    takeLeave.Difference = $('#Difference').val();
    takeLeave.DateStartSpecial = $('#DateStart').val();
    takeLeave.DateEndSpecial = $('#DateEnd').val();
    takeLeave.DifferenceSpecial = $('#Difference').val();
    takeLeave.Employee_Id = 6;
    takeLeave.Leave_Id = $('#TakeLeave').val();
    $.ajax({
        url: "http://localhost:18565/api/TakeLeaves/",
        type: 'POST',
        datatype: 'json',
        data: takeLeave,
        success: function (result) {
            LoadIndexTakeLeave();
            $('#myModal').modal('hide');
        }
    });
};

function Edit() {
    var takeLeave = new Object();
    takeLeave.Id = $('#Id').val();
    takeLeave.Description = $('#Description').val();
    takeLeave.DateStart = $('#DateStart').val();
    takeLeave.DateEnd = $('#DateEnd').val();
    takeLeave.ApprovalStatus = "Submitted";
    takeLeave.Difference = $('#Difference').val();
    takeLeave.DateStartSpecial = $('#DateStart').val();
    takeLeave.DateEndSpecial = $('#DateEnd').val();
    takeLeave.DifferenceSpecial = $('#Difference').val();
    takeLeave.Employee_Id = 6;
    takeLeave.Leave_Id = $('#TakeLeave').val();
    $.ajax({
        url: "http://localhost:18565/api/TakeLeaves/" + takeLeave.Id,
        type: "PUT",
        datatype: "json",
        data: takeLeave,
        success: function (result) {
            LoadIndexTakeLeave();
            $('#myModal').modal('hide');
            $('#Name').val('');
        }
    });
};

function GetById(Id) {
    LoadLeaveComboEdit();
    $.ajax({
        url: "http://localhost:18565/api/TakeLeaves/Get/" + Id,
        type: "GET",
        datatype: "json",
        success: function (result) {
            $('#Id').val(result.Id);
            $('#TakeLeaveType').val(result.Leaves.Status);
            $('#TakeLeave').val(result.Leaves.Id);
            $('#Description').val(result.Description);
            $('#DateStart').val(result.DateStart);
            $('#DateEnd').val(result.DateEnd);
            $('#Difference').val(result.Difference);

            $('#myModal').modal('show');
            $('#Update').show();
            $('#Save').hide();
        }
    });
};

function Delete(Id) {
    swal({
        title: "Are You Sure?",
        text: "You will not be able to recover this imaginary file!",
        type: "warning",
        showCancelButton: true,
        showCancelButtonColor: "#AD6B55",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false
    }, function () {
        $.ajax({
            url: "http://localhost:18565/api/TakeLeaves/" + Id,
            type: "DELETE",
            success: function (response) {
                swal({
                    title: "Deleted!",
                    text: "That data has been soft delete!",
                    type: "success"
                }, function () {
                    LoadIndexTakeLeave();
                    //window.location.href = '/Supplier/Index/';
                });
            },
            error: function (response) {
                swal("Oops", "We could't connect to the server", "error");
            }
        });
    });
};

function ClearScreen() {
    $('#myModal').on('hidden.bs.modal', function () {
        $(this).find("input,textarea,select").val('').end();
        $('#Update').hide();
        $('#Save').show();
    });
};