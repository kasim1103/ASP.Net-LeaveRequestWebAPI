$(document).ready(function () {
    LoadIndexReligion();
    HideAlert();
    $('#table').DataTable({
        "ajax": LoadIndexReligion()
    })
    ClearScreen();
})

function LoadIndexReligion() {
    $.ajax({
        type: "GET",
        url: "http://localhost:18565/api/Religions/",
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
    var religion = new Object();
    religion.Name = $('#Name').val();
    $.ajax({
        url: "http://localhost:18565/api/Religions/",
        type: 'POST',
        datatype: 'json',
        data: religion,
        success: function (result) {
            LoadIndexReligion();
            $('#myModal').modal('hide');
        }
    });
};

function Edit() {
    var leave = new Object();
    leave.Id = $('#Id').val();
    leave.Name = $('#Name').val();
    leave.Status = $('#Status').val();
    leave.Days = $('#Days').val();
    $.ajax({
        url: "http://localhost:18565/api/Religions/" + leave.Id,
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
        url: "http://localhost:18565/api/Religions/" + Id,
        type: "GET",
        datatype: "json",
        success: function (result) {
            $('#Id').val(result.Id);
            $('#Name').val(result.Name);
            $('#Status').val(result.Status);
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
            url: "http://localhost:18565/api/Religions/" + Id,
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
    if ($('#Status').val() == "" || $('#Status').val() == " ") {
        isAllValid = false;
        $('#Status').siblings('span.error').css('visibility', 'visible');
    } else {
        $('#Status').siblings('span.error').css('visibility', 'hidden');
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
    if ($('#Status').val() == "" || $('#Status').val() == " ") {
        isAllValid = false;
        $('#Status').siblings('span.error').css('visibility', 'visible');
    } else {
        $('#Status').siblings('span.error').css('visibility', 'hidden');
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
    $('#Status').siblings('span.error').css('visibility', 'hidden');
    $('#Days').siblings('span.error').css('visibility', 'hidden');
}

function ClearScreen() {
    $('#myModal').on('hidden.bs.modal', function () {
        $(this).find("input,textarea,select").val('').end();
        $('#Update').hide();
        $('#Save').show();
    });
};