const supertest = require('supertest');
const server = supertest.agent('http://localhost:82/api');
const should = require('should');
const Note = require('../models/Note');

describe("Mocha Unit Test", () => {
    let noteTest;
    let id;
    before(() =>{
        noteTest = new Note({
            content: "First content test",
            user: "First user test"
        });
    });
    describe("Api McFly operations", () => {
        it('should add a note',  (done) =>{
            server
                .post("/note")
                .set("Accept", "application/json")
                .send(noteTest)
                .expect(200)
                .end((err, res) => {
                    res.status.should.equal(200);
                    res.body.should.equal('The note was created correctly');
                    done(err);
                });
        });
        it('should not add a note without content',  (done) => {
            server
                .post("/note")
                .set("Accept", "application/json")
                .send({user: "Second user test"})
                .expect(400)
                .end((err, res) => {
                    res.body.message.should.equal('Note can not be empty');
                    res.status.should.equal(400);
                    done(err);
                });
        });
        it('should list all the notes',  (done) => {
            server
                .get("/note")
                .set("Accept", "application/json")
                .send()
                .expect(200)
                .end((err, res) => {
                    id = res.body[res.body.length-1]._id;
                    should(res.body).be.a.Object();
                    res.status.should.equal(200);
                    done(err);
                });
        });
        it('should list one note with a given id',  (done) => {
            server
                .get(`/note/${id}`)
                .set("Accept", "application/json")
                .send()
                .expect(200)
                .end((err, res) => {
                    res.body.content.should.equal(noteTest.content);
                    res.status.should.equal(200);
                    done(err);
                });
        });
        it('should not list one note with a wrong id',  (done) => {
            server
                .get('/note/123')
                .set("Accept", "application/json")
                .send()
                .expect(404)
                .end((err, res) => {
                    res.body.message.should.equal('Note with id 123 not found');
                    res.status.should.equal(404);
                    done(err);
                });
        });
        it('should add the note with a given id as favourite',  (done) => {
            server
                .put(`/note/${id}`)
                .set("Accept", "application/json")
                .send({favourite: true})
                .expect(200)
                .end((err, res) => {
                    res.body.favourite.should.equal(true);
                    res.status.should.equal(200);
                    done(err);
                });
        });
        it('should list all the favourite notes',  (done) => {
            server
                .get('/favourite')
                .set("Accept", "application/json")
                .send()
                .expect(200)
                .end((err, res) => {
                    res.body.forEach((note) => {
                        note.favourite.should.not.equal(false);
                    });
                    res.status.should.equal(200);
                    done(err);
                });
        });
    });
});