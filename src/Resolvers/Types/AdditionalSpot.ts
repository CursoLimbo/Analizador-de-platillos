import {Field, InputType, ID} from 'type-graphql';
import {AdditionalSpot} from "../../models/AdditionalSpot";


@InputType()
export class AdditionalSpotType implements Partial<AdditionalSpot>{

    @Field(() => ID, {nullable: true})
    id: string;

    @Field()
    name: string;

    @Field()
    value: string;
}