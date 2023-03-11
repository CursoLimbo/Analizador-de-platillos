import {Resolver, Mutation, Arg, Query, Authorized} from "type-graphql";
import {Manager, ManagerModel} from "../models/Manager";
import {ManagerType} from "./Types/Manager";
import bcrypt from "bcryptjs";
import {GraphQLError} from "graphql";
import jwt from "jsonwebtoken"


@Resolver((_of) => Manager)
export class ManagerResolver {
    @Authorized()
    @Query((_returns) => Manager, {nullable:false, name: 'getManager'})
    async getManagerById(@Arg('id') id: string){
        return ManagerModel.findById({_id: id});
    }


    @Query((_returns) => Manager, {nullable:false, name: 'getManagerByEmailAndPassword'})
    async getManagerByEmailAndPassword(@Arg('email') email: string, @Arg('password')password: string){
        const manager = await ManagerModel.findOne({email: email}).exec()

        if(manager && (await bcrypt.compare(password, manager.password))){
            const token = jwt.sign(
                { userId: manager._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );

            manager.token = token;

            return manager;
        }else{
            throw new GraphQLError('Invalid user credentials' );
        }
    }


    @Mutation(() => Manager, {name: 'CreateManager'})
    async createManager(@Arg('newManager'){name, phone, email, bankAccounts, whatsapp, photo, password}: ManagerType): Promise<Manager>{
        const encryptedPassword = await bcrypt.hash(password, 10);
        const managerCreated = (
            await ManagerModel.create({name, phone, email, bankAccounts, whatsapp, photo, password: encryptedPassword})
        ).save();
        return managerCreated;
    }

    @Authorized()
    @Mutation(() => Manager, {name: 'updateManager'})
    async updateManager (@Arg('updateManager'){id, name, phone, email, bankAccounts, whatsapp, photo}: ManagerType): Promise<Manager>{
        const updatedManager = (
            await ManagerModel.findByIdAndUpdate({_id:id},
                {
                    name, phone, email, bankAccounts, whatsapp, photo
                }, {new: true}
            )
        );
        return updatedManager;
    }
}