var natUpnp = require('nat-upnp');
var client = natUpnp.createClient();
var shell = require('shelljs');
    
// client.portMapping({
//     public: 443,
//     private: 443,
//     ttl: 0,
//     protocol : 'udp'
//   }, function(err) {
//     // Will be called once finished
// });

// client.portMapping({
//     public: 443,
//     private: 443,
//     ttl: 0,
//     protocol : 'tcp'
//   }, function(err) {
//     // Will be called once finished
// });


client.getMappings(function(err, results) {
    console.log('Current mappings')
    console.log(results)

    shell.exec('docker run -p 443:443 -p 80:80 --name fraserGameServer frasergame Server.js ',
        function(code, stdout, stderr) {

        console.log('Exit code:', code);
        console.log('Program output:', stdout);
        console.log('Program stderr:', stderr);
    });
});



client.externalIp(function(err, ip) {
    console.log('External ip : ' + ip)
});

// process.exit(0); TODO once everything has finished call this