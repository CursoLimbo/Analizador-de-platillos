

// create auth checker function
import {AuthChecker} from "type-graphql";
import {Context} from "./Context";
import jwt from "jsonwebtoken"
import {UserData} from "./UserData";

export const authChecker: AuthChecker<Context> = ({ context: { req} }, roles) => {
    const authorization = req.headers.authorization

    if(!authorization) {
        return false
    }

    const token = authorization.replace("Bearer", "").trim();

    const decoded = jwt.verify(token, process.env.TOKEN_KEY);//check if the sign is the same
    const userData: UserData = new UserData({...decoded as UserData})

    if (roles.length === 0) {
        return !!userData.userId;
    }

    return false;
};