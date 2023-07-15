'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt');
const { use } = require('../routes/v1');
const{Server_config}=require('../config')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

     this.belongsToMany(models.Role ,{through:'user_Role' , as:'role'});

    }
  }
  User.init({
    email: {
      
      type:DataTypes.STRING,
      allowNull:false,
      unique:true,
      validate:{
        isEmail:true
      }
    },
    password: {
      
      type:DataTypes.STRING,
      allowNull:false,
      validate:{

        len:[3 , 50]
      }
    } 
  }, {
    sequelize,
    modelName: 'User',
  });



 /***
  * Now for the authenication and hiding password i am using bcrypt triging
  *  in normal js file level
  * 
  */

 User.beforeCreate(function encrypt(user){
  //  console.log("Before encyption", user.password)
  const encryptedPassword = bcrypt.hashSync(user.password ,+Server_config.SALT_ROUNDS);

  user.password=encryptedPassword
  // console.log("after encyption", user.password)
  
 })

  return User;
}; 