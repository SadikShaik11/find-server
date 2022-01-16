//unit tests
const expect = require('chai').expect
const chai = require('chai')
const findserver = require('../findserver')
describe('url test', () => {
    it('should be a string', (done) => {
        const a = [{
            url: "http://sample.com",
            priority: 1
        }]
        const b = findserver.findserver(a)
        done();
        expect(b).to.be.a('string')
    })

    it('should be a object', (done) => {

        const a = [
            {
                url: "http://google.com",
                priority: 1
            }
            , {
                url: "http://youtube.com",
                priority: 2
            }
        ]

        const b = findserver.findserver(a)
        done();
        expect(b).to.be.an('object')
    })
})
