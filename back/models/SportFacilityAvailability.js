module.exports =(sequelize, DataTypes)=>{
     return sequelize.define(
      "SportFacilityAvailability",
      {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
            },
          
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false
              },
          
          start_time: {
            type: DataTypes.TIME,
            allowNull: false
                      },
          end_time: {
            type: DataTypes.TIME,
            allowNull: false
                    },
          available: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
                      }

    },
    {
      freezeTableName:true,
      tableName: "SportFacilitiesAvailability"
    }
    );
  };

    // SportFacilityAvailability.associate = function (models) {
    //   // A sport facility availability belongs to a sport facility
    //   SportFacilityAvailability.belongsTo(models.SportFacility, {
    //     foreignKey: {
    //       name: 'facilityId',
    //       allowNull: false,
    //     },
    //     onDelete:'CASCADE'
    //   });
    // };

    