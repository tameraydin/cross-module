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

  /* istanbul ignore next */
  if (typeof exports !== 'undefined' && typeof module !== 'undefined' && module.exports) {
      module.exports = <%= moduleNameCamelCase %>;

  } else {
    if (typeof define === 'function' && define.amd) {
      define('<%= moduleNameCamelCase %>', [], function() {
        return <%= moduleNameCamelCase %>;
      });

    } else {
      root.<%= moduleNameCamelCase %> = <%= moduleNameCamelCase %>;
    }
  }

}).call(this);
