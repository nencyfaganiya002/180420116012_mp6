var udp = require('dgram');
// --------------------creating a udp server --------------------
// creating a udp server
var server = udp.createSocket('udp4');
// emits when any error occurs
server.on('error', function(error) {
    console.log('Error: ' + error);
    server.close();
});
// emits on new datagram msg
server.on('message', function(num, info) {
    console.log('Data received from client : ' + num.toString());
    //console.log('Received %d bytes from %s:%d\n', str.length, info.address, info.port);
    //sending msg
    function checkPrime(n) {

        // Corner case
         if (n <= 1){
             return (n+' is not Prime');
         }
         // Check from 2 to n-1
         for (let i = 2; i < n; i++){
             if (n % i == 0){
                 return (n+' is not a Prime');
             }
         }
         return (n+' is a Prime');
     }
    server.send(checkPrime(num), info.port, 'localhost', function(error) {
        if (error) {
            client.close();
        } else {
            console.log('Number  is prime or not checked');
        }
    });
});
//emits when socket is ready and listening for datagram msgs
server.on('listening', function() {
    var address = server.address();
    var port = address.port;
    var family = address.family;
    var ipaddr = address.address;
    console.log('Server is listening at port' + port);
    console.log('Server ip :' + ipaddr);
    console.log('Server is IP4/IP6 : ' + family);
});
//emits after the socket is closed using socket.close();
server.on('close', function() {
    console.log('Socket is closed !');
});
server.bind(2222);
setTimeout(function() {
    server.close();
}, 8000);