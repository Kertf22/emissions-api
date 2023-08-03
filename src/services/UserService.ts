import User from "../models/user";
import UserRepository from "../repositories/contracts/UserRepository";
import JWTService from "./JWTService";

export default class UserService {
    constructor
    (private userRepository: UserRepository,
    private jwtService: JWTService) {}

    async getUser(username: string): Promise<any> {
        const user = await this.userRepository.findByUsername(username);
        return user;
    }

    async saveUser(username: string, password: string): Promise<void> {
        const userExists = await this.userRepository.findByUsername(username);
        if (userExists) {
            throw new Error("User already exists");
        }
        const user = new User(0, username, password);
        await this.userRepository.save(user);
    }

    async login(username: string, password: string): Promise<any> {
        const user = await this.userRepository.findByUsernameAndPassword(username, password);
        if (!user) {
            throw new Error("Invalid username or password");
        }
        const token = await this.jwtService.sign({ id: user.id }, "nelsonsegredo", { expiresIn: "1h"});
        console.log(token)
        return {
            token,
            user
        };
    }

}