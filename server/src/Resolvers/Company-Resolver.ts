import {Resolver, Mutation, Arg, Query, Authorized} from "type-graphql";
import {Company, CompanyModel} from "../models/Company";
import {CompanyType} from "./Types/Company";
import {Manager} from "../models/Manager";



@Resolver((_of) => Company)
export class CompanyResolver {
    @Authorized()
    @Query((_returns) => Company, {nullable:false, name: 'getCompany'})
    async getCompany(){
        return CompanyModel.findOne();
    }

    @Authorized()
    @Mutation(() => Company, {name: 'CreateCompany'})
    async createCompany(@Arg('newCompany'){name, email, phone, logo, whatsapp}: CompanyType): Promise<Company>{
        const companyCreated = (
            await CompanyModel.create({name, email, phone, logo, whatsapp})
        ).save();
        return companyCreated;
    }

    @Authorized()
    @Mutation(() => Company, {name: 'updateCompany'})
    async updateCompany (@Arg('updateCompany'){id, name, phone, logo, email}: CompanyType): Promise<Company>{
        const updatedCompany = (
            await CompanyModel.findByIdAndUpdate({_id:id},
                {
                    name, phone, logo, email
                }, {new: true}
            )
        );
        return updatedCompany;
    }

}