var str = ` <section class="users-list-wrapper section">
                <div class="users-list-filter">
                    <div class="card">
                        <div id="myGrid" style="height: 600px;width:100%;" class="ag-theme-balham"></div>
                    </div>
                </div>
              </section>`
$(document).ready(async function() {
    $('#headtitle').text('Daftar DPT');
    $('.container').html(str);
    if (R.getUrlVars()['kec_nama']) {
        R.breadcrumbsList([{
            'link': '/dpt/rekap/',
            'label': 'Kecamatan ' + R.getUrlVars()['kec_nama']
        }, {
            'link': `/dpt/rekap/?kec_id=${R.getUrlVars()['kec_id']}&kec_nama=${R.getUrlVars()['kec_nama']}`,
            'label': 'Kelurahan ' + R.getUrlVars()['kel_nama']
        }])
    }


    $('#buttonhead').html(`<a class="waves-effect waves-light btn-small right blue">
        <i class="material-icons right ">cloud_download</i>Download</a>`);

    //var keckel = await R.aget(`http://${R.hostport}/allkecamatankelurahan`, document.cookie.replace("token=", ""));
    var query = R.getUrlVars()['kec_id'] ? ( R.getUrlVars()['kel_id'] ? `?kec=${R.getUrlVars()['kec_id']}&kel=${R.getUrlVars()['kel_id']}` : `?kec=${R.getUrlVars()['kec_id']}` ) : ''; 
    var dpt = await R.aget(`http://${R.hostport}/get/dpt${query}`, document.cookie.replace("token=", ""));

    rowData = dpt.message;
    var columnDefs = [
        { headerName: "KECAMATAN", field: "KEC_NAMA" },
        { headerName: "DESA", field: "KEL_NAMA" },
        { headerName: "NO KK", field: "NO_KK" },
        { headerName: "NIK", field: "NIK" },
        { headerName: "NAMA", field: "NAMA" },
        { headerName: "TANGGAL LAHIR", field: "TANGGAL_LAHIR" },
        { headerName: "JENIS KELAMIN", field: "JENIS_KELAMIN" },
        { headerName: "JALAN/DUKUH", field: "ALAMAT" },
        { headerName: "RT", field: "RT" },
        { headerName: "RW", field: "RW" },
        { headerName: "TPS", field: "TPS" }
    ];


    // specify the data
    // let the grid know which columns and what data to use
    var gridOptions = {
        columnDefs: columnDefs,
        rowData: rowData,
        defaultColDef: {
            editable: true,
            sortable: true,
            flex: 1,
            minWidth: 100,
            filter: true,
            floatingFilter: true,
            resizable: true,
        }
    };
    var eGridDiv = document.querySelector('#myGrid');
    new agGrid.Grid(eGridDiv, gridOptions);

    function autoSizeAll(skipHeader) {
      var allColumnIds = [];
      gridOptions.columnApi.getAllColumns().forEach(function (column) {
        allColumnIds.push(column.colId);
      });

      gridOptions.columnApi.autoSizeColumns(allColumnIds, skipHeader);
    }
    autoSizeAll(false);
    
})