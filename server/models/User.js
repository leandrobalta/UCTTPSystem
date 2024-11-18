const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Institution = require("./Institution");

const User = sequelize.define(
    "User",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [1, 255],
            },
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
                notEmpty: true,
                len: [1, 255],
            },
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        institutionFk: {
            type: DataTypes.STRING(15),
            references: {
                model: Institution,
                key: "sigla",
            },
        },
        userLevel: {
            type: DataTypes.ENUM("ADMIN", "USER"),
            allowNull: false,
        },
        creationDate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: "users",
        timestamps: false,
    }
);

module.exports = User;
