$(document).ready(function () {
    LoadIndexLeave();
    HideAlert();
    $('#table').DataTable({
        "ajax": LoadIndexLeave()
    })
    ClearScreen();
})

function LoadIndexLeave() {
    $.ajax({
        type: "GET",
        url: "http://localhost:18565/api/Leaves/",
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
                html += '<td>' + val.Name + '</td>';
                html += '<td>' + val.Status + '</td>';
                html += '<td>' + val.Days + '</td>';
                //nampilin foreign key
                //html += '<td>' + val.Regency.Name + '</td>';
                html += '<td> <a href="#" onclick="return GetById(' + val.Id + ')">Edit</a>';
                html += ' | <a href="#" onclick="return Delete(' + val.Id + ')">Delete</a> </td>';
                html += '</tr>';
                i++;
            });
            $('.tbody').html(html);
        }
    });
}


function Save() {
    var leave = new Object();
    leave.Name = $('#Name').val();
    leave.Status = $('#TakeLeaveType').val();
    leave.Days = $('#Days').val();
    $.ajax({
        url: "http://localhost:18565/api/Leaves/",
        type: 'POST',
        datatype: 'json',
        data: leave,
        success: function (result) {
            LoadIndexLeave();
            $('#myModal').modal('hide');
        }
    });
};

function Edit() {
    var leave = new Object();
    leave.Id = $('#Id').val();
    leave.Name = $('#Name').val();
    leave.Status = $('#TakeLeaveType').val();
    leave.Days = $('#Days').val();
    $.ajax({
        url: "http://localhost:18565/api/Leaves/" + leave.Id,
        type: "PUT",
        datatype: "json",
        data: leave,
        success: function (result) {
            LoadIndexLeave();
            $('#myModal').modal('hide');
            $('#Name').val('');
        }
    });
};

function GetById(Id) {
    $.ajax({
        url: "http://localhost:18565/api/Leaves/Get/" + Id,
        type: "GET",
        datatype: "json",
        success: function (result) {
            $('#Id').val(result.Id);
            $('#Name').val(result.Name);
            $('#TakeLeaveType').val(result.Status);
            $('#Days').val(result.Days);

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
            url: "http://localhost:18565/api/Leaves/" + Id,
            type: "DELETE",
            success: function (response) {
                swal({
                    title: "Deleted!",
                    text: "That data has been soft delete!",
                    type: "success"
                }, function () {
                    LoadIndexLeave();
                    //window.location.href = '/Supplier/Index/';

                });
            },
            error: function (response) {
                swal("Oops", "We could't connect to the server", "error");
            }
        });
    });
};

function ValidationInsert() {
    var isAllValid = true;
    if ($('#Name').val() == "" || $('#Name').val() == " ") {
        isAllValid = false;
        $('#Name').siblings('span.error').css('visibility', 'visible');
    } else {
        $('#Name').siblings('span.error').css('visibility', 'hidden');
    }
    if ($('#TakeLeaveType').val() == "" || $('#TakeLeaveType').val() == " ") {
        isAllValid = false;
        $('#TakeLeaveType').siblings('span.error').css('visibility', 'visible');
    } else {
        $('#TakeLeaveType').siblings('span.error').css('visibility', 'hidden');
    }
    if ($('#Days').val() == "" || $('#Days').val() == " ") {
        isAllValid = false;
        $('#Days').siblings('span.error').css('visibility', 'visible');
    } else {
        $('#Days').siblings('span.error').css('visibility', 'hidden');
    }
    if (isAllValid) {
        Save();
    }
}

function ValidationUpdate() {
    var isAllValid = true;
    if ($('#Name').val() == "" || $('#Name').val() == " ") {
        isAllValid = false;
        $('#Name').siblings('span.error').css('visibility', 'visible');
    } else {
        $('#Name').siblings('span.error').css('visibility', 'hidden');
    }
    if ($('#TakeLeaveType').val() == "" || $('#TakeLeaveType').val() == " ") {
        isAllValid = false;
        $('#TakeLeaveType').siblings('span.error').css('visibility', 'visible');
    } else {
        $('#TakeLeaveType').siblings('span.error').css('visibility', 'hidden');
    }
    if ($('#Days').val() == "" || $('#Days').val() == " ") {
        isAllValid = false;
        $('#Days').siblings('span.error').css('visibility', 'visible');
    } else {
        $('#Days').siblings('span.error').css('visibility', 'hidden');
    }
    if (isAllValid) {
        Edit();
    }
}

function HideAlert() {
    $('#Name').siblings('span.error').css('visibility', 'hidden');
    $('#TakeLeaveType').siblings('span.error').css('visibility', 'hidden');
    $('#Days').siblings('span.error').css('visibility', 'hidden');
}

function ClearScreen() {
    $('#myModal').on('hidden.bs.modal', function () {
        $(this).find("input,textarea,select").val('').end();
        $('#Update').hide();
        $('#Save').show();
    });
};