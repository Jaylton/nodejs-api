import { FastifyInstance } from "fastify";
import { z } from 'zod';
import { knex } from "../database";
import { checkSession } from "../middlewares/check-session";

export async function transactionRoutes(app: FastifyInstance) {
    app.get("/", { preHandler: [checkSession] }, async (request) => {
        const sessionId = request.cookies.sessionId;

        const transactions = await knex('transactions').where('session_id', sessionId).select('*');

        return { transactions };
    });

    app.get("/:id", { preHandler: [checkSession] }, async (request) => {
        const sessionId = request.cookies.sessionId;

        const schema = z.object({
            id: z.string().uuid(),
        });
        const { id } = schema.parse(request.params);

        const transaction = await knex('transactions').select('*').where({session_id: sessionId, id }).first();

        return { transaction };
    });

    app.get("/summary", { preHandler: [checkSession] }, async (request) => {
        const sessionId = request.cookies.sessionId;

        const total = await knex('transactions').where({session_id: sessionId}).sum('amount', { as: 'total' }).first();

        return { total };
    });

    app.post("/", async (request, reply) => {

        const schema = z.object({
            title: z.string(),
            amount: z.number().positive(),
            type: z.enum(['credit', 'debit']),
        });
        const { title, amount, type } = schema.parse(request.body);

        let sessionId = request.cookies.sessionId;
        if (!sessionId) {
            sessionId = crypto.randomUUID();
            reply.cookie('sessionId', sessionId, {
                path: '/',
                maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
            });
        }

        await knex('transactions').insert({
            id: crypto.randomUUID(),
            title,
            amount: type === 'credit' ? amount : -1 * amount,
            session_id: sessionId,
        })

        return reply.status(201).send();
    });
}