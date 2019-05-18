const chai = require("chai");
const expect = chai.expect;

objTest = {
    email: "eric@gmail.com",
    password: "qwerty"
}

describe("Login Page", () => {
    it("login page testing", (done) => {
        chai.request('http://localhost:5000')
        .post('/users/login')
        .send(objTest)
        .end((req, res) => {
            console.log(res.body);
            expect(res).to.have.status(200);
        })
        done();
    })
})