const http = require('http');
const host = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader("Access-Control-Allow-Origin", "*");
  var consulta;
  req.on('data', chunk => {
    consulta = chunk.toString(); // convert Buffer to string
    consulta = JSON.parse(consulta);
	if (consulta.type != 'undefined'){
		if (consulta.type == 'check'){
			callOmelet(JSON.stringify(consulta.data),'-infer',res);
		}else if (consulta.type == 'db'){
			callOmelet(JSON.stringify(consulta.data),'-db',res);
		}
	}
  });
});

server.listen(port, host, () => {
  console.log(`Servidor corriendo en http://${host}:${port}`);
});

var fs = require('fs'); 
var res = [];
function callOmelet(json, param, conexion){
	//console.log(json);
	//crear el file
	var url = 'file.json';
	fs.writeFile(url, json, function (err) {
  	if (err) throw err;
  	console.log('Saved!');
  	//una vez guardado se ejecuta omelet
  	var ex = require('child_process');
	//pasar la url del file al java 
	res = ex.execSync('java -jar ../omelet/omelet.jar '+param+' '+url).toString();
    console.log("resp: "+res);
	//eliminar el file creado
	fs.unlink(url, function (err2) {
  	if (err2) throw err2;
 		console.log('File deleted!');
	});
	//se devuelve el resultado
  	conexion.end(res);
	});
}
