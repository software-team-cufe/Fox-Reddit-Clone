import { z } from 'zod';
const phoneRegex = new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);
const userModel = z.object({
    _id: z.string().optional().nullable(),
    name: z.string().min(3, { message: "The name must be at least 3 characters long." }).max(32, { message: "The name must not exceed 32 characters." }),
    email: z.string().min(3, { message: "The email must be at least 3 characters long." }).max(32, { message:  "The email must not exceed 32 characters." }).email({ message: "Please enter a valid email." }),
    password: z.string().min(8, { message: "The password must be at least 8 characters long." }).max(200, { message: "The password must not exceed 100 characters." }).nullable(),
    phone: z.string().regex(phoneRegex, "Please enter a valid phone number.").min(11, { message: "The phone number must be at least 11 digits." }).max(15, { message:  "The phone number must not exceed 15 digits." }),
    gender: z.boolean(),
    verifiedEmail: z.boolean().optional().nullable(),
    banned: z.boolean().optional().nullable(),
    createdAt: z.string().optional().nullable(),
    updatedAt: z.string().optional().nullable(),
});

export default userModel;