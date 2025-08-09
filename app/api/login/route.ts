import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@/app/generated/prisma';



export async function POST(request: Request) {
    const prisma = new PrismaClient();
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json({ message: 'Email and password are required.' }, { status: 400 });
        }

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return NextResponse.json({ message: 'Invalid email or password.' }, { status: 401 });
        }

        const passwordMath = await bcrypt.compare(password, user.password);
        if (!passwordMath) {
            return NextResponse.json({ message: 'Invalid email or password.' }, { status: 401 });
        }

        const tokenJwt = jwt.sign(
            { id: user.id, email: user.email, nameUser: user.nameUser },
            process.env.JWT_SECRET!,
            { expiresIn: '7d' },
        )
        const response = NextResponse.json({ message: "Logged successfully." });

        response.cookies.set('token', tokenJwt, {
            httpOnly: true,
            secure: false,
            path: '/',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7, 
        });
        return response;
    } catch (error) {
        return NextResponse.json({ message: 'Something went wrong.' }, { status: 500 });
    }

}