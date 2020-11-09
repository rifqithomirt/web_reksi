var str = `<div id="card-stats" class="pt-0">
			<div class="row backtrans">
				<div class="col s12 m12 l12">
				<h4 class="text-center" id="headline">Menuju Pilkada Kabupaten Blitar 2020</h4>
				</div>
				<div class="col s12 m12 l12 center-align">
					<!--h4 class="text-center" id="headline">Menuju Pilkada Kabupaten Blitar 2020</h4-->
				  <div id="countdown" class="center-align">
				    <ul>
				      <li><span id="days"></span>Hari</li>
				      <li><span id="hours"></span>Jam</li>
				      <li><span id="minutes"></span>Menit</li>
				      <li><span id="seconds"></span>Detik</li>
				    </ul>
				  </div>
				</div>
			</div>
            <div class="row">
            <div class="col s12 m6 l6 xl3">
            <div class="card gradient-45deg-light-blue-cyan gradient-shadow min-height-170 white-text animate fadeLeft" style="cursor: pointer;" onclick="window.location='/posko/list/';">
                <div class="padding-4 pt-10">
                    <div class="row">
                        <div class="col s7 m7 CENTER">
                        <i class="material-icons background-round mt-5">
                            <img src='/images/PKEC.png'></img>
                        </i>
                        <p>POSKO KECAMATAN</p>
                        </div>
                        <div class="col s5 m5 right-align">
                            <h2 id="totalposko" class="mb-0 white-text">0</h2>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <div class="col s12 m6 l6 xl3">
            <div class="card gradient-45deg-red-pink gradient-shadow min-height-170 white-text animate fadeLeft" style="cursor: pointer;" onclick="window.location='/posko/list/';">
                <div class="padding-4 pt-10">
                    <div class="row">
                        <div class="col s5 m5">
                        <i class="material-icons background-round mt-5"> <img src='/images/PDESA.png'></img></i>
                        <p>POSKO DESA</p>
                        </div>
                        <div class="col s7 m7 right-align">
                            <h2 id="totalposkodesa" class="mb-0 white-text">0</h2>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <div class="col s12 m6 l6 xl3">
            <div class="card gradient-45deg-amber-amber gradient-shadow min-height-170 white-text animate fadeRight" style="cursor: pointer;" onclick="window.location='/relawan/list/';">
                <div class="padding-4 pt-10">
                    <div class="row">
                        <div class="col s7 m7">
                        <i class="material-icons background-round mt-5"> <img src='/images/PRELAWAN.png'></img></i>
                        <p>RELAWAN</p>
                        </div>
                        <div class="col s5 m5 right-align">
                            <h2 id="totalrelawan" class="mb-0 white-text">0</h2>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <div class="col s12 m6 l6 xl3">
            <div class="card gradient-45deg-green-teal gradient-shadow min-height-170 white-text animate fadeRight">
                <div class="padding-4 pt-10">
                    <div class="row">
                        <div class="col s7 m7">
                        <i class="material-icons background-round mt-5"> <img src='/images/PPEMILIH.png'></img></i>
                        <p>PEMILIH</p>
                        </div>
                        <div class="col s5 m5 right-align">
                        <h4 class="mb-0 white-text">0%</h4>
                        <p class="no-margin">percentage</p>
                        <h5 id="totalpemilih" class="mb-0 white-text">0</h5>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            </div>
            </div>
            <div class="row">
                <div class="col s12 m6 l6">
                    <ul id="issues-collection" class="collection z-depth-1 animate fadeRight">
                    <li class="collection-item avatar view1">
                        <i class="material-icons accent-2 circle" style="background-color:#f00000;"><img src="/images/PRELAWAN.png"></img></i>
                        <h6 class="collection-header mt-1 mb-0">Relawan</h6>
                        <p>#Perolehan pemilih</p>
                    </li>
                    
                    </ul>
                </div>
                <div class="col s12 m6 l6">
                    <ul id="issues-collection2" class="collection z-depth-1 animate fadeRight">
                    <li class="collection-item avatar view1">
                        <i class="material-icons accent-2 circle" style="background-color:#f00000;"><img src="/images/PDESA.png"></img></i>
                        <h6 class="collection-header mt-1 mb-0">Posko Desa</h6>
                        <p>#Perolehan pemilih</p>
                    </li>
                    
                    </ul>
                </div>
            </div>
<div class="row">
   <div class="col s12 l12">
      <div class="card user-statistics-card animate fadeLeft">
         <div class="card-content">
            <h4 class="card-title mb-0 bold">Pemilih Statistics </h4>
            <div class="row">
               <div class="col s12 m12">
                  <canvas id="myChart" width="400" height="250"></canvas>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
<div class="row">
   <div class="col s12 m12">
      <div class="card user-statistics-card animate fadeLeft">
         <div class="card-content">
            <h4 class="card-title mb-0 bold">Sebaran Posko dan Relawan <a class="waves-effect waves-light waves-red btn-small" href="/sebaran/">Detail</a></h4>
            <div class="row pt-2">
               <div class="col s12 m12">
                  <div id="mapid" style="height: 300px;"></div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>`
