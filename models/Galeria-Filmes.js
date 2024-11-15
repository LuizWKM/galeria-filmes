import Sequelize from 'sequelize'
import connection from "../config/sequelize-config.js"

const Filme = connection.define('filmes', {
    file: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    titulo: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    genero: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    ano: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },

});

Filme.sync({force: false})
export default Filme