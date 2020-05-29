import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import * as cors from 'cors';
import * as socketIo from 'socket.io';
import router from "./routes/routes";
import { Server, createServer } from 'http';
import * as status_monitor from "express-status-monitor";

class App {
    public express: any;
    public server: Server;
    public io: SocketIO.Server;

    constructor() {
        this.express = express();
        this.routes();
        this.sockets();
        this.middleware();
    }

    private middleware(): void {
        dotenv.config();
        const expressStatusMonitor = status_monitor;
        this.express.use(express.json());
        this.express.use(bodyParser.json());
        this.express.use(cors());
        this.express.use(bodyParser.urlencoded({
            extended: false
        }));
        this.express.use(expressStatusMonitor({
            websocket: this.io,
            port: this.express.get('port')
        }));
    }

    private sockets() {
        this.server = createServer(this.express);
        this.io = socketIo(this.server);
        this.io.on('connection', (socket) => {
            socket.on('join_game', (gameId) => {
                console.log('join_game', gameId);
                socket.join(gameId)
            });
            socket.on('play_game', ({gameId, data}) => {
                console.log('game', gameId, data);
                socket.in(gameId).emit('next_play', data)
            });
        });
    }

    private routes(): void {
        this.express.use(router);
    }
}

export default new App()