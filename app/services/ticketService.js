import { sql } from "../database/database.js";

const getAllTickets = async () => {
  return await sql`SELECT * FROM tickets ORDER BY id;`;
};

const addTicket = async (ticketContent) => {
  return await sql`INSERT INTO tickets (content, reported_on) VALUES (${ticketContent}, NOW())`
}

const fetchTicket = async (id) => {
  const row = await sql`SELECT * FROM tickets
  WHERE id = ${id}`;
  return row[0];
};

const resolveTicket = async (id) => {
  await sql`UPDATE tickets
  SET resolved_on = NOW() WHERE id = ${id}`;
};

const deleteTicket = async (id) => {
  await sql`DELETE FROM tickets WHERE id = ${id}`
}
export { getAllTickets, addTicket, fetchTicket, resolveTicket, deleteTicket };