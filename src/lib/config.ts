import type { CookieOptions } from "express";

// const COOKIE_NAME = 'portfolio_session_dev';


export const COOKIE_CONFIG = {
    name: "portfolio_session",
    secret: process.env.COOKIE_SECRET,
    options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production" ? true : false,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        path: "/",
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days ,
        domain: "localhost"
    } as CookieOptions
}
