import bcrypt from "bcrypt";

// Helper functions to make running auth functions across the app easier.
export const hashPassword = (password: string) => bcrypt.hash(password, 10);
export const comparePassword = (password: string, hashedPassword: string) =>
	bcrypt.compare(password, hashedPassword);
