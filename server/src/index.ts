import Server from "./models/server";
import dotenv from 'dotenv';

// Se configura dotenv
dotenv.config();

const server = new Server();

server.listen();