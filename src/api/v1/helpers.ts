import { Errors } from "@0x84d0u/protocool";
import type { Request } from "express";


// Todo: Import from protocool
export type Issue = {
    path: string,
    message: string,
    code: string,
}

export const validateUserLogin = async (body: Request['body']) => {
    const { username, password } = body;
    let issues: Issue[] = [];

    if (!password) {
        issues.push({ code: 'PASSWORD_ERR', message: "Password is missing", path: 'password' })
    }

    if (!username) {
        issues.push({ code: 'USERNAME_ERR', message: "Username is missing", path: 'username' })
    }

    if (issues.length > 0) {
        throw new Errors.Validation("Body request error", { issues })
    }

    return {
        username,
        plain: password
    }
}


export const validateUserRegister = async (body: Request['body']) => {
    const { username, password, email } = body;
    let issues: Issue[] = [];

    if (!password) {
        issues.push({ code: 'PASSWORD_ERR', message: "Password is missing", path: 'password' })
    }

    if (!username) {
        issues.push({ code: 'USERNAME_ERR', message: "Username is missing", path: 'username' })
    }

    if (issues.length > 0) {
        throw new Errors.Validation("Body request error", { issues })
    }

    return {
        username,
        email: email || null,
        plain: password,
    }
}