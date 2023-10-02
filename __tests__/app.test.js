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
            
            response.body.topics.forEach((item) => {
                expect(typeof item.slug).toBe('string')
                expect(typeof item.description).toBe('string')
            })
        })

    }) 
    test('should return 404 status if topics spelt wrong', () => {
        return request(app).get('/api/topikz')
        .expect(404)
    })
})