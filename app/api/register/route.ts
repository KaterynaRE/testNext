import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@/app/generated/prisma';



export async function POST(request: Request) {
    const prisma = new PrismaClient();
    try {
        const { email, password, nameUser } = await request.json();

        if (!email || !password || !nameUser) {
            return NextResponse.json({ message: 'Email and password are required.' }, { status: 400 });
        }
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return NextResponse.json({ message: "User already exists" }, { status: 409 });
        }
        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashPassword,
                nameUser,
            },
        });

        const tokenJwt = jwt.sign(
            { id: newUser.id, email: newUser.email,  nameUser: newUser.nameUser},
            process.env.JWT_SECRET!,
            {expiresIn:'7d'},
        )
        const response = await NextResponse.json({message: "User registered successfully."}, {status: 201});
        response.cookies.set('token', tokenJwt, {
            httpOnly: true,
            secure: false,
            //secure: process.env.NODE_ENV === 'production',
            path: '/',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7, 
        });
        return response;
    }catch (error){
         return NextResponse.json({ message: 'Something went wrong.' }, { status: 500 });
    }
    
}