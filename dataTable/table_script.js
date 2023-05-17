window.addEventListener('DOMContentLoaded', init);

let dTable;

function init() {
  const path = getPathFromURL();
  document.title = path;
  createTable(path);
}

/***** Fetch URL parameter **********************/
/************************************************/

function getPathFromURL(){
    var url_string = window.location.href;
    var url = new URL(url_string);
    var path = url.searchParams.get("path");
    return path
}

/***** Fetch CSV data and create DataTable ******/
/************************************************/

function createTable(filePath) {
  fetch(filePath)
    .then(function(response) {
        return response.text();
    })
    .then(function(data) {
        CSVToTable(data);
    })
    .then(function() {
        initializeDataTable();
    });
}

function CSVToTable(csvString) {
    // split the CSV rows
    var rows = csvString.trim().split(/\r?\n|\r/); 
    
    if(rows.length > 0){
        var headerColumns = rows.shift().split('\t');
        headerRow = document.createElement('tr');
        headerColumns.forEach(columnTitle => {
            th = document.createElement('th');
            th.textContent = columnTitle;
            headerRow.append(th);
        });
        document.getElementById('dataTableHead').appendChild(headerRow);
    }
    
    if(rows.length > 0){
        dataTableBody = document.getElementById('dataTableBody');

        rows.forEach(row => {
            var data = row.split(/\t/);
            dataRow = document.createElement('tr');
            data.forEach(element => {
                td = document.createElement('td');
                td.textContent = element;
                dataRow.append(td);
            });
            dataTableBody.appendChild(dataRow);
        });
    }
}


function initializeDataTable() {
    dTable = new DataTable('#dataTable', {
        responsive: true,
        "lengthMenu": [5, 10, 15, 20, 25, 50, 100],
        "pageLength": 20
    });
}