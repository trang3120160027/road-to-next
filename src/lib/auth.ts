import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import prisma from "./prisma";
import { resend } from "./resend";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      await resend.emails.send({
        from: "Anders Tran <security@mail.anderstran.me>",
        to: user.email,
        subject: "Reset your password",
        html: `
          <p>Hi ${user.name ?? user.email},</p>
          <p>Click the link below to reset your password. This link expires in 1 hour.</p>
          <p><a href="${url}">Reset Password</a></p>
          <p>If you did not request a password reset, you can safely ignore this email.</p>
        `,
      });
    },
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  plugins: [nextCookies()],
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60,
    },
  },
});
