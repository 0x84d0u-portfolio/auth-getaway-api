
import { Errors, Respond } from "@0x84d0u/protocool";
import { ExpressHandler } from "@0x84d0u/protocool/express";

import { validateUserLogin, validateUserRegister } from "./helpers.js";
import { COOKIE_CONFIG } from "../../lib/config.js";
import { PasswordService, UserService } from "../services/index.js";
import { logger } from "../../lib";


export const login = ExpressHandler.wrap({
    log: {
        app: logger,
        name: "Login user"
    },
    fn: async (req, res) => {
        const { username, plain: plainPassword } = await validateUserLogin(req.body);

        const user = await UserService.getOneByUsername(username);
        if (!user) throw new Errors.Authentication("Incorrect credentials")

        const match = await PasswordService.compare(plainPassword, user.password);
        if (!match) throw new Errors.Authentication("Incorrect credentials");

        logger.debug("User logged in, setting up cookie", {
            username: user.name,
            userId: user.id,
        })

        const { password, ...safeUser } = user;
        res.cookie(COOKIE_CONFIG.name, user.id, COOKIE_CONFIG.options);
        res.status(200).json(Respond.ok({
            message: "Logged in",
            user: safeUser
        }));
        return;
    }
})

export const register = ExpressHandler.wrap({
    log: {
        app: logger,
        name: "Register user"
    },
    fn: async (req, res) => {
        const { username, email, plain } = await validateUserRegister(req.body);

        const hashed = await PasswordService.hash(plain);

        const user = await UserService.createOne(
            username,
            hashed,
            email
        );

        logger.debug("User registerd", {
            username: user.name,
            userId: user.id,
        })

        const { password, ...safeUser } = user;
        res.cookie(COOKIE_CONFIG.name, user.id, COOKIE_CONFIG.options);
        res.status(201).json(Respond.ok({
            message: "Registred",
            user: safeUser
        }));
        return;
    }
})


export const logout = ExpressHandler.wrap({
    log: {
        app: logger,
        name: "Logout user"
    },
    fn: async (req, res) => {
        res.clearCookie(COOKIE_CONFIG.name, {
            ...COOKIE_CONFIG.options,
            maxAge: 0
        });
        res.status(200).json(Respond.ok({
            message: "Logged out"
        }))
        return;
    }
})


export const me = ExpressHandler.wrap({
    log: {
        app: logger,
        name: "Get auth user"
    },
    fn: async (req, res) => {
        const userId = req.cookies[COOKIE_CONFIG.name];
        if (!userId) throw new Errors.Authorization("Unauthorized : no session cookie");

        const user = await UserService.getOneById(userId);
        if (!user) throw new Errors.Authorization("Unauthorized : invalid session cookie");


        const { password, ...safeUser } = user;
        res.status(200).json(Respond.ok({
            message: "User fetched",
            user: safeUser
        }))

        return;
    }
})




