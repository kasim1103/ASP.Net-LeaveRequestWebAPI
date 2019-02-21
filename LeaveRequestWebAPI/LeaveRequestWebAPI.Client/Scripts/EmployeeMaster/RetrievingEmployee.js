$(document).ready(function () {
    LoadIndexEmployee();
    LoadReligionCombo();
    LoadProvinceCombo();
    LoadPositionCombo();
    LoadDivisionCombo();
    LoadManagerCombo();
    $('#table').DataTable({
        "ajax": LoadIndexEmployee()
    })
    ClearScreen();
})

function LoadIndexEmployee() {
    $.ajax({
        type: "GET",
        url: "http://localhost:18565/api/Employees/",
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
                html += '<td>' + val.FirstName + '</td>';
                html += '<td>' + val.LastName + '</td>';
                html += '<td>' + val.Gender + '</td>';
                html += '<td>' + val.Address + '</td>';
                html += '<td>' + val.Villages.Name + '</td>';
                html += '<td>' + val.Religions.Name + '</td>';
                html += '<td>' + val.Marriage + '</td>';
                html += '<td>' + val.ChildrenTotal + '</td>';
                html += '<td>' + val.LastYear + '</td>';
                html += '<td>' + val.ThisYear + '</td>';
                html += '<td>' + val.JoinDate + '</td>';
                html += '<td>' + val.Positions.Name + '</td>';
                html += '<td>' + val.Divisions.Name + '</td>';
                html += '<td>' + val.Managers.FirstName + '</td>';
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

function LoadReligionCombo() {
    $.ajax({
        url: "http://localhost:18565/api/Religions/",
        type: "GET",
        dataType: "json",
        success: function (result) {
            var religion = $('#Religion');
            $.each(result, function (i, Religion) {
                $("<option></option>").val(Religion.Id).text(Religion.Name).appendTo(religion);
            });
        }
    });
}

function LoadProvinceCombo() {
    $.ajax({
        url: "http://localhost:18565/api/Provinces/",
        type: "GET",
        dataType: "json",
        success: function (result) {
            var province = $('#Province');
            $.each(result, function (i, Province) {
                $("<option></option>").val(Province.Id).text(Province.Name).appendTo(province);
            });
        }
    });
}

function LoadRegencyCombo() {
    $.ajax({
        url: "http://localhost:18565/api/Regencies/GetRegency/" + $('#Province').val(),
        type: "GET",
        dataType: "json",
        success: function (result) {
            var regency = $('#Regency');
            regency.empty();
            $("<option></option>").text("Select Regency").appendTo(regency);
            $.each(result, function (i, Regency) {
                $("<option></option>").val(Regency.Id).text(Regency.Name).appendTo(regency);
            });
        }
    });
}

function LoadRegencyEditCombo() {
    $.ajax({
        url: "http://localhost:18565/api/Regencies/",
        type: "GET",
        dataType: "json",
        success: function (result) {
            var regency = $('#Regency');
            regency.empty();
            $("<option></option>").text("Select Regency").appendTo(regency);
            $.each(result, function (i, Regency) {
                $("<option></option>").val(Regency.Id).text(Regency.Name).appendTo(regency);
            });
        }
    });
}

function LoadSubDistrictCombo() {
    $.ajax({
        url: "http://localhost:18565/api/Districts/GetDistrict/" + $('#Regency').val(),
        type: "GET",
        dataType: "json",
        success: function (result) {
            var district = $('#SubDistrict');
            district.empty();
            $("<option></option>").text("Select Sub-District").appendTo(district);
            $.each(result, function (i, District) {
                $("<option></option>").val(District.Id).text(District.Name).appendTo(district);
            });
        }
    });
}

function LoadSubDistrictEditCombo() {
    $.ajax({
        url: "http://localhost:18565/api/Districts/",
        type: "GET",
        dataType: "json",
        success: function (result) {
            var district = $('#SubDistrict');
            district.empty();
            $("<option></option>").text("Select Sub-District").appendTo(district);
            $.each(result, function (i, District) {
                $("<option></option>").val(District.Id).text(District.Name).appendTo(district);
            });
        }
    });
}

function LoadVillageCombo() {
    $.ajax({
        url: "http://localhost:18565/api/Villages/GetVillage/" + $('#SubDistrict').val(),
        type: "GET",
        dataType: "json",
        success: function (result) {
            var village = $('#Village');
            village.empty();
            $("<option></option>").text("Select Village").appendTo(village);
            $.each(result, function (i, Village) {
                $("<option></option>").val(Village.Id).text(Village.Name).appendTo(village);
            });
        }
    });
}

function LoadVillageEditCombo() {
    $.ajax({
        url: "http://localhost:18565/api/Villages/",
        type: "GET",
        dataType: "json",
        success: function (result) {
            var village = $('#Village');
            village.empty();
            $("<option></option>").text("Select Village").appendTo(village);
            $.each(result, function (i, Village) {
                $("<option></option>").val(Village.Id).text(Village.Name).appendTo(village);
            });
        }
    });
}

function LoadPositionCombo() {
    $.ajax({
        url: "http://localhost:18565/api/Positions/",
        type: "GET",
        dataType: "json",
        success: function (result) {
            var position = $('#Position');
            position.empty();
            $("<option></option>").text("Select Position").appendTo(position);
            $.each(result, function (i, Position) {
                $("<option></option>").val(Position.Id).text(Position.Name).appendTo(position);
            });
        }
    });
}

function LoadDivisionCombo() {
    $.ajax({
        url: "http://localhost:18565/api/Divisions/",
        type: "GET",
        dataType: "json",
        success: function (result) {
            var division = $('#Division');
            division.empty();
            $("<option></option>").text("Select Division").appendTo(division);
            $.each(result, function (i, Division) {
                $("<option></option>").val(Division.Id).text(Division.Name).appendTo(division);
            });
        }
    });
}

function LoadManagerCombo() {
    $.ajax({
        url: "http://localhost:18565/api/Employees/GetManager/" + 2,
        type: "GET",
        dataType: "json",
        success: function (result) {
            var manager = $('#Manager');
            manager.empty();
            $("<option></option>").text("Select Manager").appendTo(manager);
            $.each(result, function (i, Employee) {
                $("<option></option>").val(Employee.Id).text(Employee.FirstName).appendTo(manager);
            });
        }
    });
}

function Save() {
    var employee = new Object();
    employee.FirstName = $('#FirstName').val();
    employee.LastName = $('#LastName').val();
    employee.Gender = $('#Gender').val();
    employee.Address = $('#Address').val();
    employee.Marriage = $('#Marriage').val();
    employee.ChildrenTotal = $('#ChildrenTotal').val();
    employee.LastYear = $('#LastYear').val();
    employee.ThisYear = $('#ThisYear').val();
    employee.JoinDate = $('#JoinDate').val();
    employee.Religions_Id = $('#Religion').val();
    employee.Villages_Id = $('#Village').val();
    employee.Positions_Id = $('#Position').val();
    employee.Divisions_Id = $('#Division').val();
    employee.Managers_Id = $('#Manager').val();
    $.ajax({
        url: "http://localhost:18565/api/Employees/",
        type: 'POST',
        datatype: 'json',
        data: employee,
        success: function (result) {
            LoadIndexEmployee();
            $('#myModal').modal('hide');
        }
    });
};

function Edit() {
    var employee = new Object();
    employee.Id = $('#Id').val();
    employee.FirstName = $('#FirstName').val();
    employee.LastName = $('#LastName').val();
    employee.Gender = $('#Gender').val();
    employee.Address = $('#Address').val();
    employee.Marriage = $('#Marriage').val();
    employee.ChildrenTotal = $('#ChildrenTotal').val();
    employee.LastYear = $('#LastYear').val();
    employee.ThisYear = $('#ThisYear').val();
    employee.JoinDate = $('#JoinDate').val();
    employee.Religions_Id = $('#Religion').val();
    employee.Villages_Id = $('#Village').val();
    employee.Positions_Id = $('#Position').val();
    employee.Divisions_Id = $('#Division').val();
    employee.Managers_Id = $('#Manager').val();
    $.ajax({
        url: "http://localhost:18565/api/Employees/" + employee.Id,
        type: "PUT",
        datatype: "json",
        data: employee,
        success: function (result) {
            LoadIndexEmployee();
            $('#myModal').modal('hide');
            $('#Name').val('');
        }
    });
};

function GetById(Id) {
    LoadRegencyEditCombo();
    LoadSubDistrictEditCombo();
    LoadVillageEditCombo();
    $.ajax({
        url: "http://localhost:18565/api/Employees/Get/" + Id,
        type: "GET",
        datatype: "json",
        success: function (result) {
            $('#Id').val(result.Id);
            $('#FirstName').val(result.FirstName);
            $('#LastName').val(result.LastName);
            $('#Gender').val(result.Gender);
            $('#Address').val(result.Address);
            $('#Marriage').val(result.Marriage);
            $('#ChildrenTotal').val(result.ChildrenTotal);
            $('#LastYear').val(result.LastYear);
            $('#ThisYear').val(result.ThisYear);
            $('#JoinDate').val(result.JoinDate);
            $('#Religion').val(result.Religions.Id);
            $('#Province').val(result.Villages.Districts.Regencies.Provinces.Id);
            $('#Regency').val(result.Villages.Districts.Regencies.Id);
            $('#SubDistrict').val(result.Villages.Districts.Id);
            $('#Village').val(result.Villages.Id);
            $('#Division').val(result.Divisions.Id);
            $('#Position').val(result.Positions.Id);
            $('#Manager').val(result.Managers.Id);

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
            url: "http://localhost:18565/api/Employees/" + Id,
            type: "DELETE",
            success: function (response) {
                swal({
                    title: "Deleted!",
                    text: "That data has been soft delete!",
                    type: "success"
                }, function () {
                    LoadIndexEmployee();
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
    if ($('#Gender').val() == "" || $('#Gender').val() == " ") {
        isAllValid = false;
        $('#Gender').siblings('span.error').css('visibility', 'visible');
    } else {
        $('#Gender').siblings('span.error').css('visibility', 'hidden');
    }
    if (isAllValid) {
        Save();
    }
}

function ValidationUpdate() {
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
    if ($('#Gender').val() == "" || $('#Gender').val() == " ") {
        isAllValid = false;
        $('#Gender').siblings('span.error').css('visibility', 'visible');
    } else {
        $('#Gender').siblings('span.error').css('visibility', 'hidden');
    }
    if (isAllValid) {
        Edit();
    }
}

function ClearScreen() {
    $('#myModal').on('hidden.bs.modal', function () {
        $(this).find("input,textarea,select").val('').end();
        $('#Update').hide();
        $('#Save').show();
    });
};