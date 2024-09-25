import http from 'http';
import config from 'config';
import app from './app';

const PORT=config.get('port');
const server=http.createServer(app);

server.listen(PORT, ()=>{
	console.log("The server is running on port " + PORT);
})
