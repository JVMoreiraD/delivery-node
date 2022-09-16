import { compare } from "bcryptjs";
import { prisma } from "../../../database/prismaClient";
import { sign } from "jsonwebtoken"
interface IAuthenticateClient {
    username: string;
    password: string;
}


class AuthenticateClientUseCase {
    async execute({ username, password }: IAuthenticateClient) {
        const client = await prisma.clients.findFirst({
            where: {
                username
            }
        })
        if (!client) {
            throw new Error("username or password invalid")
        }
        const passwordMatch = await compare(password, client.password);

        if (!passwordMatch) {
            throw new Error("username or password invalid")
        }

        const token = sign({ username }, "ad70318dc5ae6e80c60fe4c7bbd417d7", {
            subject: client.id,
            expiresIn: "1d"
        })

        return token
    }
}

export { AuthenticateClientUseCase }