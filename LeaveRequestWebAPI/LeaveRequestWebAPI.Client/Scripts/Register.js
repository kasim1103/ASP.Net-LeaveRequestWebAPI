$(document).ready(function () {
    ClearScreen();
})

function Save() {
    var employee = new Object();
    employee.FirstName = $('#FirstName').val();
    employee.LastName = $('#LastName').val();
    employee.Username = $('#Username').val();
    employee.Password = $('#Password').val();
    employee.ChildrenTotal = 0;
    employee.LastYear = 0;
    employee.ThisYear = 0;
    employee.JoinDate = "01/01/2001 00.00.00 +07:00";
    $.ajax({
        url: "http://localhost:18565/api/Employees/",
        type: 'POST',
        datatype: 'json',
        data: employee,
//        success: function (result) {
//            LoadIndexEmployee();
//            $('#myModal').modal('hide');
//        }
        success: function (response) {
            swal({
                title: "Register Success !!!",
                text: "Your data has been saved",
                type: "success"
            }, function () {
                window.location.href = '/Employees/';
                $('#myModal').modal('hide');
            });
        },
        error: function (response) {
            swal("Ooops, we could't connect to the server!", "error");
        }
    });
};

function ValidationInsert() {
    var isAllValid = true;
    if ($('#FirstName').val() == "" || $('#FirstName').val() == " ") {
        isAllValid = false;
        $('#FirstName').siblings('span.error').css('visibility', 'visible');
    } else {
        $('#FirstName').siblings('span.error').css('visibility', 'hidden');
    }
    if ($('#LastName').val() == "" || $('#LastName').val() == " ") {
        isAllValid = false;
        $('#LastName').siblings('span.error').css('visibility', 'visible');
    } else {
        $('#LastName').siblings('span.error').css('visibility', 'hidden');
    }
    if (isAllValid) {
        Save();
    }
}

function ClearScreen() {
    $('#myModal').on('hidden.bs.modal', function () {
        $(this).find("input,textarea,select").val('').end();
    });
};