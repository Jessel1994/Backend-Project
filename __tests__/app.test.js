const data = require("../db/data/test-data/index.js")
const request = require("supertest")
const app = require("../app.js")
const db = require('../db/connection.js')
const seed = require('../db/seeds/seed.js')
beforeEach(() =>  seed(data))
afterAll(() => db.end())

describe('GET /api/topics', () => {
    test('should return a 200 status code for a good request', () => {
        return request(app).get('/api/topics')
        .expect(200)
        .then((response) => {
            if (response.body.topics.length !== 0) {
                response.body.topics.forEach((item) => {
                    expect.objectContaining({
                        description: expect.any(String),
                        slug: expect.any(String)
                      })
                    
                })

            }
           
        })

    }) 
    test('should return 404 status if topics spelt wrong', () => {
        return request(app).get('/api/topikz')
        .expect(404)
    })
})

describe('GET /api', () => {
    test('should respond with 200 status code', () => {
        return request(app)
            .get('/api')
            .expect(200)
            .then(({ body }) => {
                const keys = Object.keys(body.endpoints)
                if (keys.length !== 0) {
                    keys.forEach((key) => {
                        expect(body.endpoints[key]).toEqual(
                            expect.objectContaining({
                                description: expect.any(String),
                                queries: expect.any(Array),
                                exampleResponse: expect.any(Object),
                            })
                        );
    
                    })

                }
                
                
            });
    });

    test('should return 404 error if wrong input', () => {
        return request(app)
            .get('/apy')
            .expect(404);
    });
});
