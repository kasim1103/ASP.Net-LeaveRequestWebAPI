$(document).ready(function () {
    LoadIndexLog();
    $('#table').DataTable({
        "ajax": LoadIndexLog()
    })
})

function LoadIndexLog() {
    $.ajax({
        type: "GET",
        url: "http://localhost:18565/api/Logs/",
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
                html += '<td>' + val.LogDate + '</td>';
                html += '<td>' + val.Employees.Name + '</td>';
                //nampilin foreign key
                //html += '<td>' + val.Regency.Name + '</td>';
                html += '</tr>';
                i++;
            });
            $('.tbody').html(html);
        }
    });
}


function Save() {
    var log = new Object();
    log.LogDate = $('#LogDate').val();
    log.Employees = $('#Employees').val();
    $.ajax({
        url: "http://localhost:18565/api/Logs/",
        type: 'POST',
        datatype: 'json',
        data: log,
        success: function (result) {
            LoadIndexLog();
            $('#myModal').modal('hide');
        }
    });
};