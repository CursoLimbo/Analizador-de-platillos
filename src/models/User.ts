// Importamos los módulos necesarios de mongoose
import mongoose, { Document, Model } from 'mongoose';

// Definimos la interfaz IUser para definir las propiedades que tendrá un usuario
interface IUser {
  name: string;
  email: string;
  age: number;
}

// Definimos la interfaz IUserDocument que extiende la interfaz IUser y la interfaz Document de Mongoose
interface IUserDocument extends IUser, Document {}

// Definimos la interfaz IUserModel que extiende la interfaz Model de Mongoose
interface IUserModel extends Model<IUserDocument> {}

// Creamos un nuevo schema de mongoose para el modelo de usuario
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    age: {
      type: Number,
      validate: {
        validator: (value: number) => {
          return value >= 0;
        },
        message: 'Age must be a positive number',
      },
    },
  },
  {
    timestamps: true,
  }
);

// Creamos el modelo de usuario a partir del schema y las interfaces IUserDocument e IUserModel
const User = mongoose.model<IUserDocument, IUserModel>('User', userSchema);

// Exportamos el modelo de usuario y la interfaz IUser
export { User, IUser };
