$(document).ready(async function() {
  var strXML = `
              <div class="row">
              <div class="col s12 m6 l6">
              <section class="users-list-wrapper section">
              <div class="users-list-filter">
                <div class="card">
                  <div class="card-content">
                    <h4 class="card-title">Form Upload Data DPT</h4>
                    <form class="row" action="#">
                      <div class="col s12">
                        <div class="input-field col s12">
                          <input id="kecamatan" type="text" class="validate">
                          <label for="kecamatan" class="">KECAMATAN</label>
                        </div>
                      </div>
                      <div class="col s12">
                        <div class="input-field col s12">
                          <input id="kelurahan" type="text" class="validate">
                          <label for="kelurahan" class="">KELURAHAN</label>
                        </div>
                      </div>
                      <div class="col s12">
                        <div class="input-field col s12">
                          <input id="sheettotal" type="text" class="validate">
                          <label for="sheettotal" class="">JUMLAH SHEET</label>
                        </div>
                      </div>
                      <div class="col s12">
                      <div class="file-field input-field">
                        <div class="btn">
                          <span>File</span>
                          <input id="file" type="file">
                        </div>
                        <div class="file-path-wrapper">
                          <input class="file-path validate" type="text">
                        </div>
                      </div>
                      </div>
                      <div class="col s12">
                          <div class="progress hide">
                              <div class="indeterminate"></div>
                          </div>
        
                          <div class="input-field col s12">
                            <button id="upload" class="btn cyan waves-effect waves-light right" type="button" name="action">
                              <span id="title_button">Upload</span>
                              <i class="material-icons right">send</i>
                            </button>
                          </div>
                        </div>
                    </form>
                  </div>
                </div>
              </div>
              </section>
              </div>
              <div class="col s12 m6 l6">
              <section class="users-list-wrapper section">
              <div class="users-list-filter">
                <div class="card">
                  <div class="card-content">
                    <h4 class="card-title">LOGS</h4>
                    <form class="row" action="#">
                      <div class="col s12">
                        <div class="input-field col s12">
                          <textarea id="log" style="margin: 0px; width: 400px; height: 364px;"></textarea>
                          <label for="log">Data Logs</label>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              </section>
              </div>
              </div>`;
    $('.container').html(strXML);
    var uploadingStatus = function(){
      $('.progress').removeClass('hide')
      $('#title_button').text('Uploading...')
      $('#upload').attr('disabled', 'disabled')
      $('#file').attr('disabled', 'disabled')
    }
    var progressStatus = function( sheet , persen ){
      $('#title_button').text('Uploading.. ' + sheet + ' - ' + persen + '%');
    }
    var doneUploadingStatus = function(){
      $('.progress').addClass('hide')
      $('#title_button').text('Done')
    }
    
    $('#upload').on('click', async function() {
        uploadingStatus();
        var keckel = await R.aget(`http://${R.hostport}/allkecamatankelurahan`, document.cookie.replace("token=", ""));
        console.log(keckel)
        var a = document.getElementById('file')
        var reader = new FileReader();
        reader.onload = async function(e) {
            var data = new Uint8Array(e.target.result);
            var workbook = XLSX.read(data, { type: 'array' });
            //console.log(workbook)
            await R.asyncForEach(workbook.SheetNames, async function( name ){
              var ws = workbook.Sheets[name];
              var arrRows = [];
              Object.keys(ws).forEach(function(rowcol) {
                  var col = /\w+/.exec(rowcol);
                  var row = /\d+/.exec(rowcol);
                  if( /\w+/.test(col) && /\d+/.test(row) ) {
                    if (!((row * 1) in arrRows)) arrRows[row * 1] = {};
                    arrRows[row * 1][rowcol] = 'v' in ws[rowcol] ? ws[rowcol]['v'] : '';
                  }
              })
              var kecamatan = ws['K5']['v'].replace(':', '').trim();
              var kelurahan = ws['K6']['v'].replace(':', '').trim();
              $('#kecamatan').val(kecamatan)
              $('#kelurahan').val(kelurahan)
              $('#sheettotal').val(workbook.SheetNames.length)
              M.updateTextFields();
              var tps = ws['K7']['v'].replace(':', '').trim();
              arrRowsFull = arrRows.filter(function( row ){
                var getA = Object.keys(row).filter( function(rowcol){ return /^A/.test(rowcol) } );
                var col = getA.length == 1 ? row[getA[0]] : 0;
                return /^\d{7}$/.test(col);
              })
              var kec_id = Object.values(keckel.kec).filter( ( obj ) => { return obj.kec_nama.toLowerCase() == kecamatan.toLowerCase(); } )[0]['kec_id'];
              var kel_id = Object.values(keckel.kel).filter( ( obj ) => { return obj.kel_nama.toLowerCase() == kelurahan.toLowerCase() && obj.kel_kec_id == kec_id; } )[0]['kel_id'];
              //console.log(kec_id, kel_id, kecamatan, kelurahan)
              await R.asyncForEach(arrRowsFull, async function(rows, index){
                progressStatus( name +'/'+ workbook.SheetNames[ workbook.SheetNames.length - 1 ], (index * 100 / arrRowsFull.length).toFixed(1)  )
                var row = /\d+/.exec(Object.keys(rows)[0]); 
                var objUpload = {};
                objUpload[`ID_DATA`] = rows['A' + row];
                objUpload[`NO`] = rows['B' + row];
                objUpload[`NO_KK`] = rows['C' + row];
                objUpload[`NIK`] = rows['D' + row];
                objUpload[`NAMA`] = rows['E' + row].replace(/\'/g, "");
                objUpload[`TEMPAT_LAHIR`] = rows['F' + row].replace(/\'/g, "");
                objUpload[`TANGGAL_LAHIR`] = rows['G' + row];
                objUpload[`JENIS_KELAMIN`] = rows['I' + row];
                objUpload[`ALAMAT`] = rows['J' + row].replace(/\'/g, "");
                objUpload[`RT`] = rows['K' + row];
                objUpload[`RW`] = rows['L' + row];
                objUpload[`DISABILITAS`] = rows['M' + row];
                objUpload[`STATUS_PEREKAMAN`] = rows['N' + row];
                objUpload[`KETERANGAN`] = rows['O' + row].replace(/\'/g, "");
                objUpload[`ID_KECAMATAN`] = kec_id;
                objUpload[`ID_KELURAHAN`] = kel_id;
                objUpload[`TPS`] = tps;
                var result = await R.apost(`http://${R.hostport}/post/dpt`, document.cookie.replace("token=", ""), objUpload);
                if( result.status == 'false' )
                  $('#log').append(result.message + "\n"); 
                //console.log(rows, rows['A11'])
              })
            });
              //console.log(arrRowsFull, kecamatan, kelurahan, tps)
            doneUploadingStatus();
        };
        reader.readAsArrayBuffer(a.files[0]);
    })

});

function getUrlVars() {
    var vars = [],
        hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}