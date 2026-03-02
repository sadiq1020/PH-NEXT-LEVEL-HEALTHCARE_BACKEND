import { Specialty } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

// create specialty
const createSpecialty = async (payload: Specialty): Promise<Specialty> => {
  const specialty = await prisma.specialty.create({
    data: payload,
  });
  return specialty;
};

// get all specialties
const getAllSpecialties = async (): Promise<Specialty[]> => {
  const specialties = await prisma.specialty.findMany();
  return specialties;
};

// delete a specialty
const deleteSpecialty = async (id: string): Promise<Specialty> => {
  const result = await prisma.specialty.delete({
    where: {
      id,
    },
  });
  return result;
};

// update a specialty
const updateSpecialty = async (
  id: string,
  payload: Specialty,
): Promise<Specialty> => {
  const result = await prisma.specialty.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

export const SpecialtyService = {
  createSpecialty,
  getAllSpecialties,
  deleteSpecialty,
  updateSpecialty,
};
