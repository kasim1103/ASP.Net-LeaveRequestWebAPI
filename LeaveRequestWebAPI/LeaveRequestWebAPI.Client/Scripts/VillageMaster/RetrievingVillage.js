$(document).ready(function () {
    LoadIndexVillage();
    LoadDistrictComboBox();
    hideAlert();
    $('#table').DataTable({
        "ajax":
            LoadIndexVillage()
    })
    ClearScreen();
})

function LoadIndexVillage() {
    $.ajax({
        type: 'GET',
        url: "http://localhost:18565/api/Villages/",
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
                html += '<td>' + val.Districts.Name + '</td>';
                html += '<td> <a href="#" onclick="return GetById(' + val.Id + ')">Edit</a>';
                html += ' | <a href="#" onclick="return Delete(' + val.Id + ')">Delete</a> </td>';
                html += '</tr>';
                i++;
            });
            $('.tbody').html(html);
        }
    });
}

function LoadDistrictComboBox() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:18565/api/Districts/',
        datatype: 'json',
        success: function (result) {
            var districtId = $('#Districts_Id');
            $.each(result, function (i, Districts) {
                $("<option></option>").val(Districts.Id).text(Districts.Name).appendTo(districtId);
            });
        }
    });
}

function Save() {
    var village = new Object();
    village.name = $('#Name').val();
    village.Districts_Id = $('#Districts_Id').val();
    $.ajax({
        type: 'POST',
        url: "http://localhost:18565/api/Villages/",
        data: village,
        datatype: 'json',
        success: function (result) {
            LoadIndexVillage();
            $('#myModal').modal('hide');
        }
    });
};

function GetById(Id) {
    $.ajax({
        type: 'GET',
        url: "http://localhost:18565/api/Villages/Get/" + Id,
        datatype: 'json',
        success: function (result) {
            $('#Id').val(result.Id);
            $('#Name').val(result.Name);
            $('#Districts_Id').val(result.Districts.Id);

            $('#myModal').modal('show');
            $('#Update').show();
            $('#Save').hide();
        }
    })
}

function Edit() {
    debugger;
    var village = new Object();
    village.id = $('#Id').val();
    village.name = $('#Name').val();
    village.Districts_Id = $('#Districts_Id').val();
    $.ajax({
        type: 'PUT',
        url: "http://localhost:18565/api/Villages/" + village.id,
        data: village,
        datatype: 'json',
        //success: function () {
        //    LoadIndexVillage();
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
                window.location.href = '/Villages/Index/';
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
            url: "http://localhost:18565/api/Villages/" + Id,
            type: "DELETE",
            success: function (response) {
                swal({
                    title: "Deleted!",
                    text: "That data has been soft delete!",
                    type: "success"
                }, function () {
                    LoadIndexVillage();
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
        $('#Districts_Id').val(0);

        $('#Update').hide();
        $('#Save').show();
    });
};

function hideAlert() {
    $('#Name').siblings('span.error').css('visibility', 'hidden');
    $('#Districts_Id').siblings('span.error').css('visibility', 'hidden');
}

function ValidationInsert() {
    var isAllvalid = true;
    if ($('#Name').val() == "" || $('#Name').val() == " ") {
        isAllvalid = false;
        $('#Name').siblings('span.error').css('visibility', 'visible');
    } else {
        $('#Name').siblings('span.error').css('visibility', 'hidden');
    }

    if ($('#Districts_Id').val() == '0' || $('#Districts_Id').val() == 0 || $('#Districts_Id').val() == "Select") {
        isAllvalid = false;
        $('#Districts_Id').siblings('span.error').css('visibility', 'visible');
    } else {
        $('#Districts_Id').siblings('span.error').css('visibility', 'hidden');
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

    if ($('#Districts_Id').val() == "0" || $('#Districts_Id').val() == " " || $('#Districts_Id').val() == "Select") {
        isAllvalid = false;
        $('#Districts_Id').siblings('span.error').css('visibility', 'visible');
    } else {
        $('#Districts_Id').siblings('span.error').css('visibility', 'hidden');
    }

    if (isAllvalid) {
        Edit();
    }
}

