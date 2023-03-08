import axios from 'axios';
const baseUrl = 'http://localhost:4000/graphql'; 

export const getClientById = async (id: string) => {
  const response = await axios.get(`${baseUrl}/getClientById`, {
    params: {
      id
    }
  });
  return response.data;
}

export const getAllClients = async () => {
  const response = await axios.get(`${baseUrl}/getAllClients`);
  console.log(response.data);
  return response.data;
  
}

export const createClient = async (newClient: any) => {
  const response = await axios.post(`${baseUrl}/createClient`, newClient);
  return response.data;
}

export const updateClient = async (updateClient: any & { id: string }) => {
  const response = await axios.put(`${baseUrl}/updateClient`, updateClient);
  return response.data;
}

export const deleteClient = async (id: string) => {
  const response = await axios.delete(`${baseUrl}/deleteClient`, {
    data: {
      id
    }
  });
  return response.data;
}