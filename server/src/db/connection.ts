import { Sequelize } from "sequelize";


const sequelize = new Sequelize('redsocial', 'root', 'Password1234', {
    host: 'localhost',
    dialect: 'mysql',   
});

export default sequelize;