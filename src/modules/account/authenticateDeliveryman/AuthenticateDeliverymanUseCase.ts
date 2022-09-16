import { compare } from "bcryptjs";
import { prisma } from "../../../database/prismaClient";
import { sign } from "jsonwebtoken"

interface IAuthenticateDeliveryman {
    username: string;
    password: string;
}


class AuthenticateDeliverymanUseCase {
    async execute({ username, password }: IAuthenticateDeliveryman) {
        const deliveryman = await prisma.deliveryman.findFirst({
            where: {
                username
            }
        })
        if (!deliveryman) {
            throw new Error("username or password invalid")
        }
        const passwordMatch = await compare(password, deliveryman.password);

        if (!passwordMatch) {
            throw new Error("username or password invalid")
        }

        const token = sign({ username }, "89569232e3c124fea8e327d8254d0149", {
            subject: deliveryman.id,
            expiresIn: "1d"
        })

        return token
    }
}

export { AuthenticateDeliverymanUseCase }