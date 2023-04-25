import { createConnections, Connection } from "typeorm";

export const connectDatabase = async (): Promise<Connection | null> => {
  try {
    const connections = await createConnections([
      {
        name: "default",
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "your_username",
        password: "your_password",
        database: "your_database",
        entities: ["src/entity/**/*.ts"],
        synchronize: true,
        logging: false,
      },
    ]);
    console.log("Database connection established.");
    return connections[0];
  } catch (error) {
    console.error("Database connection failed:", error);
    return null;
  }
};