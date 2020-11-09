$(document).ready(async function() {
    var str = ` <section class="users-list-wrapper section">
                <div class="users-list-filter">
                    <div class="card">
                        <div class="card-content">
                        <div class="responsive-table">
                            <table id="table_id" class="display">
                                <thead>
                                    <tr>
                                        <th>Wilayah</th>
                                        <th>Laki-laki</th>
                                        <th>Perempuan</th>
                                        <th>Usia dibawah 35</th>
                                        <th>Usia 35 - 45</th>
                                        <th>Usia diatas 45</th>
                                    </tr>
                                </thead>
                                <tbody id="bodytable">
                                    
                                </tbody>
                            </table>
                            </div>
                        </div>
                    </div>
                </div>
              </section>`;
    $('.container').html(str);
    var data = await R.aget(`http://${R.hostport}/allkecamatankelurahan`, document.cookie.replace("token=", ""));
    var rekap = await R.aget(`http://${R.hostport}/get/rekapdpt`, document.cookie.replace("token=", ""));
    console.log(rekap)
    var str = '<tr>' + Object.keys(data.kec).map(function(kecId) {
        kec_nama = data.kec[kecId]['kec_nama'];
        return `<td><a href="/dpt/rekap/?kec_id=${kecId}&kec_nama=${kec_nama}">${kec_nama}</a></td>
                 <td>${kecId in rekap.message ? rekap.message[kecId][ 'L' ] : '-'}</td>
                 <td>${kecId in rekap.message ? rekap.message[kecId][ 'P' ] : '-'}</td>
                 <td>${kecId in rekap.message ? rekap.message[kecId][ 'UMUR_LOW' ] : '-'}</td>
                 <td>${kecId in rekap.message ? rekap.message[kecId][ 'UMUR_MED' ] : '-'}</td>
                 <td>${kecId in rekap.message ? rekap.message[kecId][ 'UMUR_HIGH' ] : '-'}</td>`;
    }).join('</tr><tr>') + '</tr>';
    if (R.getUrlVars()['kec_id']) {
        $('#headtitle').text('REKAPITULASI DPT DESA');
        var kec_nama = R.getUrlVars()['kec_nama'];
        R.breadcrumbsList([{
            'link': `/dpt/rekap/`,
            'label': 'Kecamatan ' + R.getUrlVars()['kec_nama']
        }])
        var kecId = R.getUrlVars()['kec_id'];
        var strKel = '<tr>' + Object.keys(data.kel).filter((kelID) => {
            return data.kel[kelID]['kel_kec_id'] == kecId;
        }).map((kelID) => {
            return `<td><a href="/dpt/list/?kec_id=${kecId}&kec_nama=${kec_nama}&kel_id=${kelID}&kel_nama=${data.kel[kelID]['kel_nama']}">${data.kel[kelID]['kel_nama']}</a></td>
                <td>${kecId in rekap.message ? kelID in rekap.message[kecId] ? rekap.message[kecId][kelID][ 'L' ] : '-' : '-'}</td>
                <td>${kecId in rekap.message ? kelID in rekap.message[kecId] ? rekap.message[kecId][kelID][ 'P' ] : '-' : '-'}</td>
                <td>${kecId in rekap.message ? kelID in rekap.message[kecId] ? rekap.message[kecId][kelID][ 'UMUR_LOW' ] : '-' : '-'}</td>
                <td>${kecId in rekap.message ? kelID in rekap.message[kecId] ? rekap.message[kecId][kelID][ 'UMUR_MED' ] : '-' : '-'}</td>
                <td>${kecId in rekap.message ? kelID in rekap.message[kecId] ? rekap.message[kecId][kelID][ 'UMUR_HIGH' ] : '-' : '-'}</td>`;
        }).join('</tr><tr>') + '</tr>';
        $('#bodytable').html(strKel);
        $('#table_id').DataTable({
            "paging": false,
            "searching": true,
            "responsive": true,
            "scrollX": true
        });
    } else {
        $('#headtitle').text('REKAPITULASI DPT KECAMATAN');
        $('#bodytable').html(str);
        $('#table_id').DataTable({
            "paging": false,
            "searching": true,
            "responsive": true,
            "scrollX": true
        });
    }
})