import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

export class AuthController {
    // User login
    async login(req: Request, res: Response): Promise<Response> {
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

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
                expiresIn: '1h',
            });

            return res.status(200).json({ token });
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error', error });
        }
    }

    // User registration
    async register(req: Request, res: Response): Promise<Response> {
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

            const hashedPassword = await bcrypt.hash(password, 10);

            // Replace with your user creation logic
            const newUser = await this.createUser(email, hashedPassword);

            return res.status(201).json({ message: 'User registered successfully', user: newUser });
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error', error });
        }
    }

    // Mock method to find a user by email
    private async findUserByEmail(email: string): Promise<any> {
        // Replace with actual database query
        return null;
    }

    // Mock method to create a new user
    private async createUser(email: string, password: string): Promise<any> {
        // Replace with actual database query
        return { id: 1, email, password };
    }
}

export default new AuthController();