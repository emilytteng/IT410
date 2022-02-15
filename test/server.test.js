const expect = require('chai').expect
const app = require('../server/server')
const request = require('supertest')

describe('server', () => {
    // supertest request function returns a promise
    // one way to run async test is to return a promise
    describe('accounts', () => {
        it('can create account', () => {
            return request(app)
                .post('/api/accounts')
                .send({
                    username: 'emily2t',
                    password: 'p@ssword'
                })
                .expect(201)
        })

        it('can delete account', () => {
            return request(app)
                .delete('/api/accounts/{userId}')
                .expect(204)
        })

        it('can log into account', () => {
            return request(app)
                .put('/api/accounts/{userId}/login')
                .send({
                    password: 'p@ssword'
                })
                .expect(200)
        })

        it('can log out of account', () => {
            return request(app)
                .put('/api/accounts/{userId}/logout')
                .send()
                .expect(200)
        })
    })

    describe('courses', () => {
        it('can get courses', () => {
            return request(app)
                .get('/api/courses')
                .send()
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('array')
                })
        })
        
        it('can create course', () => {
            return request(app)
                .post('/api/courses')
                .send({
                    courseName: 'ITC 410'
                })
                .expect(201)
        })

        it('can get course assignments', () => {
            return request(app) 
                .get('/api/courses/{courseId}')
                .send()
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('object')
                })
        })

        it('can create assignment', () => {
            return request(app)
                .post('/api/courses/{courseId}')
                .send({
                    courseId: '4',
                    asgmtName: 'Ch 1 Quiz',
                    dueDate: "2022-02-15T01:53:56.328Z",
                    asgmtType: "Quiz"
                })
                .expect(201)
        })

        it('can delete course', () => {
            return request(app)
                .delete('/api/courses/{courseId}')
                .expect(204)
        })
    })

    describe('assignments', () => {
        it('can modify assignment', () => {
            return request(app)
                .put('/api/courses/{courseId}/{asgmtId}')
                .send({
                    asgmtId: '4',
                    completed: true
                })
                .expect(200)
        })
        
        it('can delete assignment', () => {
            return request(app)
                .delete('/api/courses/{courseId}/{asgmtId}')
                .send()
                .expect(204)
        })
    })
})