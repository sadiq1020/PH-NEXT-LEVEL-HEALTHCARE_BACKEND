import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { Role, UserStatus } from "../../generated/prisma/enums";
import { prisma } from "./prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        defaultValue: Role.PATIENT,
      },

      status: {
        type: "string",
        required: true,
        defaultValue: UserStatus.ACTIVE,
      },

      needPasswordChange: {
        type: "boolean",
        required: true,
        defaultValue: false,
      },

      isDeleted: {
        type: "boolean",
        required: true,
        defaultValue: false,
      },

      deletedAt: {
        type: "date",
        required: false,
        defaultValue: null,
      },
    },
  },

  /* -> Not working (Instructor made mistake)
  session: {
    expiresIn: Number(
      ms(envVars.BETTER_AUTH_SESSION_TOKEN_EXPIRES_IN as StringValue),
    ),
    updateAge: Number(
      ms(envVars.BETTER_AUTH_SESSION_TOKEN_UPDATE_AGE as StringValue),
    ),
    cookieCache: {
      enabled: true,
      maxAge: Number(
        ms(envVars.BETTER_AUTH_SESSION_TOKEN_EXPIRES_IN as StringValue),
      ),
    },
  },
 */

  session: {
    expiresIn: 60 * 60 * 60 * 24, // 1 day
    updateAge: 60 * 60 * 60 * 24, // 1 day
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60 * 60 * 24, // 1 day
    },
  },

  // trustedOrigins: [process.env.BETTER_AUTH_URL || "http://localhost:5000"],

  // advanced: {
  //     disableCSRFCheck: true,
  // }
});
