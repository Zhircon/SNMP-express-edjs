// load the things we need
var express = require('express');
var snmp = require('net-snmp');
var app = express();



// set the view engine to ejs
app.set('view engine', 'ejs');

// index page
app.get('/', function(req, res) {
    res.render('pages/index');
});
app.get('/views/pages/Logic/actions.js', function(req, res) {
    res.end('views/pages/Logic/action.js');
});
app.get('/views/pages/Logic/actionsImport.js', function(req, res) {
    res.end('views/pages/Logic/actionsImport.js');
});

app.get('/memory', function(req, res) {
    var smnp = require('net-snmp');
    res.render('pages/memory');
});
app.get('/all', function(req, res) {
    var session = snmp.createSession("192.168.200.219", "snmpserver");
    var oids = ["1.3.6.1.2.1.1.5.0", "1.3.6.1.2.1.1.6.0","1.3.6.1.4.1.2021.4.5.0","1.3.6.1.4.1.2021.4.6.0","1.3.6.1.4.1.2021.4.11.0"];
    var result = "";
    session.get(oids, function (error, varbinds) {
        if (error) {
            console.error(error);
        } else {
            for (var i = 0; i < varbinds.length; i++) {
                if (snmp.isVarbindError(varbinds[i])) {
                    console.error(snmp.varbindError(varbinds[i]));
                } else {
                    var oidSolicitado= varbinds[i].oid;
                    var oidValor= varbinds[i].value;
                    result = result + oidSolicitado + " " + oidValor+" ";
                    console.log(varbinds[i].oid + " = " + varbinds[i].value);
                    console.log(result);
                }
            }
        }
        session.close();
    });
    res.json(result);
});

app.listen(8080);
console.log('8080 is the magic port');