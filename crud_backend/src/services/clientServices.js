import {query} from "../db.js"

export const getClients = async() => {
    const{rows} = await query('SELECT * FROM clients_tb');
}