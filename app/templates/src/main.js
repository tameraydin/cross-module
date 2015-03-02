(function() {
  'use strict';

  // MODULE
  var <%= moduleNameCamelCase %> = function() {
    this.name = '<%= moduleName %>';
  };

  <%= moduleNameCamelCase %>.prototype = {
    getName: function() {
      return this.name;
    }
  };

  // EXPORT
  var root = this;

  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = <%= moduleNameCamelCase %>;
    }
    exports.<%= moduleNameCamelCase %> = <%= moduleNameCamelCase %>;
  } else {
    root.<%= moduleNameCamelCase %> = <%= moduleNameCamelCase %>;
  }

}).call(this);
