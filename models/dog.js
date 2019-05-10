module.exports = function(sequelize, DataTypes) {
  var Dog = sequelize.define("Dog", {
    dogName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    birthdate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    sex: {
      type: DataTypes.STRING,
      validate: {
        len: [1]
      }
    },
    breed: {
      type: DataTypes.STRING,
      validate: {
        len: [1]
      }
    }
  });
  return Dog;
};
