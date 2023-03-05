import {Field, InputType, ID} from 'type-graphql';
import {Catalogue} from "../../models/Catalogue";


@InputType()
export class CatalogueType implements Partial<Catalogue>{
    @Field(() => ID, {nullable: true})
    id: string;

    @Field()
    name: string;

    @Field()
    file: string;
}