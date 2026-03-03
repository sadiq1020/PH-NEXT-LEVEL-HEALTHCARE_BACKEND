// import { User } from "../../../generated/prisma/client";
// import { auth } from "../../lib/auth";

import { UserStatus } from "../../../generated/prisma/enums";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";

// sign up a patient

interface IRegisterPatientPayload {
  name: string;
  email: string;
  password: string;
}

const registerPatient = async (payload: IRegisterPatientPayload) => {
  const { name, email, password } = payload;

  const data = await auth.api.signUpEmail({
    body: {
      name,
      email,
      password,
      // default values
      //   needPasswordChange: false,
      //   role: Role.PATIENT,
    },
  });

  if (!data.user) {
    throw new Error("Failed to register patient");
  }

  // create a patient profile
  try {
    const patient = await prisma.$transaction(async (tx) => {
      const patientTx = await tx.patient.create({
        data: {
          userId: data.user.id,
          name: payload.name,
          email: data.user.email,
        },
      });
      return patientTx;
    });

    return {
      ...data,
      patient,
    };
  } catch (error) {
    console.log("Transaction Error: ", error);
    await prisma.user.delete({
      // manually deleting the user || see 38.02
      where: {
        id: data.user.id,
      },
    });
    throw error;
  }
};

// sign in a user
interface ILoginUserPayload {
  email: string;
  password: string;
}

const loginUser = async (payload: ILoginUserPayload) => {
  const { email, password } = payload;
  const data = await auth.api.signInEmail({
    body: {
      email,
      password,
    },
  });
  if (data.user.status === UserStatus.BLOCKED) {
    throw new Error("User is Blocked!");
  }

  if (data.user.isDeleted || data.user.status === UserStatus.DELETED) {
    throw new Error("User is Deleted");
  }

  return data;
};

export const authService = {
  registerPatient,
  loginUser,
};
