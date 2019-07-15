// During the test the env variable is set to test
process.env.NODE_ENV = 'test'

let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../bin/www')
let should = chai.should();


chai.use(chaiHttp)

describe('/GET root', () => {
    it("it should get root route", (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('res').eql('it works');
                done()
            })
    })
})