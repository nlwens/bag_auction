import statusCode from "http-status-codes";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';  // 使用 import 替代 require
import users from "../data/users-data.js";

const SECRET_KEY = 'myKey';

export async function registerUser(req, res, next) {
    const {username, email, password} = req.body;

    if(username === undefined || email === undefined || password === undefined){
        const error = new Error('Register Information is not completed!');
        error.status = statusCode.BAD_REQUEST;
        return next(error);
    }

    // the username of the new user has to be unique
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        const error = new Error('Username already exists');
        error.status = statusCode.BAD_REQUEST;
        return next(error);
    }

    //the id of the new user is generated automatically based on the last final user
    const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = { id: newId, username, email, isAdmin: false, password: hashedPassword };
        console.log(hashedPassword)
        users.push(newUser);
        res.status(statusCode.CREATED).json({message: 'User registered successfully', userId: newId})
    } catch (err) {
        console.error('Error during registration:', err);
        throw err;
    }
}

export function loginUser(req, res, next) {
    const { username, password } = req.body;

    const user = users.find(user => user.username === username);
    if (!user) {
        const error = new Error('Invalid username or password');
        error.status = statusCode.UNAUTHORIZED;
        return next(error);
    }

    bcrypt.compare(password, user.password)
        .then(validPassword => {
            if (!validPassword) {
                const error = new Error('Invalid username or password');
                error.status = statusCode.UNAUTHORIZED;
                return next(error);
            }

            const token = jwt.sign(
                { username: user.username, isAdmin: user.isAdmin },
                SECRET_KEY
            );

            res.status(statusCode.OK).json({ message: 'Login successful', token, isAdmin: user.isAdmin, userId: user.id, username: user.username });
        })
        .catch(err => next(err));
}

