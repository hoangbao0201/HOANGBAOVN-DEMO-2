
import { JWT } from "next-auth/jwt";
import NextAuth, { NextAuthOptions } from "next-auth";
// import GitHubProvider from "next-auth/providers/github";

import { API_BASE_URL } from "@/constants";
import CredentialsProvider from "next-auth/providers/credentials";

async function refreshToken(token: JWT): Promise<JWT> {
    const res = await fetch(API_BASE_URL + "/api/auth/refresh", {
        method: "POST",
        headers: {
            authorization: `Refresh ${token.backendTokens.refreshToken}`,
        },
    });

    const response = await res.json();

    return {
        ...token,
        backendTokens: response,
    };
}

const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "text",
                    placeholder: "hoangbaovn",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                if (!credentials?.email || !credentials?.password) return null;
                const { email, password } = credentials;
                const res = await fetch(API_BASE_URL + "/api/auth/login", {
                    method: "POST",
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (res.status == 401) {
                    return null;
                }

                const user = await res.json();

                return user;
            },
        }),
        // GitHubProvider({
        //     profile(profile) {
        //         console.log("Profile GitHub: ", profile);

        //         let userRole = "GitHub User";
        //         if (profile?.email == "jake@claritycoders.com") {
        //             userRole = "admin";
        //         }

        //         return {
        //             ...profile,
        //             role: userRole,
        //         };
        //     },
        //     clientId: process.env.GITHUB_ID as string,
        //     clientSecret: process.env.GITHUB_SECRET as string,
        // }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) return { ...token, ...user };

            if (new Date().getTime() < token.backendTokens.expiresIn)
                return token;

            return await refreshToken(token);
        },
        async session({ token, session }) {
            session.user = token.user;
            session.backendTokens = token.backendTokens;

            return session;
        },
        // async signIn(user, account, profile) {
        //     const res = await fetch(`${API_BASE_URL}/api/auth/github/callback`, {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({ user }),
        //     });

        //     const data = await res.json();

        //     if (res.ok) {
        //         return Promise.resolve(data);
        //     } else {
        //         return Promise.resolve(false);
        //     }
        // },
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
