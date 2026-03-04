import { prisma } from "../../lib/prisma";
import { IUpdateDoctorPayload } from "./doctor.interface";

// get all doctors
const getAllDoctors = async () => {
  const doctors = await prisma.doctor.findMany({
    where: { isDeleted: false },
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
    where: { id, isDeleted: false },
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

  if (doctorExists.isDeleted) {
    throw new Error("Doctor is already deleted");
  }

  const result = await prisma.$transaction(async (tx) => {
    // Soft delete the doctor
    const deletedDoctor = await tx.doctor.update({
      where: { id },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });

    // Soft delete the linked user as well
    await tx.user.update({
      where: { id: doctorExists.userId },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });

    return deletedDoctor;
  });

  return result;
};

export const DoctorService = {
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
};
