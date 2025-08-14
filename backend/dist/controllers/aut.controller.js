"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';
class AuthController {
    // User login
    async login(req, res) {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        try {
            // Replace with your user fetching logic
            const user = await this.findUserByEmail(email);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }
            const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, SECRET_KEY, {
                expiresIn: '1h',
            });
            return res.status(200).json({ token });
        }
        catch (error) {
            return res.status(500).json({ message: 'Internal server error', error });
        }
    }
    // User registration
    async register(req, res) {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        try {
            // Replace with your user fetching logic
            const existingUser = await this.findUserByEmail(email);
            if (existingUser) {
                return res.status(409).json({ message: 'User already exists' });
            }
            const hashedPassword = await bcrypt_1.default.hash(password, 10);
            // Replace with your user creation logic
            const newUser = await this.createUser(email, hashedPassword);
            return res.status(201).json({ message: 'User registered successfully', user: newUser });
        }
        catch (error) {
            return res.status(500).json({ message: 'Internal server error', error });
        }
    }
    // Mock method to find a user by email
    async findUserByEmail(email) {
        // Replace with actual database query
        return null;
    }
    // Mock method to create a new user
    async createUser(email, password) {
        // Replace with actual database query
        return { id: 1, email, password };
    }
}
exports.AuthController = AuthController;
exports.default = new AuthController();
