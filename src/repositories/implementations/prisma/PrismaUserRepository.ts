import UserRepository from "../../contracts/UserRepository";
import prisma from "../../../database/prisma-client";
import User from "../../../models/user";


export default class PrismaUserRepository implements UserRepository {
    async findByUsername(username : string) {
        const user = await prisma.user.findFirst({
            where: {
                username: username
            }
        });
        if (!user) {
            return null;
        }
        return new User(user.id, user.username, user.password);
    }
    async findByUsernameAndPassword(username: string, password: string) {
        const user = await prisma.user.findFirst({
            where: {
                username: username,
                password: password
            }
        });
        if (!user) {
            return null;
        }
        return new User(user.id, user.username, user.password);
    }
    async save(user: User) {
        await prisma.user.create({
            data: {
                username: user.username,
                password: user.password
            }
        });
    }
}