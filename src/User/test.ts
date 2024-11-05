import { z } from 'zod';
const ZodUserSchema = z
	.object({
		userId: z.number(),
		login: z.string().min(3, 'Login must be at least 3 characters long'),
		email: z.string().email('Invalid email format'),
	})
	.strict();

type rte = z.infer<typeof ZodUserSchema>;

const urt = z.object({
	trel: z.string(),
});

type rte2 = (typeof urt)['_output'];
