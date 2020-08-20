
const request = require('supertest')
const app = require('../app.js')


const Data = require('../data_test/requestData.js');
const User = require('../models/user.model.js');




describe('Retrieves mulitple users and one user', () => {

	beforeAll(async () => {
		await User.deleteMany({});
		
		Data.startData.forEach( async (entry) => {
			user = new User(entry);
			await user.save();
		});
	})
	

	it('Retrieves all of the entries', async () => {

		const res = await request(app).get('/api/users/');
		
		expect(res.body.length).toEqual(2);
	    expect(res.statusCode).toEqual(200);
  	});


	it('Retrieves a Specific Entry', async () => {

		const res = await request(app).get('/api/users/myname3@email.com');
		
		expect(res.body.email).toEqual('myname3@email.com')
		expect(res.statusCode).toEqual(200);
	});


	afterAll(async () => {
		await User.deleteMany({});
	});

});







describe('Creates and Deletes a user.', () => {

	beforeAll(async () => {
		await User.deleteMany({});
	})

	it('Adds a user', async () => {
		const res = await request(app).post('/api/users/')
					.set('Content-Type', 'application/json')
					.send(Data.Post);
		
		expect(res.statusCode).toEqual(200);
	})


	it('Deletes a User', async () => {
		const res = await request(app).delete('/api/users/myname8@email.com')
		
		expect(res.statusCode).toEqual(200);
	})
});







describe('Updates a user', () => {

	beforeAll(async () => {
		user = new User(Data.PutBeforeUpdate);
		await user.save();
	});


	it('Updates a user', async () => {

		const res = await request(app).put('/api/users/myname6@email.com')
					.set('Content-Type', 'application/json')
					.send(Data.PutAfterUpdate);


		const pertinent_data =  {
			"first_name":res.body["first_name"],
			"last_name":res.body["last_name"],
			"email":res.body["email"]
		}

		expect(pertinent_data).toEqual(Data.PutAfterUpdate);
		expect(res.statusCode).toEqual(200);

	});


	afterAll(async () => {
		await User.deleteMany({});
	});
});






