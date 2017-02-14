var assert = require('assert');

describe('Find the One', function() {
	
	var person = 'Efrelyn';
	var people = ['Randell', 'Efrelyn', 'Elise'];

  describe('Find ' + person, function() {
    it('should return 1 when ' + person + ' is the one', function() {
      assert.equal(1, ['Randell', 'Efrelyn', 'Elise'].indexOf(person));
    });
  });

});