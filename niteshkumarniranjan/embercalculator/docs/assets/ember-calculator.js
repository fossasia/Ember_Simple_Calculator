"use strict";



define('ember-calculator/app', ['exports', 'ember-calculator/resolver', 'ember-load-initializers', 'ember-calculator/config/environment'], function (exports, _resolver, _emberLoadInitializers, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Application = Ember.Application;


  var App = Application.extend({
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix,
    Resolver: _resolver.default
  });

  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);

  exports.default = App;
});
define('ember-calculator/components/calc-main', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Component = Ember.Component;


  var operators = ['+', '-', '×', '÷'];

  exports.default = Component.extend({
    actions: {
      ins: function ins(event) {
        var value = this.get('value') || "";
        this.set("value", value + event);
      },
      equal: function equal() {
        var equation = this.get('value');
        var lastChar = equation[equation.length - 1];
        equation = equation.replace(/×/g, '*').replace(/÷/g, '/');
        if (operators.indexOf(lastChar) > -1 || lastChar == '.') {
          equation = equation.replace(/.$/, '');
        }
        if (equation) {
          this.set('value', eval(equation));
        }
      },
      clear: function clear() {
        this.set('value', '');
      },
      del: function del() {
        var value = this.get('value') || '';
        this.set('value', value.substring(0, value.length - 1));
      }
    }

  });
});
define('ember-calculator/components/welcome-page', ['exports', 'ember-welcome-page/components/welcome-page'], function (exports, _welcomePage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _welcomePage.default;
    }
  });
});
define('ember-calculator/helpers/app-version', ['exports', 'ember-calculator/config/environment', 'ember-cli-app-version/utils/regexp'], function (exports, _environment, _regexp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.appVersion = appVersion;
  var version = _environment.default.APP.version;
  function appVersion(_) {
    var hash = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (hash.hideSha) {
      return version.match(_regexp.versionRegExp)[0];
    }

    if (hash.hideVersion) {
      return version.match(_regexp.shaRegExp)[0];
    }

    return version;
  }

  exports.default = Ember.Helper.helper(appVersion);
});
define('ember-calculator/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _pluralize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _pluralize.default;
});
define('ember-calculator/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _singularize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _singularize.default;
});
define('ember-calculator/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'ember-calculator/config/environment'], function (exports, _initializerFactory, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _config$APP = _environment.default.APP,
      name = _config$APP.name,
      version = _config$APP.version;
  exports.default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
});
define('ember-calculator/initializers/container-debug-adapter', ['exports', 'ember-resolver/resolvers/classic/container-debug-adapter'], function (exports, _containerDebugAdapter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('ember-calculator/initializers/data-adapter', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'data-adapter',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('ember-calculator/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data'], function (exports, _setupContainer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-data',
    initialize: _setupContainer.default
  };
});
define('ember-calculator/initializers/export-application-global', ['exports', 'ember-calculator/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports.default = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('ember-calculator/initializers/injectStore', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'injectStore',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('ember-calculator/initializers/store', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'store',
    after: 'ember-data',
    initialize: function initialize() {}
  };
});
define('ember-calculator/initializers/transforms', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'transforms',
    before: 'store',
    initialize: function initialize() {}
  };
});
define("ember-calculator/instance-initializers/ember-data", ["exports", "ember-data/instance-initializers/initialize-store-service"], function (exports, _initializeStoreService) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: "ember-data",
    initialize: _initializeStoreService.default
  };
});
define('ember-calculator/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberResolver.default;
});
define('ember-calculator/router', ['exports', 'ember-calculator/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var EmberRouter = Ember.Router;


  var Router = EmberRouter.extend({
    location: _environment.default.locationType,
    rootURL: _environment.default.rootURL
  });

  Router.map(function () {
    this.route('app', function () {
      this.route('calculator');
    });
  });

  exports.default = Router;
});
define('ember-calculator/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _ajax) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ajax.default;
    }
  });
});
define("ember-calculator/templates/application", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "efcPF3nT", "block": "{\"symbols\":[],\"statements\":[[6,\"h2\"],[9,\"class\",\"center w\"],[7],[0,\"Ember.js Calculator\"],[8],[0,\"\\n\"],[1,[18,\"calc-main\"],false],[0,\"\\n\"],[1,[18,\"outlet\"],false],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "ember-calculator/templates/application.hbs" } });
});
define("ember-calculator/templates/components/calc-main", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "UwHWTpmj", "block": "{\"symbols\":[\"&default\"],\"statements\":[[11,1],[0,\"\\n\"],[6,\"div\"],[9,\"id\",\"calculator\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"top\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"screen\"],[7],[1,[18,\"value\"],false],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"keys\"],[7],[0,\"\\n      \"],[6,\"span\"],[9,\"class\",\"operatora\"],[3,\"action\",[[19,0,[]],\"clear\"]],[7],[0,\"C\"],[8],[0,\"\\n      \"],[6,\"span\"],[9,\"class\",\"operatora\"],[3,\"action\",[[19,0,[]],\"del\"]],[7],[0,\"CE\"],[8],[0,\"\\n      \"],[6,\"span\"],[9,\"class\",\"operatora\"],[9,\"style\",\"font-size: 28px;\"],[3,\"action\",[[19,0,[]],\"ins\",\"÷\"]],[7],[0,\"÷\"],[8],[0,\"\\n      \"],[6,\"span\"],[9,\"class\",\"operatora\"],[9,\"style\",\"font-size: 28px;\"],[3,\"action\",[[19,0,[]],\"ins\",\"×\"]],[7],[0,\"×\"],[8],[0,\"\\n      \"],[6,\"span\"],[3,\"action\",[[19,0,[]],\"ins\",\"7\"]],[7],[0,\"7\"],[8],[0,\"\\n      \"],[6,\"span\"],[3,\"action\",[[19,0,[]],\"ins\",\"8\"]],[7],[0,\"8\"],[8],[0,\"\\n      \"],[6,\"span\"],[3,\"action\",[[19,0,[]],\"ins\",\"9\"]],[7],[0,\"9\"],[8],[0,\"\\n      \"],[6,\"span\"],[9,\"class\",\"operatora\"],[9,\"style\",\"font-size: 28px;\"],[3,\"action\",[[19,0,[]],\"ins\",\"-\"]],[7],[0,\"-\"],[8],[0,\"\\n      \"],[6,\"span\"],[3,\"action\",[[19,0,[]],\"ins\",\"4\"]],[7],[0,\"4\"],[8],[0,\"\\n      \"],[6,\"span\"],[3,\"action\",[[19,0,[]],\"ins\",\"5\"]],[7],[0,\"5\"],[8],[0,\"\\n      \"],[6,\"span\"],[3,\"action\",[[19,0,[]],\"ins\",\"6\"]],[7],[0,\"6\"],[8],[0,\"\\n      \"],[6,\"span\"],[9,\"class\",\"operatora\"],[9,\"style\",\"font-size: 28px;\"],[3,\"action\",[[19,0,[]],\"ins\",\"+\"]],[7],[0,\"+\"],[8],[0,\"\\n      \"],[6,\"span\"],[3,\"action\",[[19,0,[]],\"ins\",\"1\"]],[7],[0,\"1\"],[8],[0,\"\\n      \"],[6,\"span\"],[3,\"action\",[[19,0,[]],\"ins\",\"2\"]],[7],[0,\"2\"],[8],[0,\"\\n      \"],[6,\"span\"],[3,\"action\",[[19,0,[]],\"ins\",\"3\"]],[7],[0,\"3\"],[8],[0,\"\\n      \"],[6,\"span\"],[9,\"class\",\"zero\"],[3,\"action\",[[19,0,[]],\"ins\",\"0\"]],[7],[0,\"0\"],[8],[0,\"\\n      \"],[6,\"span\"],[3,\"action\",[[19,0,[]],\"ins\",\".\"]],[7],[0,\".\"],[8],[0,\"\\n      \"],[6,\"span\"],[9,\"class\",\"operator equal\"],[3,\"action\",[[19,0,[]],\"equal\"]],[7],[0,\"=\"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8]],\"hasEval\":false}", "meta": { "moduleName": "ember-calculator/templates/components/calc-main.hbs" } });
});


define('ember-calculator/config/environment', [], function() {
  var prefix = 'ember-calculator';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

if (!runningTests) {
  require("ember-calculator/app")["default"].create({"name":"ember-calculator","version":"0.0.0+3a553992"});
}
//# sourceMappingURL=ember-calculator.map
