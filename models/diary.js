module.exports = function(sequelize, DataTypes) {
  var Diary = sequelize.define("Diary", {
    dogName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    happiness: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    energy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    appetite: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    affection: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });
  return Diary;
};
