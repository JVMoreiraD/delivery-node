import { hash } from "bcryptjs";
import { prisma } from "../../../../database/prismaClient";

interface ICreateClientInterface {
    username: string;
    password: string;
}
class CreateClientUseCase {
    async execute({ username, password }: ICreateClientInterface) {
        // Validar se o usuário existe
        const clientExists = await prisma.clients.findUnique({
            where: {
                username
            }
        })
        if (clientExists) {
            throw new Error("Client already exists")
        }
        // Criptografar a senha
        const cryptPassword = await hash(password, 8)
        // Salvar cliente
        const client = await prisma.clients.create({
            data: {
                username,
                password: cryptPassword
            }
        })
        return client
    }
}
export { CreateClientUseCase }