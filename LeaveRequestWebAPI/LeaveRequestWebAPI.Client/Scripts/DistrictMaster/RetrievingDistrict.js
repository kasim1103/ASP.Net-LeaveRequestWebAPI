$(document).ready(function () {
    LoadIndexDistrict();
    LoadRegencyComboBox();
    hideAlert();
    $('#table').DataTable({
        "ajax":
            LoadIndexDistrict()
    })
    ClearScreen();
})

function LoadIndexDistrict() {
    $.ajax({
        type: 'GET',
        url: "http://localhost:18565/api/Districts/",
        async: false,
        datatype: 'json',
        success: function (data) {
            var html = '';
            var i = 1;
            $.each(data, function (index, val) {
                html += '<tr>';
                // untuk menampilkan no
                html += '<td>' + i + '</td>';
                html += '<td>' + val.Name + '</td>';

                //nampilin foreign key
                html += '<td>' + val.Regencies.Name + '</td>';
                html += '<td> <a href="#" onclick="return GetById(' + val.Id + ')">Edit</a>';
                html += ' | <a href="#" onclick="return Delete(' + val.Id + ')">Delete</a> </td>';
                html += '</tr>';
                i++;
            });
            $('.tbody').html(html);
        }
    });
}

function LoadRegencyComboBox() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:18565/api/Regencies/',
        datatype: 'json',
        success: function (result) {
            var regencyId = $('#Regencies_Id');
            $.each(result, function (i, Regencies) {
                $("<option></option>").val(Regencies.Id).text(Regencies.Name).appendTo(regencyId);
            });
        }
    });
}

function Save() {
    var district = new Object();
    district.name = $('#Name').val();
    district.Regencies_Id = $('#Regencies_Id').val();
    $.ajax({
        type: 'POST',
        url: "http://localhost:18565/api/Districts/",
        data: district,
        datatype: 'json',
        success: function (result) {
            LoadIndexDistrict();
            $('#myModal').modal('hide');
        }
    });
};

function GetById(Id) {
    $.ajax({
        type: 'GET',
        url: "http://localhost:18565/api/Districts/Get/" + Id,
        datatype: 'json',
        success: function (result) {
            $('#Id').val(result.Id);
            $('#Name').val(result.Name);
            $('#Regencies_Id').val(result.Regencies.Id);

            $('#myModal').modal('show');
            $('#Update').show();
            $('#Save').hide();
        }
    })
}

function Edit() {
    debugger;
    var district = new Object();
    district.id = $('#Id').val();
   district.name = $('#Name').val();
   district.Districts_Id = $('#Regencies_Id').val();
    $.ajax({
        type: 'PUT',
        url: "http://localhost:18565/api/Districts/" + district.id,
        data: district,
        datatype: 'json',
        //success: function () {
        //    LoadIndexDistrict();
        //            $('#myModal').modal('hide');
        //            $('#Id').val('');
        //            $('#Name').val('');
        //            $('#Price').val('');
        //            $('#Stock').val('');
        //}
        success: function (response) {
            swal({
                title: "Update !!!",
                text: "Your data has been saved",
                type: "success"
            }, function () {
                window.location.href = '/Districts/Index/';
                $('#Id').val('');
                $('#Name').val('');
            });
        },
        error: function (response) {
            swal("Ooops, we could't connect to the server!", "error");
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
            url: "http://localhost:18565/api/Districts/" + Id,
            type: "DELETE",
            success: function (response) {
                swal({
                    title: "Deleted!",
                    text: "That data has been soft delete!",
                    type: "success"
                }, function () {
                    LoadIndexDistrict();
                    //window.location.href = '/Supplier/Index/';

                });
            },
            error: function (response) {
                swal("Oops", "We could't connect to the server", "error");
            }
        });
    });
}

function ClearScreen() {
    $('#myModal').on('hidden.bs.modal', function () {
        $(this).find("input,textarea,select").val('').end();
        $('#Regencies_Id').val(0);

        $('#Update').hide();
        $('#Save').show();
    });
};

function hideAlert() {
    $('#Name').siblings('span.error').css('visibility', 'hidden');
    $('#Regencies_Id').siblings('span.error').css('visibility', 'hidden');
}

function ValidationInsert() {
    var isAllvalid = true;
    if ($('#Name').val() == "" || $('#Name').val() == " ") {
        isAllvalid = false;
        $('#Name').siblings('span.error').css('visibility', 'visible');
    } else {
        $('#Name').siblings('span.error').css('visibility', 'hidden');
    }

    if ($('#Regencies_Id').val() == '0' || $('#Regencies_Id').val() == 0 || $('#Regencies_Id').val() == "Select") {
        isAllvalid = false;
        $('#Regencies_Id').siblings('span.error').css('visibility', 'visible');
    } else {
        $('#Regencies_Id').siblings('span.error').css('visibility', 'hidden');
    }

    if (isAllvalid) {
        Save();
    }
}

function ValidationUpdate() {
    var isAllvalid = true;
    if ($('#Name').val() == "" || $('#Name').val() == " ") {
        isAllvalid = false;
        $('#Name').siblings('span.error').css('visibility', 'visible');
    } else {
        $('#Name').siblings('span.error').css('visibility', 'hidden');
    }

    if ($('#Regencies_Id').val() == "0" || $('#Regencies_Id').val() == " " || $('#Regencies_Id').val() == "Select") {
        isAllvalid = false;
        $('#Regencies_Id').siblings('span.error').css('visibility', 'visible');
    } else {
        $('#Regencies_Id').siblings('span.error').css('visibility', 'hidden');
    }

    if (isAllvalid) {
        Edit();
    }
}

