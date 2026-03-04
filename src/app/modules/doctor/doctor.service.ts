import { prisma } from "../../lib/prisma";
import { IUpdateDoctorPayload } from "./doctor.interface";

// get all doctors
const getAllDoctors = async () => {
  const doctors = await prisma.doctor.findMany({
    include: {
      user: true,
      specialties: {
        include: {
          specialty: true,
        },
      },
    },
  });
  return doctors;
};

// get doctor by ID
const getDoctorById = async (id: string) => {
  const doctor = await prisma.doctor.findUnique({
    where: { id },
    include: {
      user: true,
      specialties: {
        include: {
          specialty: true,
        },
      },
    },
  });

  if (!doctor) {
    throw new Error(`Doctor with id ${id} not found`);
  }

  return doctor;
};

// update doctor
const updateDoctor = async (id: string, payload: IUpdateDoctorPayload) => {
  const doctorExists = await prisma.doctor.findUnique({
    where: { id },
  });

  if (!doctorExists) {
    throw new Error(`Doctor with id ${id} not found`);
  }

  const doctor = await prisma.doctor.update({
    where: { id },
    data: payload,
    include: {
      user: true,
      specialties: {
        include: {
          specialty: true,
        },
      },
    },
  });

  return doctor;
};

// delete a doctor
const deleteDoctor = async (id: string) => {
  const doctorExists = await prisma.doctor.findUnique({
    where: { id },
  });

  if (!doctorExists) {
    throw new Error(`Doctor with id ${id} not found`);
  }

  await prisma.user.delete({
    where: { id: doctorExists.userId },
  });

  return doctorExists;
};

export const DoctorService = {
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
};
