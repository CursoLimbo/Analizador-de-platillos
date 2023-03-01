import {Resolver, Mutation, Arg, Query, ID} from "type-graphql";
import {Client, ClientModel} from "../models/Client";
import {ClientType} from "./Types/Client";


@Resolver((_of) => Client)
export class ClientResolver {
    @Query((_returns) => Client, {nullable:false, name: 'getClient'})
    async getClientById(@Arg('id') id: string){
        return ClientModel.findById({_id: id});
    }

    @Query(()=> [Client], {name: 'GetAllClients', description: 'Get List of clients'})
    async getALlClients(){
        return ClientModel.find();
    }

    @Mutation(() => Client, {name: 'CreateClient'})
    async createCatalogue(@Arg('newClient'){name, location, phone, whatsapp, email}: ClientType): Promise<Client>{
        const clientCreated = (
            await ClientModel.create({name, location, phone, whatsapp, email})
        ).save();
        return clientCreated;
    }

    @Mutation(() => Client, {name: 'updateClient'})
    async updateClient (@Arg('updateClient'){id, name, location, phone, whatsapp, email}: ClientType): Promise<Client>{
        const updatedClient = (
            await ClientModel.findByIdAndUpdate({_id:id},
                {
                    name, location, phone, whatsapp, email
                }, {new: true}
            )
        );
        return updatedClient;
    }

    @Mutation(() => String, {name: 'deleteClient'})
    async  deleteClient(@Arg('id')id: string): Promise<String>{
        const result = await ClientModel.deleteOne({_id: id});

        if(result.deletedCount == 1) return id;
        else return ''
    }

}