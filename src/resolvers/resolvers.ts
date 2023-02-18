import { User } from '../models/User'; // Importa el modelo de usuario
import { ApolloError } from 'apollo-server-express'; // Importa el objeto de error de Apollo para manejar errores

export const resolvers = {
  Query: {
    users: async () => { // Consulta para obtener todos los usuarios
      const users = await User.find(); // Busca todos los usuarios en la base de datos
      return users; // Retorna los usuarios encontrados
    },
    user: async (_: any, { id }: { id: string }) => { // Consulta para obtener un usuario por su id
      const user = await User.findById(id); // Busca el usuario con el id proporcionado en la base de datos
      return user; // Retorna el usuario encontrado
    },
    findUser: async (root,args) =>{
      const {name} = args
      return await User.findOne({name})
    },
  },
  Mutation: {
    createUser: async (_: any, args: any) => { // Mutación para crear un usuario
      const user = new User(args); // Crea un nuevo usuario utilizando los argumentos proporcionados
      await user.save(); // Guarda el nuevo usuario en la base de datos
      return user; // Retorna el usuario creado
    },
    updateUser: async (_: any, { id, ...args }: { id: string; [key: string]: any }) => { // Mutación para actualizar un usuario por su id
      const user = await User.findByIdAndUpdate(id, args, { new: true }); // Busca y actualiza el usuario con el id proporcionado y los nuevos argumentos proporcionados
      if (!user) { // Si el usuario no existe
        throw new ApolloError('User not found', 'USER_NOT_FOUND'); // Lanza un error de Apollo
      }
      return user; // Retorna el usuario actualizado
    },
    deleteUser: async (_: any, { id }: { id: string }) => { // Mutación para eliminar un usuario por su id
      const user = await User.findByIdAndDelete(id); // Busca y elimina el usuario con el id proporcionado
      if (!user) { // Si el usuario no existe
        throw new ApolloError('User not found', 'USER_NOT_FOUND'); // Lanza un error de Apollo
      }
      return user; // Retorna el usuario eliminado
    },
  },
};
