module.exports = (sequelize, DataTypes) => {
    let Location = sequelize.define('location', {
        id : {
            type : DataTypes.INTEGER(11),
            primaryKey : true,
            autoIncrement: true,
            unique : true,
            allowNull : false
        },
        name : {
            type : DataTypes.STRING,
            unique : true,
            allowNull : false
        },
        email : {
            type : DataTypes.STRING,
            allowNull : true
        },
        status : {
            type : DataTypes.ENUM(["ACTIVE", "INACTIVE"]),
            allowNull : false
        },
        workingHours : {
            type : DataTypes.TEXT,
            allowNull : true,
            get(){
                let data = this.getDataValue("workingHours");
                return JSON.parse(data);
            },

            set(value){
                console.log("yola habibi", value)
                this.setDataValue("workingHours", JSON.stringify(value))
            }
        }
    })

    Location.associate = (model) => {
        Location.hasOne(model.address, {
            onDelete : "CASCADE"
        })
    }

    return Location
}