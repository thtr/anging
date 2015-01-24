var serv
	,http = require('http')
	,fs = require('fs')
	,PORT = +process.env.PORT || 3000
	,WWW = (process.env.PWD + (process.argv.length > 2 ? '/'+process.argv[ process.argv.length - 1 ] : '')).replace(/\/\s*$/,'')
	,usage = [
		''
		,'usage:'
		,'eg > PORT=8888 && node ./http/app.js ./relative/path/to/root/'
		,'Note trailing path relative to the current directory.'
	]
	;

	console.log(usage.join('\n\t'));

	serv = http.createServer(function(req, res){

		// strip get args, strip directories, strip filename to trailing extension
		var ext = req.url.replace(/\?.*$/,'');
		var path = WWW + req.url;
		var read = fs.createReadStream( path );
		ext = ext.replace(/^.*\//,'').replace(/^.*\./,'')
		console.log('%s %s',req.method, req.url);

		function handle(status, type, body){
			res.writeHead(status || 200, {'Content-Type':type || 'text/plain'});
			if(body) res.end(body);
		};
		read.pipe( res );

		read.on('error',function(e){
			//console.log('response err %s', ext);
			switch(ext){
			case 'js':
				handle(404, 'application/javascript', '/* not found */');
			break;
			case 'json':
				handle(404, 'application/json', '{}');
			break;
			case 'css':
				handle(404, 'text/css', '/* not found */');
			break;
			case 'ico':
				handle(404, 'image/x-icon', '');
			break;
			case 'gif':
				handle(404, 'image/gif', '');
			break;
			case 'jpg':
				handle(404, 'image/jpeg', '');
			break;
			default:
				handle(200, 'text/html');
				read = fs.createReadStream( path + '/index.html');
				read.pipe( res );
				read.on('error', function(e){
					handle(200, 'text/html',
					'<!doctype html>\n<html> ERR'+path +'<br>'+req.url+'<br>'+ext+'<script type="text/javascript" src="./some.js">alert(4)</script>'
					);
				});
			};
		});

	}).listen( PORT );

	console.log([
		''
		,'http running on %s'
		,'serving files from %s'
		,'open http://127.0.0.1:%s/'
	].join('\n\t'), PORT, WWW, PORT);

