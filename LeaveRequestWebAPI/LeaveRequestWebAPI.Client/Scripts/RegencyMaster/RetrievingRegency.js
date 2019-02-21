$(document).ready(function () {
    LoadIndexRegency();
    LoadProvinceComboBox();
    hideAlert();
    $('#table').DataTable({
        "ajax":
            LoadIndexRegency()
    })
    ClearScreen();
})

function LoadIndexRegency() {
    $.ajax({
        type: 'GET',
        url: "http://localhost:18565/api/Regencies/",
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
                html += '<td>' + val.Provinces.Name + '</td>';
                html += '<td> <a href="#" onclick="return GetById(' + val.Id + ')">Edit</a>';
                html += ' | <a href="#" onclick="return Delete(' + val.Id + ')">Delete</a> </td>';
                html += '</tr>';
                i++;
            });
            $('.tbody').html(html);
        }
    });
}

function LoadProvinceComboBox() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:18565/api/Provinces/',
        datatype: 'json',
        success: function (result) {
            var provinceId = $('#Provinces_Id');
            $.each(result, function (i, Provinces) {
                $("<option></option>").val(Provinces.Id).text(Provinces.Name).appendTo(provinceId);
            });
        }
    });
}

function Save() {
    var regency = new Object();
    regency.name = $('#Name').val();
    regency.provinces_Id = $('#Provinces_Id').val();
    $.ajax({
        type: 'POST',
        url: "http://localhost:18565/api/Regencies/",
        data: regency,
        datatype: 'json',
        success: function (result) {
            LoadIndexRegency();
            $('#myModal').modal('hide');
        }
    });
};

function GetById(Id) {
    $.ajax({
        type: 'GET',
        url: "http://localhost:18565/api/Regencies/Get/" + Id,
        datatype: 'json',
        success: function (result) {
            $('#Id').val(result.Id);
            $('#Name').val(result.Name);
            $('#Provinces_Id').val(result.Provinces.Id);

            $('#myModal').modal('show');
            $('#Update').show();
            $('#Save').hide();
        }
    })
}

function Edit() {
    debugger;
    var regency = new Object();
    regency.id = $('#Id').val();
    regency.name = $('#Name').val();
    regency.regencies_Id = $('#Provinces_Id').val();
    $.ajax({
        type: 'PUT',
        url: "http://localhost:18565/api/Regencies/" + regency.id,
        data: regency,
        datatype: 'json',
        //success: function () {
        //    LoadIndexRegency();
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
                window.location.href = '/Regencies/Index/';
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
            url: "http://localhost:18565/api/Regencies/" + Id,
            type: "DELETE",
            success: function (response) {
                swal({
                    title: "Deleted!",
                    text: "That data has been soft delete!",
                    type: "success"
                }, function () {
                    LoadIndexRegency();
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
        $('#Provinces_Id').val(0);

        $('#Update').hide();
        $('#Save').show();
    });
};

function hideAlert() {
    $('#Name').siblings('span.error').css('visibility', 'hidden');
    $('#Provinces_Id').siblings('span.error').css('visibility', 'hidden');
}

function ValidationInsert() {
    var isAllvalid = true;
    if ($('#Name').val() == "" || $('#Name').val() == " ") {
        isAllvalid = false;
        $('#Name').siblings('span.error').css('visibility', 'visible');
    } else {
        $('#Name').siblings('span.error').css('visibility', 'hidden');
    }

    if ($('#Provinces_Id').val() == '0' || $('#Provinces_Id').val() == 0 || $('#Provinces_Id').val() == "Select") {
        isAllvalid = false;
        $('#Provinces_Id').siblings('span.error').css('visibility', 'visible');
    } else {
        $('#Provinces_Id').siblings('span.error').css('visibility', 'hidden');
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

    if ($('#Provinces_Id').val() == "0" || $('#Provinces_Id').val() == " " || $('#Provinces_Id').val() == "Select") {
        isAllvalid = false;
        $('#Provinces_Id').siblings('span.error').css('visibility', 'visible');
    } else {
        $('#Provinces_Id').siblings('span.error').css('visibility', 'hidden');
    }

    if (isAllvalid) {
        Edit();
    }
}

