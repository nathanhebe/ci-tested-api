var request = require("request"),
    assert = require('assert'),
    expect = require('chai').expect,
    helloWorld = require("../app.js"),
    base_url = "http://localhost:3000/";

describe("Auth0", function () {
    describe("GET /authenticated", function () {
        it("returns status code 401", function (done) {
            request.get(base_url + 'authenticated', function (error, response, body) {
                //expect(response.statusCode).toBe(200);
                assert.equal(401, response.statusCode);
                done();
            });
        });

        it("returns You must be signed in to continue", function(done) {
            request.get(base_url + 'authenticated', function(error,response,body) {
                expect(body).to.equal("You must be signed in to continue");
                done();
            });
        });

        // it("returns Hello World", function (done) {
        //     request.get(base_url, function (error, response, body) {
        //         //expect(body).toBe("Hello World");
        //         assert.equal("Hello World", body);
        //         helloWorld.closeServer();
        //         done();
        //     });
        // });
    });
});