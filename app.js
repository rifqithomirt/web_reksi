const mysql = require('mysql');
const redis = require("redis");
const client = redis.createClient(6379, '178.128.213.5');

var pool = mysql.createPool({
    connectionLimit: 10,
    host: '103.146.203.103',
    user: 'admin',
    password: '4kuG4kr0h`',
    database: 'reaksi'
});

client.on("error", function(error) {
    console.error(error);
});

client.get("ABC", function(o) {
    console.log(o)
});

var getKelurahan = function(cb) {
    client.get("kelurahan", function(err, strKelurahan) {
        if (strKelurahan) {
            var objKelurahan = JSON.parse(strKelurahan)
            cb(objKelurahan)
        } else {
            pool.query('SELECT * FROM kelurahan', function(error, results, fields) {
                if (error) {
                    console.log(error)
                    return {};
                } else {
                    var objKelurahan = results.reduce((old, obj) => {
                        old[obj.kel_id] = obj;
                        return old;
                    }, {})
                    client.set("kelurahan", JSON.stringify(objKelurahan), redis.print)
                    cb(objKelurahan)
                }
            });
        }
    })
}
getKecamatan = function(cb) {
    client.get("kecamatan", function(err, strkecamatan) {
        if (strkecamatan) {
            var objKecamatan = JSON.parse(strkecamatan)
            cb(objKecamatan)
        } else {
            pool.query('SELECT * FROM kecamatan', function(error, results, fields) {
                if (error) {
                    console.log(error)
                    return {};
                } else {
                    var objKecamatan = results.reduce((old, obj) => {
                        old[obj.kec_id] = obj;
                        return old;
                    }, {})
                    client.set("kecamatan", JSON.stringify(objKecamatan), redis.print)
                    cb(objKecamatan)
                }
            });
        }
    })
}
var objDPT = {};
var totalDPT = 0;
var getDPT = function() {

    var startLoadDPT = Date.now();
    console.log('Start Load DPT');
    client.get('dpt', function(err, strDpt) {
        //console.log(err, strDpt, 'xx')
        if (strDpt) {
            try {
                objDPT = JSON.parse(strDpt)
                var totalRedisDpt = Object.keys(objDPT).reduce(function(old, kec) {
                    var totalkel = Object.keys(objDPT[kec]).reduce(function(kelOld, kel) {
                        kelOld += Object.keys(objDPT[kec][kel]).length;
                        return kelOld;
                    }, 0);
                    return old += totalkel;
                }, 0)
                console.log(totalRedisDpt + ' DPT Loaded ' + (Date.now() - startLoadDPT));

                var sqlCount = 'SELECT COUNT(*) AS total FROM dpx;';
                pool.query(sqlCount, function(error, results, fields) {
                    if (error) {
                        console.log(error)
                        return {};
                    } else {
                        if ((results[0]['total'] * 1) != totalRedisDpt) {
                            var sql = `SELECT NIK, ID_KECAMATAN, ID_KELURAHAN FROM dpx`;
                            pool.query(sql, function(error, results, fields) {
                                if (error) {
                                    console.log(error)
                                    return {};
                                } else {
                                    totalDPT = results.length;
                                    objDPT = results.reduce((old, doc) => {
                                        if (!(doc.ID_KECAMATAN in old)) old[doc.ID_KECAMATAN] = {};
                                        if (!(doc.ID_KELURAHAN in old[doc.ID_KECAMATAN])) old[doc.ID_KECAMATAN][doc.ID_KELURAHAN] = {};
                                        old[doc.ID_KECAMATAN][doc.ID_KELURAHAN][doc.NIK] = doc;
                                        return old;
                                    }, {})
                                    client.set('dpt', JSON.stringify(objDPT), function(err, re) {
                                        console.log(err, re, 'tt')
                                    })
                                    console.log('DPT Loaded ' + (Date.now() - startLoadDPT));
                                }
                            });
                        }
                    }
                });

            } catch (ex) {
                console.log(ex)
            }
        } else {
            var sql = `SELECT NIK, ID_KECAMATAN, ID_KELURAHAN FROM dpx`;
            pool.query(sql, function(error, results, fields) {
                if (error) {
                    console.log(error)
                    return {};
                } else {
                    totalDPT = results.length;
                    objDPT = results.reduce((old, doc) => {
                        if (!(doc.ID_KECAMATAN in old)) old[doc.ID_KECAMATAN] = {};
                        if (!(doc.ID_KELURAHAN in old[doc.ID_KECAMATAN])) old[doc.ID_KECAMATAN][doc.ID_KELURAHAN] = {};
                        old[doc.ID_KECAMATAN][doc.ID_KELURAHAN][doc.NIK] = doc;
                        return old;
                    }, {})
                    client.set('dpt', JSON.stringify(objDPT), function(err, re) {
                        console.log(err, re, 'tt')
                    })
                    console.log('DPT Loaded ' + (Date.now() - startLoadDPT));
                }
            });
        }
    })
}

getDPT();