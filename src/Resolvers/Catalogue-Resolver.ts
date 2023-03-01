import {Resolver, Mutation, Arg, Query, ID} from "type-graphql";
import {Catalogue, CatalogueModel} from "../models/Catalogue";
import {CatalogueType} from "./Types/Catalogue";



@Resolver((_of) => Catalogue)
export class CatalogueResolver {
    @Query((_returns) => Catalogue, {nullable:false, name: 'getCatalogue'})
    async getCatalogueById(@Arg('id') id: string){
        return CatalogueModel.findById({_id: id});
    }

    @Query(()=> [Catalogue], {name: 'GetAllCatalogues', description: 'Get List of catalogues'})
    async getALlCatalogues(){
        return CatalogueModel.find();
    }

    @Mutation(() => Catalogue, {name: 'CreateCatalogue'})
    async createCatalogue(@Arg('newCatalogue'){name, file}: CatalogueType): Promise<Catalogue>{
        const catalogueCreated = (
            await CatalogueModel.create({name, file})
        ).save();
        return catalogueCreated;
    }

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

    @Mutation(() => String, {name: 'deleteCatalogue'})
    async  deleteCatalogue(@Arg('id')id: string): Promise<String>{
        const result = await CatalogueModel.deleteOne({_id: id});

        if(result.deletedCount == 1) return id;
        else return ''
    }

}