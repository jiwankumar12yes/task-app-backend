import bcrypt from "bcrypt";
import { prisma } from "../../config/db.js";
import { generateRefreshToken, generateToken } from "../../utils/jwt.js";
export const register = async (data) => {
    const existingUser = await prisma.user.findUnique({
        where: { email: data.email },
    });
    if (existingUser) {
        throw new Error("This email is already registered.");
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = await prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            password: hashedPassword,
            refreshToken: "", // or generate an initial refresh token if needed
        },
        select: {
            id: true,
            email: true,
            name: true,
        },
    });
    return { user: newUser };
};
export const login = async (data) => {
    console.log("first");
    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (!user) {
        throw new Error("user not found");
    }
    const pass = await bcrypt.compare(data.password, user.password);
    if (!pass) {
        throw new Error("Password not matched");
    }
    const payload = {
        id: user.id,
        email: user.email,
    };
    const accessToken = generateToken(payload);
    const refreshToken = generateRefreshToken(payload);
    await prisma.user.update({
        where: { id: user.id },
        data: { refreshToken: refreshToken },
    });
    const clientUser = {
        id: user.id,
        email: user.email,
        name: user.name,
    };
    return { user: clientUser, accessToken, refreshToken };
};
//# sourceMappingURL=auth.service.js.map