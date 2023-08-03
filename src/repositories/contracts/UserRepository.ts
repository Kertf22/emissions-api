import User from "../../models/user";

export default interface UserRepository {
    findByUsername(username: string): Promise<User | null>;
    findByUsernameAndPassword(username: string, password: string): Promise<User | null>;
    save(user: User): Promise<void>;
}