const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

const server = require('../app');

chai.use(chaiHttp);

let token, movieId, directorId;

describe('api/movies tests',()=>{
  before((done)=>{
    chai.request(server)
      .post('/authenticate')
      .send({username:'testuser' , password: 'testuser'})
      .end((err,res)=>{
        token = res.body.token;
        console.log(token);
        done();
      });
  });

  describe('/GET movies', ()=>{
    it('it should get all the movies',(done)=>{
      chai.request(server)
        .get('/api/movies')
        .set('x-access-token',token)
        .end((err,res)=>{
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });
  });
  describe('/POST movies', ()=>{
    it('it should post a movie',(done)=>{
      const movie = {
        title: 'Burak',
        director_id:'5c13607ee3fec422e4abd757',
        category : 'Komedi',
        country: 'Türkiye',
        year: 1950,
        imdb_score: 8
      };
      chai.request(server)
        .post('/api/movies')
        .send(movie)
        .set('x-access-token',token)
        .end((err,res)=>{
          res.should.have.status(200);
          res.body.should.have.be.a('object');
          res.body.should.have.property('title');
          res.body.should.have.property('director_id');
          res.body.should.have.property('category');
          res.body.should.have.property('country');
          res.body.should.have.property('year');
          res.body.should.have.property('imdb_score')
          movieId = res.body._id;
          done();
        });
    });
  });
  describe('/GET/:director_id movie', ()=>{
    it('it should get a movie by the given id',(done)=>{
      chai.request(server)
        .get('/api/movies/'+movieId)
        .set('x-access-token',token)
        .end((err,res)=>{
          res.should.have.status(200);
          res.body.should.have.be.a('object');
          res.body.should.have.property('title');
          res.body.should.have.property('director_id');
          res.body.should.have.property('category');
          res.body.should.have.property('country');
          res.body.should.have.property('year');
          res.body.should.have.property('imdb_score');
          res.body.should.have.property('_id').eql(movieId);
          done();
        });
    });
  });
  describe('/PUT/:director_id movie', ()=>{
    it('it should update a movie given by id',(done)=>{
      const movie = {
        title: 'Necdet',
        director_id:'5c13607ee3fec422e4abd751',
        category : 'Suç',
        country: 'Fransa',
        year: 1970,
        imdb_score: 9
      };
      chai.request(server)
        .put('/api/movies/'+movieId)
        .send(movie)
        .set('x-access-token',token)
        .end((err,res)=>{
          res.should.have.status(200);
          res.body.should.have.be.a('object');
          res.body.should.have.property('title').eql(movie.title);
          res.body.should.have.property('director_id').eql(movie.director_id);
          res.body.should.have.property('category').eql(movie.category);
          res.body.should.have.property('country').eql(movie.country);
          res.body.should.have.property('year').eql(movie.year);
          res.body.should.have.property('imdb_score').eql(movie.imdb_score);
          done();
        });
    });
  });
  describe('/DELETE/:movie_id movie', ()=>{
    it('it should delete a movie given by id',(done)=>{
      chai.request(server)
        .delete('/api/movies/'+movieId)
        .set('x-access-token',token)
        .end((err,res)=>{
          res.should.have.status(200);
          res.body.should.have.be.a('object');
          res.body.should.have.property('status').eql(1);
          done();
        });
    });
  });

});