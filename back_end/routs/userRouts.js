import express from 'express';
import UserData from '../models/user.js';
import { getUserByEmailPassword, createUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await getUserByEmailPassword(email, password);

        if (user) {
            return res.status(200).json(user);
        }

        res.status(401).json({ error: 'Invalid email or password' });

    } catch (error) {
        console.error("Login error:", error);  // <-- THIS
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.post('/register', async (req, res) => {
    const { id, email, password } = req.body;
    try {
        const existingUser = await UserData.findOne({ email: email });
        if (existingUser) {
            return res.status(409).json({ error: 'Email already in use' });
        }
        const newUser = await createUser(id, email, password);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;