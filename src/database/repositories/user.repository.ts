import { UserModel } from "../models"; 

interface IUser{
    name: string;
    email: string;
    password: string;
}
export class UserRepository{
    async createUser(userData: any) {
		const newUser = await UserModel.create(userData);
		return newUser;
	}

    async findByEmail(email: string){
        const user = await UserModel.findOne({where:{email}});
        return user
    }
}
