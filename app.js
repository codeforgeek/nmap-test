var http = require('http');
var nmap = require('libnmap')
  , opts = {
      range: [
        //'192.168.0.0-255',
                //'192.168.99.0-255'
                '172.17.0.0-10'
      ]
    };

var rolodex = [];

var server = http.createServer(function (request, response) {
	response.writeHead(200, {"Content-Type": "text/event-stream"});
	// response.end("Hello World\n");
	var recursive = function(callback){
		nmap.scan(opts, function(err, report) {
			if (err) throw new Error(err);
			var rolodex = [];
			//console.log(JSON.stringify(report));
			var data = report['172.17.0.0-10'];
			for(var i=0;i<data.host.length;i++){
				rolodex.push(data.host[i].address[0]);
			}
			console.log(rolodex);
			 response.write(JSON.stringify(rolodex)+"\n \n");
			 //response.end();
			recursive(callback);
			callback(null);
		});
	}
	recursive(function(){console.log('called')})
});
server.listen(8000);
console.log('listening on port 8000');
