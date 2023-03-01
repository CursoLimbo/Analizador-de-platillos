import {Resolver, Mutation, Arg, Query} from "type-graphql";
import {Company, CompanyModel} from "../models/Company";
import {CompanyType} from "./Types/Company";
import {Manager} from "../models/Manager";



@Resolver((_of) => Company)
export class CompanyResolver {
    @Query((_returns) => Company, {nullable:false, name: 'getCompany'})
    async getCompanyById(@Arg('id') id: string){
        return CompanyModel.findById({_id: id});
    }

    @Mutation(() => Company, {name: 'CreateCompany'})
    async createCompany(@Arg('newCompany'){name, email, phone, logo}: CompanyType): Promise<Company>{
        const companyCreated = (
            await CompanyModel.create({name, email, phone, logo})
        ).save();
        return companyCreated;
    }

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