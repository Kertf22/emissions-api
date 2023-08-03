import { Request, Response } from "express";
import UserService from "../services/UserService";

export default class UserController {
    constructor(private userService: UserService) {
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
    }

    async login(req: Request, res: Response): Promise<void> {
        console.log(req.body)
        const { username, password } = req.body;
        if (!username || !password) {
          res.status(500).json({
            message: "Aconteceu um erro"
          }).send()
        }
        
        const response = await this.userService.login(username, password);
        res.status(200).json(response).send();
    }

    async register(req: Request, res: Response): Promise<void> {

        try {
            const { username, password } = req.body;
            if (!username || !password) {
              res.status(500).json({
                message: "Aconteceu um erro"
              }).send();
            }
            await this.userService.saveUser(username, password);
            res.sendStatus(200);
        }
        catch (err) {
            res.status(500).json({
                message: "Aconteceu um erro"
            }).send();
        }

    }
    
}