$(document).ready(function() {
	$('#breadcrumbs-wrapper').empty();
    $('.container').html(str);
    $.ajax({
        url: 'http://' + R.hostport + '/get/posko/kecamatan/count',
        type: 'get',
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + document.cookie.replace("token=", ""))
        },
        success: function(data) {
            $('#totalposko').text(data.message.length);
        }
    });

    
    $.ajax({
        url: 'http://' + R.hostport + '/get/posko/desa/count',
        type: 'get',
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + document.cookie.replace("token=", ""))
        },
        success: function(data) {
            var len = data.message.length;
            //console.log(data, len)
            $('#totalposkodesa').text(len);
        }
    });
    $.ajax({
        url: 'http://' + R.hostport + '/allrelawan',
        type: 'get',
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + document.cookie.replace("token=", ""))
        },
        success: function(data) {

            var len = data.filter((obj) => {
                return obj.ur_status == 'VALID'
            }).length;
            //console.log(data, len)
            $('#totalrelawan').text(len);
        }
    });

    $.ajax({
        url: 'http://' + R.hostport + '/semuapemilih',
        type: 'get',
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + document.cookie.replace("token=", ""))
        },
        success: function(data) {

            var len = data.filter((obj) => {
                return obj.pe_status == 'VALID'
            }).length;
            //console.log(data, len)
            $('#totalpemilih').text(len);
        }
    });
    month_names_short = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    var arrDate = [];
    for (i = 30; i >= 0; i--) {
        var today = new Date(new Date().getTime() - (i * 24 * 3600 * 1000)).toISOString()
        arrDate.push({
            date: today.substr(0, 10),
            label: month_names_short[new Date(today).getMonth()] + ' ' + today.substr(8, 2)
        })
    }

    var ctx = document.getElementById('myChart').getContext('2d');
    //console.log(ctx)

    $.ajax({
        url: 'http://' + R.hostport + '/pemilihperhari',
        type: 'get',
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + document.cookie.replace("token=", ""))
        },
        success: function(data) {
            var arrData = arrDate.map(function(obj) {
                return obj.date in data ? data[obj.date]['total'] : 0
            })

            var arrLabels = arrDate.map(function(obj) {
                return obj.label
            })

            var chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: arrLabels,
                    datasets: [{
                        label: 'Pemilih Per Hari',
                        borderColor: 'rgb(255, 99, 132)',
                        data: arrData
                    }]
                },
                options: {
                    maintainAspectRatio: false
                }
            });

        }
    });

    map = L.map('mapid').setView([-8.1059, 112.1782], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    //L.tileLayer('http://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}.png', {attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CARTO</a>'}).addTo(map);



    $.ajax({
        url: 'http://' + R.hostport + '/get/rating',
        type: 'get',
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + document.cookie.replace("token=", ""))
        },
        success: function(data) {
            console.log(data.message)
            var sortable = [];
            for (var vehicle in data.message) {
                sortable.push([vehicle, data.message[vehicle]]);
            }
            sortable.sort(function(a, b) {
                return b[1] - a[1];
            });
            var arrSlicedRelawan = sortable.slice(0, 5)
            var strHtmlProgressX = ''
            for (var i = 0; i < 5; i++) {
            	if( i in arrSlicedRelawan){
            	var title = arrSlicedRelawan[i][0].split(':')[0]	
            	var percen = parseInt((arrSlicedRelawan[i][1] * 100) / arrSlicedRelawan[0][1])	
            	var val = arrSlicedRelawan[i][1]
            	} else {
            		var title = '-'	
            		var percen = 0
            		var val = 0
            	}
            	
                strHtmlProgressX += `<li class="collection-item">
                        <div class="row">
                            <div class="col s12 m3">
                                <p class="collections-title">${title}</p>
                            </div>
                            <div class="col s9 m8">
                                <div class="progress view1">
                                    <div class="determinate" style="width:${percen}%"></div>
                                </div>
                            </div>
                            <div class="col s3 m1">
                                <p class="">${val}</p>
                            </div>
                        </div>
                    </li>`;
            }
            var strHtmlProgress1 = arrSlicedRelawan.map((arrObj) => {
                console.log(arrObj)
                var percen = parseInt((arrObj[1] * 100) / arrSlicedRelawan[0][1])
                return `<li class="collection-item">
                        <div class="row">
                            <div class="col s12 m3">
                                <p class="collections-title">${arrObj[0].split(':')[0]}</p>
                            </div>
                            <div class="col s9 m8">
                                <div class="progress view1">
                                    <div class="determinate" style="width:${percen}%"></div>
                                </div>
                            </div>
                            <div class="col s3 m1">
                                <p class="">${arrObj[1]}</p>
                            </div>
                        </div>
                    </li>`;
            }).join('')
            $('#issues-collection').append(strHtmlProgressX)
            var strHtmlProgress = arrSlicedRelawan.map((arrObj) => {
                var percen = parseInt((arrObj[1] * 100) / arrSlicedRelawan[0][1])
                return `<div class="row mb-1">
                  <div class="col s12 m3">
                    <h4 class="progress_kec">${arrObj[0].split(':')[0]}</h4>
                  </div>  
                  <div class="col s9 m8 px-025">
                    <div id="myProgress" >
                      <div id="myBar" style="width:${percen}%;"></div>
                    </div>
                  </div>
                  <div class="col s3 m1 px-025">
                    <h4 class="progress_kec left">${arrObj[1]}</h4>
                  </div>
               </div>`;
            })
            //$('#progressbar_data2').html(strHtmlProgress)
        }
    });
    $.ajax({
        url: 'http://' + R.hostport + '/get/ratingposko',
        type: 'get',
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + document.cookie.replace("token=", ""))
        },
        success: function(data) {
            //console.log(data.message)
            var sortable = [];
            for (var vehicle in data.message) {
                sortable.push([vehicle, data.message[vehicle]['pemilih']]);
            }

            sortable.sort(function(a, b) {
                return b[1] - a[1];
            });
            var arrSlicedPosko = sortable.slice(0, 5)
            var strHtmlProgress = arrSlicedPosko.map((arrObj) => {
                var percen = parseInt((arrObj[1] * 100) / arrSlicedPosko[0][1])
                return `<div class="row mb-1">
                  <div class="col s12 m3">
                    <h4 class="progress_kec">${arrObj[0].split(':')[0]}</h4>
                  </div>  
                  <div class="col s9 m8 px-025">
                    <div id="myProgress" >
                      <div id="myBar" style="width:${percen}%;"></div>
                    </div>
                  </div>
                  <div class="col s3 m1 px-025">
                    <h4 class="progress_kec left">${arrObj[1]}</h4>
                  </div>
               </div>`;
            })
            //$('#progressbar_data1').html(strHtmlProgress)
            var strHtmlProgress1 = arrSlicedPosko.map((arrObj) => {
                console.log(arrObj)
                var percen = parseInt((arrObj[1] * 100) / arrSlicedPosko[0][1])
                return `<li class="collection-item">
                        <div class="row">
                            <div class="col s12 m3">
                                <p class="collections-title">${arrObj[0].split(':')[0]}</p>
                            </div>
                            <div class="col s9 m8">
                                <div class="progress view1">
                                    <div class="determinate" style="width:${percen}%"></div>
                                </div>
                            </div>
                            <div class="col s3 m1">
                                <p class="">${arrObj[1]}</p>
                            </div>
                        </div>
                    </li>`;
            })
            $('#issues-collection2').append(strHtmlProgress1)
        }
    });

    $.ajax({
        url: 'http://' + R.hostport + '/get/posko/kecamatan/count',
        type: 'get',
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + document.cookie.replace("token=", ""))
        },
        success: function(data) {
            if (Object.keys(data.message).length > 0) {
                var arrPosKec = [];
                data.message.forEach(function(objPosko, i) {
                    arrPosKec.push(R.codeKategori(objPosko.poskec_kategori * 1) + '-' + objPosko.kec_nama)
                    
                    var myIcon = L.divIcon({
                        html: `<div><span class="material-icons" style="color:${R.CSS_COLOR_NAMES[i]};">assistant</span></div>`,
                        className: 'posko_icon'
                    });
                    console.log(objPosko)
                    var htmlPopupKecamatan = `<div>
                                      <h5 style="font-size:10pt; font-weight:600; margin-top:5px; margin-bottom:5px;">POSKO ${R.codeKategori(objPosko.poskec_kategori * 1).toUpperCase() } KECAMATAN </h5>
                                      <h5 style="font-size:10pt; margin-top:2px; margin-bottom:2px;">Kecamatan ${objPosko.kec_nama}</h5>
                                  </div>`;
                    objPosko['lokasi'] = [objPosko.poskec_latitude, objPosko.poskec_longitude];
                    //console.log(objPosko['lokasi'], objPosko.poskec_latitude != null && objPosko.poskec_latitude != 0, objPosko) 
                    if (objPosko.poskec_latitude != null && objPosko.poskec_latitude != 0) {
                        //console.log(objPosko)
                        if (R.getUrlVars()['kec'] == objPosko.poskec_id) {
                            L.marker(objPosko.lokasi, { icon: myIcon }).addTo(map).bindPopup(htmlPopupKecamatan).openPopup();
                            map.setView(objPosko.lokasi, 12);
                        } else L.marker(objPosko.lokasi, { icon: myIcon }).addTo(map).bindPopup(htmlPopupKecamatan);
                    }
                });
                $.ajax({
                    url: 'http://' + R.hostport + '/get/posko/desa/lokasi',
                    type: 'get',
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader('Authorization', 'Bearer ' + document.cookie.replace("token=", ""))
                    },
                    success: function(data) {
                        if (Object.keys(data.message).length > 0) {
                            Object.keys(data.message).forEach(function(no, i) {
                                var objPosko = data.message[no];
                                //console.log(objPosko)
                                var myIcon = L.divIcon({
                                    html: `<div 
                                style="
                                    width: 0 !important;
                                    height: 0 !important;
                                    border-left: 10px solid transparent !important;
                                    border-right: 10px solid transparent !important;
                                    border-bottom: 15px solid ${R.CSS_COLOR_NAMES[ arrPosKec.indexOf(R.codeKategori(objPosko.kategori * 1) + '-' + objPosko.kecamatan)  ]} !important;
                                "></div>`,
                                    className: 'posko_icon'
                                });
                                var htmlPopupDesa = `<div>
                                      <h5 style="font-size:10pt; font-weight:600; margin-top:5px; margin-bottom:5px;">POSKO ${ R.codeKategori(objPosko.kategori * 1).toUpperCase() } DESA </h5>
                                      <h5 style="font-size:10pt; margin-top:2px; margin-bottom:2px;">Kecamatan ${objPosko.kecamatan}</h5>
                                      <h5 style="font-size:10pt; margin-top:2px; margin-bottom:2px;">Desa ${objPosko.kelurahan}</h5>
                                  </div>`;
                                if (R.getUrlVars()['des'] == no) {
                                    L.marker(objPosko.lokasi, { icon: myIcon }).addTo(map).bindPopup(htmlPopupDesa).openPopup();
                                    map.setView(objPosko.lokasi, 12);
                                } else L.marker(objPosko.lokasi, { icon: myIcon }).addTo(map).bindPopup(htmlPopupDesa);
                            });
                        }
                    }
                })
            }
        }
    })
    
    (function () {
	  const second = 1000,
	        minute = second * 60,
	        hour = minute * 60,
	        day = hour * 24;

	  let birthday = "Dec 9, 2020 07:00:00",
	      countDown = new Date(birthday).getTime(),
	      x = setInterval(function() {    

	        let now = new Date().getTime(),
	            distance = countDown - now;

	        document.getElementById("days").innerText = Math.floor(distance / (day)),
	          document.getElementById("hours").innerText = Math.floor((distance % (day)) / (hour)),
	          document.getElementById("minutes").innerText = Math.floor((distance % (hour)) / (minute)),
	          document.getElementById("seconds").innerText = Math.floor((distance % (minute)) / second);

	        //do something later when date is reached
	        if (distance < 0) {
	          let headline = document.getElementById("headline"),
	              countdown = document.getElementById("countdown"),
	              content = document.getElementById("content");

	          headline.innerText = "It's my birthday!";
	          countdown.style.display = "none";
	          content.style.display = "block";

	          clearInterval(x);
	        }
	        //seconds
	      }, 0)
	  }());

});

Date.prototype.getMonthName = function(lang) {
    lang = lang && (lang in Date.locale) ? lang : 'en';
    return Date.locale[lang].month_names[this.getMonth()];
};

Date.prototype.getMonthNameShort = function(lang) {
    lang = lang && (lang in Date.locale) ? lang : 'en';
    return Date.locale[lang].month_names_short[this.getMonth()];
};

Date.locale = {
    en: {
        month_names: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        month_names_short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    }
};