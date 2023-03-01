import {Resolver, Mutation, Arg, Query} from "type-graphql";
import {Supplier, SupplierModel} from "../models/Supplier";
import {SupplierType} from "./Types/Supplier";


@Resolver((_of) => Supplier)
export class SupplierResolver {
    @Query((_returns) => Supplier, {nullable:false, name: 'getSupplier'})
    async getSupplierById(@Arg('id') id: string){
        return SupplierModel.findById({_id: id});
    }

    @Query(()=> [Supplier], {name: 'GetAllSuppliers', description: 'Get List of Suppliers'})
    async getALlSuppliers(){
        return SupplierModel.find();
    }

    @Mutation(() => Supplier, {name: 'CreateSupplier'})
    async createSupplier(@Arg('newSupplier'){name, location, phone}: SupplierType): Promise<Supplier>{
        const supplierCreated = (
            await SupplierModel.create({name, location, phone})
        ).save();
        return supplierCreated;
    }

    @Mutation(() => Supplier, {name: 'updateSupplier'})
    async updateSupplier (@Arg('updateSupplier'){id,name, location, phone}: SupplierType): Promise<Supplier>{
        const updatedSupplier = (
            await SupplierModel.findByIdAndUpdate({_id:id},
                {
                    name, location, phone
                }, {new: true}
            )
        );
        return updatedSupplier;
    }

    @Mutation(() => String, {name: 'deleteSupplier'})
    async  deleteSupplier(@Arg('id')id: string): Promise<String>{
        const result = await SupplierModel.deleteOne({_id: id});

        if(result.deletedCount == 1) return id;
        else return ''
    }

}