
import express, {Application} from 'express';
// Rutas
import routesUser from '../routes/user';
import routesDashboard from '../routes/dashboard';
import routesPerfil from '../routes/perfil';
import routesAdmin from '../routes/administrador';
import routesAjustes from '../routes/ajustes';
import routesAyuda from '../routes/ayuda';
import routesComunidad from '../routes/comunidad';
import routesContacto from '../routes/contacto';
import routesForos from '../routes/foros';

import sequelize from '../db/connection';
import { User } from './user.model';
import { Post } from './post.model';
import { Foro } from './foro.model';
import { Solicitud } from './solicitud.model';
import { Reporte } from './reporte.model';
import cors from 'cors';
import { SeguidoSeguidor } from './seguidosseguidores.model';
import { ReplicaForo } from './replicaforo.model';
import { Contacto } from './contacto.model';
import { Apoyo } from './apoyo.model';
import { ContactoGeneral } from './contactoportal.model';
import { Like } from './likes.model';

 class Server {
    private app: Application;
    private port: string ; 

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3001';
        this.middlewares();
        this.routes();
        this.dbConnect();

    }
    listen(){
        this.app.listen(this.port, () => {
            console.log('App running in port ' + this.port)
        });
    }

    routes(){
        this.app.use('/api/users', routesUser);        
        this.app.use('/api/dashboard', routesDashboard);
        this.app.use('/api/perfil', routesPerfil);
        this.app.use('/api/admin', routesAdmin);
        this.app.use('/api/ajustes', routesAjustes);
        this.app.use('/api/ayuda', routesAyuda);
        this.app.use('/api/comunidad', routesComunidad);
        this.app.use('/api/contacto', routesContacto);
        this.app.use('/api/foros', routesForos);
    }

    middlewares(){
        // Parseo body
        this.app.use(express.json({limit: '10mb'}));
        // Cors
        this.app.use(cors());
    }
    async dbConnect() {
        try {
            await User.sync();
            await Post.sync();
            await Foro.sync();
            await Solicitud.sync(); 
            await Reporte.sync();             
            await SeguidoSeguidor.sync(); 
            await ReplicaForo.sync(); 
            await Contacto.sync();  
            await ContactoGeneral.sync(); 
            await Apoyo.sync(); 
            await Like.sync(); 
            await sequelize.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }
} 
export default Server;
