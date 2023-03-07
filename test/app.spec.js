const API_KEY = "APIKEY";
const app = require('../app');
const expect = require('chai').expect;
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your-jwt-secret';
const USERNAME = 'your-username';
const PASSWORD = 'your-password';
const supertest = require("supertest")(app);


describe('UUID Generator', function() {

    it('should return a JWT token with valid credentials', (done) => {
        supertest
          .post('/token')
          .send({ username: USERNAME, password: PASSWORD })
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body.token).to.exist;
            const decoded = jwt.verify(res.body.token, JWT_SECRET);
            expect(decoded.username).to.equal(USERNAME);
            expect(decoded.password).to.equal(PASSWORD);
            done();
          });
      });
});

describe('POST /uuid', () => {
    it('should generate UUIDs with valid API key and JWT token', async () => {
      const token = jwt.sign({ username: USERNAME, password: PASSWORD }, 'your-jwt-secret');
      const response = await supertest
        .post('/uuid')
        .set('API-Key', API_KEY)
        .set('Authorization', `Bearer ${token}`)
        .send({ type: 'uuid', count: 5 })
        .expect(200);
  
      const { uuids } = response.body;
      expect(uuids).not.equal(undefined);
      expect(uuids.length).be.equal(5)
      uuids.forEach(uuid => {
        expect(uuid).match(/[a-f\d]{8}-([a-f\d]{4}-){3}[a-f\d]{12}/i);
      });
    });
  
    it('should return an error with invalid API key', async () => {
      const token = jwt.sign({ username: USERNAME, password: PASSWORD }, 'your-jwt-secret');
      const response = await supertest
        .post('/uuid')
        .set('API-Key', 'wrong-api-key')
        .set('Authorization', `Bearer ${token}`)
        .send({ type: 'uuid', count: 5 })
        .expect(401);
  
      const { error } = response.body;
      expect(error).be.equal('Invalid API key');
    });
  
    it('should return an error with missing JWT token', async () => {
      const response = await supertest
        .post('/uuid')
        .set('API-Key', API_KEY)
        .send({ type: 'uuid', count: 5 })
        .expect(401);
  
      const { error } = response.body;
      expect(error).be.equal('Missing authorization header');
    });
  
    it('should return an error with invalid JWT token', async () => {
      const token = jwt.sign({ username: USERNAME, password: PASSWORD }, 'wrong-jwt-secret');
      const response = await supertest
        .post('/uuid')
        .set('API-Key', API_KEY)
        .set('Authorization', `Bearer ${token}`)
        .send({ type: 'uuid', count: 5 })
        .expect(401);
  
      const { error } = response.body;
      expect(error).be.equal('Invalid JWT token');
    });
});
