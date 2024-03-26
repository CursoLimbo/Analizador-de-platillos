import { nanoid } from 'nanoid';
import {Resolver, Mutation, Arg, Query, Authorized} from "type-graphql";
import {Catalogue, CatalogueModel} from "../models/Catalogue";
import {CatalogueType} from "./Types/Catalogue";

@Resolver((_of) => Catalogue)
export class CatalogueResolver {
    @Authorized()
    @Query((_returns) => Catalogue, {nullable:false, name: 'getCatalogue'})
    async getCatalogueById(@Arg('id') id: string){
        return CatalogueModel.findById({_id: id});
    }

    @Authorized()
    @Query(()=> [Catalogue], {name: 'GetAllCatalogues', description: 'Get List of catalogues'})
    async getAllCatalogues(){
        return CatalogueModel.find();
    }

    @Authorized()
    @Mutation(() => Catalogue, {name: 'CreateCatalogue'})
    async createCatalogue(@Arg('newCatalogue'){name, file}: CatalogueType): Promise<Catalogue>{
        const sid = nanoid(8);
        const catalogueCreated = (
            await CatalogueModel.create({sid, name, file})
        ).save();
        return catalogueCreated;
    }

    @Authorized()
    @Mutation(() => Catalogue, {name: 'updateCatalogue'})
    async updateCatalogue (@Arg('updateCatalogue'){id, name, file}: CatalogueType): Promise<Catalogue>{
        const updatedCatalogue = (
            await CatalogueModel.findByIdAndUpdate({_id:id},
                {
                    name, file
                }, {new: true}
            )
        );
        return updatedCatalogue;
    }

    @Authorized()
    @Mutation(() => String, {name: 'deleteCatalogue'})
    async  deleteCatalogue(@Arg('id')id: string): Promise<String>{
        const result = await CatalogueModel.deleteOne({_id: id});

        if(result.deletedCount == 1) return id;
        else return ''
    }

}
