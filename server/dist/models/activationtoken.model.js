"use strict";
const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const ActivationToken = sequelize.define('ActivationToken', {
    user: {
        type: DataTypes.STRING,
        allowNull: false
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
}, {
    tableName: 'activation_tokens',
    timestamps: false
});
module.exports = ActivationToken;
