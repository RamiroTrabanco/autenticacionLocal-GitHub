import {userModel} from "../models/users.model.js"
import { hashPassword, comparePassword } from "../../utils.js";

export default class UsersManager {
    async createUser(user){
        const {email, password} = user
        try {
            const userExist = await userModel.find({email, password})
        if(userExist.length===0){
            const hashNewPassword = await hashPassword(password)
            const newUser = {...user, password: hashNewPassword}
            await userModel.create(newUser)
            return newUser
        } else {
            return null
        }
        } catch (error) {
            throw new Error(error)
        }
    }

    async loginUser(user){
        const {email, password} = user
        const usr = await userModel.find({email}) /* esto devuelve un array, por eso el usr[0] */
        if(usr.length!==0){
            const isPassword = comparePassword(password, usr[0].password)
            if(isPassword){
            return usr}
        } else {
            return null
        }
    }

    async findUserByEmail({email}){
        const user = await userModel.findOne({email})
        return user
    }
}