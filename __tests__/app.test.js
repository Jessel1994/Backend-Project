const data = require("../db/data/test-data/index.js")
const request = require("supertest")
const app = require("../app.js")
const db = require('../db/connection.js')
const seed = require('../db/seeds/seed.js')
const { expect } = require("@jest/globals")
require('jest-sorted')


beforeEach(() =>  seed(data))
afterAll(() => db.end())

describe('GET /api/topics', () => {
    test('should return a 200 status code for a good request', () => {
        return request(app).get('/api/topics')
        .expect(200)
        .then((response) => {
            if (response.body.topics.length !== 0) {
                response.body.topics.forEach((item) => {
                    expect(item).toEqual( expect.objectContaining({
                        description: expect.any(String),
                        slug: expect.any(String)
                      }))
                   
                    
                })

            }
           
        })

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

   
});

describe('GET /api/articles/:article_id', () => {
    test('should respond with 200 status code for good request', () => {
        return request(app)
        .get('/api/articles/1')
        .expect(200)
        .then(({body}) => {
           
            const keys = Object.keys(body.articles)
            if (keys.length !== 0) {
                expect(body.articles).toEqual(
                    expect.objectContaining({
                        article_id: 1,
                        title: 'Living in the shadow of a great man',
                        topic: 'mitch',
                        author: 'butter_bridge',
                        body: 'I find this existence challenging',
                        created_at: '2020-07-09T20:11:00.000Z',
                        votes: 100,
                        article_img_url: 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700'


                    })
                )
            }
        })
    })
    test('status 400 responds with an error message when passed bad article ID', () => {
        return request(app)
          .get('/api/articles/notAnID')
          .expect(400)
          .then(({ body }) => {

            expect(body.msg).toBe('ID not exists');
          });
      });
      test('status 404 responds with message if a valid input but no article', () => {
        return request(app)
        .get('/api/articles/9999')
        .expect(404)
        .then(({body}) => {
            expect(body.msg).toBe('Article doesn\'t exist')
        })
      })
})

describe('GET /api/articles', () => {
    test('should respond with 200 status code for a good request', () => {
        return request(app)
        .get('/api/articles')
        .expect(200)
        .then(({ body }) => {
            expect(Array.isArray(body.articles)).toBe(true)
            if (body.articles.length !== 0) {
                body.articles.forEach((article) => {
                        expect(Object.keys(article).length === 7)
                        expect(article).toEqual(
                            expect.objectContaining({
                                author: expect.any(String),
                                title: expect.any(String),
                                article_id: expect.any(Number),
                                topic: expect.any(String),
                                created_at: expect.any(String),
                                votes: expect.any(Number),
                                comment_count: expect.any(String)
                                
                                
    
                            })
                            
                        )
                        expect(article).toEqual(
                            expect.not.objectContaining({
                                body: expect.any(String)
                            })
                        );
                        

                })
                expect(body.articles).toBeSorted({descending :true, key: 'created_at'})

            }
           

        })
    })
})

describe('GET /api/articles/:article_id/comments', () => {
    test('should respond with 200 for a good request', () => {
        return request(app)
        .get('/api/articles/1/comments')
        .expect(200)
        .then(({ body }) => {
            
            body.comments.forEach((comment) => {
                if (Object.keys(comment).length !== 0) {
                    expect(comment).toEqual(
                        expect.objectContaining({
                            comment_id: expect.any(Number),
                            votes: expect.any(Number),
                            created_at: expect.any(String), 
                            author: expect.any(String), 
                            body: expect.any(String), 
                            article_id: expect.any(Number)
                        })
                    )

                }
               
            })
            expect(body.comments).toBeSorted({descending : true, key: 'created_at'})
        })
    })
    test('should respond with 200 status code and an empty array if the article exists but has no comments', () => {
        return request(app)
        .get('/api/articles/13/comments')
        .expect(200)
        .then(({ body }) => {
            expect(body.comments).toEqual([])
        })
    })
    test('should respond with 400 when passed an article id that is not uniform', () => {
        return request(app)
          .get('/api/articles/notAnID/comments')
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe('ID not exists');
        });
    })
    test('status 404 responds with message if a valid input but no article', () => {
        return request(app)
        .get('/api/articles/9999/comments')
        .expect(404)
        .then(({body}) => {
            expect(body.msg).toBe('Article doesn\'t exist')
        })
      })
})

describe(' PATCH /api/articles/:article_id', () => {
    test('200 status code for good PATCH request, responds with updated article', () => {
        const articleVoteUpdate = {
            inc_votes: 10
        };

        return request(app)
        .patch()


    })
})
