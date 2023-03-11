import {Resolver, Mutation, Arg, Query, ID, Authorized} from "type-graphql";
import {AdditionalSpot, AdditionalSpotModel} from "../models/AdditionalSpot";
import {AdditionalSpotType} from "./Types/AdditionalSpot";


@Resolver((_of)=> AdditionalSpot)
export class AdditionalSpotResolver {
    @Authorized()
    @Query((_returns) => AdditionalSpot, {nullable: false, name: 'GetAdditionalSpot'})
    async getAdditionalSpotById(@Arg('id') id: string){
        return AdditionalSpotModel.findById({_id: id});
    }

    @Authorized()
    @Query(()=> [AdditionalSpot], {name: 'GetALlAdditionalSpot', description: 'Get list of additional spots'})
    async getAllAdditionalSpots(){
        return AdditionalSpotModel.find();
    }

    @Authorized()
    @Mutation(() => AdditionalSpot, {name: 'CreateAdditionalSpot'})
    async createAdditionalSpot(@Arg('newAdditionalSpot') {name, value}: AdditionalSpotType): Promise<AdditionalSpot>{
        const additionalSpot = (
            await AdditionalSpotModel.create({
                name,
                value
            })
        ).save();
        return additionalSpot
    }

    @Authorized()
    @Mutation(()=> AdditionalSpot,{name: 'updateAdditionalSpot'})
    async updateAdditionalSpot(
        @Arg('updateAdditionalSpot') {id, name, value}: AdditionalSpotType): Promise<AdditionalSpot>{
        const additionalSpot = await AdditionalSpotModel.findByIdAndUpdate(
            {_id: id},
            {
                name,
                value
            },
            {
                new: true
            }
        );
        return additionalSpot;
    }

    @Authorized()
    @Mutation(()=> String, {name: 'deleteAdditionalSpot'})
    async deleteAdditionalSpot(@Arg('id') id: string): Promise<String>{
        const result = await AdditionalSpotModel.deleteOne({_id: id});

        if(result.deletedCount == 1) return id;
        else return '';
    }

}