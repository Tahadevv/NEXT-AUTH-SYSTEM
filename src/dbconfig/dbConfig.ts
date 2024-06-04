import mongoose from "mongoose";

export async function connect() {
    try {
        await mongoose.connect("mongodb+srv://auth:auth@cluster0.slbdray.mongodb.net/authy?retryWrites=true&w=majority", {
            
        });

        const connection = mongoose.connection;

        connection.on("connected", () => {
            console.log("MongoDB Connected");
        });

        connection.on("error", (err) => {
            console.error("Please make sure DB is up and running:", err);
            process.exit(1); // Exit with a failure code
        });

    } catch (error) {
        console.error("Something went wrong in connecting to the database");
        console.error(error);
    }
}
