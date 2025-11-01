import { z } from 'zod';
import { Db } from 'mongodb';
import { IUser } from '@/domain/user';
import { registerUser } from '@/services/auth/auth.service';

export const registrationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  phone: z.string().min(9),
  address: z.string().min(5),
  city: z.string().min(2),
  postal: z.string().min(5),
  country: z.string().min(2),
});

export type RegistrationInput = z.infer<typeof registrationSchema>;

export const createUserAccount = async (
  db: Db,
  data: RegistrationInput
): Promise<IUser> => {
  return registerUser(db, data);
};
