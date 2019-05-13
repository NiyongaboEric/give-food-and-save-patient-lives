const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const objTest = { 

    "fullName": 'validation work',
    "contact": '2423423',
    "email": 'validation@work.s',
    "password": '$2b$10$vEAGI0hgvHugUL49L.zP5.iIZy5lRxkKkF4pt9gJne2B6cfnUoWJy',
    "confirmPassword": "$2b$10$vEAGI0hgvHugUL49L.zP5.iIZy5lRxkKkF4pt9gJne2B6cfnUoWJy",
    "checkbox": true
}

describe('registration form ', () => {
    it("should register a new user", (done) => {
        chai.request("http://localhost:5000")
            .post('/users/register')
            .send(objTest)
            .end((req, res) => {
                console.log(res.body);
                //success
                    // expect(res).to.have.status(200);
                    // expect(res.body).to.have.property("data", 'user successfuly registered!!');

                //error
                    // expect(res).to.have.status(400);
            })
            done();
    });
});