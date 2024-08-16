import { Sequelize } from "sequelize";
import { DatabaseConnectionError } from "../errors";

const sequelize = new Sequelize(
    process.env.DB_NAME as string,
    process.env.DB_USER as string,
    process.env.DB_PASSWORD as string,
    {
        host: process.env.DB_HOST as string,
        dialect: "postgres",
    }
);

//  When we call sequelize.sync(), Sequelize automatically creates or updates the database tables
//  based on the models we have defined.
// { force: true } means Sequelize recreate existing whenever we restart server. not a good thing.
// { force: false } means Sequelize should not drop existing tables or recreate them, so use it.
const initializeDatabaseConnection = async () => {
    try {
        await sequelize.sync({ force: false });
        console.log("Database synchronized");

        await sequelize.authenticate();
        console.log("Successfully connected to Database...🛢");
    } catch (error) {
        console.log(error);
        throw new DatabaseConnectionError();
    }
};
initializeDatabaseConnection();

export { sequelize };
