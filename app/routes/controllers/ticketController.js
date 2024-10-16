import * as ticketService from "../../services/ticketService.js"

const getTickets = async ({ render }) => {
    render("index.eta", { tickets: await ticketService.getAllTickets() });
  };
  
  const addTicket = async ({ response, request }) => {
    const body = await request.body({ type: "form" })
    const params = await body.value;
    const content = params.get("content");
    await ticketService.addTicket(content);
    return response.redirect("/tickets");
  }
  
  const resolveTicket = async ({ params, response }) => {
    const id = params.id;
    await ticketService.resolveTicket(id);
    return response.redirect("/tickets");
  }

  const deleteTicket = async ({ params, response }) => {
    const id = params.id;
    await ticketService.deleteTicket(id);
    return response.redirect("/tickets");
  }

  export { getTickets, addTicket, resolveTicket, deleteTicket }