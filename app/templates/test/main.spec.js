if (typeof <%= moduleNameCamelCase %> === 'undefined') {
  var <%= moduleNameCamelCase %> = require('../test/<%= moduleName %>.js');
}

var module;

describe('<%= moduleName %>', function() {

  describe('itself', function() {
    beforeEach(function() {
      module = new <%= moduleNameCamelCase %>();
    });

    it('should work', function() {
      expect(module.getName()).toBe('<%= moduleName %>');
    });
  });
});
