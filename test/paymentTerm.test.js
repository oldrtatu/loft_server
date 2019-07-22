// During the test the env variable is set to test
process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../bin/www')
const should = chai.should();

// get model for database

const model = require('../models/index')


// test the department route

chai.use(chaiHttp)




// Test the /GET Route
describe('GET Payment Term', () => {

    beforeEach(done => {
        model.sequelize.sync().then(res => {
            model.paymentTerm.destroy({
                where : {},
                truncate : true
            }).then(res => {
                done()
            })
        })
    })

    afterEach(done => {
        server.close()
        done()
    })

    it("it should get all the list of Payment Terms", (done) => {
        chai.request(server)
        .get('/archive/payterm')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(0);
            done();
        })
    })


})

// Test the /POST Route

describe('POST Payment Term', () => {
    it("it should create a Payment Term", (done) => {
        chai.request(server)
            .post('/archive/payterm')
            .send({
                termCode : "Drinking",
                dueAfter : 12,
                dueUnit  : "DAYS",
                status : "ACTIVE"
            })
            .end((err, res) => {
                id = res.body.response.id
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.a.property('code').eql('ADD_SUCC');
                res.body.response.should.have.a.property('id');
                res.body.response.should.have.a.property('termCode');
                res.body.response.should.have.a.property('dueAfter');
                res.body.response.should.have.a.property('dueUnit');
                res.body.response.should.have.a.property('status');
                res.body.response.should.have.a.property('createdAt');
                res.body.response.should.have.a.property('updatedAt');
                done()
            })
    })


    it("it should return an error for unique validation", (done) => {
        chai.request(server)
            .post('/archive/payterm')
            .send({
                termCode : "Drinking",
                dueAfter : 12,
                dueUnit  : "DAYS",
                status : "ACTIVE"
            })
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.a.property('code').eql('ER_DUP_ENTRY');
                res.body.should.have.a.property('fields');
                done()
            })
    })


    it("it should return an error for value not in enum", (done) => {
        chai.request(server)
            .post('/archive/payterm')
            .send({
                termCode : "Drinking",
                dueAfter : 12,
                dueUnit  : "SEMI MONTHLY",
                status : "ACTIVE"
            })
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.a.property('code').eql('WARN_DATA_TRUNCATED');
                done()
            })
    })

    afterEach((done) => {
        server.close()
        done()
    })
})




// Test the /PUT Route
describe('PUT Payment Term', () => {

    it("it should update an existing Payment Term", (done) => {
        chai.request(server)
            .put('/archive/payterm')
            .send({
                id : 1,
                termCode : "Drinking",
                dueAfter : 12,
                dueUnit  : "DAYS",
                status : "ACTIVE",
                description : "HAHA"
            })
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.have.a.property('code').eql('UPDATE_SUCC');
                res.body.response.should.have.a.property('description').eql('HAHA');
                done();
            })
    })

    it("it should not update an existing payment term", (done) => {
        chai.request(server)
            .put('/archive/payterm')
            .send({
                id : 2,
                termCode : "Drinking",
                dueAfter : 12,
                dueUnit  : "DAYS",
                status : "ACTIVE",
                description : "HAHA"
            })
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.have.a.property('code').eql('UPDATE_FAIL');
                res.body.message.should.be.eql('ID doesn\'t exist');
                done();
            })
    })

    afterEach( done => {
        server.close()
        done()
    })
})



// Test /DELETE Route
describe('DELETE payment term', () => {
    it('it should delete an existing payment term', (done) => {
        chai.request(server)
            .delete('/archive/payterm')
            .send({
                id : 1
            })
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.have.a.property('code').eql('DELETE_SUCC');
                res.body.response.id.should.be.eql(1);
                done();
            })
    })

    it('it should not delete an existing payment terms', (done) => {
        chai.request(server)
            .delete('/archive/payterm')
            .send({
                id : 1
            })
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.have.a.property('code').eql('DELETE_FAIL');
                res.body.message.should.be.eql('ID doesn\'t exist');
                done();
            })
    })

    afterEach( done => {
        server.close()
        done()
    })

})


// Test Last Get Route
describe('GET Payment Term', () => {

    it("at the end of department test, it should get all the list of payment term", (done) => {
        chai.request(server)
        .get('/archive/payterm')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(0);
            done();
        })
    })

    afterEach(done => {
        server.close()
        done()
    })

})
