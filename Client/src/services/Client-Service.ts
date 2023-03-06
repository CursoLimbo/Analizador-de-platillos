import axios from 'axios';

//pruebas
interface ClientType {
    name: string;
    location: string;
    phone: string;
    whatsapp: string;
    email: string;
  }

class clientService {

    private endpoint = 'http://localhost:4000/graphql'

    async getClientById(id : string){
        const query = 
        ` query GetClientById($id: String!) {
            getClient(id: $id) {
                id
                name
                location
                phone
                whatsapp
                email
            }
        } ` ;

        const variables = {id};

        const response = await axios.post(this.endpoint,{query, variables});

        return response.data.data.getClient;
    }

    async getAllClients() {
        const query = `
        query{
            getAllClients {
              id
              name
              location
              phone
              whatsapp
              email
            }
          }
        `;

        const response = await axios.post(this.endpoint, {query});

        return response.data.data.getAllClients;
    }

    async createClient(clientData: ClientType) {
        const mutation = `
            mutation CreateClient($newClient: ClientInput!) {
                createClient(newClient: $newClient) {
                    id
                    name
                    location
                    phone
                    whatsapp
                    email
                }
            }
        `;

        const variables = {newClient: clientData};

        const response = await axios.post(this.endpoint, {mutation, variables});

        return response.data.data.createClient;
    }

    async updateClient(id: string, clientData: ClientType) {
        const mutation = `
        mutation($updateClient: ClientType!){
            updateClient(updateClient: $updateClient) {
              id
              name
              location
              phone
              whatsapp
              email
            }
          }
        `;
      
        const variables = { id, updatedClient: clientData };
      
        const response = await axios.post(this.endpoint, { mutation, variables });
      
        return response.data.data.updateClient;
      }
      
}