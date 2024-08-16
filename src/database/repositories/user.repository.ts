import { UserModel } from "../models"; 

export class UserRepository{
    async createUser(userData: Partial<UserModel>): Promise<UserModel> {
		const newUser = await UserModel.create(userData);
		return newUser;
	}

    async findByEmail(email: string): Promise<UserModel | null>{
        const user = await UserModel.findOne({where:{email}});
        return user
    }
}
