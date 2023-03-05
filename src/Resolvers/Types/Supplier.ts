import {Field, InputType, ID} from 'type-graphql';
import {Supplier} from "../../models/Supplier";


@InputType()
export class SupplierType implements Partial<Supplier>{
    @Field(() => ID, {nullable: true})
    id: string;

    @Field()
    name: string;

    @Field()
    location: string;

    @Field({nullable: true})
    phone: string;

}