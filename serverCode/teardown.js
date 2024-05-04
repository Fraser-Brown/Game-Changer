const { networkInterfaces } = require('os');
var natUpnp = require('nat-upnp');
var shell = require('shelljs');
var client = natUpnp.createClient();

// client.getMappings(function(err, results) {
//     console.log(results)
// });
    
// client.portUnmapping({
//     public: 443,
//     protocol : 'tcp'
// });
// client.portUnmapping({
//     public: 443,
//     protocol : 'udp'
// });

// client.getMappings(function(err, results) {
//     if(results.length === 0){
//         console.log('Successfully removed all mappings')
//     }
//     else{
//         console.log('Unsuccessful')
//         console.log(results)
//     }
// });

shell.exec('docker stop fraserGameServer', function(code, stdout, stderr) {
    console.log('Exit code:', code);
    console.log('Stopped container running');
    shell.exec('docker rm /fraserGameServer', function(){
        console.log('Removed container');
        process.exit(0)
    })
});
