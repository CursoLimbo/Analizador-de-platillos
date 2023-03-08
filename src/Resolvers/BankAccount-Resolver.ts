import {Resolver, Mutation, Arg, Query, ID} from "type-graphql";
import {BankAccount, BankAccountModel} from "../models/BankAccount";
import {BankAccountType} from "./Types/BankAccount";

@Resolver((_of) => BankAccount)
export class BankAccountResolver{
    @Query((_returns) => BankAccount, {nullable:false, name: 'GetBankAccount'})
    async getBankACcountById(@Arg('id')id: string){
        return BankAccountModel.findById({_id: id});
    }

    @Query(() => [BankAccount], {name: 'GetAllBankAccount', description: 'Get list of bank accounts'})
    async getALlBankAccounts(){
        return BankAccountModel.find();
    }


    @Mutation(()=> BankAccount, {name: 'createBankAccount'})
    async createBankAccount(@Arg('newBankAccount') {bank, accountNumber}: BankAccountType): Promise<BankAccount>{
        const bankAccount = (
            await BankAccountModel.create({
                bank, accountNumber
            })
        ).save();
        return bankAccount;
    }


    @Mutation(()=> BankAccount, {name: 'updateBankAccount'})
    async updateBankAccount(@Arg('updateBankAccount'){id, bank, accountNumber}: BankAccountType): Promise<BankAccount>{
        const bankAccount = await BankAccountModel.findByIdAndUpdate({_Id: id}, {
            bank,
            accountNumber
        }, {new: true}
        ); return bankAccount;
    }


    @Mutation( ()=> String, {name: 'deleteBankAccount'})
    async  deleteBankAccount(@Arg('id') id: string): Promise<string>{
        const result = await BankAccountModel.deleteOne({_id: id});
        if(result.deletedCount == 1) return id;
        else return '';
    }
    
}