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
                html += '<td> <a href="#" onclick="return Accept(' + val.Id + ')">Accept</a>';
                html += ' | <a href="#" onclick="return Reject(' + val.Id + ')">Reject</a> </td>';
                html += '</tr>';
                i++;
            });
            $('.tbody').html(html);
        }
    });
}

function Accept(Id) {
    var takeLeave = new Object();
    takeLeave.Id = Id;
    takeLeave.ApprovalStatus = "Accepted";
    $.ajax({
        url: "http://localhost:18565/api/TakeLeaves/PutApproval/" + takeLeave.Id,
        type: "PUT",
        datatype: "json",
        data: takeLeave,
        success: function (result) {
            LoadIndexTakeLeave();
        }
    });
};

function Reject(Id) {
    var takeLeave = new Object();
    takeLeave.Id = Id;
    takeLeave.ApprovalStatus = "Rejected";
    $.ajax({
        url: "http://localhost:18565/api/TakeLeaves/PutApproval/" + takeLeave.Id,
        type: "PUT",
        datatype: "json",
        data: takeLeave,
        success: function (result) {
            LoadIndexTakeLeave();
        }
    });
};

//function GetByIdAccept(Id) {
//    $.ajax({
//        url: "http://localhost:18565/api/TakeLeaves/" + Id,
//        type: "GET",
//        datatype: "json",
//        success: function (result) {
//            Accept(Id);
//        }
//    });
//};

//function GetByIdReject(Id) {
//    $.ajax({
//        url: "http://localhost:18565/api/TakeLeaves/" + Id,
//        type: "GET",
//        datatype: "json",
//        success: function (result) {
//            Reject(Id);
//        }
//    });
//};

function ClearScreen() {
    $('#myModal').on('hidden.bs.modal', function () {
        $(this).find("input,textarea,select").val('').end();
        $('#Update').hide();
        $('#Save').show();
    });
};