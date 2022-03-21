const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class UserTrip extends Model {}

UserTrip.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
          model: 'user',
          key: 'id'
      }
    },
    trip_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
          model: 'trip',
          key: 'id'
      }
    },
   
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'usertrip',
  }
);

module.exports = UserTrip;