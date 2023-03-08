import {Resolver, Mutation, Arg, Query, ID} from "type-graphql";
import {Manager, ManagerModel} from "../models/Manager";
import {ManagerType} from "./Types/Manager";


@Resolver((_of) => Manager)
export class ManagerResolver {
    @Query((_returns) => Manager, {nullable:false, name: 'getManager'})
    async getManagerById(@Arg('id') id: string){
        return ManagerModel.findById({_id: id});
    }

    @Query((_returns) => Manager, {nullable:false, name: 'getManagerByEmailAndPassword'})
    async getManagerByEmailAndPassword(@Arg('email') email: string, @Arg('password')password: string){
        return ManagerModel.findOne({email: email, password: password})
    }


    @Mutation(() => Manager, {name: 'CreateManager'})
    async createManager(@Arg('newManager'){name, phone, email, bankAccounts, whatsapp, photo, password}: ManagerType): Promise<Manager>{
        const managerCreated = (
            await ManagerModel.create({name, phone, email, bankAccounts, whatsapp, photo, password})
        ).save();
        return managerCreated;
    }

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