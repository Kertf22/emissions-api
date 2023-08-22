import { Router } from "express";
import authMiddleware from "../middlewares/auth";
import CO2Controller from "../controllers/CO2Controller";
import CO2Service from "../services/CO2Service";
import PrismaCO2Repository from "../repositories/implementations/prisma/PrismaCO2Repository";
import PrismaUserRepository from "../repositories/implementations/prisma/PrismaUserRepository";
import UserService from "../services/UserService";
import JWTService from "../services/JWTService";
import UserController from "../controllers/UserController";
import PrismaLocationRepository from "../repositories/implementations/prisma/PrismaLocationRepository";
import LocationController from "../controllers/LocationController";
import LocationService from "../services/LocationService";


const appRoutes = Router();
const co2Repository = new PrismaCO2Repository();
const co2Service = new CO2Service(co2Repository);
const co2Controller = new CO2Controller(co2Service);

const userRepository = new PrismaUserRepository();
const jwtService = new JWTService();
const userService = new UserService(userRepository, jwtService);
const userController = new UserController(userService);

const locationRepository = new PrismaLocationRepository();
const locationService = new LocationService(locationRepository);
const locationController = new LocationController(locationService);

appRoutes.post('/register', userController.register);
appRoutes.post('/login', userController.login);

appRoutes.post('/location', authMiddleware, locationController.saveLocation);
appRoutes.get('/location', locationController.getHistory);

appRoutes.get('/country-info/:country', authMiddleware,  co2Controller.getCountryInfo);
appRoutes.get('/country/:country/:ano', authMiddleware, co2Controller.getCountryByYear);
appRoutes.get('/country', authMiddleware, co2Controller.getCountries);

appRoutes.get('/year-total/:ano', authMiddleware, co2Controller.getYear);

appRoutes.get('/emissions/average', authMiddleware, co2Controller.getAverageEmissions);
appRoutes.get('/fonts/most-commons', authMiddleware, co2Controller.getMostCommonFonts);
appRoutes.get('/co2-total/:paises_count/:ordem', authMiddleware, co2Controller.getTotalByCountryCount);



export default appRoutes;