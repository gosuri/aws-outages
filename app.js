const https = require('https');
const url = "https://raw.githubusercontent.com/outages/aws-outages/main/aws_outages.json";

let req = https.get(url, (res) => {
    let data = '', json_data;
    res.on('data', function (stream) {
        data += stream;
    });
    res.on('end', () => {
        var incidents = new Map();
        var archive = JSON.parse(data).archive;
        for (var i = 0; i < archive.length; i++) {
            var date = new Date(archive[i].date * 1000);
            var year = date.getFullYear();
            var count = incidents.get(year) == undefined ? 0 : incidents.get(year);
            count++;
            incidents.set(year, count);
        }

        console.log("AWS Service Outages by The Year\n");
        for (const [year, count] of incidents.entries()) {
            console.log("%d: %d", year, count);
        }
    });
});

req.on('error', function (e) {
    console.log(e.message);
});