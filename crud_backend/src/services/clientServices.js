import { query } from "../db.js";

export const getClients = async () => {
    try {
        const { rows } = await query('SELECT * FROM clients_tb');
        console.log("Fetched clients:", rows);  // <-- Add this for debugging
        return rows;
    } catch (error) {
        console.error("Error fetching clients:", error);
        throw error;
    }
};



//----testing db connection
// const testConnection = async () => {
//     try {
//         const result = await query("SELECT current_database();");
//         console.log("Connected to:", result.rows[0].current_database);
//     } catch (err) {
//         console.error("Database connection error:", err);
//     }
// };
//testConnection();