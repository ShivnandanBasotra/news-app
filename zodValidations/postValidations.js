import z from 'zod';

const createPostSchema = z.object({
    category: z.enum(['crime', 'sports', 'politics', 'business', 'entertainment', 'technology', 'others'],'valid categories are crime, sports, politics, business, entertainment, technolory and others'),
    heading: z.string().min(5, "heading must contains 5 characters").max(40, 'heading should not more than 40 characters'),
    description: z.string().min(20, "Description must be atleast 20 characters").max(5000, 'Description cannot exceed 5000 characters'),
});

const categorySchema = z.enum(['crime', 'sports', 'politics', 'business', 'entertainment', 'technology', 'others'],'valid categories are crime, sports, politics, business, entertainment, technolory and others');


export  {createPostSchema, categorySchema};