const https = require('https');
let url = "https://raw.githubusercontent.com/outages/aws-outages/main/aws_outages.json"
let req = https.get(url, function (res) {
    let data = '', json_data;
    res.on('data', function (stream) {
        data += stream;
    });
    const insidents = new Map()
    res.on('end', function () {
        dat = JSON.parse(data);
        archive = dat.archive
        for (var i=0; i < archive.length; i++){
            var date = new Date(archive[i].date * 1000);
            var year = date.getFullYear()
            var count = insidents.get(year)
            if (count == undefined) {
                count = 0;
            }
            count++
            insidents.set(year, count)
        }

        console.log ("AWS Service Interuptions by Year")
        for (const [year, count] of insidents.entries()) {
            console.log("%d: %d", year, count);
          }

        //console.log(insidents)
    });
});

req.on('error', function (e) {
    console.log(e.message);
});