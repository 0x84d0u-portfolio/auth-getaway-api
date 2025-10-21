import { Errors } from "@0x84d0u/protocool";
import { PrismaClientKnownRequestError } from "../../lib/prisma/generated/runtime/edge";
import { database } from "../../lib";

export const getOneByUsername = async (username: string) => {
    const user = await database.user.findUnique({
        where: {
            name: username
        },
    });
    return user;
}

export const getOneById = async (userId: string) => {
    const user = await database.user.findUnique({
        where: {
            id: userId
        },
    });
    return user;
}

export const createOne = async (
    username: string,
    password: string,
    email: string | null,
) => {
    try {
        const user = await database.user.create({
            data: { name: username, password, email }
        });
        return user;
    } catch (e: any) {
        if (e instanceof PrismaClientKnownRequestError) {
            console.log(e)
            throw new Errors.Internal("Prisma error", e);
        }
        throw e;
    }
}

