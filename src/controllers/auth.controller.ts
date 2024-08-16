import { Request, Response } from "express";

import { BadRequestError } from "../errors";

import { checkPassword, generateHashedPassword } from "../utils/passwordHash";
import { UserRepository } from "../database/repositories";
import { createJwtAccessToken } from "../utils/jwt";

const userRepository = new UserRepository();

const signup = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const userExist = await userRepository.findByEmail(email);
    if (userExist) throw new BadRequestError("User already exist");

    const hashedPassword = await generateHashedPassword(password);
    const newUser = await userRepository.createUser({
        ...req.body,
        password: hashedPassword,
    });
    console.log(newUser.dataValues);

    // To remove the password before sending the response
    const { password: _, ...userWithoutPassword } = newUser.dataValues;
    res.status(201).json({ user: userWithoutPassword });
};

const signin = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await userRepository.findByEmail(email);
    if (!user) throw new BadRequestError("Invalid email or password");

    const isSamePassword = await checkPassword(
        password,
        user.dataValues.password
    );

    if (!isSamePassword) throw new BadRequestError("Invalid email or password");
    // To remove the password before sending the response
    const { password: _, ...userWithoutPassword } = user.dataValues;
    const jwtPayload = { userId: user.id, name: user.name, email };
    const jwtAccessToken = createJwtAccessToken(jwtPayload);
    res.cookie("token", jwtAccessToken, { httpOnly: true });
    res.status(200).json({ user: userWithoutPassword });
};

export default { signin, signup };
