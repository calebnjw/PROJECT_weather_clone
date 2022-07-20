function initUserLocationModel(sequelize, DataTypes) {
  return sequelize.define(
    'userLocation',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      city: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      lat: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      long: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      underscored: true,
    },
  );
}

module.exports = initUserLocationModel;
