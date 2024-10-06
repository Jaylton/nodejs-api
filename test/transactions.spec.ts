import { it, beforeAll, afterAll, describe, expect, beforeEach } from 'vitest';
import { app } from '../src/app';
import request from 'supertest';
import {execSync} from 'node:child_process'

describe('Transactions routes', () => {

    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    beforeEach(async () => {
        execSync('npm run knex migrate:latest');
    })

    it('create a new transaction', async () => {
        await request(app.server)
            .post('/transactions')
            .send({
                title: 'Test transaction',
                amount: 1000,
                type: 'credit'
            })
            .expect(201);
    });

    it('get all transactions', async () => {
        const createTransationReponse = await request(app.server)
        .post('/transactions')
        .send({
            title: 'Test transaction',
            amount: 1000,
            type: 'credit'
        });

        const cookies = createTransationReponse.get('set-cookie') || '';

        const response = await request(app.server)
            .get('/transactions')
            .set('Cookie', cookies)
            .expect(200);

        expect(response.body.transactions).toEqual([
            expect.objectContaining({
                title: 'Test transaction',
                amount: 1000
            })
        ]);
    });

    it('get transaction by id', async () => {
        const createTransationReponse = await request(app.server)
        .post('/transactions')
        .send({
            title: 'Test transaction',
            amount: 1000,
            type: 'credit'
        });

        const cookies = createTransationReponse.get('set-cookie') || '';

        const response = await request(app.server)
            .get('/transactions')
            .set('Cookie', cookies)
            .expect(200);

        const transactionId = response.body.transactions[0].id;

        const transactionResponse = await request(app.server)
            .get(`/transactions/${transactionId}`)
            .set('Cookie', cookies)
            .expect(200);

        expect(transactionResponse.body.transaction).toEqual(
            expect.objectContaining({
                title: 'Test transaction',
                amount: 1000
            })
        );
    });

    it('get transaction summary', async () => {
        const createTransationReponse = await request(app.server)
        .post('/transactions')
        .send({
            title: 'Test transaction',
            amount: 1000,
            type: 'credit'
        });

        const cookies = createTransationReponse.get('set-cookie') || '';

        await request(app.server)
        .post('/transactions')
        .set('Cookie', cookies)
        .send({
            title: 'Test transaction',
            amount: 800,
            type: 'debit'
        });

        const response = await request(app.server)
            .get('/transactions/summary')
            .set('Cookie', cookies)
            .expect(200);

        expect(response.body.total.total).toEqual(200);
    });
});