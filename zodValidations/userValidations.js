import z from 'zod';

const userSignupSchema = z.object({
    username: z.string().min(3,'username should contain atleast 3 characters').max(14,'username must not contain more than 14 characters'),
    password: z.string().min(6,'password should contain at least 6 characters'),
});

const userLoginSchema = z.object({
    username: z.string().min(3,'incorrect username').max(14,'incorrect username'),
    password: z.string().min(6,'incorrect password'),
});


export  {userSignupSchema, userLoginSchema};