// import { User } from "../../../generated/prisma/client";
// import { auth } from "../../lib/auth";

import { UserStatus } from "../../../generated/prisma/enums";
import { auth } from "../../lib/auth";

interface IRegisterPatientPayload {
  name: string;
  email: string;
  password: string;
}

// sign up a patient
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
  return data;
};

interface ILoginUserPayload {
  email: string;
  password: string;
}

// sign in a user
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
