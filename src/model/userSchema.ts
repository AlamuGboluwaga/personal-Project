import { DataTypes, Model, STRING } from "sequelize";
import db from "../config/database.config";

interface TodoAttribute {
  id: string;
  title: string;
  completed?: boolean;
}

export class TodoInstance extends Model<TodoAttribute> {}

TodoInstance.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },

  {
    sequelize: db,
    tableName: "todos",
  }
);
