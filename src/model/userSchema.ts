import { DataTypes, Model, STRING } from "sequelize";
import db from "../config/database.config";

interface TodoAttribute {
  id: string;
  username: string;
  firstname: string;
  middlename: string;
  lastname: string;
  email: string;
  phonenumber: string;
  password: string;
  confirmpassword: string;
}

export class TodoInstance extends Model<TodoAttribute> {}

TodoInstance.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    middlename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phonenumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    confirmpassword: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },

  {
    sequelize: db,
    tableName: "todos",
  }
);
