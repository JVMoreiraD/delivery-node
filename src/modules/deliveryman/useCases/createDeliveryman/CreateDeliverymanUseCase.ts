import { hash } from "bcryptjs";
import { prisma } from "../../../../database/prismaClient";

interface IDeliverymanInterface {
    username: string;
    password: string;
}
class CreateDeliverymanUseCase {
    async execute({ username, password }: IDeliverymanInterface) {
        // Validar se o usuário existe
        const deliverymanExists = await prisma.deliveryman.findUnique({
            where: {
                username
            }
        })
        if (deliverymanExists) {
            throw new Error("deliveryman already exists")
        }
        // Criptografar a senha
        const cryptPassword = await hash(password, 8)
        // Salvar deliveryman
        const deliveryman = await prisma.deliveryman.create({
            data: {
                username,
                password: cryptPassword
            }
        })
        return deliveryman
    }
}
export { CreateDeliverymanUseCase }