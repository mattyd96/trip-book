const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Item extends Model {}

Item.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    trip_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
          model: 'trip',
          key: 'id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
          model: 'user',
          key: 'id'
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    info: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    column: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    index: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'item',
  }
);

module.exports = Item;