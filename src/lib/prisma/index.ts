import { PrismaClient } from "./generated/index.js";

export const database = new PrismaClient();

export type { User} from "./generated/index.js";