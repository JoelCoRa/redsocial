"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// Rutas
const user_1 = __importDefault(require("../routes/user"));
const dashboard_1 = __importDefault(require("../routes/dashboard"));
const perfil_1 = __importDefault(require("../routes/perfil"));
const administrador_1 = __importDefault(require("../routes/administrador"));
const ajustes_1 = __importDefault(require("../routes/ajustes"));
const ayuda_1 = __importDefault(require("../routes/ayuda"));
const comunidad_1 = __importDefault(require("../routes/comunidad"));
const contacto_1 = __importDefault(require("../routes/contacto"));
const foros_1 = __importDefault(require("../routes/foros"));
const connection_1 = __importDefault(require("../db/connection"));
const user_model_1 = require("./user.model");
const post_model_1 = require("./post.model");
const foro_model_1 = require("./foro.model");
const solicitud_model_1 = require("./solicitud.model");
const reporte_model_1 = require("./reporte.model");
const cors_1 = __importDefault(require("cors"));
const seguidosseguidores_model_1 = require("./seguidosseguidores.model");
const replicaforo_model_1 = require("./replicaforo.model");
const contacto_model_1 = require("./contacto.model");
const apoyo_model_1 = require("./apoyo.model");
const contactoportal_model_1 = require("./contactoportal.model");
const likes_model_1 = require("./likes.model");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3001';
        // this.ten();
        this.middlewares();
        this.routes();
        this.dbConnect();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('App running in port ' + this.port);
        });
    }
    routes() {
        this.app.use('/api/users', user_1.default);
        this.app.use('/api/dashboard', dashboard_1.default);
        this.app.use('/api/perfil', perfil_1.default);
        this.app.use('/api/admin', administrador_1.default);
        this.app.use('/api/ajustes', ajustes_1.default);
        this.app.use('/api/ayuda', ayuda_1.default);
        this.app.use('/api/comunidad', comunidad_1.default);
        this.app.use('/api/contacto', contacto_1.default);
        this.app.use('/api/foros', foros_1.default);
    }
    middlewares() {
        // Parseo body
        this.app.use(express_1.default.json({ limit: '10mb' }));
        // Cors
        this.app.use((0, cors_1.default)());
    }
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield user_model_1.User.sync();
                yield post_model_1.Post.sync();
                yield foro_model_1.Foro.sync();
                yield solicitud_model_1.Solicitud.sync();
                yield reporte_model_1.Reporte.sync();
                yield seguidosseguidores_model_1.SeguidoSeguidor.sync();
                yield replicaforo_model_1.ReplicaForo.sync();
                yield contacto_model_1.Contacto.sync();
                yield contactoportal_model_1.ContactoGeneral.sync();
                yield apoyo_model_1.Apoyo.sync();
                yield likes_model_1.Like.sync();
                yield connection_1.default.authenticate();
                console.log('Connection has been established successfully.');
            }
            catch (error) {
                console.error('Unable to connect to the database:', error);
            }
        });
    }
}
exports.default = Server;
