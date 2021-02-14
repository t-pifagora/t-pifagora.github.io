// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../../../../../../../data/data/com.termux/files/usr/lib/node_modules/parcel-bundler/node_modules/process/browser.js":[function(require,module,exports) {

// shim for using process in browser
var process = module.exports = {}; // cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}

(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }

  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();

function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}

var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }

  draining = false;

  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }

  if (queue.length) {
    drainQueue();
  }
}

function drainQueue() {
  if (draining) {
    return;
  }

  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;

  while (len) {
    currentQueue = queue;
    queue = [];

    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }

    queueIndex = -1;
    len = queue.length;
  }

  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}

process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);

  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }

  queue.push(new Item(fun, args));

  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}; // v8 likes predictible objects


function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

process.title = 'browser';
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues

process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
  return [];
};

process.binding = function (name) {
  throw new Error('process.binding is not supported');
};

process.cwd = function () {
  return '/';
};

process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};

process.umask = function () {
  return 0;
};
},{}],"../node_modules/jquery/dist/jquery.js":[function(require,module,exports) {
var global = arguments[3];
var process = require("process");
var define;
/*!
 * jQuery JavaScript Library v3.5.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2020-05-04T22:49Z
 */
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var flat = arr.flat ? function( array ) {
	return arr.flat.call( array );
} : function( array ) {
	return arr.concat.apply( [], array );
};


var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};

var isFunction = function isFunction( obj ) {

      // Support: Chrome <=57, Firefox <=52
      // In some browsers, typeof returns "function" for HTML <object> elements
      // (i.e., `typeof document.createElement( "object" ) === "function"`).
      // We don't want to classify *any* DOM node as a function.
      return typeof obj === "function" && typeof obj.nodeType !== "number";
  };


var isWindow = function isWindow( obj ) {
		return obj != null && obj === obj.window;
	};


var document = window.document;



	var preservedScriptAttributes = {
		type: true,
		src: true,
		nonce: true,
		noModule: true
	};

	function DOMEval( code, node, doc ) {
		doc = doc || document;

		var i, val,
			script = doc.createElement( "script" );

		script.text = code;
		if ( node ) {
			for ( i in preservedScriptAttributes ) {

				// Support: Firefox 64+, Edge 18+
				// Some browsers don't support the "nonce" property on scripts.
				// On the other hand, just using `getAttribute` is not enough as
				// the `nonce` attribute is reset to an empty string whenever it
				// becomes browsing-context connected.
				// See https://github.com/whatwg/html/issues/2369
				// See https://html.spec.whatwg.org/#nonce-attributes
				// The `node.getAttribute` check was added for the sake of
				// `jQuery.globalEval` so that it can fake a nonce-containing node
				// via an object.
				val = node[ i ] || node.getAttribute && node.getAttribute( i );
				if ( val ) {
					script.setAttribute( i, val );
				}
			}
		}
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}


function toType( obj ) {
	if ( obj == null ) {
		return obj + "";
	}

	// Support: Android <=2.3 only (functionish RegExp)
	return typeof obj === "object" || typeof obj === "function" ?
		class2type[ toString.call( obj ) ] || "object" :
		typeof obj;
}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.5.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	even: function() {
		return this.pushStack( jQuery.grep( this, function( _elem, i ) {
			return ( i + 1 ) % 2;
		} ) );
	},

	odd: function() {
		return this.pushStack( jQuery.grep( this, function( _elem, i ) {
			return i % 2;
		} ) );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				copy = options[ name ];

				// Prevent Object.prototype pollution
				// Prevent never-ending loop
				if ( name === "__proto__" || target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {
					src = target[ name ];

					// Ensure proper type for the source value
					if ( copyIsArray && !Array.isArray( src ) ) {
						clone = [];
					} else if ( !copyIsArray && !jQuery.isPlainObject( src ) ) {
						clone = {};
					} else {
						clone = src;
					}
					copyIsArray = false;

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	// Evaluates a script in a provided context; falls back to the global one
	// if not specified.
	globalEval: function( code, options, doc ) {
		DOMEval( code, { nonce: options && options.nonce }, doc );
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return flat( ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( _i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = toType( obj );

	if ( isFunction( obj ) || isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.5
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://js.foundation/
 *
 * Date: 2020-03-14
 */
( function( window ) {
var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	nonnativeSelectorCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ( {} ).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	pushNative = arr.push,
	push = arr.push,
	slice = arr.slice,

	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[ i ] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|" +
		"ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// https://www.w3.org/TR/css-syntax-3/#ident-token-diagram
	identifier = "(?:\\\\[\\da-fA-F]{1,6}" + whitespace +
		"?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +

		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +

		// "Attribute values must be CSS identifiers [capture 5]
		// or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" +
		whitespace + "*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +

		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +

		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +

		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" +
		whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace +
		"*" ),
	rdescend = new RegExp( whitespace + "|>" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
			whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" +
			whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),

		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace +
			"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace +
			"*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rhtml = /HTML$/i,
	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\[\\da-fA-F]{1,6}" + whitespace + "?|\\\\([^\\r\\n\\f])", "g" ),
	funescape = function( escape, nonHex ) {
		var high = "0x" + escape.slice( 1 ) - 0x10000;

		return nonHex ?

			// Strip the backslash prefix from a non-hex escape sequence
			nonHex :

			// Replace a hexadecimal escape sequence with the encoded Unicode code point
			// Support: IE <=11+
			// For values outside the Basic Multilingual Plane (BMP), manually construct a
			// surrogate pair
			high < 0 ?
				String.fromCharCode( high + 0x10000 ) :
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" +
				ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	inDisabledFieldset = addCombinator(
		function( elem ) {
			return elem.disabled === true && elem.nodeName.toLowerCase() === "fieldset";
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		( arr = slice.call( preferredDoc.childNodes ) ),
		preferredDoc.childNodes
	);

	// Support: Android<4.0
	// Detect silently failing push.apply
	// eslint-disable-next-line no-unused-expressions
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			pushNative.apply( target, slice.call( els ) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;

			// Can't trust NodeList.length
			while ( ( target[ j++ ] = els[ i++ ] ) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {
		setDocument( context );
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && ( match = rquickExpr.exec( selector ) ) ) {

				// ID selector
				if ( ( m = match[ 1 ] ) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( ( elem = context.getElementById( m ) ) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && ( elem = newContext.getElementById( m ) ) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[ 2 ] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( ( m = match[ 3 ] ) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!nonnativeSelectorCache[ selector + " " ] &&
				( !rbuggyQSA || !rbuggyQSA.test( selector ) ) &&

				// Support: IE 8 only
				// Exclude object elements
				( nodeType !== 1 || context.nodeName.toLowerCase() !== "object" ) ) {

				newSelector = selector;
				newContext = context;

				// qSA considers elements outside a scoping root when evaluating child or
				// descendant combinators, which is not what we want.
				// In such cases, we work around the behavior by prefixing every selector in the
				// list with an ID selector referencing the scope context.
				// The technique has to be used as well when a leading combinator is used
				// as such selectors are not recognized by querySelectorAll.
				// Thanks to Andrew Dupont for this technique.
				if ( nodeType === 1 &&
					( rdescend.test( selector ) || rcombinators.test( selector ) ) ) {

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;

					// We can use :scope instead of the ID hack if the browser
					// supports it & if we're not changing the context.
					if ( newContext !== context || !support.scope ) {

						// Capture the context ID, setting it first if necessary
						if ( ( nid = context.getAttribute( "id" ) ) ) {
							nid = nid.replace( rcssescape, fcssescape );
						} else {
							context.setAttribute( "id", ( nid = expando ) );
						}
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[ i ] = ( nid ? "#" + nid : ":scope" ) + " " +
							toSelector( groups[ i ] );
					}
					newSelector = groups.join( "," );
				}

				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch ( qsaError ) {
					nonnativeSelectorCache( selector, true );
				} finally {
					if ( nid === expando ) {
						context.removeAttribute( "id" );
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {

		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {

			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return ( cache[ key + " " ] = value );
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement( "fieldset" );

	try {
		return !!fn( el );
	} catch ( e ) {
		return false;
	} finally {

		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}

		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split( "|" ),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[ i ] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( ( cur = cur.nextSibling ) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return ( name === "input" || name === "button" ) && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
					inDisabledFieldset( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction( function( argument ) {
		argument = +argument;
		return markFunction( function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ ( j = matchIndexes[ i ] ) ] ) {
					seed[ j ] = !( matches[ j ] = seed[ j ] );
				}
			}
		} );
	} );
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	var namespace = elem.namespaceURI,
		docElem = ( elem.ownerDocument || elem ).documentElement;

	// Support: IE <=8
	// Assume HTML when documentElement doesn't yet exist, such as inside loading iframes
	// https://bugs.jquery.com/ticket/4833
	return !rhtml.test( namespace || docElem && docElem.nodeName || "HTML" );
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( doc == document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9 - 11+, Edge 12 - 18+
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( preferredDoc != document &&
		( subWindow = document.defaultView ) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	// Support: IE 8 - 11+, Edge 12 - 18+, Chrome <=16 - 25 only, Firefox <=3.6 - 31 only,
	// Safari 4 - 5 only, Opera <=11.6 - 12.x only
	// IE/Edge & older browsers don't support the :scope pseudo-class.
	// Support: Safari 6.0 only
	// Safari 6.0 supports :scope but it's an alias of :root there.
	support.scope = assert( function( el ) {
		docElem.appendChild( el ).appendChild( document.createElement( "div" ) );
		return typeof el.querySelectorAll !== "undefined" &&
			!el.querySelectorAll( ":scope fieldset div" ).length;
	} );

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert( function( el ) {
		el.className = "i";
		return !el.getAttribute( "className" );
	} );

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert( function( el ) {
		el.appendChild( document.createComment( "" ) );
		return !el.getElementsByTagName( "*" ).length;
	} );

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert( function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	} );

	// ID filter and find
	if ( support.getById ) {
		Expr.filter[ "ID" ] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute( "id" ) === attrId;
			};
		};
		Expr.find[ "ID" ] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter[ "ID" ] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode( "id" );
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find[ "ID" ] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode( "id" );
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( ( elem = elems[ i++ ] ) ) {
						node = elem.getAttributeNode( "id" );
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find[ "TAG" ] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,

				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( ( elem = results[ i++ ] ) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find[ "CLASS" ] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( ( support.qsa = rnative.test( document.querySelectorAll ) ) ) {

		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert( function( el ) {

			var input;

			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll( "[msallowcapture^='']" ).length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll( "[selected]" ).length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push( "~=" );
			}

			// Support: IE 11+, Edge 15 - 18+
			// IE 11/Edge don't find elements on a `[name='']` query in some cases.
			// Adding a temporary attribute to the document before the selection works
			// around the issue.
			// Interestingly, IE 10 & older don't seem to have the issue.
			input = document.createElement( "input" );
			input.setAttribute( "name", "" );
			el.appendChild( input );
			if ( !el.querySelectorAll( "[name='']" ).length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*name" + whitespace + "*=" +
					whitespace + "*(?:''|\"\")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll( ":checked" ).length ) {
				rbuggyQSA.push( ":checked" );
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push( ".#.+[+~]" );
			}

			// Support: Firefox <=3.6 - 5 only
			// Old Firefox doesn't throw on a badly-escaped identifier.
			el.querySelectorAll( "\\\f" );
			rbuggyQSA.push( "[\\r\\n\\f]" );
		} );

		assert( function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement( "input" );
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll( "[name=d]" ).length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll( ":enabled" ).length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll( ":disabled" ).length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: Opera 10 - 11 only
			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll( "*,:x" );
			rbuggyQSA.push( ",.*:" );
		} );
	}

	if ( ( support.matchesSelector = rnative.test( ( matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector ) ) ) ) {

		assert( function( el ) {

			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		} );
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join( "|" ) );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join( "|" ) );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			) );
		} :
		function( a, b ) {
			if ( b ) {
				while ( ( b = b.parentNode ) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		// Support: IE 11+, Edge 17 - 18+
		// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
		// two documents; shallow comparisons work.
		// eslint-disable-next-line eqeqeq
		compare = ( a.ownerDocument || a ) == ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			( !support.sortDetached && b.compareDocumentPosition( a ) === compare ) ) {

			// Choose the first element that is related to our preferred document
			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			// eslint-disable-next-line eqeqeq
			if ( a == document || a.ownerDocument == preferredDoc &&
				contains( preferredDoc, a ) ) {
				return -1;
			}

			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			// eslint-disable-next-line eqeqeq
			if ( b == document || b.ownerDocument == preferredDoc &&
				contains( preferredDoc, b ) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {

		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {

			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			/* eslint-disable eqeqeq */
			return a == document ? -1 :
				b == document ? 1 :
				/* eslint-enable eqeqeq */
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( ( cur = cur.parentNode ) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( ( cur = cur.parentNode ) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[ i ] === bp[ i ] ) {
			i++;
		}

		return i ?

			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[ i ], bp[ i ] ) :

			// Otherwise nodes in our document sort first
			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			/* eslint-disable eqeqeq */
			ap[ i ] == preferredDoc ? -1 :
			bp[ i ] == preferredDoc ? 1 :
			/* eslint-enable eqeqeq */
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	setDocument( elem );

	if ( support.matchesSelector && documentIsHTML &&
		!nonnativeSelectorCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||

				// As well, disconnected nodes are said to be in a document
				// fragment in IE 9
				elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch ( e ) {
			nonnativeSelectorCache( expr, true );
		}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {

	// Set document vars if needed
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( ( context.ownerDocument || context ) != document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {

	// Set document vars if needed
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( ( elem.ownerDocument || elem ) != document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],

		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			( val = elem.getAttributeNode( name ) ) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return ( sel + "" ).replace( rcssescape, fcssescape );
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( ( elem = results[ i++ ] ) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {

		// If no nodeType, this is expected to be an array
		while ( ( node = elem[ i++ ] ) ) {

			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {

		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {

			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}

	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[ 1 ] = match[ 1 ].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[ 3 ] = ( match[ 3 ] || match[ 4 ] ||
				match[ 5 ] || "" ).replace( runescape, funescape );

			if ( match[ 2 ] === "~=" ) {
				match[ 3 ] = " " + match[ 3 ] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {

			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[ 1 ] = match[ 1 ].toLowerCase();

			if ( match[ 1 ].slice( 0, 3 ) === "nth" ) {

				// nth-* requires argument
				if ( !match[ 3 ] ) {
					Sizzle.error( match[ 0 ] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[ 4 ] = +( match[ 4 ] ?
					match[ 5 ] + ( match[ 6 ] || 1 ) :
					2 * ( match[ 3 ] === "even" || match[ 3 ] === "odd" ) );
				match[ 5 ] = +( ( match[ 7 ] + match[ 8 ] ) || match[ 3 ] === "odd" );

				// other types prohibit arguments
			} else if ( match[ 3 ] ) {
				Sizzle.error( match[ 0 ] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[ 6 ] && match[ 2 ];

			if ( matchExpr[ "CHILD" ].test( match[ 0 ] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[ 3 ] ) {
				match[ 2 ] = match[ 4 ] || match[ 5 ] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&

				// Get excess from tokenize (recursively)
				( excess = tokenize( unquoted, true ) ) &&

				// advance to the next closing parenthesis
				( excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length ) ) {

				// excess is a negative index
				match[ 0 ] = match[ 0 ].slice( 0, excess );
				match[ 2 ] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() {
					return true;
				} :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				( pattern = new RegExp( "(^|" + whitespace +
					")" + className + "(" + whitespace + "|$)" ) ) && classCache(
						className, function( elem ) {
							return pattern.test(
								typeof elem.className === "string" && elem.className ||
								typeof elem.getAttribute !== "undefined" &&
									elem.getAttribute( "class" ) ||
								""
							);
				} );
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				/* eslint-disable max-len */

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
				/* eslint-enable max-len */

			};
		},

		"CHILD": function( type, what, _argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, _context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( ( node = node[ dir ] ) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}

								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || ( node[ expando ] = {} );

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								( outerCache[ node.uniqueID ] = {} );

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( ( node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								( diff = nodeIndex = 0 ) || start.pop() ) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {

							// Use previously-cached element index if available
							if ( useCache ) {

								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || ( node[ expando ] = {} );

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									( outerCache[ node.uniqueID ] = {} );

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {

								// Use the same loop as above to seek `elem` from the start
								while ( ( node = ++nodeIndex && node && node[ dir ] ||
									( diff = nodeIndex = 0 ) || start.pop() ) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] ||
												( node[ expando ] = {} );

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												( outerCache[ node.uniqueID ] = {} );

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {

			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction( function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[ i ] );
							seed[ idx ] = !( matches[ idx ] = matched[ i ] );
						}
					} ) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {

		// Potentially complex pseudos
		"not": markFunction( function( selector ) {

			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction( function( seed, matches, _context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( ( elem = unmatched[ i ] ) ) {
							seed[ i ] = !( matches[ i ] = elem );
						}
					}
				} ) :
				function( elem, _context, xml ) {
					input[ 0 ] = elem;
					matcher( input, null, xml, results );

					// Don't keep the element (issue #299)
					input[ 0 ] = null;
					return !results.pop();
				};
		} ),

		"has": markFunction( function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		} ),

		"contains": markFunction( function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || getText( elem ) ).indexOf( text ) > -1;
			};
		} ),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {

			// lang value must be a valid identifier
			if ( !ridentifier.test( lang || "" ) ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( ( elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute( "xml:lang" ) || elem.getAttribute( "lang" ) ) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( ( elem = elem.parentNode ) && elem.nodeType === 1 );
				return false;
			};
		} ),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement &&
				( !document.hasFocus || document.hasFocus() ) &&
				!!( elem.type || elem.href || ~elem.tabIndex );
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {

			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return ( nodeName === "input" && !!elem.checked ) ||
				( nodeName === "option" && !!elem.selected );
		},

		"selected": function( elem ) {

			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				// eslint-disable-next-line no-unused-expressions
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {

			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos[ "empty" ]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( ( attr = elem.getAttribute( "type" ) ) == null ||
					attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo( function() {
			return [ 0 ];
		} ),

		"last": createPositionalPseudo( function( _matchIndexes, length ) {
			return [ length - 1 ];
		} ),

		"eq": createPositionalPseudo( function( _matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		} ),

		"even": createPositionalPseudo( function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} ),

		"odd": createPositionalPseudo( function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} ),

		"lt": createPositionalPseudo( function( matchIndexes, length, argument ) {
			var i = argument < 0 ?
				argument + length :
				argument > length ?
					length :
					argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} ),

		"gt": createPositionalPseudo( function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} )
	}
};

Expr.pseudos[ "nth" ] = Expr.pseudos[ "eq" ];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || ( match = rcomma.exec( soFar ) ) ) {
			if ( match ) {

				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[ 0 ].length ) || soFar;
			}
			groups.push( ( tokens = [] ) );
		}

		matched = false;

		// Combinators
		if ( ( match = rcombinators.exec( soFar ) ) ) {
			matched = match.shift();
			tokens.push( {
				value: matched,

				// Cast descendant combinators to space
				type: match[ 0 ].replace( rtrim, " " )
			} );
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( ( match = matchExpr[ type ].exec( soFar ) ) && ( !preFilters[ type ] ||
				( match = preFilters[ type ]( match ) ) ) ) {
				matched = match.shift();
				tokens.push( {
					value: matched,
					type: type,
					matches: match
				} );
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :

			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[ i ].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?

		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( ( elem = elem[ dir ] ) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( ( elem = elem[ dir ] ) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( ( elem = elem[ dir ] ) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || ( elem[ expando ] = {} );

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] ||
							( outerCache[ elem.uniqueID ] = {} );

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( ( oldCache = uniqueCache[ key ] ) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return ( newCache[ 2 ] = oldCache[ 2 ] );
						} else {

							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( ( newCache[ 2 ] = matcher( elem, context, xml ) ) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[ i ]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[ 0 ];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[ i ], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( ( elem = unmatched[ i ] ) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction( function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts(
				selector || "*",
				context.nodeType ? [ context ] : context,
				[]
			),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?

				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( ( elem = temp[ i ] ) ) {
					matcherOut[ postMap[ i ] ] = !( matcherIn[ postMap[ i ] ] = elem );
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {

					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( ( elem = matcherOut[ i ] ) ) {

							// Restore matcherIn since elem is not yet a final match
							temp.push( ( matcherIn[ i ] = elem ) );
						}
					}
					postFinder( null, ( matcherOut = [] ), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( ( elem = matcherOut[ i ] ) &&
						( temp = postFinder ? indexOf( seed, elem ) : preMap[ i ] ) > -1 ) {

						seed[ temp ] = !( results[ temp ] = elem );
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	} );
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[ 0 ].type ],
		implicitRelative = leadingRelative || Expr.relative[ " " ],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				( checkContext = context ).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );

			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( ( matcher = Expr.relative[ tokens[ i ].type ] ) ) {
			matchers = [ addCombinator( elementMatcher( matchers ), matcher ) ];
		} else {
			matcher = Expr.filter[ tokens[ i ].type ].apply( null, tokens[ i ].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {

				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[ j ].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(

					// If the preceding token was a descendant combinator, insert an implicit any-element `*`
					tokens
						.slice( 0, i - 1 )
						.concat( { value: tokens[ i - 2 ].type === " " ? "*" : "" } )
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( ( tokens = tokens.slice( j ) ) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,

				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find[ "TAG" ]( "*", outermost ),

				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = ( dirruns += contextBackup == null ? 1 : Math.random() || 0.1 ),
				len = elems.length;

			if ( outermost ) {

				// Support: IE 11+, Edge 17 - 18+
				// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
				// two documents; shallow comparisons work.
				// eslint-disable-next-line eqeqeq
				outermostContext = context == document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && ( elem = elems[ i ] ) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;

					// Support: IE 11+, Edge 17 - 18+
					// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
					// two documents; shallow comparisons work.
					// eslint-disable-next-line eqeqeq
					if ( !context && elem.ownerDocument != document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( ( matcher = elementMatchers[ j++ ] ) ) {
						if ( matcher( elem, context || document, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {

					// They will have gone through all possible matchers
					if ( ( elem = !matcher && elem ) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( ( matcher = setMatchers[ j++ ] ) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {

					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !( unmatched[ i ] || setMatched[ i ] ) ) {
								setMatched[ i ] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {

		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[ i ] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache(
			selector,
			matcherFromGroupMatchers( elementMatchers, setMatchers )
		);

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( ( selector = compiled.selector || selector ) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[ 0 ] = match[ 0 ].slice( 0 );
		if ( tokens.length > 2 && ( token = tokens[ 0 ] ).type === "ID" &&
			context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[ 1 ].type ] ) {

			context = ( Expr.find[ "ID" ]( token.matches[ 0 ]
				.replace( runescape, funescape ), context ) || [] )[ 0 ];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr[ "needsContext" ].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[ i ];

			// Abort if we hit a combinator
			if ( Expr.relative[ ( type = token.type ) ] ) {
				break;
			}
			if ( ( find = Expr.find[ type ] ) ) {

				// Search, expanding context for leading sibling combinators
				if ( ( seed = find(
					token.matches[ 0 ].replace( runescape, funescape ),
					rsibling.test( tokens[ 0 ].type ) && testContext( context.parentNode ) ||
						context
				) ) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split( "" ).sort( sortOrder ).join( "" ) === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert( function( el ) {

	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement( "fieldset" ) ) & 1;
} );

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert( function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute( "href" ) === "#";
} ) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	} );
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert( function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
} ) ) {
	addHandle( "value", function( elem, _name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	} );
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert( function( el ) {
	return el.getAttribute( "disabled" ) == null;
} ) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
				( val = elem.getAttributeNode( name ) ) && val.specified ?
					val.value :
					null;
		}
	} );
}

return Sizzle;

} )( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;



function nodeName( elem, name ) {

  return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

};
var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Filtered directly for both simple and complex selectors
	return jQuery.filter( qualifier, elements, not );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, _i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, _i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, _i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		if ( elem.contentDocument != null &&

			// Support: IE 11+
			// <object> elements with no `data` attribute has an object
			// `contentDocument` with a `null` prototype.
			getProto( elem.contentDocument ) ) {

			return elem.contentDocument;
		}

		// Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
		// Treat the template element as a regular one in browsers that
		// don't support it.
		if ( nodeName( elem, "template" ) ) {
			elem = elem.content || elem;
		}

		return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && toType( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject, noValue ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( _i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// rejected_handlers.disable
					// fulfilled_handlers.disable
					tuples[ 3 - i ][ 3 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock,

					// progress_handlers.lock
					tuples[ 0 ][ 3 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the master Deferred
			master = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						master.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject,
				!remaining );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( master.state() === "pending" ||
				isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return master.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
		}

		return master.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( toType( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, _key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};


// Matches dashed string for camelizing
var rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g;

// Used by camelCase as callback to replace()
function fcamelCase( _all, letter ) {
	return letter.toUpperCase();
}

// Convert dashed to camelCase; used by the css and data modules
// Support: IE <=9 - 11, Edge 12 - 15
// Microsoft forgot to hump their vendor prefix (#9572)
function camelCase( string ) {
	return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
}
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( camelCase );
			} else {
				key = camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var documentElement = document.documentElement;



	var isAttached = function( elem ) {
			return jQuery.contains( elem.ownerDocument, elem );
		},
		composed = { composed: true };

	// Support: IE 9 - 11+, Edge 12 - 18+, iOS 10.0 - 10.2 only
	// Check attachment across shadow DOM boundaries when possible (gh-3504)
	// Support: iOS 10.0-10.2 only
	// Early iOS 10 versions support `attachShadow` but not `getRootNode`,
	// leading to errors. We need to check for `getRootNode`.
	if ( documentElement.getRootNode ) {
		isAttached = function( elem ) {
			return jQuery.contains( elem.ownerDocument, elem ) ||
				elem.getRootNode( composed ) === elem.ownerDocument;
		};
	}
var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			isAttached( elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted, scale,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = elem.nodeType &&
			( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Support: Firefox <=54
		// Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
		initial = initial / 2;

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		while ( maxIterations-- ) {

			// Evaluate and update our best guess (doubling guesses that zero out).
			// Finish if the scale equals or crosses 1 (making the old*new product non-positive).
			jQuery.style( elem, prop, initialInUnit + unit );
			if ( ( 1 - scale ) * ( 1 - ( scale = currentValue() / initial || 0.5 ) ) <= 0 ) {
				maxIterations = 0;
			}
			initialInUnit = initialInUnit / scale;

		}

		initialInUnit = initialInUnit * 2;
		jQuery.style( elem, prop, initialInUnit + unit );

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]*)/i );

var rscriptType = ( /^$|^module$|\/(?:java|ecma)script/i );



( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// Support: IE <=9 only
	// IE <=9 replaces <option> tags with their contents when inserted outside of
	// the select element.
	div.innerHTML = "<option></option>";
	support.option = !!div.lastChild;
} )();


// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// Support: IE <=9 only
if ( !support.option ) {
	wrapMap.optgroup = wrapMap.option = [ 1, "<select multiple='multiple'>", "</select>" ];
}


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, attached, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( toType( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		attached = isAttached( elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( attached ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 - 11+
// focus() and blur() are asynchronous, except when they are no-op.
// So expect focus to be synchronous when the element is already active,
// and blur to be synchronous when the element is not already active.
// (focus and blur are always synchronous in other supported browsers,
// this just defines when we can count on it).
function expectSync( elem, type ) {
	return ( elem === safeActiveElement() ) === ( type === "focus" );
}

// Support: IE <=9 only
// Accessing document.activeElement can throw unexpectedly
// https://bugs.jquery.com/ticket/13393
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Only attach events to objects that accept data
		if ( !acceptData( elem ) ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = Object.create( null );
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),

			// Make a writable jQuery.Event from the native event object
			event = jQuery.event.fix( nativeEvent ),

			handlers = (
					dataPriv.get( this, "events" ) || Object.create( null )
				)[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// If the event is namespaced, then each handler is only invoked if it is
				// specially universal or its namespaces are a superset of the event's.
				if ( !event.rnamespace || handleObj.namespace === false ||
					event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
							return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
							return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		click: {

			// Utilize native event to ensure correct state for checkable inputs
			setup: function( data ) {

				// For mutual compressibility with _default, replace `this` access with a local var.
				// `|| data` is dead code meant only to preserve the variable through minification.
				var el = this || data;

				// Claim the first handler
				if ( rcheckableType.test( el.type ) &&
					el.click && nodeName( el, "input" ) ) {

					// dataPriv.set( el, "click", ... )
					leverageNative( el, "click", returnTrue );
				}

				// Return false to allow normal processing in the caller
				return false;
			},
			trigger: function( data ) {

				// For mutual compressibility with _default, replace `this` access with a local var.
				// `|| data` is dead code meant only to preserve the variable through minification.
				var el = this || data;

				// Force setup before triggering a click
				if ( rcheckableType.test( el.type ) &&
					el.click && nodeName( el, "input" ) ) {

					leverageNative( el, "click" );
				}

				// Return non-false to allow normal event-path propagation
				return true;
			},

			// For cross-browser consistency, suppress native .click() on links
			// Also prevent it if we're currently inside a leveraged native-event stack
			_default: function( event ) {
				var target = event.target;
				return rcheckableType.test( target.type ) &&
					target.click && nodeName( target, "input" ) &&
					dataPriv.get( target, "click" ) ||
					nodeName( target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

// Ensure the presence of an event listener that handles manually-triggered
// synthetic events by interrupting progress until reinvoked in response to
// *native* events that it fires directly, ensuring that state changes have
// already occurred before other listeners are invoked.
function leverageNative( el, type, expectSync ) {

	// Missing expectSync indicates a trigger call, which must force setup through jQuery.event.add
	if ( !expectSync ) {
		if ( dataPriv.get( el, type ) === undefined ) {
			jQuery.event.add( el, type, returnTrue );
		}
		return;
	}

	// Register the controller as a special universal handler for all event namespaces
	dataPriv.set( el, type, false );
	jQuery.event.add( el, type, {
		namespace: false,
		handler: function( event ) {
			var notAsync, result,
				saved = dataPriv.get( this, type );

			if ( ( event.isTrigger & 1 ) && this[ type ] ) {

				// Interrupt processing of the outer synthetic .trigger()ed event
				// Saved data should be false in such cases, but might be a leftover capture object
				// from an async native handler (gh-4350)
				if ( !saved.length ) {

					// Store arguments for use when handling the inner native event
					// There will always be at least one argument (an event object), so this array
					// will not be confused with a leftover capture object.
					saved = slice.call( arguments );
					dataPriv.set( this, type, saved );

					// Trigger the native event and capture its result
					// Support: IE <=9 - 11+
					// focus() and blur() are asynchronous
					notAsync = expectSync( this, type );
					this[ type ]();
					result = dataPriv.get( this, type );
					if ( saved !== result || notAsync ) {
						dataPriv.set( this, type, false );
					} else {
						result = {};
					}
					if ( saved !== result ) {

						// Cancel the outer synthetic event
						event.stopImmediatePropagation();
						event.preventDefault();
						return result.value;
					}

				// If this is an inner synthetic event for an event with a bubbling surrogate
				// (focus or blur), assume that the surrogate already propagated from triggering the
				// native event and prevent that from happening again here.
				// This technically gets the ordering wrong w.r.t. to `.trigger()` (in which the
				// bubbling surrogate propagates *after* the non-bubbling base), but that seems
				// less bad than duplication.
				} else if ( ( jQuery.event.special[ type ] || {} ).delegateType ) {
					event.stopPropagation();
				}

			// If this is a native event triggered above, everything is now in order
			// Fire an inner synthetic event with the original arguments
			} else if ( saved.length ) {

				// ...and capture the result
				dataPriv.set( this, type, {
					value: jQuery.event.trigger(

						// Support: IE <=9 - 11+
						// Extend with the prototype to reset the above stopImmediatePropagation()
						jQuery.extend( saved[ 0 ], jQuery.Event.prototype ),
						saved.slice( 1 ),
						this
					)
				} );

				// Abort handling of the native event
				event.stopImmediatePropagation();
			}
		}
	} );
}

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || Date.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	code: true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,

	which: function( event ) {
		var button = event.button;

		// Add which for key events
		if ( event.which == null && rkeyEvent.test( event.type ) ) {
			return event.charCode != null ? event.charCode : event.keyCode;
		}

		// Add which for click: 1 === left; 2 === middle; 3 === right
		if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
			if ( button & 1 ) {
				return 1;
			}

			if ( button & 2 ) {
				return 3;
			}

			if ( button & 4 ) {
				return 2;
			}

			return 0;
		}

		return event.which;
	}
}, jQuery.event.addProp );

jQuery.each( { focus: "focusin", blur: "focusout" }, function( type, delegateType ) {
	jQuery.event.special[ type ] = {

		// Utilize native event if possible so blur/focus sequence is correct
		setup: function() {

			// Claim the first handler
			// dataPriv.set( this, "focus", ... )
			// dataPriv.set( this, "blur", ... )
			leverageNative( this, type, expectSync );

			// Return false to allow normal processing in the caller
			return false;
		},
		trigger: function() {

			// Force setup before trigger
			leverageNative( this, type );

			// Return non-false to allow normal event-path propagation
			return true;
		},

		delegateType: delegateType
	};
} );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	// Support: IE <=10 - 11, Edge 12 - 13 only
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( elem ).children( "tbody" )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	if ( ( elem.type || "" ).slice( 0, 5 ) === "true/" ) {
		elem.type = elem.type.slice( 5 );
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.get( src );
		events = pdataOld.events;

		if ( events ) {
			dataPriv.remove( dest, "handle events" );

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = flat( args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		valueIsFunction = isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( valueIsFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( valueIsFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src && ( node.type || "" ).toLowerCase()  !== "module" ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl && !node.noModule ) {
								jQuery._evalUrl( node.src, {
									nonce: node.nonce || node.getAttribute( "nonce" )
								}, doc );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), node, doc );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && isAttached( node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html;
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = isAttached( elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

var swap = function( elem, options, callback ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.call( elem );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var rboxStyle = new RegExp( cssExpand.join( "|" ), "i" );



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		container.style.cssText = "position:absolute;left:-11111px;width:60px;" +
			"margin-top:1px;padding:0;border:0";
		div.style.cssText =
			"position:relative;display:block;box-sizing:border-box;overflow:scroll;" +
			"margin:auto;border:1px;padding:1px;" +
			"width:60%;top:1%";
		documentElement.appendChild( container ).appendChild( div );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = roundPixelMeasures( divStyle.marginLeft ) === 12;

		// Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
		// Some styles come back with percentage values, even though they shouldn't
		div.style.right = "60%";
		pixelBoxStylesVal = roundPixelMeasures( divStyle.right ) === 36;

		// Support: IE 9 - 11 only
		// Detect misreporting of content dimensions for box-sizing:border-box elements
		boxSizingReliableVal = roundPixelMeasures( divStyle.width ) === 36;

		// Support: IE 9 only
		// Detect overflow:scroll screwiness (gh-3699)
		// Support: Chrome <=64
		// Don't get tricked when zoom affects offsetWidth (gh-4029)
		div.style.position = "absolute";
		scrollboxSizeVal = roundPixelMeasures( div.offsetWidth / 3 ) === 12;

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	function roundPixelMeasures( measure ) {
		return Math.round( parseFloat( measure ) );
	}

	var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal,
		reliableTrDimensionsVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	jQuery.extend( support, {
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelBoxStyles: function() {
			computeStyleTests();
			return pixelBoxStylesVal;
		},
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		},
		scrollboxSize: function() {
			computeStyleTests();
			return scrollboxSizeVal;
		},

		// Support: IE 9 - 11+, Edge 15 - 18+
		// IE/Edge misreport `getComputedStyle` of table rows with width/height
		// set in CSS while `offset*` properties report correct values.
		// Behavior in IE 9 is more subtle than in newer versions & it passes
		// some versions of this test; make sure not to make it pass there!
		reliableTrDimensions: function() {
			var table, tr, trChild, trStyle;
			if ( reliableTrDimensionsVal == null ) {
				table = document.createElement( "table" );
				tr = document.createElement( "tr" );
				trChild = document.createElement( "div" );

				table.style.cssText = "position:absolute;left:-11111px";
				tr.style.height = "1px";
				trChild.style.height = "9px";

				documentElement
					.appendChild( table )
					.appendChild( tr )
					.appendChild( trChild );

				trStyle = window.getComputedStyle( tr );
				reliableTrDimensionsVal = parseInt( trStyle.height ) > 3;

				documentElement.removeChild( table );
			}
			return reliableTrDimensionsVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, #12537)
	//   .css('--customProperty) (#3144)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !isAttached( elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelBoxStyles() && rnumnonpx.test( ret ) && rboxStyle.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style,
	vendorProps = {};

// Return a vendor-prefixed property or undefined
function vendorPropName( name ) {

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a potentially-mapped jQuery.cssProps or vendor prefixed property
function finalPropName( name ) {
	var final = jQuery.cssProps[ name ] || vendorProps[ name ];

	if ( final ) {
		return final;
	}
	if ( name in emptyStyle ) {
		return name;
	}
	return vendorProps[ name ] = vendorPropName( name ) || name;
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rcustomProp = /^--/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	};

function setPositiveNumber( _elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function boxModelAdjustment( elem, dimension, box, isBorderBox, styles, computedVal ) {
	var i = dimension === "width" ? 1 : 0,
		extra = 0,
		delta = 0;

	// Adjustment may not be necessary
	if ( box === ( isBorderBox ? "border" : "content" ) ) {
		return 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin
		if ( box === "margin" ) {
			delta += jQuery.css( elem, box + cssExpand[ i ], true, styles );
		}

		// If we get here with a content-box, we're seeking "padding" or "border" or "margin"
		if ( !isBorderBox ) {

			// Add padding
			delta += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// For "border" or "margin", add border
			if ( box !== "padding" ) {
				delta += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );

			// But still keep track of it otherwise
			} else {
				extra += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}

		// If we get here with a border-box (content + padding + border), we're seeking "content" or
		// "padding" or "margin"
		} else {

			// For "content", subtract padding
			if ( box === "content" ) {
				delta -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// For "content" or "padding", subtract border
			if ( box !== "margin" ) {
				delta -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	// Account for positive content-box scroll gutter when requested by providing computedVal
	if ( !isBorderBox && computedVal >= 0 ) {

		// offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
		// Assuming integer scroll gutter, subtract the rest and round down
		delta += Math.max( 0, Math.ceil(
			elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
			computedVal -
			delta -
			extra -
			0.5

		// If offsetWidth/offsetHeight is unknown, then we can't determine content-box scroll gutter
		// Use an explicit zero to avoid NaN (gh-3964)
		) ) || 0;
	}

	return delta;
}

function getWidthOrHeight( elem, dimension, extra ) {

	// Start with computed style
	var styles = getStyles( elem ),

		// To avoid forcing a reflow, only fetch boxSizing if we need it (gh-4322).
		// Fake content-box until we know it's needed to know the true value.
		boxSizingNeeded = !support.boxSizingReliable() || extra,
		isBorderBox = boxSizingNeeded &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
		valueIsBorderBox = isBorderBox,

		val = curCSS( elem, dimension, styles ),
		offsetProp = "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 );

	// Support: Firefox <=54
	// Return a confounding non-pixel value or feign ignorance, as appropriate.
	if ( rnumnonpx.test( val ) ) {
		if ( !extra ) {
			return val;
		}
		val = "auto";
	}


	// Support: IE 9 - 11 only
	// Use offsetWidth/offsetHeight for when box sizing is unreliable.
	// In those cases, the computed value can be trusted to be border-box.
	if ( ( !support.boxSizingReliable() && isBorderBox ||

		// Support: IE 10 - 11+, Edge 15 - 18+
		// IE/Edge misreport `getComputedStyle` of table rows with width/height
		// set in CSS while `offset*` properties report correct values.
		// Interestingly, in some cases IE 9 doesn't suffer from this issue.
		!support.reliableTrDimensions() && nodeName( elem, "tr" ) ||

		// Fall back to offsetWidth/offsetHeight when value is "auto"
		// This happens for inline elements with no explicit setting (gh-3571)
		val === "auto" ||

		// Support: Android <=4.1 - 4.3 only
		// Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
		!parseFloat( val ) && jQuery.css( elem, "display", false, styles ) === "inline" ) &&

		// Make sure the element is visible & connected
		elem.getClientRects().length ) {

		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

		// Where available, offsetWidth/offsetHeight approximate border box dimensions.
		// Where not available (e.g., SVG), assume unreliable box-sizing and interpret the
		// retrieved value as a content box dimension.
		valueIsBorderBox = offsetProp in elem;
		if ( valueIsBorderBox ) {
			val = elem[ offsetProp ];
		}
	}

	// Normalize "" and auto
	val = parseFloat( val ) || 0;

	// Adjust for the element's box model
	return ( val +
		boxModelAdjustment(
			elem,
			dimension,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles,

			// Provide the current computed size to request scroll gutter calculation (gh-3589)
			val
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"gridArea": true,
		"gridColumn": true,
		"gridColumnEnd": true,
		"gridColumnStart": true,
		"gridRow": true,
		"gridRowEnd": true,
		"gridRowStart": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			// The isCustomProp check can be removed in jQuery 4.0 when we only auto-append
			// "px" to a few hardcoded values.
			if ( type === "number" && !isCustomProp ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}

		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( _i, dimension ) {
	jQuery.cssHooks[ dimension ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, dimension, extra );
						} ) :
						getWidthOrHeight( elem, dimension, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = getStyles( elem ),

				// Only read styles.position if the test has a chance to fail
				// to avoid forcing a reflow.
				scrollboxSizeBuggy = !support.scrollboxSize() &&
					styles.position === "absolute",

				// To avoid forcing a reflow, only fetch boxSizing if we need it (gh-3991)
				boxSizingNeeded = scrollboxSizeBuggy || extra,
				isBorderBox = boxSizingNeeded &&
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
				subtract = extra ?
					boxModelAdjustment(
						elem,
						dimension,
						extra,
						isBorderBox,
						styles
					) :
					0;

			// Account for unreliable border-box dimensions by comparing offset* to computed and
			// faking a content-box to get border and padding (gh-3699)
			if ( isBorderBox && scrollboxSizeBuggy ) {
				subtract -= Math.ceil(
					elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
					parseFloat( styles[ dimension ] ) -
					boxModelAdjustment( elem, dimension, "border", false, styles ) -
					0.5
				);
			}

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ dimension ] = value;
				value = jQuery.css( elem, dimension );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( prefix !== "margin" ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( Array.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 && (
					jQuery.cssHooks[ tween.prop ] ||
					tween.elem.style[ finalPropName( tween.prop ) ] != null ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, inProgress,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function schedule() {
	if ( inProgress ) {
		if ( document.hidden === false && window.requestAnimationFrame ) {
			window.requestAnimationFrame( schedule );
		} else {
			window.setTimeout( schedule, jQuery.fx.interval );
		}

		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = Date.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 15
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY and Edge just mirrors
		// the overflowX value there.
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

			/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( Array.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			// If there's more to do, yield
			if ( percent < 1 && length ) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if ( !length ) {
				deferred.notifyWith( elem, [ animation, 1, 0 ] );
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith( elem, [ animation ] );
			return false;
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					result.stop.bind( result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	// Attach callbacks from options
	animation
		.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	return animation;
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !isFunction( easing ) && easing
	};

	// Go to the end state if fx are off
	if ( jQuery.fx.off ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( _i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = Date.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Run the timer and safely remove it when done (allowing for external removal)
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	jQuery.fx.start();
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( inProgress ) {
		return;
	}

	inProgress = true;
	schedule();
};

jQuery.fx.stop = function() {
	inProgress = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( _i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

function classesToArray( value ) {
	if ( Array.isArray( value ) ) {
		return value;
	}
	if ( typeof value === "string" ) {
		return value.match( rnothtmlwhite ) || [];
	}
	return [];
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value,
			isValidValue = type === "string" || Array.isArray( value );

		if ( typeof stateVal === "boolean" && isValidValue ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( isValidValue ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = classesToArray( value );

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
					return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, valueIsFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		valueIsFunction = isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( valueIsFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


support.focusin = "onfocusin" in window;


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	stopPropagationCallback = function( e ) {
		e.stopPropagation();
	};

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special, lastElement,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = lastElement = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {
			lastElement = cur;
			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = (
					dataPriv.get( cur, "events" ) || Object.create( null )
				)[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && isFunction( elem[ type ] ) && !isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;

					if ( event.isPropagationStopped() ) {
						lastElement.addEventListener( type, stopPropagationCallback );
					}

					elem[ type ]();

					if ( event.isPropagationStopped() ) {
						lastElement.removeEventListener( type, stopPropagationCallback );
					}

					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {

				// Handle: regular nodes (via `this.ownerDocument`), window
				// (via `this.document`) & document (via `this`).
				var doc = this.ownerDocument || this.document || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this.document || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = { guid: Date.now() };

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( Array.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && toType( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	if ( a == null ) {
		return "";
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( _i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() + " " ] =
									( responseHeaders[ match[ 1 ].toLowerCase() + " " ] || [] )
										.concat( match[ 2 ] );
							}
						}
						match = responseHeaders[ key.toLowerCase() + " " ];
					}
					return match == null ? null : match.join( ", " );
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 15
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available and should be processed, append data to url
			if ( s.data && ( s.processData || typeof s.data === "string" ) ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce.guid++ ) +
					uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Use a noop converter for missing script
			if ( !isSuccess && jQuery.inArray( "script", s.dataTypes ) > -1 ) {
				s.converters[ "text script" ] = function() {};
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( _i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );

jQuery.ajaxPrefilter( function( s ) {
	var i;
	for ( i in s.headers ) {
		if ( i.toLowerCase() === "content-type" ) {
			s.contentType = s.headers[ i ] || "";
		}
	}
} );


jQuery._evalUrl = function( url, options, doc ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,

		// Only evaluate the response if it is successful (gh-4126)
		// dataFilter is not invoked for failure responses, so using it instead
		// of the default converter is kludgy but it works.
		converters: {
			"text script": function() {}
		},
		dataFilter: function( response ) {
			jQuery.globalEval( response, options, doc );
		}
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var htmlIsFunction = isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( htmlIsFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.ontimeout =
									xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = xhr.ontimeout = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain or forced-by-attrs requests
	if ( s.crossDomain || s.scriptAttrs ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" )
					.attr( s.scriptAttrs || {} )
					.prop( { charset: s.scriptCharset, src: s.url } )
					.on( "load error", callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					} );

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce.guid++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			if ( typeof props.top === "number" ) {
				props.top += "px";
			}
			if ( typeof props.left === "number" ) {
				props.left += "px";
			}
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {

	// offset() relates an element's border box to the document origin
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		// Get document-relative position by adding viewport scroll to viewport-relative gBCR
		rect = elem.getBoundingClientRect();
		win = elem.ownerDocument.defaultView;
		return {
			top: rect.top + win.pageYOffset,
			left: rect.left + win.pageXOffset
		};
	},

	// position() relates an element's margin box to its offset parent's padding box
	// This corresponds to the behavior of CSS absolute positioning
	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset, doc,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// position:fixed elements are offset from the viewport, which itself always has zero offset
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume position:fixed implies availability of getBoundingClientRect
			offset = elem.getBoundingClientRect();

		} else {
			offset = this.offset();

			// Account for the *real* offset parent, which can be the document or its root element
			// when a statically positioned element is identified
			doc = elem.ownerDocument;
			offsetParent = elem.offsetParent || doc.documentElement;
			while ( offsetParent &&
				( offsetParent === doc.body || offsetParent === doc.documentElement ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) {

				offsetParent = offsetParent.parentNode;
			}
			if ( offsetParent && offsetParent !== elem && offsetParent.nodeType === 1 ) {

				// Incorporate borders into its offset, since they are outside its content origin
				parentOffset = jQuery( offsetParent ).offset();
				parentOffset.top += jQuery.css( offsetParent, "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent, "borderLeftWidth", true );
			}
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {

			// Coalesce documents and windows
			var win;
			if ( isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( _i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( _i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	},

	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );

jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( _i, name ) {

		// Handle event binding
		jQuery.fn[ name ] = function( data, fn ) {
			return arguments.length > 0 ?
				this.on( name, null, data, fn ) :
				this.trigger( name );
		};
	} );




// Support: Android <=4.0 only
// Make sure we trim BOM and NBSP
var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

// Bind a function to a context, optionally partially applying any
// arguments.
// jQuery.proxy is deprecated to promote standards (specifically Function#bind)
// However, it is not slated for removal any time soon
jQuery.proxy = function( fn, context ) {
	var tmp, args, proxy;

	if ( typeof context === "string" ) {
		tmp = fn[ context ];
		context = fn;
		fn = tmp;
	}

	// Quick check to determine if target is callable, in the spec
	// this throws a TypeError, but we will just return undefined.
	if ( !isFunction( fn ) ) {
		return undefined;
	}

	// Simulated bind
	args = slice.call( arguments, 2 );
	proxy = function() {
		return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
	};

	// Set the guid of unique handler to the same of original handler, so it can be removed
	proxy.guid = fn.guid = fn.guid || jQuery.guid++;

	return proxy;
};

jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;
jQuery.isFunction = isFunction;
jQuery.isWindow = isWindow;
jQuery.camelCase = camelCase;
jQuery.type = toType;

jQuery.now = Date.now;

jQuery.isNumeric = function( obj ) {

	// As of jQuery 3.0, isNumeric is limited to
	// strings and numbers (primitives or objects)
	// that can be coerced to finite numbers (gh-2662)
	var type = jQuery.type( obj );
	return ( type === "number" || type === "string" ) &&

		// parseFloat NaNs numeric-cast false positives ("")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		!isNaN( obj - parseFloat( obj ) );
};

jQuery.trim = function( text ) {
	return text == null ?
		"" :
		( text + "" ).replace( rtrim, "" );
};



// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === "undefined" ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;
} );

},{"process":"../../../../../../../data/data/com.termux/files/usr/lib/node_modules/parcel-bundler/node_modules/process/browser.js"}],"js/main.min.js":[function(require,module,exports) {
var define;
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*! jQuery v3.0.0 | (c) jQuery Foundation | jquery.org/license */
!function (t, e) {
  "use strict";

  "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && "object" == _typeof(module.exports) ? module.exports = t.document ? e(t, !0) : function (t) {
    if (!t.document) throw new Error("jQuery requires a window with a document");
    return e(t);
  } : e(t);
}("undefined" != typeof window ? window : this, function (t, e) {
  "use strict";

  var n = [],
      i = t.document,
      o = Object.getPrototypeOf,
      r = n.slice,
      s = n.concat,
      a = n.push,
      l = n.indexOf,
      c = {},
      u = c.toString,
      d = c.hasOwnProperty,
      p = d.toString,
      f = p.call(Object),
      h = {};

  function m(t, e) {
    var n = (e = e || i).createElement("script");
    n.text = t, e.head.appendChild(n).parentNode.removeChild(n);
  }

  var g = "3.0.0",
      y = function y(t, e) {
    return new y.fn.init(t, e);
  },
      v = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
      b = /^-ms-/,
      w = /-([a-z])/g,
      x = function x(t, e) {
    return e.toUpperCase();
  };

  function C(t) {
    var e = !!t && "length" in t && t.length,
        n = y.type(t);
    return "function" !== n && !y.isWindow(t) && ("array" === n || 0 === e || "number" == typeof e && e > 0 && e - 1 in t);
  }

  y.fn = y.prototype = {
    jquery: g,
    constructor: y,
    length: 0,
    toArray: function toArray() {
      return r.call(this);
    },
    get: function get(t) {
      return null != t ? 0 > t ? this[t + this.length] : this[t] : r.call(this);
    },
    pushStack: function pushStack(t) {
      var e = y.merge(this.constructor(), t);
      return e.prevObject = this, e;
    },
    each: function each(t) {
      return y.each(this, t);
    },
    map: function map(t) {
      return this.pushStack(y.map(this, function (e, n) {
        return t.call(e, n, e);
      }));
    },
    slice: function slice() {
      return this.pushStack(r.apply(this, arguments));
    },
    first: function first() {
      return this.eq(0);
    },
    last: function last() {
      return this.eq(-1);
    },
    eq: function eq(t) {
      var e = this.length,
          n = +t + (0 > t ? e : 0);
      return this.pushStack(n >= 0 && e > n ? [this[n]] : []);
    },
    end: function end() {
      return this.prevObject || this.constructor();
    },
    push: a,
    sort: n.sort,
    splice: n.splice
  }, y.extend = y.fn.extend = function () {
    var t,
        e,
        n,
        i,
        o,
        r,
        s = arguments[0] || {},
        a = 1,
        l = arguments.length,
        c = !1;

    for ("boolean" == typeof s && (c = s, s = arguments[a] || {}, a++), "object" == _typeof(s) || y.isFunction(s) || (s = {}), a === l && (s = this, a--); l > a; a++) {
      if (null != (t = arguments[a])) for (e in t) {
        n = s[e], s !== (i = t[e]) && (c && i && (y.isPlainObject(i) || (o = y.isArray(i))) ? (o ? (o = !1, r = n && y.isArray(n) ? n : []) : r = n && y.isPlainObject(n) ? n : {}, s[e] = y.extend(c, r, i)) : void 0 !== i && (s[e] = i));
      }
    }

    return s;
  }, y.extend({
    expando: "jQuery" + (g + Math.random()).replace(/\D/g, ""),
    isReady: !0,
    error: function error(t) {
      throw new Error(t);
    },
    noop: function noop() {},
    isFunction: function isFunction(t) {
      return "function" === y.type(t);
    },
    isArray: Array.isArray,
    isWindow: function isWindow(t) {
      return null != t && t === t.window;
    },
    isNumeric: function isNumeric(t) {
      var e = y.type(t);
      return ("number" === e || "string" === e) && !isNaN(t - parseFloat(t));
    },
    isPlainObject: function isPlainObject(t) {
      var e, n;
      return !(!t || "[object Object]" !== u.call(t)) && (!(e = o(t)) || "function" == typeof (n = d.call(e, "constructor") && e.constructor) && p.call(n) === f);
    },
    isEmptyObject: function isEmptyObject(t) {
      var e;

      for (e in t) {
        return !1;
      }

      return !0;
    },
    type: function type(t) {
      return null == t ? t + "" : "object" == _typeof(t) || "function" == typeof t ? c[u.call(t)] || "object" : _typeof(t);
    },
    globalEval: function globalEval(t) {
      m(t);
    },
    camelCase: function camelCase(t) {
      return t.replace(b, "ms-").replace(w, x);
    },
    nodeName: function nodeName(t, e) {
      return t.nodeName && t.nodeName.toLowerCase() === e.toLowerCase();
    },
    each: function each(t, e) {
      var n,
          i = 0;
      if (C(t)) for (n = t.length; n > i && !1 !== e.call(t[i], i, t[i]); i++) {
        ;
      } else for (i in t) {
        if (!1 === e.call(t[i], i, t[i])) break;
      }
      return t;
    },
    trim: function trim(t) {
      return null == t ? "" : (t + "").replace(v, "");
    },
    makeArray: function makeArray(t, e) {
      var n = e || [];
      return null != t && (C(Object(t)) ? y.merge(n, "string" == typeof t ? [t] : t) : a.call(n, t)), n;
    },
    inArray: function inArray(t, e, n) {
      return null == e ? -1 : l.call(e, t, n);
    },
    merge: function merge(t, e) {
      for (var n = +e.length, i = 0, o = t.length; n > i; i++) {
        t[o++] = e[i];
      }

      return t.length = o, t;
    },
    grep: function grep(t, e, n) {
      for (var i = [], o = 0, r = t.length, s = !n; r > o; o++) {
        !e(t[o], o) !== s && i.push(t[o]);
      }

      return i;
    },
    map: function map(t, e, n) {
      var i,
          o,
          r = 0,
          a = [];
      if (C(t)) for (i = t.length; i > r; r++) {
        null != (o = e(t[r], r, n)) && a.push(o);
      } else for (r in t) {
        null != (o = e(t[r], r, n)) && a.push(o);
      }
      return s.apply([], a);
    },
    guid: 1,
    proxy: function proxy(t, e) {
      var n, i, o;
      return "string" == typeof e && (n = t[e], e = t, t = n), y.isFunction(t) ? (i = r.call(arguments, 2), (o = function o() {
        return t.apply(e || this, i.concat(r.call(arguments)));
      }).guid = t.guid = t.guid || y.guid++, o) : void 0;
    },
    now: Date.now,
    support: h
  }), "function" == typeof Symbol && (y.fn[Symbol.iterator] = n[Symbol.iterator]), y.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (t, e) {
    c["[object " + e + "]"] = e.toLowerCase();
  });

  var S = function (t) {
    var e,
        n,
        i,
        o,
        r,
        s,
        a,
        l,
        c,
        u,
        d,
        p,
        f,
        h,
        m,
        g,
        y,
        v,
        b,
        w = "sizzle" + 1 * new Date(),
        x = t.document,
        C = 0,
        S = 0,
        T = st(),
        k = st(),
        A = st(),
        E = function E(t, e) {
      return t === e && (d = !0), 0;
    },
        D = {}.hasOwnProperty,
        O = [],
        I = O.pop,
        N = O.push,
        P = O.push,
        $ = O.slice,
        R = function R(t, e) {
      for (var n = 0, i = t.length; i > n; n++) {
        if (t[n] === e) return n;
      }

      return -1;
    },
        M = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
        F = "[\\x20\\t\\r\\n\\f]",
        L = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
        j = "\\[" + F + "*(" + L + ")(?:" + F + "*([*^$|!~]?=)" + F + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + L + "))|)" + F + "*\\]",
        B = ":(" + L + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + j + ")*)|.*)\\)|)",
        H = new RegExp(F + "+", "g"),
        q = new RegExp("^" + F + "+|((?:^|[^\\\\])(?:\\\\.)*)" + F + "+$", "g"),
        _ = new RegExp("^" + F + "*," + F + "*"),
        W = new RegExp("^" + F + "*([>+~]|" + F + ")" + F + "*"),
        z = new RegExp("=" + F + "*([^\\]'\"]*?)" + F + "*\\]", "g"),
        U = new RegExp(B),
        G = new RegExp("^" + L + "$"),
        X = {
      ID: new RegExp("^#(" + L + ")"),
      CLASS: new RegExp("^\\.(" + L + ")"),
      TAG: new RegExp("^(" + L + "|[*])"),
      ATTR: new RegExp("^" + j),
      PSEUDO: new RegExp("^" + B),
      CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + F + "*(even|odd|(([+-]|)(\\d*)n|)" + F + "*(?:([+-]|)" + F + "*(\\d+)|))" + F + "*\\)|)", "i"),
      bool: new RegExp("^(?:" + M + ")$", "i"),
      needsContext: new RegExp("^" + F + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + F + "*((?:-\\d)?\\d*)" + F + "*\\)|)(?=[^-]|$)", "i")
    },
        Y = /^(?:input|select|textarea|button)$/i,
        V = /^h\d$/i,
        K = /^[^{]+\{\s*\[native \w/,
        Q = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
        Z = /[+~]/,
        J = new RegExp("\\\\([\\da-f]{1,6}" + F + "?|(" + F + ")|.)", "ig"),
        tt = function tt(t, e, n) {
      var i = "0x" + e - 65536;
      return i != i || n ? e : 0 > i ? String.fromCharCode(i + 65536) : String.fromCharCode(i >> 10 | 55296, 1023 & i | 56320);
    },
        et = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g,
        nt = function nt(t, e) {
      return e ? "\0" === t ? "�" : t.slice(0, -1) + "\\" + t.charCodeAt(t.length - 1).toString(16) + " " : "\\" + t;
    },
        it = function it() {
      p();
    },
        ot = vt(function (t) {
      return !0 === t.disabled;
    }, {
      dir: "parentNode",
      next: "legend"
    });

    try {
      P.apply(O = $.call(x.childNodes), x.childNodes), O[x.childNodes.length].nodeType;
    } catch (t) {
      P = {
        apply: O.length ? function (t, e) {
          N.apply(t, $.call(e));
        } : function (t, e) {
          for (var n = t.length, i = 0; t[n++] = e[i++];) {
            ;
          }

          t.length = n - 1;
        }
      };
    }

    function rt(t, e, i, o) {
      var r,
          a,
          c,
          u,
          d,
          h,
          y,
          v = e && e.ownerDocument,
          C = e ? e.nodeType : 9;
      if (i = i || [], "string" != typeof t || !t || 1 !== C && 9 !== C && 11 !== C) return i;

      if (!o && ((e ? e.ownerDocument || e : x) !== f && p(e), e = e || f, m)) {
        if (11 !== C && (d = Q.exec(t))) if (r = d[1]) {
          if (9 === C) {
            if (!(c = e.getElementById(r))) return i;
            if (c.id === r) return i.push(c), i;
          } else if (v && (c = v.getElementById(r)) && b(e, c) && c.id === r) return i.push(c), i;
        } else {
          if (d[2]) return P.apply(i, e.getElementsByTagName(t)), i;
          if ((r = d[3]) && n.getElementsByClassName && e.getElementsByClassName) return P.apply(i, e.getElementsByClassName(r)), i;
        }

        if (n.qsa && !A[t + " "] && (!g || !g.test(t))) {
          if (1 !== C) v = e, y = t;else if ("object" !== e.nodeName.toLowerCase()) {
            for ((u = e.getAttribute("id")) ? u = u.replace(et, nt) : e.setAttribute("id", u = w), a = (h = s(t)).length; a--;) {
              h[a] = "#" + u + " " + yt(h[a]);
            }

            y = h.join(","), v = Z.test(t) && mt(e.parentNode) || e;
          }
          if (y) try {
            return P.apply(i, v.querySelectorAll(y)), i;
          } catch (t) {} finally {
            u === w && e.removeAttribute("id");
          }
        }
      }

      return l(t.replace(q, "$1"), e, i, o);
    }

    function st() {
      var t = [];
      return function e(n, o) {
        return t.push(n + " ") > i.cacheLength && delete e[t.shift()], e[n + " "] = o;
      };
    }

    function at(t) {
      return t[w] = !0, t;
    }

    function lt(t) {
      var e = f.createElement("fieldset");

      try {
        return !!t(e);
      } catch (t) {
        return !1;
      } finally {
        e.parentNode && e.parentNode.removeChild(e), e = null;
      }
    }

    function ct(t, e) {
      for (var n = t.split("|"), o = n.length; o--;) {
        i.attrHandle[n[o]] = e;
      }
    }

    function ut(t, e) {
      var n = e && t,
          i = n && 1 === t.nodeType && 1 === e.nodeType && t.sourceIndex - e.sourceIndex;
      if (i) return i;
      if (n) for (; n = n.nextSibling;) {
        if (n === e) return -1;
      }
      return t ? 1 : -1;
    }

    function dt(t) {
      return function (e) {
        return "input" === e.nodeName.toLowerCase() && e.type === t;
      };
    }

    function pt(t) {
      return function (e) {
        var n = e.nodeName.toLowerCase();
        return ("input" === n || "button" === n) && e.type === t;
      };
    }

    function ft(t) {
      return function (e) {
        return "label" in e && e.disabled === t || "form" in e && e.disabled === t || "form" in e && !1 === e.disabled && (e.isDisabled === t || e.isDisabled !== !t && ("label" in e || !ot(e)) !== t);
      };
    }

    function ht(t) {
      return at(function (e) {
        return e = +e, at(function (n, i) {
          for (var o, r = t([], n.length, e), s = r.length; s--;) {
            n[o = r[s]] && (n[o] = !(i[o] = n[o]));
          }
        });
      });
    }

    function mt(t) {
      return t && void 0 !== t.getElementsByTagName && t;
    }

    for (e in n = rt.support = {}, r = rt.isXML = function (t) {
      var e = t && (t.ownerDocument || t).documentElement;
      return !!e && "HTML" !== e.nodeName;
    }, p = rt.setDocument = function (t) {
      var e,
          o,
          s = t ? t.ownerDocument || t : x;
      return s !== f && 9 === s.nodeType && s.documentElement ? (h = (f = s).documentElement, m = !r(f), x !== f && (o = f.defaultView) && o.top !== o && (o.addEventListener ? o.addEventListener("unload", it, !1) : o.attachEvent && o.attachEvent("onunload", it)), n.attributes = lt(function (t) {
        return t.className = "i", !t.getAttribute("className");
      }), n.getElementsByTagName = lt(function (t) {
        return t.appendChild(f.createComment("")), !t.getElementsByTagName("*").length;
      }), n.getElementsByClassName = K.test(f.getElementsByClassName), n.getById = lt(function (t) {
        return h.appendChild(t).id = w, !f.getElementsByName || !f.getElementsByName(w).length;
      }), n.getById ? (i.find.ID = function (t, e) {
        if (void 0 !== e.getElementById && m) {
          var n = e.getElementById(t);
          return n ? [n] : [];
        }
      }, i.filter.ID = function (t) {
        var e = t.replace(J, tt);
        return function (t) {
          return t.getAttribute("id") === e;
        };
      }) : (delete i.find.ID, i.filter.ID = function (t) {
        var e = t.replace(J, tt);
        return function (t) {
          var n = void 0 !== t.getAttributeNode && t.getAttributeNode("id");
          return n && n.value === e;
        };
      }), i.find.TAG = n.getElementsByTagName ? function (t, e) {
        return void 0 !== e.getElementsByTagName ? e.getElementsByTagName(t) : n.qsa ? e.querySelectorAll(t) : void 0;
      } : function (t, e) {
        var n,
            i = [],
            o = 0,
            r = e.getElementsByTagName(t);

        if ("*" === t) {
          for (; n = r[o++];) {
            1 === n.nodeType && i.push(n);
          }

          return i;
        }

        return r;
      }, i.find.CLASS = n.getElementsByClassName && function (t, e) {
        return void 0 !== e.getElementsByClassName && m ? e.getElementsByClassName(t) : void 0;
      }, y = [], g = [], (n.qsa = K.test(f.querySelectorAll)) && (lt(function (t) {
        h.appendChild(t).innerHTML = "<a id='" + w + "'></a><select id='" + w + "-\r\\' msallowcapture=''><option selected=''></option></select>", t.querySelectorAll("[msallowcapture^='']").length && g.push("[*^$]=" + F + "*(?:''|\"\")"), t.querySelectorAll("[selected]").length || g.push("\\[" + F + "*(?:value|" + M + ")"), t.querySelectorAll("[id~=" + w + "-]").length || g.push("~="), t.querySelectorAll(":checked").length || g.push(":checked"), t.querySelectorAll("a#" + w + "+*").length || g.push(".#.+[+~]");
      }), lt(function (t) {
        t.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
        var e = f.createElement("input");
        e.setAttribute("type", "hidden"), t.appendChild(e).setAttribute("name", "D"), t.querySelectorAll("[name=d]").length && g.push("name" + F + "*[*^$|!~]?="), 2 !== t.querySelectorAll(":enabled").length && g.push(":enabled", ":disabled"), h.appendChild(t).disabled = !0, 2 !== t.querySelectorAll(":disabled").length && g.push(":enabled", ":disabled"), t.querySelectorAll("*,:x"), g.push(",.*:");
      })), (n.matchesSelector = K.test(v = h.matches || h.webkitMatchesSelector || h.mozMatchesSelector || h.oMatchesSelector || h.msMatchesSelector)) && lt(function (t) {
        n.disconnectedMatch = v.call(t, "*"), v.call(t, "[s!='']:x"), y.push("!=", B);
      }), g = g.length && new RegExp(g.join("|")), y = y.length && new RegExp(y.join("|")), e = K.test(h.compareDocumentPosition), b = e || K.test(h.contains) ? function (t, e) {
        var n = 9 === t.nodeType ? t.documentElement : t,
            i = e && e.parentNode;
        return t === i || !(!i || 1 !== i.nodeType || !(n.contains ? n.contains(i) : t.compareDocumentPosition && 16 & t.compareDocumentPosition(i)));
      } : function (t, e) {
        if (e) for (; e = e.parentNode;) {
          if (e === t) return !0;
        }
        return !1;
      }, E = e ? function (t, e) {
        if (t === e) return d = !0, 0;
        var i = !t.compareDocumentPosition - !e.compareDocumentPosition;
        return i || (1 & (i = (t.ownerDocument || t) === (e.ownerDocument || e) ? t.compareDocumentPosition(e) : 1) || !n.sortDetached && e.compareDocumentPosition(t) === i ? t === f || t.ownerDocument === x && b(x, t) ? -1 : e === f || e.ownerDocument === x && b(x, e) ? 1 : u ? R(u, t) - R(u, e) : 0 : 4 & i ? -1 : 1);
      } : function (t, e) {
        if (t === e) return d = !0, 0;
        var n,
            i = 0,
            o = t.parentNode,
            r = e.parentNode,
            s = [t],
            a = [e];
        if (!o || !r) return t === f ? -1 : e === f ? 1 : o ? -1 : r ? 1 : u ? R(u, t) - R(u, e) : 0;
        if (o === r) return ut(t, e);

        for (n = t; n = n.parentNode;) {
          s.unshift(n);
        }

        for (n = e; n = n.parentNode;) {
          a.unshift(n);
        }

        for (; s[i] === a[i];) {
          i++;
        }

        return i ? ut(s[i], a[i]) : s[i] === x ? -1 : a[i] === x ? 1 : 0;
      }, f) : f;
    }, rt.matches = function (t, e) {
      return rt(t, null, null, e);
    }, rt.matchesSelector = function (t, e) {
      if ((t.ownerDocument || t) !== f && p(t), e = e.replace(z, "='$1']"), n.matchesSelector && m && !A[e + " "] && (!y || !y.test(e)) && (!g || !g.test(e))) try {
        var i = v.call(t, e);
        if (i || n.disconnectedMatch || t.document && 11 !== t.document.nodeType) return i;
      } catch (t) {}
      return rt(e, f, null, [t]).length > 0;
    }, rt.contains = function (t, e) {
      return (t.ownerDocument || t) !== f && p(t), b(t, e);
    }, rt.attr = function (t, e) {
      (t.ownerDocument || t) !== f && p(t);
      var o = i.attrHandle[e.toLowerCase()],
          r = o && D.call(i.attrHandle, e.toLowerCase()) ? o(t, e, !m) : void 0;
      return void 0 !== r ? r : n.attributes || !m ? t.getAttribute(e) : (r = t.getAttributeNode(e)) && r.specified ? r.value : null;
    }, rt.escape = function (t) {
      return (t + "").replace(et, nt);
    }, rt.error = function (t) {
      throw new Error("Syntax error, unrecognized expression: " + t);
    }, rt.uniqueSort = function (t) {
      var e,
          i = [],
          o = 0,
          r = 0;

      if (d = !n.detectDuplicates, u = !n.sortStable && t.slice(0), t.sort(E), d) {
        for (; e = t[r++];) {
          e === t[r] && (o = i.push(r));
        }

        for (; o--;) {
          t.splice(i[o], 1);
        }
      }

      return u = null, t;
    }, o = rt.getText = function (t) {
      var e,
          n = "",
          i = 0,
          r = t.nodeType;

      if (r) {
        if (1 === r || 9 === r || 11 === r) {
          if ("string" == typeof t.textContent) return t.textContent;

          for (t = t.firstChild; t; t = t.nextSibling) {
            n += o(t);
          }
        } else if (3 === r || 4 === r) return t.nodeValue;
      } else for (; e = t[i++];) {
        n += o(e);
      }

      return n;
    }, (i = rt.selectors = {
      cacheLength: 50,
      createPseudo: at,
      match: X,
      attrHandle: {},
      find: {},
      relative: {
        ">": {
          dir: "parentNode",
          first: !0
        },
        " ": {
          dir: "parentNode"
        },
        "+": {
          dir: "previousSibling",
          first: !0
        },
        "~": {
          dir: "previousSibling"
        }
      },
      preFilter: {
        ATTR: function ATTR(t) {
          return t[1] = t[1].replace(J, tt), t[3] = (t[3] || t[4] || t[5] || "").replace(J, tt), "~=" === t[2] && (t[3] = " " + t[3] + " "), t.slice(0, 4);
        },
        CHILD: function CHILD(t) {
          return t[1] = t[1].toLowerCase(), "nth" === t[1].slice(0, 3) ? (t[3] || rt.error(t[0]), t[4] = +(t[4] ? t[5] + (t[6] || 1) : 2 * ("even" === t[3] || "odd" === t[3])), t[5] = +(t[7] + t[8] || "odd" === t[3])) : t[3] && rt.error(t[0]), t;
        },
        PSEUDO: function PSEUDO(t) {
          var e,
              n = !t[6] && t[2];
          return X.CHILD.test(t[0]) ? null : (t[3] ? t[2] = t[4] || t[5] || "" : n && U.test(n) && (e = s(n, !0)) && (e = n.indexOf(")", n.length - e) - n.length) && (t[0] = t[0].slice(0, e), t[2] = n.slice(0, e)), t.slice(0, 3));
        }
      },
      filter: {
        TAG: function TAG(t) {
          var e = t.replace(J, tt).toLowerCase();
          return "*" === t ? function () {
            return !0;
          } : function (t) {
            return t.nodeName && t.nodeName.toLowerCase() === e;
          };
        },
        CLASS: function CLASS(t) {
          var e = T[t + " "];
          return e || (e = new RegExp("(^|" + F + ")" + t + "(" + F + "|$)")) && T(t, function (t) {
            return e.test("string" == typeof t.className && t.className || void 0 !== t.getAttribute && t.getAttribute("class") || "");
          });
        },
        ATTR: function ATTR(t, e, n) {
          return function (i) {
            var o = rt.attr(i, t);
            return null == o ? "!=" === e : !e || (o += "", "=" === e ? o === n : "!=" === e ? o !== n : "^=" === e ? n && 0 === o.indexOf(n) : "*=" === e ? n && o.indexOf(n) > -1 : "$=" === e ? n && o.slice(-n.length) === n : "~=" === e ? (" " + o.replace(H, " ") + " ").indexOf(n) > -1 : "|=" === e && (o === n || o.slice(0, n.length + 1) === n + "-"));
          };
        },
        CHILD: function CHILD(t, e, n, i, o) {
          var r = "nth" !== t.slice(0, 3),
              s = "last" !== t.slice(-4),
              a = "of-type" === e;
          return 1 === i && 0 === o ? function (t) {
            return !!t.parentNode;
          } : function (e, n, l) {
            var c,
                u,
                d,
                p,
                f,
                h,
                m = r !== s ? "nextSibling" : "previousSibling",
                g = e.parentNode,
                y = a && e.nodeName.toLowerCase(),
                v = !l && !a,
                b = !1;

            if (g) {
              if (r) {
                for (; m;) {
                  for (p = e; p = p[m];) {
                    if (a ? p.nodeName.toLowerCase() === y : 1 === p.nodeType) return !1;
                  }

                  h = m = "only" === t && !h && "nextSibling";
                }

                return !0;
              }

              if (h = [s ? g.firstChild : g.lastChild], s && v) {
                for (b = (f = (c = (u = (d = (p = g)[w] || (p[w] = {}))[p.uniqueID] || (d[p.uniqueID] = {}))[t] || [])[0] === C && c[1]) && c[2], p = f && g.childNodes[f]; p = ++f && p && p[m] || (b = f = 0) || h.pop();) {
                  if (1 === p.nodeType && ++b && p === e) {
                    u[t] = [C, f, b];
                    break;
                  }
                }
              } else if (v && (b = f = (c = (u = (d = (p = e)[w] || (p[w] = {}))[p.uniqueID] || (d[p.uniqueID] = {}))[t] || [])[0] === C && c[1]), !1 === b) for (; (p = ++f && p && p[m] || (b = f = 0) || h.pop()) && ((a ? p.nodeName.toLowerCase() !== y : 1 !== p.nodeType) || !++b || (v && ((u = (d = p[w] || (p[w] = {}))[p.uniqueID] || (d[p.uniqueID] = {}))[t] = [C, b]), p !== e));) {
                ;
              }

              return (b -= o) === i || b % i == 0 && b / i >= 0;
            }
          };
        },
        PSEUDO: function PSEUDO(t, e) {
          var n,
              o = i.pseudos[t] || i.setFilters[t.toLowerCase()] || rt.error("unsupported pseudo: " + t);
          return o[w] ? o(e) : o.length > 1 ? (n = [t, t, "", e], i.setFilters.hasOwnProperty(t.toLowerCase()) ? at(function (t, n) {
            for (var i, r = o(t, e), s = r.length; s--;) {
              t[i = R(t, r[s])] = !(n[i] = r[s]);
            }
          }) : function (t) {
            return o(t, 0, n);
          }) : o;
        }
      },
      pseudos: {
        not: at(function (t) {
          var e = [],
              n = [],
              i = a(t.replace(q, "$1"));
          return i[w] ? at(function (t, e, n, o) {
            for (var r, s = i(t, null, o, []), a = t.length; a--;) {
              (r = s[a]) && (t[a] = !(e[a] = r));
            }
          }) : function (t, o, r) {
            return e[0] = t, i(e, null, r, n), e[0] = null, !n.pop();
          };
        }),
        has: at(function (t) {
          return function (e) {
            return rt(t, e).length > 0;
          };
        }),
        contains: at(function (t) {
          return t = t.replace(J, tt), function (e) {
            return (e.textContent || e.innerText || o(e)).indexOf(t) > -1;
          };
        }),
        lang: at(function (t) {
          return G.test(t || "") || rt.error("unsupported lang: " + t), t = t.replace(J, tt).toLowerCase(), function (e) {
            var n;

            do {
              if (n = m ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang")) return (n = n.toLowerCase()) === t || 0 === n.indexOf(t + "-");
            } while ((e = e.parentNode) && 1 === e.nodeType);

            return !1;
          };
        }),
        target: function target(e) {
          var n = t.location && t.location.hash;
          return n && n.slice(1) === e.id;
        },
        root: function root(t) {
          return t === h;
        },
        focus: function focus(t) {
          return t === f.activeElement && (!f.hasFocus || f.hasFocus()) && !!(t.type || t.href || ~t.tabIndex);
        },
        enabled: ft(!1),
        disabled: ft(!0),
        checked: function checked(t) {
          var e = t.nodeName.toLowerCase();
          return "input" === e && !!t.checked || "option" === e && !!t.selected;
        },
        selected: function selected(t) {
          return t.parentNode && t.parentNode.selectedIndex, !0 === t.selected;
        },
        empty: function empty(t) {
          for (t = t.firstChild; t; t = t.nextSibling) {
            if (t.nodeType < 6) return !1;
          }

          return !0;
        },
        parent: function parent(t) {
          return !i.pseudos.empty(t);
        },
        header: function header(t) {
          return V.test(t.nodeName);
        },
        input: function input(t) {
          return Y.test(t.nodeName);
        },
        button: function button(t) {
          var e = t.nodeName.toLowerCase();
          return "input" === e && "button" === t.type || "button" === e;
        },
        text: function text(t) {
          var e;
          return "input" === t.nodeName.toLowerCase() && "text" === t.type && (null == (e = t.getAttribute("type")) || "text" === e.toLowerCase());
        },
        first: ht(function () {
          return [0];
        }),
        last: ht(function (t, e) {
          return [e - 1];
        }),
        eq: ht(function (t, e, n) {
          return [0 > n ? n + e : n];
        }),
        even: ht(function (t, e) {
          for (var n = 0; e > n; n += 2) {
            t.push(n);
          }

          return t;
        }),
        odd: ht(function (t, e) {
          for (var n = 1; e > n; n += 2) {
            t.push(n);
          }

          return t;
        }),
        lt: ht(function (t, e, n) {
          for (var i = 0 > n ? n + e : n; --i >= 0;) {
            t.push(i);
          }

          return t;
        }),
        gt: ht(function (t, e, n) {
          for (var i = 0 > n ? n + e : n; ++i < e;) {
            t.push(i);
          }

          return t;
        })
      }
    }).pseudos.nth = i.pseudos.eq, {
      radio: !0,
      checkbox: !0,
      file: !0,
      password: !0,
      image: !0
    }) {
      i.pseudos[e] = dt(e);
    }

    for (e in {
      submit: !0,
      reset: !0
    }) {
      i.pseudos[e] = pt(e);
    }

    function gt() {}

    function yt(t) {
      for (var e = 0, n = t.length, i = ""; n > e; e++) {
        i += t[e].value;
      }

      return i;
    }

    function vt(t, e, n) {
      var i = e.dir,
          o = e.next,
          r = o || i,
          s = n && "parentNode" === r,
          a = S++;
      return e.first ? function (e, n, o) {
        for (; e = e[i];) {
          if (1 === e.nodeType || s) return t(e, n, o);
        }
      } : function (e, n, l) {
        var c,
            u,
            d,
            p = [C, a];

        if (l) {
          for (; e = e[i];) {
            if ((1 === e.nodeType || s) && t(e, n, l)) return !0;
          }
        } else for (; e = e[i];) {
          if (1 === e.nodeType || s) if (u = (d = e[w] || (e[w] = {}))[e.uniqueID] || (d[e.uniqueID] = {}), o && o === e.nodeName.toLowerCase()) e = e[i] || e;else {
            if ((c = u[r]) && c[0] === C && c[1] === a) return p[2] = c[2];
            if (u[r] = p, p[2] = t(e, n, l)) return !0;
          }
        }
      };
    }

    function bt(t) {
      return t.length > 1 ? function (e, n, i) {
        for (var o = t.length; o--;) {
          if (!t[o](e, n, i)) return !1;
        }

        return !0;
      } : t[0];
    }

    function wt(t, e, n, i, o) {
      for (var r, s = [], a = 0, l = t.length, c = null != e; l > a; a++) {
        (r = t[a]) && (n && !n(r, i, o) || (s.push(r), c && e.push(a)));
      }

      return s;
    }

    function xt(t, e, n, i, o, r) {
      return i && !i[w] && (i = xt(i)), o && !o[w] && (o = xt(o, r)), at(function (r, s, a, l) {
        var c,
            u,
            d,
            p = [],
            f = [],
            h = s.length,
            m = r || function (t, e, n) {
          for (var i = 0, o = e.length; o > i; i++) {
            rt(t, e[i], n);
          }

          return n;
        }(e || "*", a.nodeType ? [a] : a, []),
            g = !t || !r && e ? m : wt(m, p, t, a, l),
            y = n ? o || (r ? t : h || i) ? [] : s : g;

        if (n && n(g, y, a, l), i) for (c = wt(y, f), i(c, [], a, l), u = c.length; u--;) {
          (d = c[u]) && (y[f[u]] = !(g[f[u]] = d));
        }

        if (r) {
          if (o || t) {
            if (o) {
              for (c = [], u = y.length; u--;) {
                (d = y[u]) && c.push(g[u] = d);
              }

              o(null, y = [], c, l);
            }

            for (u = y.length; u--;) {
              (d = y[u]) && (c = o ? R(r, d) : p[u]) > -1 && (r[c] = !(s[c] = d));
            }
          }
        } else y = wt(y === s ? y.splice(h, y.length) : y), o ? o(null, s, y, l) : P.apply(s, y);
      });
    }

    function Ct(t) {
      for (var e, n, o, r = t.length, s = i.relative[t[0].type], a = s || i.relative[" "], l = s ? 1 : 0, u = vt(function (t) {
        return t === e;
      }, a, !0), d = vt(function (t) {
        return R(e, t) > -1;
      }, a, !0), p = [function (t, n, i) {
        var o = !s && (i || n !== c) || ((e = n).nodeType ? u(t, n, i) : d(t, n, i));
        return e = null, o;
      }]; r > l; l++) {
        if (n = i.relative[t[l].type]) p = [vt(bt(p), n)];else {
          if ((n = i.filter[t[l].type].apply(null, t[l].matches))[w]) {
            for (o = ++l; r > o && !i.relative[t[o].type]; o++) {
              ;
            }

            return xt(l > 1 && bt(p), l > 1 && yt(t.slice(0, l - 1).concat({
              value: " " === t[l - 2].type ? "*" : ""
            })).replace(q, "$1"), n, o > l && Ct(t.slice(l, o)), r > o && Ct(t = t.slice(o)), r > o && yt(t));
          }

          p.push(n);
        }
      }

      return bt(p);
    }

    function St(t, e) {
      var n = e.length > 0,
          o = t.length > 0,
          r = function r(_r, s, a, l, u) {
        var d,
            h,
            g,
            y = 0,
            v = "0",
            b = _r && [],
            w = [],
            x = c,
            S = _r || o && i.find.TAG("*", u),
            T = C += null == x ? 1 : Math.random() || .1,
            k = S.length;

        for (u && (c = s === f || s || u); v !== k && null != (d = S[v]); v++) {
          if (o && d) {
            for (h = 0, s || d.ownerDocument === f || (p(d), a = !m); g = t[h++];) {
              if (g(d, s || f, a)) {
                l.push(d);
                break;
              }
            }

            u && (C = T);
          }

          n && ((d = !g && d) && y--, _r && b.push(d));
        }

        if (y += v, n && v !== y) {
          for (h = 0; g = e[h++];) {
            g(b, w, s, a);
          }

          if (_r) {
            if (y > 0) for (; v--;) {
              b[v] || w[v] || (w[v] = I.call(l));
            }
            w = wt(w);
          }

          P.apply(l, w), u && !_r && w.length > 0 && y + e.length > 1 && rt.uniqueSort(l);
        }

        return u && (C = T, c = x), b;
      };

      return n ? at(r) : r;
    }

    return gt.prototype = i.filters = i.pseudos, i.setFilters = new gt(), s = rt.tokenize = function (t, e) {
      var n,
          o,
          r,
          s,
          a,
          l,
          c,
          u = k[t + " "];
      if (u) return e ? 0 : u.slice(0);

      for (a = t, l = [], c = i.preFilter; a;) {
        for (s in n && !(o = _.exec(a)) || (o && (a = a.slice(o[0].length) || a), l.push(r = [])), n = !1, (o = W.exec(a)) && (n = o.shift(), r.push({
          value: n,
          type: o[0].replace(q, " ")
        }), a = a.slice(n.length)), i.filter) {
          !(o = X[s].exec(a)) || c[s] && !(o = c[s](o)) || (n = o.shift(), r.push({
            value: n,
            type: s,
            matches: o
          }), a = a.slice(n.length));
        }

        if (!n) break;
      }

      return e ? a.length : a ? rt.error(t) : k(t, l).slice(0);
    }, a = rt.compile = function (t, e) {
      var n,
          i = [],
          o = [],
          r = A[t + " "];

      if (!r) {
        for (e || (e = s(t)), n = e.length; n--;) {
          (r = Ct(e[n]))[w] ? i.push(r) : o.push(r);
        }

        (r = A(t, St(o, i))).selector = t;
      }

      return r;
    }, l = rt.select = function (t, e, o, r) {
      var l,
          c,
          u,
          d,
          p,
          f = "function" == typeof t && t,
          h = !r && s(t = f.selector || t);

      if (o = o || [], 1 === h.length) {
        if ((c = h[0] = h[0].slice(0)).length > 2 && "ID" === (u = c[0]).type && n.getById && 9 === e.nodeType && m && i.relative[c[1].type]) {
          if (!(e = (i.find.ID(u.matches[0].replace(J, tt), e) || [])[0])) return o;
          f && (e = e.parentNode), t = t.slice(c.shift().value.length);
        }

        for (l = X.needsContext.test(t) ? 0 : c.length; l-- && (u = c[l], !i.relative[d = u.type]);) {
          if ((p = i.find[d]) && (r = p(u.matches[0].replace(J, tt), Z.test(c[0].type) && mt(e.parentNode) || e))) {
            if (c.splice(l, 1), !(t = r.length && yt(c))) return P.apply(o, r), o;
            break;
          }
        }
      }

      return (f || a(t, h))(r, e, !m, o, !e || Z.test(t) && mt(e.parentNode) || e), o;
    }, n.sortStable = w.split("").sort(E).join("") === w, n.detectDuplicates = !!d, p(), n.sortDetached = lt(function (t) {
      return 1 & t.compareDocumentPosition(f.createElement("fieldset"));
    }), lt(function (t) {
      return t.innerHTML = "<a href='#'></a>", "#" === t.firstChild.getAttribute("href");
    }) || ct("type|href|height|width", function (t, e, n) {
      return n ? void 0 : t.getAttribute(e, "type" === e.toLowerCase() ? 1 : 2);
    }), n.attributes && lt(function (t) {
      return t.innerHTML = "<input/>", t.firstChild.setAttribute("value", ""), "" === t.firstChild.getAttribute("value");
    }) || ct("value", function (t, e, n) {
      return n || "input" !== t.nodeName.toLowerCase() ? void 0 : t.defaultValue;
    }), lt(function (t) {
      return null == t.getAttribute("disabled");
    }) || ct(M, function (t, e, n) {
      var i;
      return n ? void 0 : !0 === t[e] ? e.toLowerCase() : (i = t.getAttributeNode(e)) && i.specified ? i.value : null;
    }), rt;
  }(t);

  y.find = S, y.expr = S.selectors, y.expr[":"] = y.expr.pseudos, y.uniqueSort = y.unique = S.uniqueSort, y.text = S.getText, y.isXMLDoc = S.isXML, y.contains = S.contains, y.escapeSelector = S.escape;

  var T = function T(t, e, n) {
    for (var i = [], o = void 0 !== n; (t = t[e]) && 9 !== t.nodeType;) {
      if (1 === t.nodeType) {
        if (o && y(t).is(n)) break;
        i.push(t);
      }
    }

    return i;
  },
      k = function k(t, e) {
    for (var n = []; t; t = t.nextSibling) {
      1 === t.nodeType && t !== e && n.push(t);
    }

    return n;
  },
      A = y.expr.match.needsContext,
      E = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i,
      D = /^.[^:#\[\.,]*$/;

  function O(t, e, n) {
    if (y.isFunction(e)) return y.grep(t, function (t, i) {
      return !!e.call(t, i, t) !== n;
    });
    if (e.nodeType) return y.grep(t, function (t) {
      return t === e !== n;
    });

    if ("string" == typeof e) {
      if (D.test(e)) return y.filter(e, t, n);
      e = y.filter(e, t);
    }

    return y.grep(t, function (t) {
      return l.call(e, t) > -1 !== n && 1 === t.nodeType;
    });
  }

  y.filter = function (t, e, n) {
    var i = e[0];
    return n && (t = ":not(" + t + ")"), 1 === e.length && 1 === i.nodeType ? y.find.matchesSelector(i, t) ? [i] : [] : y.find.matches(t, y.grep(e, function (t) {
      return 1 === t.nodeType;
    }));
  }, y.fn.extend({
    find: function find(t) {
      var e,
          n,
          i = this.length,
          o = this;
      if ("string" != typeof t) return this.pushStack(y(t).filter(function () {
        for (e = 0; i > e; e++) {
          if (y.contains(o[e], this)) return !0;
        }
      }));

      for (n = this.pushStack([]), e = 0; i > e; e++) {
        y.find(t, o[e], n);
      }

      return i > 1 ? y.uniqueSort(n) : n;
    },
    filter: function filter(t) {
      return this.pushStack(O(this, t || [], !1));
    },
    not: function not(t) {
      return this.pushStack(O(this, t || [], !0));
    },
    is: function is(t) {
      return !!O(this, "string" == typeof t && A.test(t) ? y(t) : t || [], !1).length;
    }
  });
  var I,
      N = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
  (y.fn.init = function (t, e, n) {
    var o, r;
    if (!t) return this;

    if (n = n || I, "string" == typeof t) {
      if (!(o = "<" === t[0] && ">" === t[t.length - 1] && t.length >= 3 ? [null, t, null] : N.exec(t)) || !o[1] && e) return !e || e.jquery ? (e || n).find(t) : this.constructor(e).find(t);

      if (o[1]) {
        if (e = e instanceof y ? e[0] : e, y.merge(this, y.parseHTML(o[1], e && e.nodeType ? e.ownerDocument || e : i, !0)), E.test(o[1]) && y.isPlainObject(e)) for (o in e) {
          y.isFunction(this[o]) ? this[o](e[o]) : this.attr(o, e[o]);
        }
        return this;
      }

      return (r = i.getElementById(o[2])) && (this[0] = r, this.length = 1), this;
    }

    return t.nodeType ? (this[0] = t, this.length = 1, this) : y.isFunction(t) ? void 0 !== n.ready ? n.ready(t) : t(y) : y.makeArray(t, this);
  }).prototype = y.fn, I = y(i);
  var P = /^(?:parents|prev(?:Until|All))/,
      $ = {
    children: !0,
    contents: !0,
    next: !0,
    prev: !0
  };

  function R(t, e) {
    for (; (t = t[e]) && 1 !== t.nodeType;) {
      ;
    }

    return t;
  }

  y.fn.extend({
    has: function has(t) {
      var e = y(t, this),
          n = e.length;
      return this.filter(function () {
        for (var t = 0; n > t; t++) {
          if (y.contains(this, e[t])) return !0;
        }
      });
    },
    closest: function closest(t, e) {
      var n,
          i = 0,
          o = this.length,
          r = [],
          s = "string" != typeof t && y(t);
      if (!A.test(t)) for (; o > i; i++) {
        for (n = this[i]; n && n !== e; n = n.parentNode) {
          if (n.nodeType < 11 && (s ? s.index(n) > -1 : 1 === n.nodeType && y.find.matchesSelector(n, t))) {
            r.push(n);
            break;
          }
        }
      }
      return this.pushStack(r.length > 1 ? y.uniqueSort(r) : r);
    },
    index: function index(t) {
      return t ? "string" == typeof t ? l.call(y(t), this[0]) : l.call(this, t.jquery ? t[0] : t) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
    },
    add: function add(t, e) {
      return this.pushStack(y.uniqueSort(y.merge(this.get(), y(t, e))));
    },
    addBack: function addBack(t) {
      return this.add(null == t ? this.prevObject : this.prevObject.filter(t));
    }
  }), y.each({
    parent: function parent(t) {
      var e = t.parentNode;
      return e && 11 !== e.nodeType ? e : null;
    },
    parents: function parents(t) {
      return T(t, "parentNode");
    },
    parentsUntil: function parentsUntil(t, e, n) {
      return T(t, "parentNode", n);
    },
    next: function next(t) {
      return R(t, "nextSibling");
    },
    prev: function prev(t) {
      return R(t, "previousSibling");
    },
    nextAll: function nextAll(t) {
      return T(t, "nextSibling");
    },
    prevAll: function prevAll(t) {
      return T(t, "previousSibling");
    },
    nextUntil: function nextUntil(t, e, n) {
      return T(t, "nextSibling", n);
    },
    prevUntil: function prevUntil(t, e, n) {
      return T(t, "previousSibling", n);
    },
    siblings: function siblings(t) {
      return k((t.parentNode || {}).firstChild, t);
    },
    children: function children(t) {
      return k(t.firstChild);
    },
    contents: function contents(t) {
      return t.contentDocument || y.merge([], t.childNodes);
    }
  }, function (t, e) {
    y.fn[t] = function (n, i) {
      var o = y.map(this, e, n);
      return "Until" !== t.slice(-5) && (i = n), i && "string" == typeof i && (o = y.filter(i, o)), this.length > 1 && ($[t] || y.uniqueSort(o), P.test(t) && o.reverse()), this.pushStack(o);
    };
  });
  var M = /\S+/g;

  function F(t) {
    return t;
  }

  function L(t) {
    throw t;
  }

  function j(t, e, n) {
    var i;

    try {
      t && y.isFunction(i = t.promise) ? i.call(t).done(e).fail(n) : t && y.isFunction(i = t.then) ? i.call(t, e, n) : e.call(void 0, t);
    } catch (t) {
      n.call(void 0, t);
    }
  }

  y.Callbacks = function (t) {
    t = "string" == typeof t ? function (t) {
      var e = {};
      return y.each(t.match(M) || [], function (t, n) {
        e[n] = !0;
      }), e;
    }(t) : y.extend({}, t);

    var e,
        n,
        i,
        o,
        r = [],
        s = [],
        a = -1,
        l = function l() {
      for (o = t.once, i = e = !0; s.length; a = -1) {
        for (n = s.shift(); ++a < r.length;) {
          !1 === r[a].apply(n[0], n[1]) && t.stopOnFalse && (a = r.length, n = !1);
        }
      }

      t.memory || (n = !1), e = !1, o && (r = n ? [] : "");
    },
        c = {
      add: function add() {
        return r && (n && !e && (a = r.length - 1, s.push(n)), function e(n) {
          y.each(n, function (n, i) {
            y.isFunction(i) ? t.unique && c.has(i) || r.push(i) : i && i.length && "string" !== y.type(i) && e(i);
          });
        }(arguments), n && !e && l()), this;
      },
      remove: function remove() {
        return y.each(arguments, function (t, e) {
          for (var n; (n = y.inArray(e, r, n)) > -1;) {
            r.splice(n, 1), a >= n && a--;
          }
        }), this;
      },
      has: function has(t) {
        return t ? y.inArray(t, r) > -1 : r.length > 0;
      },
      empty: function empty() {
        return r && (r = []), this;
      },
      disable: function disable() {
        return o = s = [], r = n = "", this;
      },
      disabled: function disabled() {
        return !r;
      },
      lock: function lock() {
        return o = s = [], n || e || (r = n = ""), this;
      },
      locked: function locked() {
        return !!o;
      },
      fireWith: function fireWith(t, n) {
        return o || (n = [t, (n = n || []).slice ? n.slice() : n], s.push(n), e || l()), this;
      },
      fire: function fire() {
        return c.fireWith(this, arguments), this;
      },
      fired: function fired() {
        return !!i;
      }
    };

    return c;
  }, y.extend({
    Deferred: function Deferred(e) {
      var n = [["notify", "progress", y.Callbacks("memory"), y.Callbacks("memory"), 2], ["resolve", "done", y.Callbacks("once memory"), y.Callbacks("once memory"), 0, "resolved"], ["reject", "fail", y.Callbacks("once memory"), y.Callbacks("once memory"), 1, "rejected"]],
          i = "pending",
          o = {
        state: function state() {
          return i;
        },
        always: function always() {
          return r.done(arguments).fail(arguments), this;
        },
        catch: function _catch(t) {
          return o.then(null, t);
        },
        pipe: function pipe() {
          var t = arguments;
          return y.Deferred(function (e) {
            y.each(n, function (n, i) {
              var o = y.isFunction(t[i[4]]) && t[i[4]];
              r[i[1]](function () {
                var t = o && o.apply(this, arguments);
                t && y.isFunction(t.promise) ? t.promise().progress(e.notify).done(e.resolve).fail(e.reject) : e[i[0] + "With"](this, o ? [t] : arguments);
              });
            }), t = null;
          }).promise();
        },
        then: function then(e, i, o) {
          var r = 0;

          function s(e, n, i, o) {
            return function () {
              var a = this,
                  l = arguments,
                  c = function c() {
                var t, c;

                if (!(r > e)) {
                  if ((t = i.apply(a, l)) === n.promise()) throw new TypeError("Thenable self-resolution");
                  c = t && ("object" == _typeof(t) || "function" == typeof t) && t.then, y.isFunction(c) ? o ? c.call(t, s(r, n, F, o), s(r, n, L, o)) : (r++, c.call(t, s(r, n, F, o), s(r, n, L, o), s(r, n, F, n.notifyWith))) : (i !== F && (a = void 0, l = [t]), (o || n.resolveWith)(a, l));
                }
              },
                  u = o ? c : function () {
                try {
                  c();
                } catch (t) {
                  y.Deferred.exceptionHook && y.Deferred.exceptionHook(t, u.stackTrace), e + 1 >= r && (i !== L && (a = void 0, l = [t]), n.rejectWith(a, l));
                }
              };

              e ? u() : (y.Deferred.getStackHook && (u.stackTrace = y.Deferred.getStackHook()), t.setTimeout(u));
            };
          }

          return y.Deferred(function (t) {
            n[0][3].add(s(0, t, y.isFunction(o) ? o : F, t.notifyWith)), n[1][3].add(s(0, t, y.isFunction(e) ? e : F)), n[2][3].add(s(0, t, y.isFunction(i) ? i : L));
          }).promise();
        },
        promise: function promise(t) {
          return null != t ? y.extend(t, o) : o;
        }
      },
          r = {};
      return y.each(n, function (t, e) {
        var s = e[2],
            a = e[5];
        o[e[1]] = s.add, a && s.add(function () {
          i = a;
        }, n[3 - t][2].disable, n[0][2].lock), s.add(e[3].fire), r[e[0]] = function () {
          return r[e[0] + "With"](this === r ? void 0 : this, arguments), this;
        }, r[e[0] + "With"] = s.fireWith;
      }), o.promise(r), e && e.call(r, r), r;
    },
    when: function when(t) {
      var e = arguments.length,
          n = e,
          i = Array(n),
          o = r.call(arguments),
          s = y.Deferred(),
          a = function a(t) {
        return function (n) {
          i[t] = this, o[t] = arguments.length > 1 ? r.call(arguments) : n, --e || s.resolveWith(i, o);
        };
      };

      if (1 >= e && (j(t, s.done(a(n)).resolve, s.reject), "pending" === s.state() || y.isFunction(o[n] && o[n].then))) return s.then();

      for (; n--;) {
        j(o[n], a(n), s.reject);
      }

      return s.promise();
    }
  });
  var B = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

  y.Deferred.exceptionHook = function (e, n) {
    t.console && t.console.warn && e && B.test(e.name) && t.console.warn("jQuery.Deferred exception: " + e.message, e.stack, n);
  };

  var H = y.Deferred();

  function q() {
    i.removeEventListener("DOMContentLoaded", q), t.removeEventListener("load", q), y.ready();
  }

  y.fn.ready = function (t) {
    return H.then(t), this;
  }, y.extend({
    isReady: !1,
    readyWait: 1,
    holdReady: function holdReady(t) {
      t ? y.readyWait++ : y.ready(!0);
    },
    ready: function ready(t) {
      (!0 === t ? --y.readyWait : y.isReady) || (y.isReady = !0, !0 !== t && --y.readyWait > 0 || H.resolveWith(i, [y]));
    }
  }), y.ready.then = H.then, "complete" === i.readyState || "loading" !== i.readyState && !i.documentElement.doScroll ? t.setTimeout(y.ready) : (i.addEventListener("DOMContentLoaded", q), t.addEventListener("load", q));

  var _ = function _(t, e, n, i, o, r, s) {
    var a = 0,
        l = t.length,
        c = null == n;
    if ("object" === y.type(n)) for (a in o = !0, n) {
      _(t, e, a, n[a], !0, r, s);
    } else if (void 0 !== i && (o = !0, y.isFunction(i) || (s = !0), c && (s ? (e.call(t, i), e = null) : (c = e, e = function e(t, _e, n) {
      return c.call(y(t), n);
    })), e)) for (; l > a; a++) {
      e(t[a], n, s ? i : i.call(t[a], a, e(t[a], n)));
    }
    return o ? t : c ? e.call(t) : l ? e(t[0], n) : r;
  },
      W = function W(t) {
    return 1 === t.nodeType || 9 === t.nodeType || !+t.nodeType;
  };

  function z() {
    this.expando = y.expando + z.uid++;
  }

  z.uid = 1, z.prototype = {
    cache: function cache(t) {
      var e = t[this.expando];
      return e || (e = {}, W(t) && (t.nodeType ? t[this.expando] = e : Object.defineProperty(t, this.expando, {
        value: e,
        configurable: !0
      }))), e;
    },
    set: function set(t, e, n) {
      var i,
          o = this.cache(t);
      if ("string" == typeof e) o[y.camelCase(e)] = n;else for (i in e) {
        o[y.camelCase(i)] = e[i];
      }
      return o;
    },
    get: function get(t, e) {
      return void 0 === e ? this.cache(t) : t[this.expando] && t[this.expando][y.camelCase(e)];
    },
    access: function access(t, e, n) {
      return void 0 === e || e && "string" == typeof e && void 0 === n ? this.get(t, e) : (this.set(t, e, n), void 0 !== n ? n : e);
    },
    remove: function remove(t, e) {
      var n,
          i = t[this.expando];

      if (void 0 !== i) {
        if (void 0 !== e) {
          y.isArray(e) ? e = e.map(y.camelCase) : e = (e = y.camelCase(e)) in i ? [e] : e.match(M) || [], n = e.length;

          for (; n--;) {
            delete i[e[n]];
          }
        }

        (void 0 === e || y.isEmptyObject(i)) && (t.nodeType ? t[this.expando] = void 0 : delete t[this.expando]);
      }
    },
    hasData: function hasData(t) {
      var e = t[this.expando];
      return void 0 !== e && !y.isEmptyObject(e);
    }
  };
  var U = new z(),
      G = new z(),
      X = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
      Y = /[A-Z]/g;

  function V(t, e, n) {
    var i;
    if (void 0 === n && 1 === t.nodeType) if (i = "data-" + e.replace(Y, "-$&").toLowerCase(), "string" == typeof (n = t.getAttribute(i))) {
      try {
        n = "true" === n || "false" !== n && ("null" === n ? null : +n + "" === n ? +n : X.test(n) ? JSON.parse(n) : n);
      } catch (t) {}

      G.set(t, e, n);
    } else n = void 0;
    return n;
  }

  y.extend({
    hasData: function hasData(t) {
      return G.hasData(t) || U.hasData(t);
    },
    data: function data(t, e, n) {
      return G.access(t, e, n);
    },
    removeData: function removeData(t, e) {
      G.remove(t, e);
    },
    _data: function _data(t, e, n) {
      return U.access(t, e, n);
    },
    _removeData: function _removeData(t, e) {
      U.remove(t, e);
    }
  }), y.fn.extend({
    data: function data(t, e) {
      var n,
          i,
          o,
          r = this[0],
          s = r && r.attributes;

      if (void 0 === t) {
        if (this.length && (o = G.get(r), 1 === r.nodeType && !U.get(r, "hasDataAttrs"))) {
          for (n = s.length; n--;) {
            s[n] && 0 === (i = s[n].name).indexOf("data-") && (i = y.camelCase(i.slice(5)), V(r, i, o[i]));
          }

          U.set(r, "hasDataAttrs", !0);
        }

        return o;
      }

      return "object" == _typeof(t) ? this.each(function () {
        G.set(this, t);
      }) : _(this, function (e) {
        var n;

        if (r && void 0 === e) {
          if (void 0 !== (n = G.get(r, t))) return n;
          if (void 0 !== (n = V(r, t))) return n;
        } else this.each(function () {
          G.set(this, t, e);
        });
      }, null, e, arguments.length > 1, null, !0);
    },
    removeData: function removeData(t) {
      return this.each(function () {
        G.remove(this, t);
      });
    }
  }), y.extend({
    queue: function queue(t, e, n) {
      var i;
      return t ? (e = (e || "fx") + "queue", i = U.get(t, e), n && (!i || y.isArray(n) ? i = U.access(t, e, y.makeArray(n)) : i.push(n)), i || []) : void 0;
    },
    dequeue: function dequeue(t, e) {
      e = e || "fx";

      var n = y.queue(t, e),
          i = n.length,
          o = n.shift(),
          r = y._queueHooks(t, e);

      "inprogress" === o && (o = n.shift(), i--), o && ("fx" === e && n.unshift("inprogress"), delete r.stop, o.call(t, function () {
        y.dequeue(t, e);
      }, r)), !i && r && r.empty.fire();
    },
    _queueHooks: function _queueHooks(t, e) {
      var n = e + "queueHooks";
      return U.get(t, n) || U.access(t, n, {
        empty: y.Callbacks("once memory").add(function () {
          U.remove(t, [e + "queue", n]);
        })
      });
    }
  }), y.fn.extend({
    queue: function queue(t, e) {
      var n = 2;
      return "string" != typeof t && (e = t, t = "fx", n--), arguments.length < n ? y.queue(this[0], t) : void 0 === e ? this : this.each(function () {
        var n = y.queue(this, t, e);
        y._queueHooks(this, t), "fx" === t && "inprogress" !== n[0] && y.dequeue(this, t);
      });
    },
    dequeue: function dequeue(t) {
      return this.each(function () {
        y.dequeue(this, t);
      });
    },
    clearQueue: function clearQueue(t) {
      return this.queue(t || "fx", []);
    },
    promise: function promise(t, e) {
      var n,
          i = 1,
          o = y.Deferred(),
          r = this,
          s = this.length,
          a = function a() {
        --i || o.resolveWith(r, [r]);
      };

      for ("string" != typeof t && (e = t, t = void 0), t = t || "fx"; s--;) {
        (n = U.get(r[s], t + "queueHooks")) && n.empty && (i++, n.empty.add(a));
      }

      return a(), o.promise(e);
    }
  });

  var K = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
      Q = new RegExp("^(?:([+-])=|)(" + K + ")([a-z%]*)$", "i"),
      Z = ["Top", "Right", "Bottom", "Left"],
      J = function J(t, e) {
    return "none" === (t = e || t).style.display || "" === t.style.display && y.contains(t.ownerDocument, t) && "none" === y.css(t, "display");
  },
      tt = function tt(t, e, n, i) {
    var o,
        r,
        s = {};

    for (r in e) {
      s[r] = t.style[r], t.style[r] = e[r];
    }

    for (r in o = n.apply(t, i || []), e) {
      t.style[r] = s[r];
    }

    return o;
  };

  function et(t, e, n, i) {
    var o,
        r = 1,
        s = 20,
        a = i ? function () {
      return i.cur();
    } : function () {
      return y.css(t, e, "");
    },
        l = a(),
        c = n && n[3] || (y.cssNumber[e] ? "" : "px"),
        u = (y.cssNumber[e] || "px" !== c && +l) && Q.exec(y.css(t, e));

    if (u && u[3] !== c) {
      c = c || u[3], n = n || [], u = +l || 1;

      do {
        u /= r = r || ".5", y.style(t, e, u + c);
      } while (r !== (r = a() / l) && 1 !== r && --s);
    }

    return n && (u = +u || +l || 0, o = n[1] ? u + (n[1] + 1) * n[2] : +n[2], i && (i.unit = c, i.start = u, i.end = o)), o;
  }

  var nt = {};

  function it(t) {
    var e,
        n = t.ownerDocument,
        i = t.nodeName,
        o = nt[i];
    return o || (e = n.body.appendChild(n.createElement(i)), o = y.css(e, "display"), e.parentNode.removeChild(e), "none" === o && (o = "block"), nt[i] = o, o);
  }

  function ot(t, e) {
    for (var n, i, o = [], r = 0, s = t.length; s > r; r++) {
      (i = t[r]).style && (n = i.style.display, e ? ("none" === n && (o[r] = U.get(i, "display") || null, o[r] || (i.style.display = "")), "" === i.style.display && J(i) && (o[r] = it(i))) : "none" !== n && (o[r] = "none", U.set(i, "display", n)));
    }

    for (r = 0; s > r; r++) {
      null != o[r] && (t[r].style.display = o[r]);
    }

    return t;
  }

  y.fn.extend({
    show: function show() {
      return ot(this, !0);
    },
    hide: function hide() {
      return ot(this);
    },
    toggle: function toggle(t) {
      return "boolean" == typeof t ? t ? this.show() : this.hide() : this.each(function () {
        J(this) ? y(this).show() : y(this).hide();
      });
    }
  });
  var rt = /^(?:checkbox|radio)$/i,
      st = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i,
      at = /^$|\/(?:java|ecma)script/i,
      lt = {
    option: [1, "<select multiple='multiple'>", "</select>"],
    thead: [1, "<table>", "</table>"],
    col: [2, "<table><colgroup>", "</colgroup></table>"],
    tr: [2, "<table><tbody>", "</tbody></table>"],
    td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
    _default: [0, "", ""]
  };

  function ct(t, e) {
    var n = void 0 !== t.getElementsByTagName ? t.getElementsByTagName(e || "*") : void 0 !== t.querySelectorAll ? t.querySelectorAll(e || "*") : [];
    return void 0 === e || e && y.nodeName(t, e) ? y.merge([t], n) : n;
  }

  function ut(t, e) {
    for (var n = 0, i = t.length; i > n; n++) {
      U.set(t[n], "globalEval", !e || U.get(e[n], "globalEval"));
    }
  }

  lt.optgroup = lt.option, lt.tbody = lt.tfoot = lt.colgroup = lt.caption = lt.thead, lt.th = lt.td;
  var dt = /<|&#?\w+;/;

  function pt(t, e, n, i, o) {
    for (var r, s, a, l, c, u, d = e.createDocumentFragment(), p = [], f = 0, h = t.length; h > f; f++) {
      if ((r = t[f]) || 0 === r) if ("object" === y.type(r)) y.merge(p, r.nodeType ? [r] : r);else if (dt.test(r)) {
        for (s = s || d.appendChild(e.createElement("div")), a = (st.exec(r) || ["", ""])[1].toLowerCase(), l = lt[a] || lt._default, s.innerHTML = l[1] + y.htmlPrefilter(r) + l[2], u = l[0]; u--;) {
          s = s.lastChild;
        }

        y.merge(p, s.childNodes), (s = d.firstChild).textContent = "";
      } else p.push(e.createTextNode(r));
    }

    for (d.textContent = "", f = 0; r = p[f++];) {
      if (i && y.inArray(r, i) > -1) o && o.push(r);else if (c = y.contains(r.ownerDocument, r), s = ct(d.appendChild(r), "script"), c && ut(s), n) for (u = 0; r = s[u++];) {
        at.test(r.type || "") && n.push(r);
      }
    }

    return d;
  }

  !function () {
    var t = i.createDocumentFragment().appendChild(i.createElement("div")),
        e = i.createElement("input");
    e.setAttribute("type", "radio"), e.setAttribute("checked", "checked"), e.setAttribute("name", "t"), t.appendChild(e), h.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked, t.innerHTML = "<textarea>x</textarea>", h.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue;
  }();
  var ft = i.documentElement,
      ht = /^key/,
      mt = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
      gt = /^([^.]*)(?:\.(.+)|)/;

  function yt() {
    return !0;
  }

  function vt() {
    return !1;
  }

  function bt() {
    try {
      return i.activeElement;
    } catch (t) {}
  }

  function wt(t, e, n, i, o, r) {
    var s, a;

    if ("object" == _typeof(e)) {
      for (a in "string" != typeof n && (i = i || n, n = void 0), e) {
        wt(t, a, n, i, e[a], r);
      }

      return t;
    }

    if (null == i && null == o ? (o = n, i = n = void 0) : null == o && ("string" == typeof n ? (o = i, i = void 0) : (o = i, i = n, n = void 0)), !1 === o) o = vt;else if (!o) return t;
    return 1 === r && (s = o, (o = function o(t) {
      return y().off(t), s.apply(this, arguments);
    }).guid = s.guid || (s.guid = y.guid++)), t.each(function () {
      y.event.add(this, e, o, i, n);
    });
  }

  y.event = {
    global: {},
    add: function add(t, e, n, i, o) {
      var r,
          s,
          a,
          l,
          c,
          u,
          d,
          p,
          f,
          h,
          m,
          g = U.get(t);
      if (g) for (n.handler && (n = (r = n).handler, o = r.selector), o && y.find.matchesSelector(ft, o), n.guid || (n.guid = y.guid++), (l = g.events) || (l = g.events = {}), (s = g.handle) || (s = g.handle = function (e) {
        return void 0 !== y && y.event.triggered !== e.type ? y.event.dispatch.apply(t, arguments) : void 0;
      }), c = (e = (e || "").match(M) || [""]).length; c--;) {
        f = m = (a = gt.exec(e[c]) || [])[1], h = (a[2] || "").split(".").sort(), f && (d = y.event.special[f] || {}, f = (o ? d.delegateType : d.bindType) || f, d = y.event.special[f] || {}, u = y.extend({
          type: f,
          origType: m,
          data: i,
          handler: n,
          guid: n.guid,
          selector: o,
          needsContext: o && y.expr.match.needsContext.test(o),
          namespace: h.join(".")
        }, r), (p = l[f]) || ((p = l[f] = []).delegateCount = 0, d.setup && !1 !== d.setup.call(t, i, h, s) || t.addEventListener && t.addEventListener(f, s)), d.add && (d.add.call(t, u), u.handler.guid || (u.handler.guid = n.guid)), o ? p.splice(p.delegateCount++, 0, u) : p.push(u), y.event.global[f] = !0);
      }
    },
    remove: function remove(t, e, n, i, o) {
      var r,
          s,
          a,
          l,
          c,
          u,
          d,
          p,
          f,
          h,
          m,
          g = U.hasData(t) && U.get(t);

      if (g && (l = g.events)) {
        for (c = (e = (e || "").match(M) || [""]).length; c--;) {
          if (f = m = (a = gt.exec(e[c]) || [])[1], h = (a[2] || "").split(".").sort(), f) {
            for (d = y.event.special[f] || {}, p = l[f = (i ? d.delegateType : d.bindType) || f] || [], a = a[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), s = r = p.length; r--;) {
              u = p[r], !o && m !== u.origType || n && n.guid !== u.guid || a && !a.test(u.namespace) || i && i !== u.selector && ("**" !== i || !u.selector) || (p.splice(r, 1), u.selector && p.delegateCount--, d.remove && d.remove.call(t, u));
            }

            s && !p.length && (d.teardown && !1 !== d.teardown.call(t, h, g.handle) || y.removeEvent(t, f, g.handle), delete l[f]);
          } else for (f in l) {
            y.event.remove(t, f + e[c], n, i, !0);
          }
        }

        y.isEmptyObject(l) && U.remove(t, "handle events");
      }
    },
    dispatch: function dispatch(t) {
      var e,
          n,
          i,
          o,
          r,
          s,
          a = y.event.fix(t),
          l = new Array(arguments.length),
          c = (U.get(this, "events") || {})[a.type] || [],
          u = y.event.special[a.type] || {};

      for (l[0] = a, e = 1; e < arguments.length; e++) {
        l[e] = arguments[e];
      }

      if (a.delegateTarget = this, !u.preDispatch || !1 !== u.preDispatch.call(this, a)) {
        for (s = y.event.handlers.call(this, a, c), e = 0; (o = s[e++]) && !a.isPropagationStopped();) {
          for (a.currentTarget = o.elem, n = 0; (r = o.handlers[n++]) && !a.isImmediatePropagationStopped();) {
            a.rnamespace && !a.rnamespace.test(r.namespace) || (a.handleObj = r, a.data = r.data, void 0 !== (i = ((y.event.special[r.origType] || {}).handle || r.handler).apply(o.elem, l)) && !1 === (a.result = i) && (a.preventDefault(), a.stopPropagation()));
          }
        }

        return u.postDispatch && u.postDispatch.call(this, a), a.result;
      }
    },
    handlers: function handlers(t, e) {
      var n,
          i,
          o,
          r,
          s = [],
          a = e.delegateCount,
          l = t.target;
      if (a && l.nodeType && ("click" !== t.type || isNaN(t.button) || t.button < 1)) for (; l !== this; l = l.parentNode || this) {
        if (1 === l.nodeType && (!0 !== l.disabled || "click" !== t.type)) {
          for (i = [], n = 0; a > n; n++) {
            void 0 === i[o = (r = e[n]).selector + " "] && (i[o] = r.needsContext ? y(o, this).index(l) > -1 : y.find(o, this, null, [l]).length), i[o] && i.push(r);
          }

          i.length && s.push({
            elem: l,
            handlers: i
          });
        }
      }
      return a < e.length && s.push({
        elem: this,
        handlers: e.slice(a)
      }), s;
    },
    addProp: function addProp(t, e) {
      Object.defineProperty(y.Event.prototype, t, {
        enumerable: !0,
        configurable: !0,
        get: y.isFunction(e) ? function () {
          return this.originalEvent ? e(this.originalEvent) : void 0;
        } : function () {
          return this.originalEvent ? this.originalEvent[t] : void 0;
        },
        set: function set(e) {
          Object.defineProperty(this, t, {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: e
          });
        }
      });
    },
    fix: function fix(t) {
      return t[y.expando] ? t : new y.Event(t);
    },
    special: {
      load: {
        noBubble: !0
      },
      focus: {
        trigger: function trigger() {
          return this !== bt() && this.focus ? (this.focus(), !1) : void 0;
        },
        delegateType: "focusin"
      },
      blur: {
        trigger: function trigger() {
          return this === bt() && this.blur ? (this.blur(), !1) : void 0;
        },
        delegateType: "focusout"
      },
      click: {
        trigger: function trigger() {
          return "checkbox" === this.type && this.click && y.nodeName(this, "input") ? (this.click(), !1) : void 0;
        },
        _default: function _default(t) {
          return y.nodeName(t.target, "a");
        }
      },
      beforeunload: {
        postDispatch: function postDispatch(t) {
          void 0 !== t.result && t.originalEvent && (t.originalEvent.returnValue = t.result);
        }
      }
    }
  }, y.removeEvent = function (t, e, n) {
    t.removeEventListener && t.removeEventListener(e, n);
  }, y.Event = function (t, e) {
    return this instanceof y.Event ? (t && t.type ? (this.originalEvent = t, this.type = t.type, this.isDefaultPrevented = t.defaultPrevented || void 0 === t.defaultPrevented && !1 === t.returnValue ? yt : vt, this.target = t.target && 3 === t.target.nodeType ? t.target.parentNode : t.target, this.currentTarget = t.currentTarget, this.relatedTarget = t.relatedTarget) : this.type = t, e && y.extend(this, e), this.timeStamp = t && t.timeStamp || y.now(), void (this[y.expando] = !0)) : new y.Event(t, e);
  }, y.Event.prototype = {
    constructor: y.Event,
    isDefaultPrevented: vt,
    isPropagationStopped: vt,
    isImmediatePropagationStopped: vt,
    isSimulated: !1,
    preventDefault: function preventDefault() {
      var t = this.originalEvent;
      this.isDefaultPrevented = yt, t && !this.isSimulated && t.preventDefault();
    },
    stopPropagation: function stopPropagation() {
      var t = this.originalEvent;
      this.isPropagationStopped = yt, t && !this.isSimulated && t.stopPropagation();
    },
    stopImmediatePropagation: function stopImmediatePropagation() {
      var t = this.originalEvent;
      this.isImmediatePropagationStopped = yt, t && !this.isSimulated && t.stopImmediatePropagation(), this.stopPropagation();
    }
  }, y.each({
    altKey: !0,
    bubbles: !0,
    cancelable: !0,
    changedTouches: !0,
    ctrlKey: !0,
    detail: !0,
    eventPhase: !0,
    metaKey: !0,
    pageX: !0,
    pageY: !0,
    shiftKey: !0,
    view: !0,
    char: !0,
    charCode: !0,
    key: !0,
    keyCode: !0,
    button: !0,
    buttons: !0,
    clientX: !0,
    clientY: !0,
    offsetX: !0,
    offsetY: !0,
    pointerId: !0,
    pointerType: !0,
    screenX: !0,
    screenY: !0,
    targetTouches: !0,
    toElement: !0,
    touches: !0,
    which: function which(t) {
      var e = t.button;
      return null == t.which && ht.test(t.type) ? null != t.charCode ? t.charCode : t.keyCode : !t.which && void 0 !== e && mt.test(t.type) ? 1 & e ? 1 : 2 & e ? 3 : 4 & e ? 2 : 0 : t.which;
    }
  }, y.event.addProp), y.each({
    mouseenter: "mouseover",
    mouseleave: "mouseout",
    pointerenter: "pointerover",
    pointerleave: "pointerout"
  }, function (t, e) {
    y.event.special[t] = {
      delegateType: e,
      bindType: e,
      handle: function handle(t) {
        var n,
            i = this,
            o = t.relatedTarget,
            r = t.handleObj;
        return o && (o === i || y.contains(i, o)) || (t.type = r.origType, n = r.handler.apply(this, arguments), t.type = e), n;
      }
    };
  }), y.fn.extend({
    on: function on(t, e, n, i) {
      return wt(this, t, e, n, i);
    },
    one: function one(t, e, n, i) {
      return wt(this, t, e, n, i, 1);
    },
    off: function off(t, e, n) {
      var i, o;
      if (t && t.preventDefault && t.handleObj) return i = t.handleObj, y(t.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this;

      if ("object" == _typeof(t)) {
        for (o in t) {
          this.off(o, e, t[o]);
        }

        return this;
      }

      return !1 !== e && "function" != typeof e || (n = e, e = void 0), !1 === n && (n = vt), this.each(function () {
        y.event.remove(this, t, n, e);
      });
    }
  });
  var xt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
      Ct = /<script|<style|<link/i,
      St = /checked\s*(?:[^=]|=\s*.checked.)/i,
      Tt = /^true\/(.*)/,
      kt = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

  function At(t, e) {
    return y.nodeName(t, "table") && y.nodeName(11 !== e.nodeType ? e : e.firstChild, "tr") && t.getElementsByTagName("tbody")[0] || t;
  }

  function Et(t) {
    return t.type = (null !== t.getAttribute("type")) + "/" + t.type, t;
  }

  function Dt(t) {
    var e = Tt.exec(t.type);
    return e ? t.type = e[1] : t.removeAttribute("type"), t;
  }

  function Ot(t, e) {
    var n, i, o, r, s, a, l, c;

    if (1 === e.nodeType) {
      if (U.hasData(t) && (r = U.access(t), s = U.set(e, r), c = r.events)) for (o in delete s.handle, s.events = {}, c) {
        for (n = 0, i = c[o].length; i > n; n++) {
          y.event.add(e, o, c[o][n]);
        }
      }
      G.hasData(t) && (a = G.access(t), l = y.extend({}, a), G.set(e, l));
    }
  }

  function It(t, e) {
    var n = e.nodeName.toLowerCase();
    "input" === n && rt.test(t.type) ? e.checked = t.checked : "input" !== n && "textarea" !== n || (e.defaultValue = t.defaultValue);
  }

  function Nt(t, e, n, i) {
    e = s.apply([], e);
    var o,
        r,
        a,
        l,
        c,
        u,
        d = 0,
        p = t.length,
        f = p - 1,
        g = e[0],
        v = y.isFunction(g);
    if (v || p > 1 && "string" == typeof g && !h.checkClone && St.test(g)) return t.each(function (o) {
      var r = t.eq(o);
      v && (e[0] = g.call(this, o, r.html())), Nt(r, e, n, i);
    });

    if (p && (r = (o = pt(e, t[0].ownerDocument, !1, t, i)).firstChild, 1 === o.childNodes.length && (o = r), r || i)) {
      for (l = (a = y.map(ct(o, "script"), Et)).length; p > d; d++) {
        c = o, d !== f && (c = y.clone(c, !0, !0), l && y.merge(a, ct(c, "script"))), n.call(t[d], c, d);
      }

      if (l) for (u = a[a.length - 1].ownerDocument, y.map(a, Dt), d = 0; l > d; d++) {
        c = a[d], at.test(c.type || "") && !U.access(c, "globalEval") && y.contains(u, c) && (c.src ? y._evalUrl && y._evalUrl(c.src) : m(c.textContent.replace(kt, ""), u));
      }
    }

    return t;
  }

  function Pt(t, e, n) {
    for (var i, o = e ? y.filter(e, t) : t, r = 0; null != (i = o[r]); r++) {
      n || 1 !== i.nodeType || y.cleanData(ct(i)), i.parentNode && (n && y.contains(i.ownerDocument, i) && ut(ct(i, "script")), i.parentNode.removeChild(i));
    }

    return t;
  }

  y.extend({
    htmlPrefilter: function htmlPrefilter(t) {
      return t.replace(xt, "<$1></$2>");
    },
    clone: function clone(t, e, n) {
      var i,
          o,
          r,
          s,
          a = t.cloneNode(!0),
          l = y.contains(t.ownerDocument, t);
      if (!(h.noCloneChecked || 1 !== t.nodeType && 11 !== t.nodeType || y.isXMLDoc(t))) for (s = ct(a), i = 0, o = (r = ct(t)).length; o > i; i++) {
        It(r[i], s[i]);
      }
      if (e) if (n) for (r = r || ct(t), s = s || ct(a), i = 0, o = r.length; o > i; i++) {
        Ot(r[i], s[i]);
      } else Ot(t, a);
      return (s = ct(a, "script")).length > 0 && ut(s, !l && ct(t, "script")), a;
    },
    cleanData: function cleanData(t) {
      for (var e, n, i, o = y.event.special, r = 0; void 0 !== (n = t[r]); r++) {
        if (W(n)) {
          if (e = n[U.expando]) {
            if (e.events) for (i in e.events) {
              o[i] ? y.event.remove(n, i) : y.removeEvent(n, i, e.handle);
            }
            n[U.expando] = void 0;
          }

          n[G.expando] && (n[G.expando] = void 0);
        }
      }
    }
  }), y.fn.extend({
    detach: function detach(t) {
      return Pt(this, t, !0);
    },
    remove: function remove(t) {
      return Pt(this, t);
    },
    text: function text(t) {
      return _(this, function (t) {
        return void 0 === t ? y.text(this) : this.empty().each(function () {
          1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = t);
        });
      }, null, t, arguments.length);
    },
    append: function append() {
      return Nt(this, arguments, function (t) {
        1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || At(this, t).appendChild(t);
      });
    },
    prepend: function prepend() {
      return Nt(this, arguments, function (t) {
        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
          var e = At(this, t);
          e.insertBefore(t, e.firstChild);
        }
      });
    },
    before: function before() {
      return Nt(this, arguments, function (t) {
        this.parentNode && this.parentNode.insertBefore(t, this);
      });
    },
    after: function after() {
      return Nt(this, arguments, function (t) {
        this.parentNode && this.parentNode.insertBefore(t, this.nextSibling);
      });
    },
    empty: function empty() {
      for (var t, e = 0; null != (t = this[e]); e++) {
        1 === t.nodeType && (y.cleanData(ct(t, !1)), t.textContent = "");
      }

      return this;
    },
    clone: function clone(t, e) {
      return t = null != t && t, e = null == e ? t : e, this.map(function () {
        return y.clone(this, t, e);
      });
    },
    html: function html(t) {
      return _(this, function (t) {
        var e = this[0] || {},
            n = 0,
            i = this.length;
        if (void 0 === t && 1 === e.nodeType) return e.innerHTML;

        if ("string" == typeof t && !Ct.test(t) && !lt[(st.exec(t) || ["", ""])[1].toLowerCase()]) {
          t = y.htmlPrefilter(t);

          try {
            for (; i > n; n++) {
              1 === (e = this[n] || {}).nodeType && (y.cleanData(ct(e, !1)), e.innerHTML = t);
            }

            e = 0;
          } catch (t) {}
        }

        e && this.empty().append(t);
      }, null, t, arguments.length);
    },
    replaceWith: function replaceWith() {
      var t = [];
      return Nt(this, arguments, function (e) {
        var n = this.parentNode;
        y.inArray(this, t) < 0 && (y.cleanData(ct(this)), n && n.replaceChild(e, this));
      }, t);
    }
  }), y.each({
    appendTo: "append",
    prependTo: "prepend",
    insertBefore: "before",
    insertAfter: "after",
    replaceAll: "replaceWith"
  }, function (t, e) {
    y.fn[t] = function (t) {
      for (var n, i = [], o = y(t), r = o.length - 1, s = 0; r >= s; s++) {
        n = s === r ? this : this.clone(!0), y(o[s])[e](n), a.apply(i, n.get());
      }

      return this.pushStack(i);
    };
  });

  var $t = /^margin/,
      Rt = new RegExp("^(" + K + ")(?!px)[a-z%]+$", "i"),
      Mt = function Mt(e) {
    var n = e.ownerDocument.defaultView;
    return n && n.opener || (n = t), n.getComputedStyle(e);
  };

  function Ft(t, e, n) {
    var i,
        o,
        r,
        s,
        a = t.style;
    return (n = n || Mt(t)) && ("" !== (s = n.getPropertyValue(e) || n[e]) || y.contains(t.ownerDocument, t) || (s = y.style(t, e)), !h.pixelMarginRight() && Rt.test(s) && $t.test(e) && (i = a.width, o = a.minWidth, r = a.maxWidth, a.minWidth = a.maxWidth = a.width = s, s = n.width, a.width = i, a.minWidth = o, a.maxWidth = r)), void 0 !== s ? s + "" : s;
  }

  function Lt(t, e) {
    return {
      get: function get() {
        return t() ? void delete this.get : (this.get = e).apply(this, arguments);
      }
    };
  }

  !function () {
    function e() {
      if (l) {
        l.style.cssText = "box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", l.innerHTML = "", ft.appendChild(a);
        var e = t.getComputedStyle(l);
        n = "1%" !== e.top, s = "2px" === e.marginLeft, o = "4px" === e.width, l.style.marginRight = "50%", r = "4px" === e.marginRight, ft.removeChild(a), l = null;
      }
    }

    var n,
        o,
        r,
        s,
        a = i.createElement("div"),
        l = i.createElement("div");
    l.style && (l.style.backgroundClip = "content-box", l.cloneNode(!0).style.backgroundClip = "", h.clearCloneStyle = "content-box" === l.style.backgroundClip, a.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", a.appendChild(l), y.extend(h, {
      pixelPosition: function pixelPosition() {
        return e(), n;
      },
      boxSizingReliable: function boxSizingReliable() {
        return e(), o;
      },
      pixelMarginRight: function pixelMarginRight() {
        return e(), r;
      },
      reliableMarginLeft: function reliableMarginLeft() {
        return e(), s;
      }
    }));
  }();
  var jt = /^(none|table(?!-c[ea]).+)/,
      Bt = {
    position: "absolute",
    visibility: "hidden",
    display: "block"
  },
      Ht = {
    letterSpacing: "0",
    fontWeight: "400"
  },
      qt = ["Webkit", "Moz", "ms"],
      _t = i.createElement("div").style;

  function Wt(t) {
    if (t in _t) return t;

    for (var e = t[0].toUpperCase() + t.slice(1), n = qt.length; n--;) {
      if ((t = qt[n] + e) in _t) return t;
    }
  }

  function zt(t, e, n) {
    var i = Q.exec(e);
    return i ? Math.max(0, i[2] - (n || 0)) + (i[3] || "px") : e;
  }

  function Ut(t, e, n, i, o) {
    for (var r = n === (i ? "border" : "content") ? 4 : "width" === e ? 1 : 0, s = 0; 4 > r; r += 2) {
      "margin" === n && (s += y.css(t, n + Z[r], !0, o)), i ? ("content" === n && (s -= y.css(t, "padding" + Z[r], !0, o)), "margin" !== n && (s -= y.css(t, "border" + Z[r] + "Width", !0, o))) : (s += y.css(t, "padding" + Z[r], !0, o), "padding" !== n && (s += y.css(t, "border" + Z[r] + "Width", !0, o)));
    }

    return s;
  }

  function Gt(t, e, n) {
    var i,
        o = !0,
        r = Mt(t),
        s = "border-box" === y.css(t, "boxSizing", !1, r);

    if (t.getClientRects().length && (i = t.getBoundingClientRect()[e]), 0 >= i || null == i) {
      if ((0 > (i = Ft(t, e, r)) || null == i) && (i = t.style[e]), Rt.test(i)) return i;
      o = s && (h.boxSizingReliable() || i === t.style[e]), i = parseFloat(i) || 0;
    }

    return i + Ut(t, e, n || (s ? "border" : "content"), o, r) + "px";
  }

  function Xt(t, e, n, i, o) {
    return new Xt.prototype.init(t, e, n, i, o);
  }

  y.extend({
    cssHooks: {
      opacity: {
        get: function get(t, e) {
          if (e) {
            var n = Ft(t, "opacity");
            return "" === n ? "1" : n;
          }
        }
      }
    },
    cssNumber: {
      animationIterationCount: !0,
      columnCount: !0,
      fillOpacity: !0,
      flexGrow: !0,
      flexShrink: !0,
      fontWeight: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0
    },
    cssProps: {
      float: "cssFloat"
    },
    style: function style(t, e, n, i) {
      if (t && 3 !== t.nodeType && 8 !== t.nodeType && t.style) {
        var o,
            r,
            s,
            a = y.camelCase(e),
            l = t.style;
        return e = y.cssProps[a] || (y.cssProps[a] = Wt(a) || a), s = y.cssHooks[e] || y.cssHooks[a], void 0 === n ? s && "get" in s && void 0 !== (o = s.get(t, !1, i)) ? o : l[e] : ("string" === (r = _typeof(n)) && (o = Q.exec(n)) && o[1] && (n = et(t, e, o), r = "number"), void (null != n && n == n && ("number" === r && (n += o && o[3] || (y.cssNumber[a] ? "" : "px")), h.clearCloneStyle || "" !== n || 0 !== e.indexOf("background") || (l[e] = "inherit"), s && "set" in s && void 0 === (n = s.set(t, n, i)) || (l[e] = n))));
      }
    },
    css: function css(t, e, n, i) {
      var o,
          r,
          s,
          a = y.camelCase(e);
      return e = y.cssProps[a] || (y.cssProps[a] = Wt(a) || a), (s = y.cssHooks[e] || y.cssHooks[a]) && "get" in s && (o = s.get(t, !0, n)), void 0 === o && (o = Ft(t, e, i)), "normal" === o && e in Ht && (o = Ht[e]), "" === n || n ? (r = parseFloat(o), !0 === n || isFinite(r) ? r || 0 : o) : o;
    }
  }), y.each(["height", "width"], function (t, e) {
    y.cssHooks[e] = {
      get: function get(t, n, i) {
        return n ? !jt.test(y.css(t, "display")) || t.getClientRects().length && t.getBoundingClientRect().width ? Gt(t, e, i) : tt(t, Bt, function () {
          return Gt(t, e, i);
        }) : void 0;
      },
      set: function set(t, n, i) {
        var o,
            r = i && Mt(t),
            s = i && Ut(t, e, i, "border-box" === y.css(t, "boxSizing", !1, r), r);
        return s && (o = Q.exec(n)) && "px" !== (o[3] || "px") && (t.style[e] = n, n = y.css(t, e)), zt(0, n, s);
      }
    };
  }), y.cssHooks.marginLeft = Lt(h.reliableMarginLeft, function (t, e) {
    return e ? (parseFloat(Ft(t, "marginLeft")) || t.getBoundingClientRect().left - tt(t, {
      marginLeft: 0
    }, function () {
      return t.getBoundingClientRect().left;
    })) + "px" : void 0;
  }), y.each({
    margin: "",
    padding: "",
    border: "Width"
  }, function (t, e) {
    y.cssHooks[t + e] = {
      expand: function expand(n) {
        for (var i = 0, o = {}, r = "string" == typeof n ? n.split(" ") : [n]; 4 > i; i++) {
          o[t + Z[i] + e] = r[i] || r[i - 2] || r[0];
        }

        return o;
      }
    }, $t.test(t) || (y.cssHooks[t + e].set = zt);
  }), y.fn.extend({
    css: function css(t, e) {
      return _(this, function (t, e, n) {
        var i,
            o,
            r = {},
            s = 0;

        if (y.isArray(e)) {
          for (i = Mt(t), o = e.length; o > s; s++) {
            r[e[s]] = y.css(t, e[s], !1, i);
          }

          return r;
        }

        return void 0 !== n ? y.style(t, e, n) : y.css(t, e);
      }, t, e, arguments.length > 1);
    }
  }), y.Tween = Xt, Xt.prototype = {
    constructor: Xt,
    init: function init(t, e, n, i, o, r) {
      this.elem = t, this.prop = n, this.easing = o || y.easing._default, this.options = e, this.start = this.now = this.cur(), this.end = i, this.unit = r || (y.cssNumber[n] ? "" : "px");
    },
    cur: function cur() {
      var t = Xt.propHooks[this.prop];
      return t && t.get ? t.get(this) : Xt.propHooks._default.get(this);
    },
    run: function run(t) {
      var e,
          n = Xt.propHooks[this.prop];
      return this.options.duration ? this.pos = e = y.easing[this.easing](t, this.options.duration * t, 0, 1, this.options.duration) : this.pos = e = t, this.now = (this.end - this.start) * e + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : Xt.propHooks._default.set(this), this;
    }
  }, Xt.prototype.init.prototype = Xt.prototype, Xt.propHooks = {
    _default: {
      get: function get(t) {
        var e;
        return 1 !== t.elem.nodeType || null != t.elem[t.prop] && null == t.elem.style[t.prop] ? t.elem[t.prop] : (e = y.css(t.elem, t.prop, "")) && "auto" !== e ? e : 0;
      },
      set: function set(t) {
        y.fx.step[t.prop] ? y.fx.step[t.prop](t) : 1 !== t.elem.nodeType || null == t.elem.style[y.cssProps[t.prop]] && !y.cssHooks[t.prop] ? t.elem[t.prop] = t.now : y.style(t.elem, t.prop, t.now + t.unit);
      }
    }
  }, Xt.propHooks.scrollTop = Xt.propHooks.scrollLeft = {
    set: function set(t) {
      t.elem.nodeType && t.elem.parentNode && (t.elem[t.prop] = t.now);
    }
  }, y.easing = {
    linear: function linear(t) {
      return t;
    },
    swing: function swing(t) {
      return .5 - Math.cos(t * Math.PI) / 2;
    },
    _default: "swing"
  }, y.fx = Xt.prototype.init, y.fx.step = {};
  var Yt,
      Vt,
      Kt = /^(?:toggle|show|hide)$/,
      Qt = /queueHooks$/;

  function Zt() {
    Vt && (t.requestAnimationFrame(Zt), y.fx.tick());
  }

  function Jt() {
    return t.setTimeout(function () {
      Yt = void 0;
    }), Yt = y.now();
  }

  function te(t, e) {
    var n,
        i = 0,
        o = {
      height: t
    };

    for (e = e ? 1 : 0; 4 > i; i += 2 - e) {
      o["margin" + (n = Z[i])] = o["padding" + n] = t;
    }

    return e && (o.opacity = o.width = t), o;
  }

  function ee(t, e, n) {
    for (var i, o = (ne.tweeners[e] || []).concat(ne.tweeners["*"]), r = 0, s = o.length; s > r; r++) {
      if (i = o[r].call(n, e, t)) return i;
    }
  }

  function ne(t, e, n) {
    var i,
        o,
        r = 0,
        s = ne.prefilters.length,
        a = y.Deferred().always(function () {
      delete l.elem;
    }),
        l = function l() {
      if (o) return !1;

      for (var e = Yt || Jt(), n = Math.max(0, c.startTime + c.duration - e), i = 1 - (n / c.duration || 0), r = 0, s = c.tweens.length; s > r; r++) {
        c.tweens[r].run(i);
      }

      return a.notifyWith(t, [c, i, n]), 1 > i && s ? n : (a.resolveWith(t, [c]), !1);
    },
        c = a.promise({
      elem: t,
      props: y.extend({}, e),
      opts: y.extend(!0, {
        specialEasing: {},
        easing: y.easing._default
      }, n),
      originalProperties: e,
      originalOptions: n,
      startTime: Yt || Jt(),
      duration: n.duration,
      tweens: [],
      createTween: function createTween(e, n) {
        var i = y.Tween(t, c.opts, e, n, c.opts.specialEasing[e] || c.opts.easing);
        return c.tweens.push(i), i;
      },
      stop: function stop(e) {
        var n = 0,
            i = e ? c.tweens.length : 0;
        if (o) return this;

        for (o = !0; i > n; n++) {
          c.tweens[n].run(1);
        }

        return e ? (a.notifyWith(t, [c, 1, 0]), a.resolveWith(t, [c, e])) : a.rejectWith(t, [c, e]), this;
      }
    }),
        u = c.props;

    for (function (t, e) {
      var n, i, o, r, s;

      for (n in t) {
        if (o = e[i = y.camelCase(n)], r = t[n], y.isArray(r) && (o = r[1], r = t[n] = r[0]), n !== i && (t[i] = r, delete t[n]), (s = y.cssHooks[i]) && ("expand" in s)) for (n in r = s.expand(r), delete t[i], r) {
          (n in t) || (t[n] = r[n], e[n] = o);
        } else e[i] = o;
      }
    }(u, c.opts.specialEasing); s > r; r++) {
      if (i = ne.prefilters[r].call(c, t, u, c.opts)) return y.isFunction(i.stop) && (y._queueHooks(c.elem, c.opts.queue).stop = y.proxy(i.stop, i)), i;
    }

    return y.map(u, ee, c), y.isFunction(c.opts.start) && c.opts.start.call(t, c), y.fx.timer(y.extend(l, {
      elem: t,
      anim: c,
      queue: c.opts.queue
    })), c.progress(c.opts.progress).done(c.opts.done, c.opts.complete).fail(c.opts.fail).always(c.opts.always);
  }

  y.Animation = y.extend(ne, {
    tweeners: {
      "*": [function (t, e) {
        var n = this.createTween(t, e);
        return et(n.elem, t, Q.exec(e), n), n;
      }]
    },
    tweener: function tweener(t, e) {
      y.isFunction(t) ? (e = t, t = ["*"]) : t = t.match(M);

      for (var n, i = 0, o = t.length; o > i; i++) {
        n = t[i], ne.tweeners[n] = ne.tweeners[n] || [], ne.tweeners[n].unshift(e);
      }
    },
    prefilters: [function (t, e, n) {
      var i,
          o,
          r,
          s,
          a,
          l,
          c,
          u,
          d = "width" in e || "height" in e,
          p = this,
          f = {},
          h = t.style,
          m = t.nodeType && J(t),
          g = U.get(t, "fxshow");

      for (i in n.queue || (null == (s = y._queueHooks(t, "fx")).unqueued && (s.unqueued = 0, a = s.empty.fire, s.empty.fire = function () {
        s.unqueued || a();
      }), s.unqueued++, p.always(function () {
        p.always(function () {
          s.unqueued--, y.queue(t, "fx").length || s.empty.fire();
        });
      })), e) {
        if (o = e[i], Kt.test(o)) {
          if (delete e[i], r = r || "toggle" === o, o === (m ? "hide" : "show")) {
            if ("show" !== o || !g || void 0 === g[i]) continue;
            m = !0;
          }

          f[i] = g && g[i] || y.style(t, i);
        }
      }

      if ((l = !y.isEmptyObject(e)) || !y.isEmptyObject(f)) for (i in d && 1 === t.nodeType && (n.overflow = [h.overflow, h.overflowX, h.overflowY], null == (c = g && g.display) && (c = U.get(t, "display")), "none" === (u = y.css(t, "display")) && (c ? u = c : (ot([t], !0), c = t.style.display || c, u = y.css(t, "display"), ot([t]))), ("inline" === u || "inline-block" === u && null != c) && "none" === y.css(t, "float") && (l || (p.done(function () {
        h.display = c;
      }), null == c && (u = h.display, c = "none" === u ? "" : u)), h.display = "inline-block")), n.overflow && (h.overflow = "hidden", p.always(function () {
        h.overflow = n.overflow[0], h.overflowX = n.overflow[1], h.overflowY = n.overflow[2];
      })), l = !1, f) {
        l || (g ? "hidden" in g && (m = g.hidden) : g = U.access(t, "fxshow", {
          display: c
        }), r && (g.hidden = !m), m && ot([t], !0), p.done(function () {
          for (i in m || ot([t]), U.remove(t, "fxshow"), f) {
            y.style(t, i, f[i]);
          }
        })), l = ee(m ? g[i] : 0, i, p), i in g || (g[i] = l.start, m && (l.end = l.start, l.start = 0));
      }
    }],
    prefilter: function prefilter(t, e) {
      e ? ne.prefilters.unshift(t) : ne.prefilters.push(t);
    }
  }), y.speed = function (t, e, n) {
    var o = t && "object" == _typeof(t) ? y.extend({}, t) : {
      complete: n || !n && e || y.isFunction(t) && t,
      duration: t,
      easing: n && e || e && !y.isFunction(e) && e
    };
    return y.fx.off || i.hidden ? o.duration = 0 : o.duration = "number" == typeof o.duration ? o.duration : o.duration in y.fx.speeds ? y.fx.speeds[o.duration] : y.fx.speeds._default, null != o.queue && !0 !== o.queue || (o.queue = "fx"), o.old = o.complete, o.complete = function () {
      y.isFunction(o.old) && o.old.call(this), o.queue && y.dequeue(this, o.queue);
    }, o;
  }, y.fn.extend({
    fadeTo: function fadeTo(t, e, n, i) {
      return this.filter(J).css("opacity", 0).show().end().animate({
        opacity: e
      }, t, n, i);
    },
    animate: function animate(t, e, n, i) {
      var o = y.isEmptyObject(t),
          r = y.speed(e, n, i),
          s = function s() {
        var e = ne(this, y.extend({}, t), r);
        (o || U.get(this, "finish")) && e.stop(!0);
      };

      return s.finish = s, o || !1 === r.queue ? this.each(s) : this.queue(r.queue, s);
    },
    stop: function stop(t, e, n) {
      var i = function i(t) {
        var e = t.stop;
        delete t.stop, e(n);
      };

      return "string" != typeof t && (n = e, e = t, t = void 0), e && !1 !== t && this.queue(t || "fx", []), this.each(function () {
        var e = !0,
            o = null != t && t + "queueHooks",
            r = y.timers,
            s = U.get(this);
        if (o) s[o] && s[o].stop && i(s[o]);else for (o in s) {
          s[o] && s[o].stop && Qt.test(o) && i(s[o]);
        }

        for (o = r.length; o--;) {
          r[o].elem !== this || null != t && r[o].queue !== t || (r[o].anim.stop(n), e = !1, r.splice(o, 1));
        }

        !e && n || y.dequeue(this, t);
      });
    },
    finish: function finish(t) {
      return !1 !== t && (t = t || "fx"), this.each(function () {
        var e,
            n = U.get(this),
            i = n[t + "queue"],
            o = n[t + "queueHooks"],
            r = y.timers,
            s = i ? i.length : 0;

        for (n.finish = !0, y.queue(this, t, []), o && o.stop && o.stop.call(this, !0), e = r.length; e--;) {
          r[e].elem === this && r[e].queue === t && (r[e].anim.stop(!0), r.splice(e, 1));
        }

        for (e = 0; s > e; e++) {
          i[e] && i[e].finish && i[e].finish.call(this);
        }

        delete n.finish;
      });
    }
  }), y.each(["toggle", "show", "hide"], function (t, e) {
    var n = y.fn[e];

    y.fn[e] = function (t, i, o) {
      return null == t || "boolean" == typeof t ? n.apply(this, arguments) : this.animate(te(e, !0), t, i, o);
    };
  }), y.each({
    slideDown: te("show"),
    slideUp: te("hide"),
    slideToggle: te("toggle"),
    fadeIn: {
      opacity: "show"
    },
    fadeOut: {
      opacity: "hide"
    },
    fadeToggle: {
      opacity: "toggle"
    }
  }, function (t, e) {
    y.fn[t] = function (t, n, i) {
      return this.animate(e, t, n, i);
    };
  }), y.timers = [], y.fx.tick = function () {
    var t,
        e = 0,
        n = y.timers;

    for (Yt = y.now(); e < n.length; e++) {
      (t = n[e])() || n[e] !== t || n.splice(e--, 1);
    }

    n.length || y.fx.stop(), Yt = void 0;
  }, y.fx.timer = function (t) {
    y.timers.push(t), t() ? y.fx.start() : y.timers.pop();
  }, y.fx.interval = 13, y.fx.start = function () {
    Vt || (Vt = t.requestAnimationFrame ? t.requestAnimationFrame(Zt) : t.setInterval(y.fx.tick, y.fx.interval));
  }, y.fx.stop = function () {
    t.cancelAnimationFrame ? t.cancelAnimationFrame(Vt) : t.clearInterval(Vt), Vt = null;
  }, y.fx.speeds = {
    slow: 600,
    fast: 200,
    _default: 400
  }, y.fn.delay = function (e, n) {
    return e = y.fx && y.fx.speeds[e] || e, n = n || "fx", this.queue(n, function (n, i) {
      var o = t.setTimeout(n, e);

      i.stop = function () {
        t.clearTimeout(o);
      };
    });
  }, function () {
    var t = i.createElement("input"),
        e = i.createElement("select").appendChild(i.createElement("option"));
    t.type = "checkbox", h.checkOn = "" !== t.value, h.optSelected = e.selected, (t = i.createElement("input")).value = "t", t.type = "radio", h.radioValue = "t" === t.value;
  }();
  var ie,
      oe = y.expr.attrHandle;
  y.fn.extend({
    attr: function attr(t, e) {
      return _(this, y.attr, t, e, arguments.length > 1);
    },
    removeAttr: function removeAttr(t) {
      return this.each(function () {
        y.removeAttr(this, t);
      });
    }
  }), y.extend({
    attr: function attr(t, e, n) {
      var i,
          o,
          r = t.nodeType;
      if (3 !== r && 8 !== r && 2 !== r) return void 0 === t.getAttribute ? y.prop(t, e, n) : (1 === r && y.isXMLDoc(t) || (o = y.attrHooks[e.toLowerCase()] || (y.expr.match.bool.test(e) ? ie : void 0)), void 0 !== n ? null === n ? void y.removeAttr(t, e) : o && "set" in o && void 0 !== (i = o.set(t, n, e)) ? i : (t.setAttribute(e, n + ""), n) : o && "get" in o && null !== (i = o.get(t, e)) ? i : null == (i = y.find.attr(t, e)) ? void 0 : i);
    },
    attrHooks: {
      type: {
        set: function set(t, e) {
          if (!h.radioValue && "radio" === e && y.nodeName(t, "input")) {
            var n = t.value;
            return t.setAttribute("type", e), n && (t.value = n), e;
          }
        }
      }
    },
    removeAttr: function removeAttr(t, e) {
      var n,
          i = 0,
          o = e && e.match(M);
      if (o && 1 === t.nodeType) for (; n = o[i++];) {
        t.removeAttribute(n);
      }
    }
  }), ie = {
    set: function set(t, e, n) {
      return !1 === e ? y.removeAttr(t, n) : t.setAttribute(n, n), n;
    }
  }, y.each(y.expr.match.bool.source.match(/\w+/g), function (t, e) {
    var n = oe[e] || y.find.attr;

    oe[e] = function (t, e, i) {
      var o,
          r,
          s = e.toLowerCase();
      return i || (r = oe[s], oe[s] = o, o = null != n(t, e, i) ? s : null, oe[s] = r), o;
    };
  });
  var re = /^(?:input|select|textarea|button)$/i,
      se = /^(?:a|area)$/i;
  y.fn.extend({
    prop: function prop(t, e) {
      return _(this, y.prop, t, e, arguments.length > 1);
    },
    removeProp: function removeProp(t) {
      return this.each(function () {
        delete this[y.propFix[t] || t];
      });
    }
  }), y.extend({
    prop: function prop(t, e, n) {
      var i,
          o,
          r = t.nodeType;
      if (3 !== r && 8 !== r && 2 !== r) return 1 === r && y.isXMLDoc(t) || (e = y.propFix[e] || e, o = y.propHooks[e]), void 0 !== n ? o && "set" in o && void 0 !== (i = o.set(t, n, e)) ? i : t[e] = n : o && "get" in o && null !== (i = o.get(t, e)) ? i : t[e];
    },
    propHooks: {
      tabIndex: {
        get: function get(t) {
          var e = y.find.attr(t, "tabindex");
          return e ? parseInt(e, 10) : re.test(t.nodeName) || se.test(t.nodeName) && t.href ? 0 : -1;
        }
      }
    },
    propFix: {
      for: "htmlFor",
      class: "className"
    }
  }), h.optSelected || (y.propHooks.selected = {
    get: function get(t) {
      var e = t.parentNode;
      return e && e.parentNode && e.parentNode.selectedIndex, null;
    },
    set: function set(t) {
      var e = t.parentNode;
      e && (e.selectedIndex, e.parentNode && e.parentNode.selectedIndex);
    }
  }), y.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
    y.propFix[this.toLowerCase()] = this;
  });
  var ae = /[\t\r\n\f]/g;

  function le(t) {
    return t.getAttribute && t.getAttribute("class") || "";
  }

  y.fn.extend({
    addClass: function addClass(t) {
      var e,
          n,
          i,
          o,
          r,
          s,
          a,
          l = 0;
      if (y.isFunction(t)) return this.each(function (e) {
        y(this).addClass(t.call(this, e, le(this)));
      });
      if ("string" == typeof t && t) for (e = t.match(M) || []; n = this[l++];) {
        if (o = le(n), i = 1 === n.nodeType && (" " + o + " ").replace(ae, " ")) {
          for (s = 0; r = e[s++];) {
            i.indexOf(" " + r + " ") < 0 && (i += r + " ");
          }

          o !== (a = y.trim(i)) && n.setAttribute("class", a);
        }
      }
      return this;
    },
    removeClass: function removeClass(t) {
      var e,
          n,
          i,
          o,
          r,
          s,
          a,
          l = 0;
      if (y.isFunction(t)) return this.each(function (e) {
        y(this).removeClass(t.call(this, e, le(this)));
      });
      if (!arguments.length) return this.attr("class", "");
      if ("string" == typeof t && t) for (e = t.match(M) || []; n = this[l++];) {
        if (o = le(n), i = 1 === n.nodeType && (" " + o + " ").replace(ae, " ")) {
          for (s = 0; r = e[s++];) {
            for (; i.indexOf(" " + r + " ") > -1;) {
              i = i.replace(" " + r + " ", " ");
            }
          }

          o !== (a = y.trim(i)) && n.setAttribute("class", a);
        }
      }
      return this;
    },
    toggleClass: function toggleClass(t, e) {
      var n = _typeof(t);

      return "boolean" == typeof e && "string" === n ? e ? this.addClass(t) : this.removeClass(t) : y.isFunction(t) ? this.each(function (n) {
        y(this).toggleClass(t.call(this, n, le(this), e), e);
      }) : this.each(function () {
        var e, i, o, r;
        if ("string" === n) for (i = 0, o = y(this), r = t.match(M) || []; e = r[i++];) {
          o.hasClass(e) ? o.removeClass(e) : o.addClass(e);
        } else void 0 !== t && "boolean" !== n || ((e = le(this)) && U.set(this, "__className__", e), this.setAttribute && this.setAttribute("class", e || !1 === t ? "" : U.get(this, "__className__") || ""));
      });
    },
    hasClass: function hasClass(t) {
      var e,
          n,
          i = 0;

      for (e = " " + t + " "; n = this[i++];) {
        if (1 === n.nodeType && (" " + le(n) + " ").replace(ae, " ").indexOf(e) > -1) return !0;
      }

      return !1;
    }
  });
  var ce = /\r/g,
      ue = /[\x20\t\r\n\f]+/g;
  y.fn.extend({
    val: function val(t) {
      var e,
          n,
          i,
          o = this[0];
      return arguments.length ? (i = y.isFunction(t), this.each(function (n) {
        var o;
        1 === this.nodeType && (null == (o = i ? t.call(this, n, y(this).val()) : t) ? o = "" : "number" == typeof o ? o += "" : y.isArray(o) && (o = y.map(o, function (t) {
          return null == t ? "" : t + "";
        })), (e = y.valHooks[this.type] || y.valHooks[this.nodeName.toLowerCase()]) && "set" in e && void 0 !== e.set(this, o, "value") || (this.value = o));
      })) : o ? (e = y.valHooks[o.type] || y.valHooks[o.nodeName.toLowerCase()]) && "get" in e && void 0 !== (n = e.get(o, "value")) ? n : "string" == typeof (n = o.value) ? n.replace(ce, "") : null == n ? "" : n : void 0;
    }
  }), y.extend({
    valHooks: {
      option: {
        get: function get(t) {
          var e = y.find.attr(t, "value");
          return null != e ? e : y.trim(y.text(t)).replace(ue, " ");
        }
      },
      select: {
        get: function get(t) {
          for (var e, n, i = t.options, o = t.selectedIndex, r = "select-one" === t.type, s = r ? null : [], a = r ? o + 1 : i.length, l = 0 > o ? a : r ? o : 0; a > l; l++) {
            if (((n = i[l]).selected || l === o) && !n.disabled && (!n.parentNode.disabled || !y.nodeName(n.parentNode, "optgroup"))) {
              if (e = y(n).val(), r) return e;
              s.push(e);
            }
          }

          return s;
        },
        set: function set(t, e) {
          for (var n, i, o = t.options, r = y.makeArray(e), s = o.length; s--;) {
            ((i = o[s]).selected = y.inArray(y.valHooks.option.get(i), r) > -1) && (n = !0);
          }

          return n || (t.selectedIndex = -1), r;
        }
      }
    }
  }), y.each(["radio", "checkbox"], function () {
    y.valHooks[this] = {
      set: function set(t, e) {
        return y.isArray(e) ? t.checked = y.inArray(y(t).val(), e) > -1 : void 0;
      }
    }, h.checkOn || (y.valHooks[this].get = function (t) {
      return null === t.getAttribute("value") ? "on" : t.value;
    });
  });
  var de = /^(?:focusinfocus|focusoutblur)$/;
  y.extend(y.event, {
    trigger: function trigger(e, n, o, r) {
      var s,
          a,
          l,
          c,
          u,
          p,
          f,
          h = [o || i],
          m = d.call(e, "type") ? e.type : e,
          g = d.call(e, "namespace") ? e.namespace.split(".") : [];

      if (a = l = o = o || i, 3 !== o.nodeType && 8 !== o.nodeType && !de.test(m + y.event.triggered) && (m.indexOf(".") > -1 && (g = m.split("."), m = g.shift(), g.sort()), u = m.indexOf(":") < 0 && "on" + m, (e = e[y.expando] ? e : new y.Event(m, "object" == _typeof(e) && e)).isTrigger = r ? 2 : 3, e.namespace = g.join("."), e.rnamespace = e.namespace ? new RegExp("(^|\\.)" + g.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, e.result = void 0, e.target || (e.target = o), n = null == n ? [e] : y.makeArray(n, [e]), f = y.event.special[m] || {}, r || !f.trigger || !1 !== f.trigger.apply(o, n))) {
        if (!r && !f.noBubble && !y.isWindow(o)) {
          for (c = f.delegateType || m, de.test(c + m) || (a = a.parentNode); a; a = a.parentNode) {
            h.push(a), l = a;
          }

          l === (o.ownerDocument || i) && h.push(l.defaultView || l.parentWindow || t);
        }

        for (s = 0; (a = h[s++]) && !e.isPropagationStopped();) {
          e.type = s > 1 ? c : f.bindType || m, (p = (U.get(a, "events") || {})[e.type] && U.get(a, "handle")) && p.apply(a, n), (p = u && a[u]) && p.apply && W(a) && (e.result = p.apply(a, n), !1 === e.result && e.preventDefault());
        }

        return e.type = m, r || e.isDefaultPrevented() || f._default && !1 !== f._default.apply(h.pop(), n) || !W(o) || u && y.isFunction(o[m]) && !y.isWindow(o) && ((l = o[u]) && (o[u] = null), y.event.triggered = m, o[m](), y.event.triggered = void 0, l && (o[u] = l)), e.result;
      }
    },
    simulate: function simulate(t, e, n) {
      var i = y.extend(new y.Event(), n, {
        type: t,
        isSimulated: !0
      });
      y.event.trigger(i, null, e);
    }
  }), y.fn.extend({
    trigger: function trigger(t, e) {
      return this.each(function () {
        y.event.trigger(t, e, this);
      });
    },
    triggerHandler: function triggerHandler(t, e) {
      var n = this[0];
      return n ? y.event.trigger(t, e, n, !0) : void 0;
    }
  }), y.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function (t, e) {
    y.fn[e] = function (t, n) {
      return arguments.length > 0 ? this.on(e, null, t, n) : this.trigger(e);
    };
  }), y.fn.extend({
    hover: function hover(t, e) {
      return this.mouseenter(t).mouseleave(e || t);
    }
  }), h.focusin = "onfocusin" in t, h.focusin || y.each({
    focus: "focusin",
    blur: "focusout"
  }, function (t, e) {
    var n = function n(t) {
      y.event.simulate(e, t.target, y.event.fix(t));
    };

    y.event.special[e] = {
      setup: function setup() {
        var i = this.ownerDocument || this,
            o = U.access(i, e);
        o || i.addEventListener(t, n, !0), U.access(i, e, (o || 0) + 1);
      },
      teardown: function teardown() {
        var i = this.ownerDocument || this,
            o = U.access(i, e) - 1;
        o ? U.access(i, e, o) : (i.removeEventListener(t, n, !0), U.remove(i, e));
      }
    };
  });
  var pe = t.location,
      fe = y.now(),
      he = /\?/;

  y.parseXML = function (e) {
    var n;
    if (!e || "string" != typeof e) return null;

    try {
      n = new t.DOMParser().parseFromString(e, "text/xml");
    } catch (t) {
      n = void 0;
    }

    return n && !n.getElementsByTagName("parsererror").length || y.error("Invalid XML: " + e), n;
  };

  var me = /\[\]$/,
      ge = /\r?\n/g,
      ye = /^(?:submit|button|image|reset|file)$/i,
      ve = /^(?:input|select|textarea|keygen)/i;

  function be(t, e, n, i) {
    var o;
    if (y.isArray(e)) y.each(e, function (e, o) {
      n || me.test(t) ? i(t, o) : be(t + "[" + ("object" == _typeof(o) && null != o ? e : "") + "]", o, n, i);
    });else if (n || "object" !== y.type(e)) i(t, e);else for (o in e) {
      be(t + "[" + o + "]", e[o], n, i);
    }
  }

  y.param = function (t, e) {
    var n,
        i = [],
        o = function o(t, e) {
      var n = y.isFunction(e) ? e() : e;
      i[i.length] = encodeURIComponent(t) + "=" + encodeURIComponent(null == n ? "" : n);
    };

    if (y.isArray(t) || t.jquery && !y.isPlainObject(t)) y.each(t, function () {
      o(this.name, this.value);
    });else for (n in t) {
      be(n, t[n], e, o);
    }
    return i.join("&");
  }, y.fn.extend({
    serialize: function serialize() {
      return y.param(this.serializeArray());
    },
    serializeArray: function serializeArray() {
      return this.map(function () {
        var t = y.prop(this, "elements");
        return t ? y.makeArray(t) : this;
      }).filter(function () {
        var t = this.type;
        return this.name && !y(this).is(":disabled") && ve.test(this.nodeName) && !ye.test(t) && (this.checked || !rt.test(t));
      }).map(function (t, e) {
        var n = y(this).val();
        return null == n ? null : y.isArray(n) ? y.map(n, function (t) {
          return {
            name: e.name,
            value: t.replace(ge, "\r\n")
          };
        }) : {
          name: e.name,
          value: n.replace(ge, "\r\n")
        };
      }).get();
    }
  });
  var we = /%20/g,
      xe = /#.*$/,
      Ce = /([?&])_=[^&]*/,
      Se = /^(.*?):[ \t]*([^\r\n]*)$/gm,
      Te = /^(?:GET|HEAD)$/,
      ke = /^\/\//,
      Ae = {},
      Ee = {},
      De = "*/".concat("*"),
      Oe = i.createElement("a");

  function Ie(t) {
    return function (e, n) {
      "string" != typeof e && (n = e, e = "*");
      var i,
          o = 0,
          r = e.toLowerCase().match(M) || [];
      if (y.isFunction(n)) for (; i = r[o++];) {
        "+" === i[0] ? (i = i.slice(1) || "*", (t[i] = t[i] || []).unshift(n)) : (t[i] = t[i] || []).push(n);
      }
    };
  }

  function Ne(t, e, n, i) {
    var o = {},
        r = t === Ee;

    function s(a) {
      var l;
      return o[a] = !0, y.each(t[a] || [], function (t, a) {
        var c = a(e, n, i);
        return "string" != typeof c || r || o[c] ? r ? !(l = c) : void 0 : (e.dataTypes.unshift(c), s(c), !1);
      }), l;
    }

    return s(e.dataTypes[0]) || !o["*"] && s("*");
  }

  function Pe(t, e) {
    var n,
        i,
        o = y.ajaxSettings.flatOptions || {};

    for (n in e) {
      void 0 !== e[n] && ((o[n] ? t : i || (i = {}))[n] = e[n]);
    }

    return i && y.extend(!0, t, i), t;
  }

  Oe.href = pe.href, y.extend({
    active: 0,
    lastModified: {},
    etag: {},
    ajaxSettings: {
      url: pe.href,
      type: "GET",
      isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(pe.protocol),
      global: !0,
      processData: !0,
      async: !0,
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      accepts: {
        "*": De,
        text: "text/plain",
        html: "text/html",
        xml: "application/xml, text/xml",
        json: "application/json, text/javascript"
      },
      contents: {
        xml: /\bxml\b/,
        html: /\bhtml/,
        json: /\bjson\b/
      },
      responseFields: {
        xml: "responseXML",
        text: "responseText",
        json: "responseJSON"
      },
      converters: {
        "* text": String,
        "text html": !0,
        "text json": JSON.parse,
        "text xml": y.parseXML
      },
      flatOptions: {
        url: !0,
        context: !0
      }
    },
    ajaxSetup: function ajaxSetup(t, e) {
      return e ? Pe(Pe(t, y.ajaxSettings), e) : Pe(y.ajaxSettings, t);
    },
    ajaxPrefilter: Ie(Ae),
    ajaxTransport: Ie(Ee),
    ajax: function ajax(e, n) {
      "object" == _typeof(e) && (n = e, e = void 0), n = n || {};
      var o,
          r,
          s,
          a,
          l,
          c,
          u,
          d,
          p,
          f,
          h = y.ajaxSetup({}, n),
          m = h.context || h,
          g = h.context && (m.nodeType || m.jquery) ? y(m) : y.event,
          v = y.Deferred(),
          b = y.Callbacks("once memory"),
          w = h.statusCode || {},
          x = {},
          C = {},
          S = "canceled",
          T = {
        readyState: 0,
        getResponseHeader: function getResponseHeader(t) {
          var e;

          if (u) {
            if (!a) for (a = {}; e = Se.exec(s);) {
              a[e[1].toLowerCase()] = e[2];
            }
            e = a[t.toLowerCase()];
          }

          return null == e ? null : e;
        },
        getAllResponseHeaders: function getAllResponseHeaders() {
          return u ? s : null;
        },
        setRequestHeader: function setRequestHeader(t, e) {
          return null == u && (t = C[t.toLowerCase()] = C[t.toLowerCase()] || t, x[t] = e), this;
        },
        overrideMimeType: function overrideMimeType(t) {
          return null == u && (h.mimeType = t), this;
        },
        statusCode: function statusCode(t) {
          var e;
          if (t) if (u) T.always(t[T.status]);else for (e in t) {
            w[e] = [w[e], t[e]];
          }
          return this;
        },
        abort: function abort(t) {
          var e = t || S;
          return o && o.abort(e), k(0, e), this;
        }
      };

      if (v.promise(T), h.url = ((e || h.url || pe.href) + "").replace(ke, pe.protocol + "//"), h.type = n.method || n.type || h.method || h.type, h.dataTypes = (h.dataType || "*").toLowerCase().match(M) || [""], null == h.crossDomain) {
        c = i.createElement("a");

        try {
          c.href = h.url, c.href = c.href, h.crossDomain = Oe.protocol + "//" + Oe.host != c.protocol + "//" + c.host;
        } catch (t) {
          h.crossDomain = !0;
        }
      }

      if (h.data && h.processData && "string" != typeof h.data && (h.data = y.param(h.data, h.traditional)), Ne(Ae, h, n, T), u) return T;

      for (p in (d = y.event && h.global) && 0 == y.active++ && y.event.trigger("ajaxStart"), h.type = h.type.toUpperCase(), h.hasContent = !Te.test(h.type), r = h.url.replace(xe, ""), h.hasContent ? h.data && h.processData && 0 === (h.contentType || "").indexOf("application/x-www-form-urlencoded") && (h.data = h.data.replace(we, "+")) : (f = h.url.slice(r.length), h.data && (r += (he.test(r) ? "&" : "?") + h.data, delete h.data), !1 === h.cache && (r = r.replace(Ce, ""), f = (he.test(r) ? "&" : "?") + "_=" + fe++ + f), h.url = r + f), h.ifModified && (y.lastModified[r] && T.setRequestHeader("If-Modified-Since", y.lastModified[r]), y.etag[r] && T.setRequestHeader("If-None-Match", y.etag[r])), (h.data && h.hasContent && !1 !== h.contentType || n.contentType) && T.setRequestHeader("Content-Type", h.contentType), T.setRequestHeader("Accept", h.dataTypes[0] && h.accepts[h.dataTypes[0]] ? h.accepts[h.dataTypes[0]] + ("*" !== h.dataTypes[0] ? ", " + De + "; q=0.01" : "") : h.accepts["*"]), h.headers) {
        T.setRequestHeader(p, h.headers[p]);
      }

      if (h.beforeSend && (!1 === h.beforeSend.call(m, T, h) || u)) return T.abort();

      if (S = "abort", b.add(h.complete), T.done(h.success), T.fail(h.error), o = Ne(Ee, h, n, T)) {
        if (T.readyState = 1, d && g.trigger("ajaxSend", [T, h]), u) return T;
        h.async && h.timeout > 0 && (l = t.setTimeout(function () {
          T.abort("timeout");
        }, h.timeout));

        try {
          u = !1, o.send(x, k);
        } catch (t) {
          if (u) throw t;
          k(-1, t);
        }
      } else k(-1, "No Transport");

      function k(e, n, i, a) {
        var c,
            p,
            f,
            x,
            C,
            S = n;
        u || (u = !0, l && t.clearTimeout(l), o = void 0, s = a || "", T.readyState = e > 0 ? 4 : 0, c = e >= 200 && 300 > e || 304 === e, i && (x = function (t, e, n) {
          for (var i, o, r, s, a = t.contents, l = t.dataTypes; "*" === l[0];) {
            l.shift(), void 0 === i && (i = t.mimeType || e.getResponseHeader("Content-Type"));
          }

          if (i) for (o in a) {
            if (a[o] && a[o].test(i)) {
              l.unshift(o);
              break;
            }
          }
          if (l[0] in n) r = l[0];else {
            for (o in n) {
              if (!l[0] || t.converters[o + " " + l[0]]) {
                r = o;
                break;
              }

              s || (s = o);
            }

            r = r || s;
          }
          return r ? (r !== l[0] && l.unshift(r), n[r]) : void 0;
        }(h, T, i)), x = function (t, e, n, i) {
          var o,
              r,
              s,
              a,
              l,
              c = {},
              u = t.dataTypes.slice();
          if (u[1]) for (s in t.converters) {
            c[s.toLowerCase()] = t.converters[s];
          }

          for (r = u.shift(); r;) {
            if (t.responseFields[r] && (n[t.responseFields[r]] = e), !l && i && t.dataFilter && (e = t.dataFilter(e, t.dataType)), l = r, r = u.shift()) if ("*" === r) r = l;else if ("*" !== l && l !== r) {
              if (!(s = c[l + " " + r] || c["* " + r])) for (o in c) {
                if ((a = o.split(" "))[1] === r && (s = c[l + " " + a[0]] || c["* " + a[0]])) {
                  !0 === s ? s = c[o] : !0 !== c[o] && (r = a[0], u.unshift(a[1]));
                  break;
                }
              }
              if (!0 !== s) if (s && t.throws) e = s(e);else try {
                e = s(e);
              } catch (t) {
                return {
                  state: "parsererror",
                  error: s ? t : "No conversion from " + l + " to " + r
                };
              }
            }
          }

          return {
            state: "success",
            data: e
          };
        }(h, x, T, c), c ? (h.ifModified && ((C = T.getResponseHeader("Last-Modified")) && (y.lastModified[r] = C), (C = T.getResponseHeader("etag")) && (y.etag[r] = C)), 204 === e || "HEAD" === h.type ? S = "nocontent" : 304 === e ? S = "notmodified" : (S = x.state, p = x.data, c = !(f = x.error))) : (f = S, !e && S || (S = "error", 0 > e && (e = 0))), T.status = e, T.statusText = (n || S) + "", c ? v.resolveWith(m, [p, S, T]) : v.rejectWith(m, [T, S, f]), T.statusCode(w), w = void 0, d && g.trigger(c ? "ajaxSuccess" : "ajaxError", [T, h, c ? p : f]), b.fireWith(m, [T, S]), d && (g.trigger("ajaxComplete", [T, h]), --y.active || y.event.trigger("ajaxStop")));
      }

      return T;
    },
    getJSON: function getJSON(t, e, n) {
      return y.get(t, e, n, "json");
    },
    getScript: function getScript(t, e) {
      return y.get(t, void 0, e, "script");
    }
  }), y.each(["get", "post"], function (t, e) {
    y[e] = function (t, n, i, o) {
      return y.isFunction(n) && (o = o || i, i = n, n = void 0), y.ajax(y.extend({
        url: t,
        type: e,
        dataType: o,
        data: n,
        success: i
      }, y.isPlainObject(t) && t));
    };
  }), y._evalUrl = function (t) {
    return y.ajax({
      url: t,
      type: "GET",
      dataType: "script",
      cache: !0,
      async: !1,
      global: !1,
      throws: !0
    });
  }, y.fn.extend({
    wrapAll: function wrapAll(t) {
      var e;
      return this[0] && (y.isFunction(t) && (t = t.call(this[0])), e = y(t, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && e.insertBefore(this[0]), e.map(function () {
        for (var t = this; t.firstElementChild;) {
          t = t.firstElementChild;
        }

        return t;
      }).append(this)), this;
    },
    wrapInner: function wrapInner(t) {
      return y.isFunction(t) ? this.each(function (e) {
        y(this).wrapInner(t.call(this, e));
      }) : this.each(function () {
        var e = y(this),
            n = e.contents();
        n.length ? n.wrapAll(t) : e.append(t);
      });
    },
    wrap: function wrap(t) {
      var e = y.isFunction(t);
      return this.each(function (n) {
        y(this).wrapAll(e ? t.call(this, n) : t);
      });
    },
    unwrap: function unwrap(t) {
      return this.parent(t).not("body").each(function () {
        y(this).replaceWith(this.childNodes);
      }), this;
    }
  }), y.expr.pseudos.hidden = function (t) {
    return !y.expr.pseudos.visible(t);
  }, y.expr.pseudos.visible = function (t) {
    return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
  }, y.ajaxSettings.xhr = function () {
    try {
      return new t.XMLHttpRequest();
    } catch (t) {}
  };
  var $e = {
    0: 200,
    1223: 204
  },
      Re = y.ajaxSettings.xhr();
  h.cors = !!Re && "withCredentials" in Re, h.ajax = Re = !!Re, y.ajaxTransport(function (e) {
    var _n, i;

    return h.cors || Re && !e.crossDomain ? {
      send: function send(o, r) {
        var s,
            a = e.xhr();
        if (a.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields) for (s in e.xhrFields) {
          a[s] = e.xhrFields[s];
        }

        for (s in e.mimeType && a.overrideMimeType && a.overrideMimeType(e.mimeType), e.crossDomain || o["X-Requested-With"] || (o["X-Requested-With"] = "XMLHttpRequest"), o) {
          a.setRequestHeader(s, o[s]);
        }

        _n = function n(t) {
          return function () {
            _n && (_n = i = a.onload = a.onerror = a.onabort = a.onreadystatechange = null, "abort" === t ? a.abort() : "error" === t ? "number" != typeof a.status ? r(0, "error") : r(a.status, a.statusText) : r($e[a.status] || a.status, a.statusText, "text" !== (a.responseType || "text") || "string" != typeof a.responseText ? {
              binary: a.response
            } : {
              text: a.responseText
            }, a.getAllResponseHeaders()));
          };
        }, a.onload = _n(), i = a.onerror = _n("error"), void 0 !== a.onabort ? a.onabort = i : a.onreadystatechange = function () {
          4 === a.readyState && t.setTimeout(function () {
            _n && i();
          });
        }, _n = _n("abort");

        try {
          a.send(e.hasContent && e.data || null);
        } catch (t) {
          if (_n) throw t;
        }
      },
      abort: function abort() {
        _n && _n();
      }
    } : void 0;
  }), y.ajaxPrefilter(function (t) {
    t.crossDomain && (t.contents.script = !1);
  }), y.ajaxSetup({
    accepts: {
      script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
    },
    contents: {
      script: /\b(?:java|ecma)script\b/
    },
    converters: {
      "text script": function textScript(t) {
        return y.globalEval(t), t;
      }
    }
  }), y.ajaxPrefilter("script", function (t) {
    void 0 === t.cache && (t.cache = !1), t.crossDomain && (t.type = "GET");
  }), y.ajaxTransport("script", function (t) {
    var e, _n2;

    if (t.crossDomain) return {
      send: function send(o, r) {
        e = y("<script>").prop({
          charset: t.scriptCharset,
          src: t.url
        }).on("load error", _n2 = function n(t) {
          e.remove(), _n2 = null, t && r("error" === t.type ? 404 : 200, t.type);
        }), i.head.appendChild(e[0]);
      },
      abort: function abort() {
        _n2 && _n2();
      }
    };
  });
  var Me = [],
      Fe = /(=)\?(?=&|$)|\?\?/;

  function Le(t) {
    return y.isWindow(t) ? t : 9 === t.nodeType && t.defaultView;
  }

  y.ajaxSetup({
    jsonp: "callback",
    jsonpCallback: function jsonpCallback() {
      var t = Me.pop() || y.expando + "_" + fe++;
      return this[t] = !0, t;
    }
  }), y.ajaxPrefilter("json jsonp", function (e, n, i) {
    var o,
        r,
        s,
        a = !1 !== e.jsonp && (Fe.test(e.url) ? "url" : "string" == typeof e.data && 0 === (e.contentType || "").indexOf("application/x-www-form-urlencoded") && Fe.test(e.data) && "data");
    return a || "jsonp" === e.dataTypes[0] ? (o = e.jsonpCallback = y.isFunction(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, a ? e[a] = e[a].replace(Fe, "$1" + o) : !1 !== e.jsonp && (e.url += (he.test(e.url) ? "&" : "?") + e.jsonp + "=" + o), e.converters["script json"] = function () {
      return s || y.error(o + " was not called"), s[0];
    }, e.dataTypes[0] = "json", r = t[o], t[o] = function () {
      s = arguments;
    }, i.always(function () {
      void 0 === r ? y(t).removeProp(o) : t[o] = r, e[o] && (e.jsonpCallback = n.jsonpCallback, Me.push(o)), s && y.isFunction(r) && r(s[0]), s = r = void 0;
    }), "script") : void 0;
  }), h.createHTMLDocument = function () {
    var t = i.implementation.createHTMLDocument("").body;
    return t.innerHTML = "<form></form><form></form>", 2 === t.childNodes.length;
  }(), y.parseHTML = function (t, e, n) {
    return "string" != typeof t ? [] : ("boolean" == typeof e && (n = e, e = !1), e || (h.createHTMLDocument ? ((o = (e = i.implementation.createHTMLDocument("")).createElement("base")).href = i.location.href, e.head.appendChild(o)) : e = i), s = !n && [], (r = E.exec(t)) ? [e.createElement(r[1])] : (r = pt([t], e, s), s && s.length && y(s).remove(), y.merge([], r.childNodes)));
    var o, r, s;
  }, y.fn.load = function (t, e, n) {
    var i,
        o,
        r,
        s = this,
        a = t.indexOf(" ");
    return a > -1 && (i = y.trim(t.slice(a)), t = t.slice(0, a)), y.isFunction(e) ? (n = e, e = void 0) : e && "object" == _typeof(e) && (o = "POST"), s.length > 0 && y.ajax({
      url: t,
      type: o || "GET",
      dataType: "html",
      data: e
    }).done(function (t) {
      r = arguments, s.html(i ? y("<div>").append(y.parseHTML(t)).find(i) : t);
    }).always(n && function (t, e) {
      s.each(function () {
        n.apply(this, r || [t.responseText, e, t]);
      });
    }), this;
  }, y.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (t, e) {
    y.fn[e] = function (t) {
      return this.on(e, t);
    };
  }), y.expr.pseudos.animated = function (t) {
    return y.grep(y.timers, function (e) {
      return t === e.elem;
    }).length;
  }, y.offset = {
    setOffset: function setOffset(t, e, n) {
      var i,
          o,
          r,
          s,
          a,
          l,
          c = y.css(t, "position"),
          u = y(t),
          d = {};
      "static" === c && (t.style.position = "relative"), a = u.offset(), r = y.css(t, "top"), l = y.css(t, "left"), ("absolute" === c || "fixed" === c) && (r + l).indexOf("auto") > -1 ? (s = (i = u.position()).top, o = i.left) : (s = parseFloat(r) || 0, o = parseFloat(l) || 0), y.isFunction(e) && (e = e.call(t, n, y.extend({}, a))), null != e.top && (d.top = e.top - a.top + s), null != e.left && (d.left = e.left - a.left + o), "using" in e ? e.using.call(t, d) : u.css(d);
    }
  }, y.fn.extend({
    offset: function offset(t) {
      if (arguments.length) return void 0 === t ? this : this.each(function (e) {
        y.offset.setOffset(this, t, e);
      });
      var e,
          n,
          i,
          o,
          r = this[0];
      return r ? r.getClientRects().length ? (i = r.getBoundingClientRect()).width || i.height ? (n = Le(o = r.ownerDocument), e = o.documentElement, {
        top: i.top + n.pageYOffset - e.clientTop,
        left: i.left + n.pageXOffset - e.clientLeft
      }) : i : {
        top: 0,
        left: 0
      } : void 0;
    },
    position: function position() {
      if (this[0]) {
        var t,
            e,
            n = this[0],
            i = {
          top: 0,
          left: 0
        };
        return "fixed" === y.css(n, "position") ? e = n.getBoundingClientRect() : (t = this.offsetParent(), e = this.offset(), y.nodeName(t[0], "html") || (i = t.offset()), i = {
          top: i.top + y.css(t[0], "borderTopWidth", !0),
          left: i.left + y.css(t[0], "borderLeftWidth", !0)
        }), {
          top: e.top - i.top - y.css(n, "marginTop", !0),
          left: e.left - i.left - y.css(n, "marginLeft", !0)
        };
      }
    },
    offsetParent: function offsetParent() {
      return this.map(function () {
        for (var t = this.offsetParent; t && "static" === y.css(t, "position");) {
          t = t.offsetParent;
        }

        return t || ft;
      });
    }
  }), y.each({
    scrollLeft: "pageXOffset",
    scrollTop: "pageYOffset"
  }, function (t, e) {
    var n = "pageYOffset" === e;

    y.fn[t] = function (i) {
      return _(this, function (t, i, o) {
        var r = Le(t);
        return void 0 === o ? r ? r[e] : t[i] : void (r ? r.scrollTo(n ? r.pageXOffset : o, n ? o : r.pageYOffset) : t[i] = o);
      }, t, i, arguments.length);
    };
  }), y.each(["top", "left"], function (t, e) {
    y.cssHooks[e] = Lt(h.pixelPosition, function (t, n) {
      return n ? (n = Ft(t, e), Rt.test(n) ? y(t).position()[e] + "px" : n) : void 0;
    });
  }), y.each({
    Height: "height",
    Width: "width"
  }, function (t, e) {
    y.each({
      padding: "inner" + t,
      content: e,
      "": "outer" + t
    }, function (n, i) {
      y.fn[i] = function (o, r) {
        var s = arguments.length && (n || "boolean" != typeof o),
            a = n || (!0 === o || !0 === r ? "margin" : "border");
        return _(this, function (e, n, o) {
          var r;
          return y.isWindow(e) ? 0 === i.indexOf("outer") ? e["inner" + t] : e.document.documentElement["client" + t] : 9 === e.nodeType ? (r = e.documentElement, Math.max(e.body["scroll" + t], r["scroll" + t], e.body["offset" + t], r["offset" + t], r["client" + t])) : void 0 === o ? y.css(e, n, a) : y.style(e, n, o, a);
        }, e, s ? o : void 0, s);
      };
    });
  }), y.fn.extend({
    bind: function bind(t, e, n) {
      return this.on(t, null, e, n);
    },
    unbind: function unbind(t, e) {
      return this.off(t, null, e);
    },
    delegate: function delegate(t, e, n, i) {
      return this.on(e, t, n, i);
    },
    undelegate: function undelegate(t, e, n) {
      return 1 === arguments.length ? this.off(t, "**") : this.off(e, t || "**", n);
    }
  }), y.parseJSON = JSON.parse, "function" == typeof define && define.amd && define("jquery", [], function () {
    return y;
  });
  var je = t.jQuery,
      Be = t.$;
  return y.noConflict = function (e) {
    return t.$ === y && (t.$ = Be), e && t.jQuery === y && (t.jQuery = je), y;
  }, e || (t.jQuery = t.$ = y), y;
}), function (t) {
  "use strict";

  "function" == typeof define && define.amd ? define(["jquery"], t) : "undefined" != typeof exports ? module.exports = t(require("jquery")) : t(jQuery);
}(function (t) {
  "use strict";

  var e = window.Slick || {};
  (e = function () {
    var e = 0;
    return function (n, i) {
      var o,
          r = this;
      r.defaults = {
        accessibility: !0,
        adaptiveHeight: !1,
        appendArrows: t(n),
        appendDots: t(n),
        arrows: !0,
        asNavFor: null,
        prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
        nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
        autoplay: !1,
        autoplaySpeed: 3e3,
        centerMode: !1,
        centerPadding: "50px",
        cssEase: "ease",
        customPaging: function customPaging(e, n) {
          return t('<button type="button" />').text(n + 1);
        },
        dots: !1,
        dotsClass: "slick-dots",
        draggable: !0,
        easing: "linear",
        edgeFriction: .35,
        fade: !1,
        focusOnSelect: !1,
        focusOnChange: !1,
        infinite: !0,
        initialSlide: 0,
        lazyLoad: "ondemand",
        mobileFirst: !1,
        pauseOnHover: !0,
        pauseOnFocus: !0,
        pauseOnDotsHover: !1,
        respondTo: "window",
        responsive: null,
        rows: 1,
        rtl: !1,
        slide: "",
        slidesPerRow: 1,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 500,
        swipe: !0,
        swipeToSlide: !1,
        touchMove: !0,
        touchThreshold: 5,
        useCSS: !0,
        useTransform: !0,
        variableWidth: !1,
        vertical: !1,
        verticalSwiping: !1,
        waitForAnimate: !0,
        zIndex: 1e3
      }, r.initials = {
        animating: !1,
        dragging: !1,
        autoPlayTimer: null,
        currentDirection: 0,
        currentLeft: null,
        currentSlide: 0,
        direction: 1,
        $dots: null,
        listWidth: null,
        listHeight: null,
        loadIndex: 0,
        $nextArrow: null,
        $prevArrow: null,
        scrolling: !1,
        slideCount: null,
        slideWidth: null,
        $slideTrack: null,
        $slides: null,
        sliding: !1,
        slideOffset: 0,
        swipeLeft: null,
        swiping: !1,
        $list: null,
        touchObject: {},
        transformsEnabled: !1,
        unslicked: !1
      }, t.extend(r, r.initials), r.activeBreakpoint = null, r.animType = null, r.animProp = null, r.breakpoints = [], r.breakpointSettings = [], r.cssTransitions = !1, r.focussed = !1, r.interrupted = !1, r.hidden = "hidden", r.paused = !0, r.positionProp = null, r.respondTo = null, r.rowCount = 1, r.shouldClick = !0, r.$slider = t(n), r.$slidesCache = null, r.transformType = null, r.transitionType = null, r.visibilityChange = "visibilitychange", r.windowWidth = 0, r.windowTimer = null, o = t(n).data("slick") || {}, r.options = t.extend({}, r.defaults, i, o), r.currentSlide = r.options.initialSlide, r.originalSettings = r.options, void 0 !== document.mozHidden ? (r.hidden = "mozHidden", r.visibilityChange = "mozvisibilitychange") : void 0 !== document.webkitHidden && (r.hidden = "webkitHidden", r.visibilityChange = "webkitvisibilitychange"), r.autoPlay = t.proxy(r.autoPlay, r), r.autoPlayClear = t.proxy(r.autoPlayClear, r), r.autoPlayIterator = t.proxy(r.autoPlayIterator, r), r.changeSlide = t.proxy(r.changeSlide, r), r.clickHandler = t.proxy(r.clickHandler, r), r.selectHandler = t.proxy(r.selectHandler, r), r.setPosition = t.proxy(r.setPosition, r), r.swipeHandler = t.proxy(r.swipeHandler, r), r.dragHandler = t.proxy(r.dragHandler, r), r.keyHandler = t.proxy(r.keyHandler, r), r.instanceUid = e++, r.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, r.registerBreakpoints(), r.init(!0);
    };
  }()).prototype.activateADA = function () {
    this.$slideTrack.find(".slick-active").attr({
      "aria-hidden": "false"
    }).find("a, input, button, select").attr({
      tabindex: "0"
    });
  }, e.prototype.addSlide = e.prototype.slickAdd = function (e, n, i) {
    var o = this;
    if ("boolean" == typeof n) i = n, n = null;else if (n < 0 || n >= o.slideCount) return !1;
    o.unload(), "number" == typeof n ? 0 === n && 0 === o.$slides.length ? t(e).appendTo(o.$slideTrack) : i ? t(e).insertBefore(o.$slides.eq(n)) : t(e).insertAfter(o.$slides.eq(n)) : !0 === i ? t(e).prependTo(o.$slideTrack) : t(e).appendTo(o.$slideTrack), o.$slides = o.$slideTrack.children(this.options.slide), o.$slideTrack.children(this.options.slide).detach(), o.$slideTrack.append(o.$slides), o.$slides.each(function (e, n) {
      t(n).attr("data-slick-index", e);
    }), o.$slidesCache = o.$slides, o.reinit();
  }, e.prototype.animateHeight = function () {
    var t = this;

    if (1 === t.options.slidesToShow && !0 === t.options.adaptiveHeight && !1 === t.options.vertical) {
      var e = t.$slides.eq(t.currentSlide).outerHeight(!0);
      t.$list.animate({
        height: e
      }, t.options.speed);
    }
  }, e.prototype.animateSlide = function (e, n) {
    var i = {},
        o = this;
    o.animateHeight(), !0 === o.options.rtl && !1 === o.options.vertical && (e = -e), !1 === o.transformsEnabled ? !1 === o.options.vertical ? o.$slideTrack.animate({
      left: e
    }, o.options.speed, o.options.easing, n) : o.$slideTrack.animate({
      top: e
    }, o.options.speed, o.options.easing, n) : !1 === o.cssTransitions ? (!0 === o.options.rtl && (o.currentLeft = -o.currentLeft), t({
      animStart: o.currentLeft
    }).animate({
      animStart: e
    }, {
      duration: o.options.speed,
      easing: o.options.easing,
      step: function step(t) {
        t = Math.ceil(t), !1 === o.options.vertical ? (i[o.animType] = "translate(" + t + "px, 0px)", o.$slideTrack.css(i)) : (i[o.animType] = "translate(0px," + t + "px)", o.$slideTrack.css(i));
      },
      complete: function complete() {
        n && n.call();
      }
    })) : (o.applyTransition(), e = Math.ceil(e), !1 === o.options.vertical ? i[o.animType] = "translate3d(" + e + "px, 0px, 0px)" : i[o.animType] = "translate3d(0px," + e + "px, 0px)", o.$slideTrack.css(i), n && setTimeout(function () {
      o.disableTransition(), n.call();
    }, o.options.speed));
  }, e.prototype.getNavTarget = function () {
    var e = this.options.asNavFor;
    return e && null !== e && (e = t(e).not(this.$slider)), e;
  }, e.prototype.asNavFor = function (e) {
    var n = this.getNavTarget();
    null !== n && "object" == _typeof(n) && n.each(function () {
      var n = t(this).slick("getSlick");
      n.unslicked || n.slideHandler(e, !0);
    });
  }, e.prototype.applyTransition = function (t) {
    var e = this,
        n = {};
    !1 === e.options.fade ? n[e.transitionType] = e.transformType + " " + e.options.speed + "ms " + e.options.cssEase : n[e.transitionType] = "opacity " + e.options.speed + "ms " + e.options.cssEase, !1 === e.options.fade ? e.$slideTrack.css(n) : e.$slides.eq(t).css(n);
  }, e.prototype.autoPlay = function () {
    var t = this;
    t.autoPlayClear(), t.slideCount > t.options.slidesToShow && (t.autoPlayTimer = setInterval(t.autoPlayIterator, t.options.autoplaySpeed));
  }, e.prototype.autoPlayClear = function () {
    this.autoPlayTimer && clearInterval(this.autoPlayTimer);
  }, e.prototype.autoPlayIterator = function () {
    var t = this,
        e = t.currentSlide + t.options.slidesToScroll;
    t.paused || t.interrupted || t.focussed || (!1 === t.options.infinite && (1 === t.direction && t.currentSlide + 1 === t.slideCount - 1 ? t.direction = 0 : 0 === t.direction && (e = t.currentSlide - t.options.slidesToScroll, t.currentSlide - 1 == 0 && (t.direction = 1))), t.slideHandler(e));
  }, e.prototype.buildArrows = function () {
    var e = this;
    !0 === e.options.arrows && (e.$prevArrow = t(e.options.prevArrow).addClass("slick-arrow"), e.$nextArrow = t(e.options.nextArrow).addClass("slick-arrow"), e.slideCount > e.options.slidesToShow ? (e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.prependTo(e.options.appendArrows), e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.appendTo(e.options.appendArrows), !0 !== e.options.infinite && e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({
      "aria-disabled": "true",
      tabindex: "-1"
    }));
  }, e.prototype.buildDots = function () {
    var e,
        n,
        i = this;

    if (!0 === i.options.dots) {
      for (i.$slider.addClass("slick-dotted"), n = t("<ul />").addClass(i.options.dotsClass), e = 0; e <= i.getDotCount(); e += 1) {
        n.append(t("<li />").append(i.options.customPaging.call(this, i, e)));
      }

      i.$dots = n.appendTo(i.options.appendDots), i.$dots.find("li").first().addClass("slick-active");
    }
  }, e.prototype.buildOut = function () {
    var e = this;
    e.$slides = e.$slider.children(e.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), e.slideCount = e.$slides.length, e.$slides.each(function (e, n) {
      t(n).attr("data-slick-index", e).data("originalStyling", t(n).attr("style") || "");
    }), e.$slider.addClass("slick-slider"), e.$slideTrack = 0 === e.slideCount ? t('<div class="slick-track"/>').appendTo(e.$slider) : e.$slides.wrapAll('<div class="slick-track"/>').parent(), e.$list = e.$slideTrack.wrap('<div class="slick-list"/>').parent(), e.$slideTrack.css("opacity", 0), !0 !== e.options.centerMode && !0 !== e.options.swipeToSlide || (e.options.slidesToScroll = 1), t("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"), e.setupInfinite(), e.buildArrows(), e.buildDots(), e.updateDots(), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), !0 === e.options.draggable && e.$list.addClass("draggable");
  }, e.prototype.buildRows = function () {
    var t,
        e,
        n,
        i,
        o,
        r,
        s,
        a = this;

    if (i = document.createDocumentFragment(), r = a.$slider.children(), a.options.rows > 1) {
      for (s = a.options.slidesPerRow * a.options.rows, o = Math.ceil(r.length / s), t = 0; t < o; t++) {
        var l = document.createElement("div");

        for (e = 0; e < a.options.rows; e++) {
          var c = document.createElement("div");

          for (n = 0; n < a.options.slidesPerRow; n++) {
            var u = t * s + (e * a.options.slidesPerRow + n);
            r.get(u) && c.appendChild(r.get(u));
          }

          l.appendChild(c);
        }

        i.appendChild(l);
      }

      a.$slider.empty().append(i), a.$slider.children().children().children().css({
        width: 100 / a.options.slidesPerRow + "%",
        display: "inline-block"
      });
    }
  }, e.prototype.checkResponsive = function (e, n) {
    var i,
        o,
        r,
        s = this,
        a = !1,
        l = s.$slider.width(),
        c = window.innerWidth || t(window).width();

    if ("window" === s.respondTo ? r = c : "slider" === s.respondTo ? r = l : "min" === s.respondTo && (r = Math.min(c, l)), s.options.responsive && s.options.responsive.length && null !== s.options.responsive) {
      for (i in o = null, s.breakpoints) {
        s.breakpoints.hasOwnProperty(i) && (!1 === s.originalSettings.mobileFirst ? r < s.breakpoints[i] && (o = s.breakpoints[i]) : r > s.breakpoints[i] && (o = s.breakpoints[i]));
      }

      null !== o ? null !== s.activeBreakpoint ? (o !== s.activeBreakpoint || n) && (s.activeBreakpoint = o, "unslick" === s.breakpointSettings[o] ? s.unslick(o) : (s.options = t.extend({}, s.originalSettings, s.breakpointSettings[o]), !0 === e && (s.currentSlide = s.options.initialSlide), s.refresh(e)), a = o) : (s.activeBreakpoint = o, "unslick" === s.breakpointSettings[o] ? s.unslick(o) : (s.options = t.extend({}, s.originalSettings, s.breakpointSettings[o]), !0 === e && (s.currentSlide = s.options.initialSlide), s.refresh(e)), a = o) : null !== s.activeBreakpoint && (s.activeBreakpoint = null, s.options = s.originalSettings, !0 === e && (s.currentSlide = s.options.initialSlide), s.refresh(e), a = o), e || !1 === a || s.$slider.trigger("breakpoint", [s, a]);
    }
  }, e.prototype.changeSlide = function (e, n) {
    var i,
        o,
        r = this,
        s = t(e.currentTarget);

    switch (s.is("a") && e.preventDefault(), s.is("li") || (s = s.closest("li")), i = r.slideCount % r.options.slidesToScroll != 0 ? 0 : (r.slideCount - r.currentSlide) % r.options.slidesToScroll, e.data.message) {
      case "previous":
        o = 0 === i ? r.options.slidesToScroll : r.options.slidesToShow - i, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide - o, !1, n);
        break;

      case "next":
        o = 0 === i ? r.options.slidesToScroll : i, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide + o, !1, n);
        break;

      case "index":
        var a = 0 === e.data.index ? 0 : e.data.index || s.index() * r.options.slidesToScroll;
        r.slideHandler(r.checkNavigable(a), !1, n), s.children().trigger("focus");
        break;

      default:
        return;
    }
  }, e.prototype.checkNavigable = function (t) {
    var e, n;
    if (n = 0, t > (e = this.getNavigableIndexes())[e.length - 1]) t = e[e.length - 1];else for (var i in e) {
      if (t < e[i]) {
        t = n;
        break;
      }

      n = e[i];
    }
    return t;
  }, e.prototype.cleanUpEvents = function () {
    var e = this;
    e.options.dots && null !== e.$dots && (t("li", e.$dots).off("click.slick", e.changeSlide).off("mouseenter.slick", t.proxy(e.interrupt, e, !0)).off("mouseleave.slick", t.proxy(e.interrupt, e, !1)), !0 === e.options.accessibility && e.$dots.off("keydown.slick", e.keyHandler)), e.$slider.off("focus.slick blur.slick"), !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide), e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide), !0 === e.options.accessibility && (e.$prevArrow && e.$prevArrow.off("keydown.slick", e.keyHandler), e.$nextArrow && e.$nextArrow.off("keydown.slick", e.keyHandler))), e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler), e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler), e.$list.off("touchend.slick mouseup.slick", e.swipeHandler), e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler), e.$list.off("click.slick", e.clickHandler), t(document).off(e.visibilityChange, e.visibility), e.cleanUpSlideEvents(), !0 === e.options.accessibility && e.$list.off("keydown.slick", e.keyHandler), !0 === e.options.focusOnSelect && t(e.$slideTrack).children().off("click.slick", e.selectHandler), t(window).off("orientationchange.slick.slick-" + e.instanceUid, e.orientationChange), t(window).off("resize.slick.slick-" + e.instanceUid, e.resize), t("[draggable!=true]", e.$slideTrack).off("dragstart", e.preventDefault), t(window).off("load.slick.slick-" + e.instanceUid, e.setPosition);
  }, e.prototype.cleanUpSlideEvents = function () {
    var e = this;
    e.$list.off("mouseenter.slick", t.proxy(e.interrupt, e, !0)), e.$list.off("mouseleave.slick", t.proxy(e.interrupt, e, !1));
  }, e.prototype.cleanUpRows = function () {
    var t,
        e = this;
    e.options.rows > 1 && ((t = e.$slides.children().children()).removeAttr("style"), e.$slider.empty().append(t));
  }, e.prototype.clickHandler = function (t) {
    !1 === this.shouldClick && (t.stopImmediatePropagation(), t.stopPropagation(), t.preventDefault());
  }, e.prototype.destroy = function (e) {
    var n = this;
    n.autoPlayClear(), n.touchObject = {}, n.cleanUpEvents(), t(".slick-cloned", n.$slider).detach(), n.$dots && n.$dots.remove(), n.$prevArrow && n.$prevArrow.length && (n.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), n.htmlExpr.test(n.options.prevArrow) && n.$prevArrow.remove()), n.$nextArrow && n.$nextArrow.length && (n.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), n.htmlExpr.test(n.options.nextArrow) && n.$nextArrow.remove()), n.$slides && (n.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function () {
      t(this).attr("style", t(this).data("originalStyling"));
    }), n.$slideTrack.children(this.options.slide).detach(), n.$slideTrack.detach(), n.$list.detach(), n.$slider.append(n.$slides)), n.cleanUpRows(), n.$slider.removeClass("slick-slider"), n.$slider.removeClass("slick-initialized"), n.$slider.removeClass("slick-dotted"), n.unslicked = !0, e || n.$slider.trigger("destroy", [n]);
  }, e.prototype.disableTransition = function (t) {
    var e = this,
        n = {};
    n[e.transitionType] = "", !1 === e.options.fade ? e.$slideTrack.css(n) : e.$slides.eq(t).css(n);
  }, e.prototype.fadeSlide = function (t, e) {
    var n = this;
    !1 === n.cssTransitions ? (n.$slides.eq(t).css({
      zIndex: n.options.zIndex
    }), n.$slides.eq(t).animate({
      opacity: 1
    }, n.options.speed, n.options.easing, e)) : (n.applyTransition(t), n.$slides.eq(t).css({
      opacity: 1,
      zIndex: n.options.zIndex
    }), e && setTimeout(function () {
      n.disableTransition(t), e.call();
    }, n.options.speed));
  }, e.prototype.fadeSlideOut = function (t) {
    var e = this;
    !1 === e.cssTransitions ? e.$slides.eq(t).animate({
      opacity: 0,
      zIndex: e.options.zIndex - 2
    }, e.options.speed, e.options.easing) : (e.applyTransition(t), e.$slides.eq(t).css({
      opacity: 0,
      zIndex: e.options.zIndex - 2
    }));
  }, e.prototype.filterSlides = e.prototype.slickFilter = function (t) {
    var e = this;
    null !== t && (e.$slidesCache = e.$slides, e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.filter(t).appendTo(e.$slideTrack), e.reinit());
  }, e.prototype.focusHandler = function () {
    var e = this;
    e.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*", function (n) {
      n.stopImmediatePropagation();
      var i = t(this);
      setTimeout(function () {
        e.options.pauseOnFocus && (e.focussed = i.is(":focus"), e.autoPlay());
      }, 0);
    });
  }, e.prototype.getCurrent = e.prototype.slickCurrentSlide = function () {
    return this.currentSlide;
  }, e.prototype.getDotCount = function () {
    var t = this,
        e = 0,
        n = 0,
        i = 0;
    if (!0 === t.options.infinite) {
      if (t.slideCount <= t.options.slidesToShow) ++i;else for (; e < t.slideCount;) {
        ++i, e = n + t.options.slidesToScroll, n += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow;
      }
    } else if (!0 === t.options.centerMode) i = t.slideCount;else if (t.options.asNavFor) for (; e < t.slideCount;) {
      ++i, e = n + t.options.slidesToScroll, n += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow;
    } else i = 1 + Math.ceil((t.slideCount - t.options.slidesToShow) / t.options.slidesToScroll);
    return i - 1;
  }, e.prototype.getLeft = function (t) {
    var e,
        n,
        i,
        o,
        r = this,
        s = 0;
    return r.slideOffset = 0, n = r.$slides.first().outerHeight(!0), !0 === r.options.infinite ? (r.slideCount > r.options.slidesToShow && (r.slideOffset = r.slideWidth * r.options.slidesToShow * -1, o = -1, !0 === r.options.vertical && !0 === r.options.centerMode && (2 === r.options.slidesToShow ? o = -1.5 : 1 === r.options.slidesToShow && (o = -2)), s = n * r.options.slidesToShow * o), r.slideCount % r.options.slidesToScroll != 0 && t + r.options.slidesToScroll > r.slideCount && r.slideCount > r.options.slidesToShow && (t > r.slideCount ? (r.slideOffset = (r.options.slidesToShow - (t - r.slideCount)) * r.slideWidth * -1, s = (r.options.slidesToShow - (t - r.slideCount)) * n * -1) : (r.slideOffset = r.slideCount % r.options.slidesToScroll * r.slideWidth * -1, s = r.slideCount % r.options.slidesToScroll * n * -1))) : t + r.options.slidesToShow > r.slideCount && (r.slideOffset = (t + r.options.slidesToShow - r.slideCount) * r.slideWidth, s = (t + r.options.slidesToShow - r.slideCount) * n), r.slideCount <= r.options.slidesToShow && (r.slideOffset = 0, s = 0), !0 === r.options.centerMode && r.slideCount <= r.options.slidesToShow ? r.slideOffset = r.slideWidth * Math.floor(r.options.slidesToShow) / 2 - r.slideWidth * r.slideCount / 2 : !0 === r.options.centerMode && !0 === r.options.infinite ? r.slideOffset += r.slideWidth * Math.floor(r.options.slidesToShow / 2) - r.slideWidth : !0 === r.options.centerMode && (r.slideOffset = 0, r.slideOffset += r.slideWidth * Math.floor(r.options.slidesToShow / 2)), e = !1 === r.options.vertical ? t * r.slideWidth * -1 + r.slideOffset : t * n * -1 + s, !0 === r.options.variableWidth && (i = r.slideCount <= r.options.slidesToShow || !1 === r.options.infinite ? r.$slideTrack.children(".slick-slide").eq(t) : r.$slideTrack.children(".slick-slide").eq(t + r.options.slidesToShow), e = !0 === r.options.rtl ? i[0] ? -1 * (r.$slideTrack.width() - i[0].offsetLeft - i.width()) : 0 : i[0] ? -1 * i[0].offsetLeft : 0, !0 === r.options.centerMode && (i = r.slideCount <= r.options.slidesToShow || !1 === r.options.infinite ? r.$slideTrack.children(".slick-slide").eq(t) : r.$slideTrack.children(".slick-slide").eq(t + r.options.slidesToShow + 1), e = !0 === r.options.rtl ? i[0] ? -1 * (r.$slideTrack.width() - i[0].offsetLeft - i.width()) : 0 : i[0] ? -1 * i[0].offsetLeft : 0, e += (r.$list.width() - i.outerWidth()) / 2)), e;
  }, e.prototype.getOption = e.prototype.slickGetOption = function (t) {
    return this.options[t];
  }, e.prototype.getNavigableIndexes = function () {
    var t,
        e = this,
        n = 0,
        i = 0,
        o = [];

    for (!1 === e.options.infinite ? t = e.slideCount : (n = -1 * e.options.slidesToScroll, i = -1 * e.options.slidesToScroll, t = 2 * e.slideCount); n < t;) {
      o.push(n), n = i + e.options.slidesToScroll, i += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
    }

    return o;
  }, e.prototype.getSlick = function () {
    return this;
  }, e.prototype.getSlideCount = function () {
    var e,
        n,
        i = this;
    return n = !0 === i.options.centerMode ? i.slideWidth * Math.floor(i.options.slidesToShow / 2) : 0, !0 === i.options.swipeToSlide ? (i.$slideTrack.find(".slick-slide").each(function (o, r) {
      if (r.offsetLeft - n + t(r).outerWidth() / 2 > -1 * i.swipeLeft) return e = r, !1;
    }), Math.abs(t(e).attr("data-slick-index") - i.currentSlide) || 1) : i.options.slidesToScroll;
  }, e.prototype.goTo = e.prototype.slickGoTo = function (t, e) {
    this.changeSlide({
      data: {
        message: "index",
        index: parseInt(t)
      }
    }, e);
  }, e.prototype.init = function (e) {
    var n = this;
    t(n.$slider).hasClass("slick-initialized") || (t(n.$slider).addClass("slick-initialized"), n.buildRows(), n.buildOut(), n.setProps(), n.startLoad(), n.loadSlider(), n.initializeEvents(), n.updateArrows(), n.updateDots(), n.checkResponsive(!0), n.focusHandler()), e && n.$slider.trigger("init", [n]), !0 === n.options.accessibility && n.initADA(), n.options.autoplay && (n.paused = !1, n.autoPlay());
  }, e.prototype.initADA = function () {
    var e = this,
        n = Math.ceil(e.slideCount / e.options.slidesToShow),
        i = e.getNavigableIndexes().filter(function (t) {
      return t >= 0 && t < e.slideCount;
    });
    e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({
      "aria-hidden": "true",
      tabindex: "-1"
    }).find("a, input, button, select").attr({
      tabindex: "-1"
    }), null !== e.$dots && (e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function (n) {
      var o = i.indexOf(n);
      t(this).attr({
        role: "tabpanel",
        id: "slick-slide" + e.instanceUid + n,
        tabindex: -1
      }), -1 !== o && t(this).attr({
        "aria-describedby": "slick-slide-control" + e.instanceUid + o
      });
    }), e.$dots.attr("role", "tablist").find("li").each(function (o) {
      var r = i[o];
      t(this).attr({
        role: "presentation"
      }), t(this).find("button").first().attr({
        role: "tab",
        id: "slick-slide-control" + e.instanceUid + o,
        "aria-controls": "slick-slide" + e.instanceUid + r,
        "aria-label": o + 1 + " of " + n,
        "aria-selected": null,
        tabindex: "-1"
      });
    }).eq(e.currentSlide).find("button").attr({
      "aria-selected": "true",
      tabindex: "0"
    }).end());

    for (var o = e.currentSlide, r = o + e.options.slidesToShow; o < r; o++) {
      e.$slides.eq(o).attr("tabindex", 0);
    }

    e.activateADA();
  }, e.prototype.initArrowEvents = function () {
    var t = this;
    !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && (t.$prevArrow.off("click.slick").on("click.slick", {
      message: "previous"
    }, t.changeSlide), t.$nextArrow.off("click.slick").on("click.slick", {
      message: "next"
    }, t.changeSlide), !0 === t.options.accessibility && (t.$prevArrow.on("keydown.slick", t.keyHandler), t.$nextArrow.on("keydown.slick", t.keyHandler)));
  }, e.prototype.initDotEvents = function () {
    var e = this;
    !0 === e.options.dots && (t("li", e.$dots).on("click.slick", {
      message: "index"
    }, e.changeSlide), !0 === e.options.accessibility && e.$dots.on("keydown.slick", e.keyHandler)), !0 === e.options.dots && !0 === e.options.pauseOnDotsHover && t("li", e.$dots).on("mouseenter.slick", t.proxy(e.interrupt, e, !0)).on("mouseleave.slick", t.proxy(e.interrupt, e, !1));
  }, e.prototype.initSlideEvents = function () {
    var e = this;
    e.options.pauseOnHover && (e.$list.on("mouseenter.slick", t.proxy(e.interrupt, e, !0)), e.$list.on("mouseleave.slick", t.proxy(e.interrupt, e, !1)));
  }, e.prototype.initializeEvents = function () {
    var e = this;
    e.initArrowEvents(), e.initDotEvents(), e.initSlideEvents(), e.$list.on("touchstart.slick mousedown.slick", {
      action: "start"
    }, e.swipeHandler), e.$list.on("touchmove.slick mousemove.slick", {
      action: "move"
    }, e.swipeHandler), e.$list.on("touchend.slick mouseup.slick", {
      action: "end"
    }, e.swipeHandler), e.$list.on("touchcancel.slick mouseleave.slick", {
      action: "end"
    }, e.swipeHandler), e.$list.on("click.slick", e.clickHandler), t(document).on(e.visibilityChange, t.proxy(e.visibility, e)), !0 === e.options.accessibility && e.$list.on("keydown.slick", e.keyHandler), !0 === e.options.focusOnSelect && t(e.$slideTrack).children().on("click.slick", e.selectHandler), t(window).on("orientationchange.slick.slick-" + e.instanceUid, t.proxy(e.orientationChange, e)), t(window).on("resize.slick.slick-" + e.instanceUid, t.proxy(e.resize, e)), t("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault), t(window).on("load.slick.slick-" + e.instanceUid, e.setPosition), t(e.setPosition);
  }, e.prototype.initUI = function () {
    var t = this;
    !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && (t.$prevArrow.show(), t.$nextArrow.show()), !0 === t.options.dots && t.slideCount > t.options.slidesToShow && t.$dots.show();
  }, e.prototype.keyHandler = function (t) {
    var e = this;
    t.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === t.keyCode && !0 === e.options.accessibility ? e.changeSlide({
      data: {
        message: !0 === e.options.rtl ? "next" : "previous"
      }
    }) : 39 === t.keyCode && !0 === e.options.accessibility && e.changeSlide({
      data: {
        message: !0 === e.options.rtl ? "previous" : "next"
      }
    }));
  }, e.prototype.lazyLoad = function () {
    function e(e) {
      t("img[data-lazy]", e).each(function () {
        var e = t(this),
            n = t(this).attr("data-lazy"),
            i = t(this).attr("data-srcset"),
            o = t(this).attr("data-sizes") || r.$slider.attr("data-sizes"),
            s = document.createElement("img");
        s.onload = function () {
          e.animate({
            opacity: 0
          }, 100, function () {
            i && (e.attr("srcset", i), o && e.attr("sizes", o)), e.attr("src", n).animate({
              opacity: 1
            }, 200, function () {
              e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading");
            }), r.$slider.trigger("lazyLoaded", [r, e, n]);
          });
        }, s.onerror = function () {
          e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), r.$slider.trigger("lazyLoadError", [r, e, n]);
        }, s.src = n;
      });
    }

    var n,
        i,
        o,
        r = this;
    if (!0 === r.options.centerMode ? !0 === r.options.infinite ? o = (i = r.currentSlide + (r.options.slidesToShow / 2 + 1)) + r.options.slidesToShow + 2 : (i = Math.max(0, r.currentSlide - (r.options.slidesToShow / 2 + 1)), o = r.options.slidesToShow / 2 + 1 + 2 + r.currentSlide) : (i = r.options.infinite ? r.options.slidesToShow + r.currentSlide : r.currentSlide, o = Math.ceil(i + r.options.slidesToShow), !0 === r.options.fade && (i > 0 && i--, o <= r.slideCount && o++)), n = r.$slider.find(".slick-slide").slice(i, o), "anticipated" === r.options.lazyLoad) for (var s = i - 1, a = o, l = r.$slider.find(".slick-slide"), c = 0; c < r.options.slidesToScroll; c++) {
      s < 0 && (s = r.slideCount - 1), n = (n = n.add(l.eq(s))).add(l.eq(a)), s--, a++;
    }
    e(n), r.slideCount <= r.options.slidesToShow ? e(r.$slider.find(".slick-slide")) : r.currentSlide >= r.slideCount - r.options.slidesToShow ? e(r.$slider.find(".slick-cloned").slice(0, r.options.slidesToShow)) : 0 === r.currentSlide && e(r.$slider.find(".slick-cloned").slice(-1 * r.options.slidesToShow));
  }, e.prototype.loadSlider = function () {
    var t = this;
    t.setPosition(), t.$slideTrack.css({
      opacity: 1
    }), t.$slider.removeClass("slick-loading"), t.initUI(), "progressive" === t.options.lazyLoad && t.progressiveLazyLoad();
  }, e.prototype.next = e.prototype.slickNext = function () {
    this.changeSlide({
      data: {
        message: "next"
      }
    });
  }, e.prototype.orientationChange = function () {
    this.checkResponsive(), this.setPosition();
  }, e.prototype.pause = e.prototype.slickPause = function () {
    this.autoPlayClear(), this.paused = !0;
  }, e.prototype.play = e.prototype.slickPlay = function () {
    var t = this;
    t.autoPlay(), t.options.autoplay = !0, t.paused = !1, t.focussed = !1, t.interrupted = !1;
  }, e.prototype.postSlide = function (e) {
    var n = this;
    n.unslicked || (n.$slider.trigger("afterChange", [n, e]), n.animating = !1, n.slideCount > n.options.slidesToShow && n.setPosition(), n.swipeLeft = null, n.options.autoplay && n.autoPlay(), !0 === n.options.accessibility && (n.initADA(), n.options.focusOnChange && t(n.$slides.get(n.currentSlide)).attr("tabindex", 0).focus()));
  }, e.prototype.prev = e.prototype.slickPrev = function () {
    this.changeSlide({
      data: {
        message: "previous"
      }
    });
  }, e.prototype.preventDefault = function (t) {
    t.preventDefault();
  }, e.prototype.progressiveLazyLoad = function (e) {
    e = e || 1;
    var n,
        i,
        o,
        r,
        s,
        a = this,
        l = t("img[data-lazy]", a.$slider);
    l.length ? (n = l.first(), i = n.attr("data-lazy"), o = n.attr("data-srcset"), r = n.attr("data-sizes") || a.$slider.attr("data-sizes"), (s = document.createElement("img")).onload = function () {
      o && (n.attr("srcset", o), r && n.attr("sizes", r)), n.attr("src", i).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"), !0 === a.options.adaptiveHeight && a.setPosition(), a.$slider.trigger("lazyLoaded", [a, n, i]), a.progressiveLazyLoad();
    }, s.onerror = function () {
      e < 3 ? setTimeout(function () {
        a.progressiveLazyLoad(e + 1);
      }, 500) : (n.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), a.$slider.trigger("lazyLoadError", [a, n, i]), a.progressiveLazyLoad());
    }, s.src = i) : a.$slider.trigger("allImagesLoaded", [a]);
  }, e.prototype.refresh = function (e) {
    var n,
        i,
        o = this;
    i = o.slideCount - o.options.slidesToShow, !o.options.infinite && o.currentSlide > i && (o.currentSlide = i), o.slideCount <= o.options.slidesToShow && (o.currentSlide = 0), n = o.currentSlide, o.destroy(!0), t.extend(o, o.initials, {
      currentSlide: n
    }), o.init(), e || o.changeSlide({
      data: {
        message: "index",
        index: n
      }
    }, !1);
  }, e.prototype.registerBreakpoints = function () {
    var e,
        n,
        i,
        o = this,
        r = o.options.responsive || null;

    if ("array" === t.type(r) && r.length) {
      for (e in o.respondTo = o.options.respondTo || "window", r) {
        if (i = o.breakpoints.length - 1, r.hasOwnProperty(e)) {
          for (n = r[e].breakpoint; i >= 0;) {
            o.breakpoints[i] && o.breakpoints[i] === n && o.breakpoints.splice(i, 1), i--;
          }

          o.breakpoints.push(n), o.breakpointSettings[n] = r[e].settings;
        }
      }

      o.breakpoints.sort(function (t, e) {
        return o.options.mobileFirst ? t - e : e - t;
      });
    }
  }, e.prototype.reinit = function () {
    var e = this;
    e.$slides = e.$slideTrack.children(e.options.slide).addClass("slick-slide"), e.slideCount = e.$slides.length, e.currentSlide >= e.slideCount && 0 !== e.currentSlide && (e.currentSlide = e.currentSlide - e.options.slidesToScroll), e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0), e.registerBreakpoints(), e.setProps(), e.setupInfinite(), e.buildArrows(), e.updateArrows(), e.initArrowEvents(), e.buildDots(), e.updateDots(), e.initDotEvents(), e.cleanUpSlideEvents(), e.initSlideEvents(), e.checkResponsive(!1, !0), !0 === e.options.focusOnSelect && t(e.$slideTrack).children().on("click.slick", e.selectHandler), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), e.setPosition(), e.focusHandler(), e.paused = !e.options.autoplay, e.autoPlay(), e.$slider.trigger("reInit", [e]);
  }, e.prototype.resize = function () {
    var e = this;
    t(window).width() !== e.windowWidth && (clearTimeout(e.windowDelay), e.windowDelay = window.setTimeout(function () {
      e.windowWidth = t(window).width(), e.checkResponsive(), e.unslicked || e.setPosition();
    }, 50));
  }, e.prototype.removeSlide = e.prototype.slickRemove = function (t, e, n) {
    var i = this;
    if (t = "boolean" == typeof t ? !0 === (e = t) ? 0 : i.slideCount - 1 : !0 === e ? --t : t, i.slideCount < 1 || t < 0 || t > i.slideCount - 1) return !1;
    i.unload(), !0 === n ? i.$slideTrack.children().remove() : i.$slideTrack.children(this.options.slide).eq(t).remove(), i.$slides = i.$slideTrack.children(this.options.slide), i.$slideTrack.children(this.options.slide).detach(), i.$slideTrack.append(i.$slides), i.$slidesCache = i.$slides, i.reinit();
  }, e.prototype.setCSS = function (t) {
    var e,
        n,
        i = this,
        o = {};
    !0 === i.options.rtl && (t = -t), e = "left" == i.positionProp ? Math.ceil(t) + "px" : "0px", n = "top" == i.positionProp ? Math.ceil(t) + "px" : "0px", o[i.positionProp] = t, !1 === i.transformsEnabled ? i.$slideTrack.css(o) : (o = {}, !1 === i.cssTransitions ? (o[i.animType] = "translate(" + e + ", " + n + ")", i.$slideTrack.css(o)) : (o[i.animType] = "translate3d(" + e + ", " + n + ", 0px)", i.$slideTrack.css(o)));
  }, e.prototype.setDimensions = function () {
    var t = this;
    !1 === t.options.vertical ? !0 === t.options.centerMode && t.$list.css({
      padding: "0px " + t.options.centerPadding
    }) : (t.$list.height(t.$slides.first().outerHeight(!0) * t.options.slidesToShow), !0 === t.options.centerMode && t.$list.css({
      padding: t.options.centerPadding + " 0px"
    })), t.listWidth = t.$list.width(), t.listHeight = t.$list.height(), !1 === t.options.vertical && !1 === t.options.variableWidth ? (t.slideWidth = Math.ceil(t.listWidth / t.options.slidesToShow), t.$slideTrack.width(Math.ceil(t.slideWidth * t.$slideTrack.children(".slick-slide").length))) : !0 === t.options.variableWidth ? t.$slideTrack.width(5e3 * t.slideCount) : (t.slideWidth = Math.ceil(t.listWidth), t.$slideTrack.height(Math.ceil(t.$slides.first().outerHeight(!0) * t.$slideTrack.children(".slick-slide").length)));
    var e = t.$slides.first().outerWidth(!0) - t.$slides.first().width();
    !1 === t.options.variableWidth && t.$slideTrack.children(".slick-slide").width(t.slideWidth - e);
  }, e.prototype.setFade = function () {
    var e,
        n = this;
    n.$slides.each(function (i, o) {
      e = n.slideWidth * i * -1, !0 === n.options.rtl ? t(o).css({
        position: "relative",
        right: e,
        top: 0,
        zIndex: n.options.zIndex - 2,
        opacity: 0
      }) : t(o).css({
        position: "relative",
        left: e,
        top: 0,
        zIndex: n.options.zIndex - 2,
        opacity: 0
      });
    }), n.$slides.eq(n.currentSlide).css({
      zIndex: n.options.zIndex - 1,
      opacity: 1
    });
  }, e.prototype.setHeight = function () {
    var t = this;

    if (1 === t.options.slidesToShow && !0 === t.options.adaptiveHeight && !1 === t.options.vertical) {
      var e = t.$slides.eq(t.currentSlide).outerHeight(!0);
      t.$list.css("height", e);
    }
  }, e.prototype.setOption = e.prototype.slickSetOption = function () {
    var e,
        n,
        i,
        o,
        r,
        s = this,
        a = !1;
    if ("object" === t.type(arguments[0]) ? (i = arguments[0], a = arguments[1], r = "multiple") : "string" === t.type(arguments[0]) && (i = arguments[0], o = arguments[1], a = arguments[2], "responsive" === arguments[0] && "array" === t.type(arguments[1]) ? r = "responsive" : void 0 !== arguments[1] && (r = "single")), "single" === r) s.options[i] = o;else if ("multiple" === r) t.each(i, function (t, e) {
      s.options[t] = e;
    });else if ("responsive" === r) for (n in o) {
      if ("array" !== t.type(s.options.responsive)) s.options.responsive = [o[n]];else {
        for (e = s.options.responsive.length - 1; e >= 0;) {
          s.options.responsive[e].breakpoint === o[n].breakpoint && s.options.responsive.splice(e, 1), e--;
        }

        s.options.responsive.push(o[n]);
      }
    }
    a && (s.unload(), s.reinit());
  }, e.prototype.setPosition = function () {
    var t = this;
    t.setDimensions(), t.setHeight(), !1 === t.options.fade ? t.setCSS(t.getLeft(t.currentSlide)) : t.setFade(), t.$slider.trigger("setPosition", [t]);
  }, e.prototype.setProps = function () {
    var t = this,
        e = document.body.style;
    t.positionProp = !0 === t.options.vertical ? "top" : "left", "top" === t.positionProp ? t.$slider.addClass("slick-vertical") : t.$slider.removeClass("slick-vertical"), void 0 === e.WebkitTransition && void 0 === e.MozTransition && void 0 === e.msTransition || !0 === t.options.useCSS && (t.cssTransitions = !0), t.options.fade && ("number" == typeof t.options.zIndex ? t.options.zIndex < 3 && (t.options.zIndex = 3) : t.options.zIndex = t.defaults.zIndex), void 0 !== e.OTransform && (t.animType = "OTransform", t.transformType = "-o-transform", t.transitionType = "OTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (t.animType = !1)), void 0 !== e.MozTransform && (t.animType = "MozTransform", t.transformType = "-moz-transform", t.transitionType = "MozTransition", void 0 === e.perspectiveProperty && void 0 === e.MozPerspective && (t.animType = !1)), void 0 !== e.webkitTransform && (t.animType = "webkitTransform", t.transformType = "-webkit-transform", t.transitionType = "webkitTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (t.animType = !1)), void 0 !== e.msTransform && (t.animType = "msTransform", t.transformType = "-ms-transform", t.transitionType = "msTransition", void 0 === e.msTransform && (t.animType = !1)), void 0 !== e.transform && !1 !== t.animType && (t.animType = "transform", t.transformType = "transform", t.transitionType = "transition"), t.transformsEnabled = t.options.useTransform && null !== t.animType && !1 !== t.animType;
  }, e.prototype.setSlideClasses = function (t) {
    var e,
        n,
        i,
        o,
        r = this;

    if (n = r.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), r.$slides.eq(t).addClass("slick-current"), !0 === r.options.centerMode) {
      var s = r.options.slidesToShow % 2 == 0 ? 1 : 0;
      e = Math.floor(r.options.slidesToShow / 2), !0 === r.options.infinite && (t >= e && t <= r.slideCount - 1 - e ? r.$slides.slice(t - e + s, t + e + 1).addClass("slick-active").attr("aria-hidden", "false") : (i = r.options.slidesToShow + t, n.slice(i - e + 1 + s, i + e + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === t ? n.eq(n.length - 1 - r.options.slidesToShow).addClass("slick-center") : t === r.slideCount - 1 && n.eq(r.options.slidesToShow).addClass("slick-center")), r.$slides.eq(t).addClass("slick-center");
    } else t >= 0 && t <= r.slideCount - r.options.slidesToShow ? r.$slides.slice(t, t + r.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : n.length <= r.options.slidesToShow ? n.addClass("slick-active").attr("aria-hidden", "false") : (o = r.slideCount % r.options.slidesToShow, i = !0 === r.options.infinite ? r.options.slidesToShow + t : t, r.options.slidesToShow == r.options.slidesToScroll && r.slideCount - t < r.options.slidesToShow ? n.slice(i - (r.options.slidesToShow - o), i + o).addClass("slick-active").attr("aria-hidden", "false") : n.slice(i, i + r.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false"));

    "ondemand" !== r.options.lazyLoad && "anticipated" !== r.options.lazyLoad || r.lazyLoad();
  }, e.prototype.setupInfinite = function () {
    var e,
        n,
        i,
        o = this;

    if (!0 === o.options.fade && (o.options.centerMode = !1), !0 === o.options.infinite && !1 === o.options.fade && (n = null, o.slideCount > o.options.slidesToShow)) {
      for (i = !0 === o.options.centerMode ? o.options.slidesToShow + 1 : o.options.slidesToShow, e = o.slideCount; e > o.slideCount - i; e -= 1) {
        n = e - 1, t(o.$slides[n]).clone(!0).attr("id", "").attr("data-slick-index", n - o.slideCount).prependTo(o.$slideTrack).addClass("slick-cloned");
      }

      for (e = 0; e < i + o.slideCount; e += 1) {
        n = e, t(o.$slides[n]).clone(!0).attr("id", "").attr("data-slick-index", n + o.slideCount).appendTo(o.$slideTrack).addClass("slick-cloned");
      }

      o.$slideTrack.find(".slick-cloned").find("[id]").each(function () {
        t(this).attr("id", "");
      });
    }
  }, e.prototype.interrupt = function (t) {
    t || this.autoPlay(), this.interrupted = t;
  }, e.prototype.selectHandler = function (e) {
    var n = this,
        i = t(e.target).is(".slick-slide") ? t(e.target) : t(e.target).parents(".slick-slide"),
        o = parseInt(i.attr("data-slick-index"));
    o || (o = 0), n.slideCount <= n.options.slidesToShow ? n.slideHandler(o, !1, !0) : n.slideHandler(o);
  }, e.prototype.slideHandler = function (t, e, n) {
    var i,
        o,
        r,
        s,
        a,
        l = null,
        c = this;
    if (e = e || !1, !(!0 === c.animating && !0 === c.options.waitForAnimate || !0 === c.options.fade && c.currentSlide === t)) if (!1 === e && c.asNavFor(t), i = t, l = c.getLeft(i), s = c.getLeft(c.currentSlide), c.currentLeft = null === c.swipeLeft ? s : c.swipeLeft, !1 === c.options.infinite && !1 === c.options.centerMode && (t < 0 || t > c.getDotCount() * c.options.slidesToScroll)) !1 === c.options.fade && (i = c.currentSlide, !0 !== n ? c.animateSlide(s, function () {
      c.postSlide(i);
    }) : c.postSlide(i));else if (!1 === c.options.infinite && !0 === c.options.centerMode && (t < 0 || t > c.slideCount - c.options.slidesToScroll)) !1 === c.options.fade && (i = c.currentSlide, !0 !== n ? c.animateSlide(s, function () {
      c.postSlide(i);
    }) : c.postSlide(i));else {
      if (c.options.autoplay && clearInterval(c.autoPlayTimer), o = i < 0 ? c.slideCount % c.options.slidesToScroll != 0 ? c.slideCount - c.slideCount % c.options.slidesToScroll : c.slideCount + i : i >= c.slideCount ? c.slideCount % c.options.slidesToScroll != 0 ? 0 : i - c.slideCount : i, c.animating = !0, c.$slider.trigger("beforeChange", [c, c.currentSlide, o]), r = c.currentSlide, c.currentSlide = o, c.setSlideClasses(c.currentSlide), c.options.asNavFor && (a = (a = c.getNavTarget()).slick("getSlick")).slideCount <= a.options.slidesToShow && a.setSlideClasses(c.currentSlide), c.updateDots(), c.updateArrows(), !0 === c.options.fade) return !0 !== n ? (c.fadeSlideOut(r), c.fadeSlide(o, function () {
        c.postSlide(o);
      })) : c.postSlide(o), void c.animateHeight();
      !0 !== n ? c.animateSlide(l, function () {
        c.postSlide(o);
      }) : c.postSlide(o);
    }
  }, e.prototype.startLoad = function () {
    var t = this;
    !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && (t.$prevArrow.hide(), t.$nextArrow.hide()), !0 === t.options.dots && t.slideCount > t.options.slidesToShow && t.$dots.hide(), t.$slider.addClass("slick-loading");
  }, e.prototype.swipeDirection = function () {
    var t,
        e,
        n,
        i,
        o = this;
    return t = o.touchObject.startX - o.touchObject.curX, e = o.touchObject.startY - o.touchObject.curY, n = Math.atan2(e, t), (i = Math.round(180 * n / Math.PI)) < 0 && (i = 360 - Math.abs(i)), i <= 45 && i >= 0 || i <= 360 && i >= 315 ? !1 === o.options.rtl ? "left" : "right" : i >= 135 && i <= 225 ? !1 === o.options.rtl ? "right" : "left" : !0 === o.options.verticalSwiping ? i >= 35 && i <= 135 ? "down" : "up" : "vertical";
  }, e.prototype.swipeEnd = function (t) {
    var e,
        n,
        i = this;
    if (i.dragging = !1, i.swiping = !1, i.scrolling) return i.scrolling = !1, !1;
    if (i.interrupted = !1, i.shouldClick = !(i.touchObject.swipeLength > 10), void 0 === i.touchObject.curX) return !1;

    if (!0 === i.touchObject.edgeHit && i.$slider.trigger("edge", [i, i.swipeDirection()]), i.touchObject.swipeLength >= i.touchObject.minSwipe) {
      switch (n = i.swipeDirection()) {
        case "left":
        case "down":
          e = i.options.swipeToSlide ? i.checkNavigable(i.currentSlide + i.getSlideCount()) : i.currentSlide + i.getSlideCount(), i.currentDirection = 0;
          break;

        case "right":
        case "up":
          e = i.options.swipeToSlide ? i.checkNavigable(i.currentSlide - i.getSlideCount()) : i.currentSlide - i.getSlideCount(), i.currentDirection = 1;
      }

      "vertical" != n && (i.slideHandler(e), i.touchObject = {}, i.$slider.trigger("swipe", [i, n]));
    } else i.touchObject.startX !== i.touchObject.curX && (i.slideHandler(i.currentSlide), i.touchObject = {});
  }, e.prototype.swipeHandler = function (t) {
    var e = this;
    if (!(!1 === e.options.swipe || "ontouchend" in document && !1 === e.options.swipe || !1 === e.options.draggable && -1 !== t.type.indexOf("mouse"))) switch (e.touchObject.fingerCount = t.originalEvent && void 0 !== t.originalEvent.touches ? t.originalEvent.touches.length : 1, e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold, !0 === e.options.verticalSwiping && (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold), t.data.action) {
      case "start":
        e.swipeStart(t);
        break;

      case "move":
        e.swipeMove(t);
        break;

      case "end":
        e.swipeEnd(t);
    }
  }, e.prototype.swipeMove = function (t) {
    var e,
        n,
        i,
        o,
        r,
        s,
        a = this;
    return r = void 0 !== t.originalEvent ? t.originalEvent.touches : null, !(!a.dragging || a.scrolling || r && 1 !== r.length) && (e = a.getLeft(a.currentSlide), a.touchObject.curX = void 0 !== r ? r[0].pageX : t.clientX, a.touchObject.curY = void 0 !== r ? r[0].pageY : t.clientY, a.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(a.touchObject.curX - a.touchObject.startX, 2))), s = Math.round(Math.sqrt(Math.pow(a.touchObject.curY - a.touchObject.startY, 2))), !a.options.verticalSwiping && !a.swiping && s > 4 ? (a.scrolling = !0, !1) : (!0 === a.options.verticalSwiping && (a.touchObject.swipeLength = s), n = a.swipeDirection(), void 0 !== t.originalEvent && a.touchObject.swipeLength > 4 && (a.swiping = !0, t.preventDefault()), o = (!1 === a.options.rtl ? 1 : -1) * (a.touchObject.curX > a.touchObject.startX ? 1 : -1), !0 === a.options.verticalSwiping && (o = a.touchObject.curY > a.touchObject.startY ? 1 : -1), i = a.touchObject.swipeLength, a.touchObject.edgeHit = !1, !1 === a.options.infinite && (0 === a.currentSlide && "right" === n || a.currentSlide >= a.getDotCount() && "left" === n) && (i = a.touchObject.swipeLength * a.options.edgeFriction, a.touchObject.edgeHit = !0), !1 === a.options.vertical ? a.swipeLeft = e + i * o : a.swipeLeft = e + i * (a.$list.height() / a.listWidth) * o, !0 === a.options.verticalSwiping && (a.swipeLeft = e + i * o), !0 !== a.options.fade && !1 !== a.options.touchMove && (!0 === a.animating ? (a.swipeLeft = null, !1) : void a.setCSS(a.swipeLeft))));
  }, e.prototype.swipeStart = function (t) {
    var e,
        n = this;
    if (n.interrupted = !0, 1 !== n.touchObject.fingerCount || n.slideCount <= n.options.slidesToShow) return n.touchObject = {}, !1;
    void 0 !== t.originalEvent && void 0 !== t.originalEvent.touches && (e = t.originalEvent.touches[0]), n.touchObject.startX = n.touchObject.curX = void 0 !== e ? e.pageX : t.clientX, n.touchObject.startY = n.touchObject.curY = void 0 !== e ? e.pageY : t.clientY, n.dragging = !0;
  }, e.prototype.unfilterSlides = e.prototype.slickUnfilter = function () {
    var t = this;
    null !== t.$slidesCache && (t.unload(), t.$slideTrack.children(this.options.slide).detach(), t.$slidesCache.appendTo(t.$slideTrack), t.reinit());
  }, e.prototype.unload = function () {
    var e = this;
    t(".slick-cloned", e.$slider).remove(), e.$dots && e.$dots.remove(), e.$prevArrow && e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove(), e.$nextArrow && e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove(), e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "");
  }, e.prototype.unslick = function (t) {
    var e = this;
    e.$slider.trigger("unslick", [e, t]), e.destroy();
  }, e.prototype.updateArrows = function () {
    var t = this;
    Math.floor(t.options.slidesToShow / 2), !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && !t.options.infinite && (t.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), t.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === t.currentSlide ? (t.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), t.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : (t.currentSlide >= t.slideCount - t.options.slidesToShow && !1 === t.options.centerMode || t.currentSlide >= t.slideCount - 1 && !0 === t.options.centerMode) && (t.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), t.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")));
  }, e.prototype.updateDots = function () {
    var t = this;
    null !== t.$dots && (t.$dots.find("li").removeClass("slick-active").end(), t.$dots.find("li").eq(Math.floor(t.currentSlide / t.options.slidesToScroll)).addClass("slick-active"));
  }, e.prototype.visibility = function () {
    var t = this;
    t.options.autoplay && (document[t.hidden] ? t.interrupted = !0 : t.interrupted = !1);
  }, t.fn.slick = function () {
    var t,
        n,
        i = this,
        o = arguments[0],
        r = Array.prototype.slice.call(arguments, 1),
        s = i.length;

    for (t = 0; t < s; t++) {
      if ("object" == _typeof(o) || void 0 === o ? i[t].slick = new e(i[t], o) : n = i[t].slick[o].apply(i[t].slick, r), void 0 !== n) return n;
    }

    return i;
  };
}), function (t) {
  "use strict";

  var _e2 = null,
      n = null;
  !function () {
    var e = ["webkit", "moz", "o", "ms"],
        n = t.document.createElement("div"),
        i = -1;

    for (i = 0; i < e.length && !t.requestAnimationFrame; i++) {
      t.requestAnimationFrame = t[e[i] + "RequestAnimationFrame"];
    }

    void 0 === n.nextElementSibling && Object.defineProperty(t.Element.prototype, "nextElementSibling", {
      get: function get() {
        for (var t = this.nextSibling; t;) {
          if (1 === t.nodeType) return t;
          t = t.nextSibling;
        }

        return null;
      }
    }), function (t) {
      t.matches = t.matches || t.machesSelector || t.mozMatchesSelector || t.msMatchesSelector || t.oMatchesSelector || t.webkitMatchesSelector || function (t) {
        return Array.prototype.indexOf.call(this.parentElement.querySelectorAll(t), this) > -1;
      };
    }(t.Element.prototype), Object.keys || (Object.keys = function () {
      var t,
          e,
          n,
          i = Object.prototype.hasOwnProperty;
      return t = !{
        toString: null
      }.propertyIsEnumerable("toString"), n = (e = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"]).length, function (o) {
        var r = [],
            s = "",
            a = -1;
        if ("object" != _typeof(o) && ("function" != typeof o || null === o)) throw new TypeError("Object.keys called on non-object");

        for (s in o) {
          i.call(o, s) && r.push(s);
        }

        if (t) for (a = 0; a < n; a++) {
          i.call(o, e[a]) && r.push(e[a]);
        }
        return r;
      };
    }()), Array.isArray || (Array.isArray = function (t) {
      return "[object Array]" === Object.prototype.toString.call(t);
    }), "function" != typeof Object.create && (Object.create = function (t) {
      var e = function e() {};

      return function (t, n) {
        if (t !== Object(t) && null !== t) throw TypeError("Argument must be an object, or null");
        e.prototype = t || {};
        var i = new e();
        return e.prototype = null, void 0 !== n && Object.defineProperties(i, n), null === t && (i.__proto__ = null), i;
      };
    }()), String.prototype.trim || (String.prototype.trim = function () {
      return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
    }), Array.prototype.indexOf || (Array.prototype.indexOf = function (t) {
      var e, n, i, o;
      if (null === this) throw new TypeError();
      if (0 === (o = (i = Object(this)).length >>> 0)) return -1;
      if (e = 0, arguments.length > 1 && ((e = Number(arguments[1])) != e ? e = 0 : 0 !== e && e !== 1 / 0 && e !== -1 / 0 && (e = (e > 0 || -1) * Math.floor(Math.abs(e)))), e >= o) return -1;

      for (n = e >= 0 ? e : Math.max(o - Math.abs(e), 0); n < o; n++) {
        if (n in i && i[n] === t) return n;
      }

      return -1;
    }), Function.prototype.bind || (Function.prototype.bind = function (t) {
      var e, n, i, o;
      if ("function" != typeof this) throw new TypeError();
      return e = Array.prototype.slice.call(arguments, 1), n = this, i = function i() {}, o = function o() {
        return n.apply(this instanceof i ? this : t, e.concat(Array.prototype.slice.call(arguments)));
      }, this.prototype && (i.prototype = this.prototype), o.prototype = new i(), o;
    }), t.Element.prototype.dispatchEvent || (t.Element.prototype.dispatchEvent = function (t) {
      try {
        return this.fireEvent("on" + t.type, t);
      } catch (t) {}
    });
  }(), (_e2 = function e(i, o, r) {
    var s = null,
        a = !1,
        l = null,
        c = null,
        u = null,
        d = [],
        p = "",
        f = [],
        h = -1;
    if (u = r || t.document, (a = arguments[3]) && (a = "boolean" == typeof a), "string" == typeof i) f = u.querySelectorAll(i);else if (i && "object" == _typeof(i) && n.isElement(i, u)) f = [i];else {
      if (!i || "object" != _typeof(i) || !i.length) throw new Error(_e2.messages.errorFactoryInvalidContainer());
      f = i;
    }
    if (f.length < 1) throw new Error(_e2.messages.errorFactoryContainerNotFound());

    for (h = 0; (s = f[h]) && (!(h > 0) || a); h++) {
      s.id ? p = s.id : (p = "MixItUp" + n.randomHex(), s.id = p), _e2.instances[p] instanceof _e2.Mixer ? (l = _e2.instances[p], (!o || o && o.debug && !1 !== o.debug.showWarnings) && console.warn(_e2.messages.warningFactoryPreexistingInstance())) : ((l = new _e2.Mixer()).attach(s, u, p, o), _e2.instances[p] = l), c = new _e2.Facade(l), o && o.debug && o.debug.enable ? d.push(l) : d.push(c);
    }

    return a ? new _e2.Collection(d) : d[0];
  }).use = function (t) {
    _e2.Base.prototype.callActions.call(_e2, "beforeUse", arguments), "function" == typeof t && "mixitup-extension" === t.TYPE ? void 0 === _e2.extensions[t.NAME] && (t(_e2), _e2.extensions[t.NAME] = t) : t.fn && t.fn.jquery && (_e2.libraries.$ = t), _e2.Base.prototype.callActions.call(_e2, "afterUse", arguments);
  }, _e2.instances = {}, _e2.extensions = {}, _e2.libraries = {}, n = {
    hasClass: function hasClass(t, e) {
      return !!t.className.match(new RegExp("(\\s|^)" + e + "(\\s|$)"));
    },
    addClass: function addClass(t, e) {
      this.hasClass(t, e) || (t.className += t.className ? " " + e : e);
    },
    removeClass: function removeClass(t, e) {
      if (this.hasClass(t, e)) {
        var n = new RegExp("(\\s|^)" + e + "(\\s|$)");
        t.className = t.className.replace(n, " ").trim();
      }
    },
    extend: function extend(t, e, n, i) {
      var o = [],
          r = "",
          s = -1;
      n = n || !1, i = i || !1;

      try {
        if (Array.isArray(e)) for (s = 0; s < e.length; s++) {
          o.push(s);
        } else e && (o = Object.keys(e));

        for (s = 0; s < o.length; s++) {
          r = o[s], !n || "object" != _typeof(e[r]) || this.isElement(e[r]) ? t[r] = e[r] : Array.isArray(e[r]) ? (t[r] || (t[r] = []), this.extend(t[r], e[r], n, i)) : (t[r] || (t[r] = {}), this.extend(t[r], e[r], n, i));
        }
      } catch (e) {
        if (!i) throw e;
        this.handleExtendError(e, t);
      }

      return t;
    },
    handleExtendError: function handleExtendError(t, n) {
      var i = null,
          o = "",
          r = "",
          s = "",
          a = "",
          l = "",
          c = -1,
          u = -1;

      if (t instanceof TypeError && (i = /property "?(\w*)"?[,:] object/i.exec(t.message))) {
        for (l in o = i[1], n) {
          for (u = 0; u < o.length && o.charAt(u) === l.charAt(u);) {
            u++;
          }

          u > c && (c = u, a = l);
        }

        throw c > 1 && (s = _e2.messages.errorConfigInvalidPropertySuggestion({
          probableMatch: a
        })), r = _e2.messages.errorConfigInvalidProperty({
          erroneous: o,
          suggestion: s
        }), new TypeError(r);
      }

      throw t;
    },
    template: function template(t) {
      for (var e = /\${([\w]*)}/g, n = {}, i = null; i = e.exec(t);) {
        n[i[1]] = new RegExp("\\${" + i[1] + "}", "g");
      }

      return function (e) {
        var i = "",
            o = t;

        for (i in e = e || {}, n) {
          o = o.replace(n[i], void 0 !== e[i] ? e[i] : "");
        }

        return o;
      };
    },
    on: function on(e, n, i, o) {
      e && (e.addEventListener ? e.addEventListener(n, i, o) : e.attachEvent && (e["e" + n + i] = i, e[n + i] = function () {
        e["e" + n + i](t.event);
      }, e.attachEvent("on" + n, e[n + i])));
    },
    off: function off(t, e, n) {
      t && (t.removeEventListener ? t.removeEventListener(e, n, !1) : t.detachEvent && (t.detachEvent("on" + e, t[e + n]), t[e + n] = null));
    },
    getCustomEvent: function getCustomEvent(e, n, i) {
      var o = null;
      return i = i || t.document, "function" == typeof t.CustomEvent ? o = new t.CustomEvent(e, {
        detail: n,
        bubbles: !0,
        cancelable: !0
      }) : "function" == typeof i.createEvent ? (o = i.createEvent("CustomEvent")).initCustomEvent(e, !0, !0, n) : ((o = i.createEventObject()).type = e, o.returnValue = !1, o.cancelBubble = !1, o.detail = n), o;
    },
    getOriginalEvent: function getOriginalEvent(t) {
      return t.touches && t.touches.length ? t.touches[0] : t.changedTouches && t.changedTouches.length ? t.changedTouches[0] : t;
    },
    index: function index(t, e) {
      for (var n = 0; null !== (t = t.previousElementSibling);) {
        e && !t.matches(e) || ++n;
      }

      return n;
    },
    camelCase: function camelCase(t) {
      return t.toLowerCase().replace(/([_-][a-z])/g, function (t) {
        return t.toUpperCase().replace(/[_-]/, "");
      });
    },
    pascalCase: function pascalCase(t) {
      return (t = this.camelCase(t)).charAt(0).toUpperCase() + t.slice(1);
    },
    dashCase: function dashCase(t) {
      return t.replace(/([A-Z])/g, "-$1").replace(/^-/, "").toLowerCase();
    },
    isElement: function isElement(e, n) {
      return n = n || t.document, !!(t.HTMLElement && e instanceof t.HTMLElement) || !!(n.defaultView && n.defaultView.HTMLElement && e instanceof n.defaultView.HTMLElement) || null !== e && 1 === e.nodeType && "string" == typeof e.nodeName;
    },
    createElement: function createElement(e, n) {
      var i = null,
          o = null;

      for (i = (n = n || t.document).createDocumentFragment(), (o = n.createElement("div")).innerHTML = e.trim(); o.firstChild;) {
        i.appendChild(o.firstChild);
      }

      return i;
    },
    removeWhitespace: function removeWhitespace(t) {
      for (var e; t && "#text" === t.nodeName;) {
        e = t, t = t.previousSibling, e.parentElement && e.parentElement.removeChild(e);
      }
    },
    isEqualArray: function isEqualArray(t, e) {
      var n = t.length;
      if (n !== e.length) return !1;

      for (; n--;) {
        if (t[n] !== e[n]) return !1;
      }

      return !0;
    },
    deepEquals: function deepEquals(t, e) {
      var n;

      if ("object" == _typeof(t) && t && "object" == _typeof(e) && e) {
        if (Object.keys(t).length !== Object.keys(e).length) return !1;

        for (n in t) {
          if (!e.hasOwnProperty(n) || !this.deepEquals(t[n], e[n])) return !1;
        }
      } else if (t !== e) return !1;

      return !0;
    },
    arrayShuffle: function arrayShuffle(t) {
      for (var e = t.slice(), n = e.length, i = n, o = -1, r = []; i--;) {
        o = ~~(Math.random() * n), r = e[i], e[i] = e[o], e[o] = r;
      }

      return e;
    },
    arrayFromList: function arrayFromList(t) {
      var e, n;

      try {
        return Array.prototype.slice.call(t);
      } catch (i) {
        for (e = [], n = 0; n < t.length; n++) {
          e.push(t[n]);
        }

        return e;
      }
    },
    debounce: function debounce(t, e, n) {
      var i;
      return function () {
        var o = this,
            r = arguments,
            s = n && !i,
            a = null;
        a = function a() {
          i = null, n || t.apply(o, r);
        }, clearTimeout(i), i = setTimeout(a, e), s && t.apply(o, r);
      };
    },
    position: function position(t) {
      for (var e = 0, n = 0, i = t; t;) {
        e -= t.scrollLeft, n -= t.scrollTop, t === i && (e += t.offsetLeft, n += t.offsetTop, i = t.offsetParent), t = t.parentElement;
      }

      return {
        x: e,
        y: n
      };
    },
    getHypotenuse: function getHypotenuse(t, e) {
      var n = t.x - e.x,
          i = t.y - e.y;
      return n = n < 0 ? -1 * n : n, i = i < 0 ? -1 * i : i, Math.sqrt(Math.pow(n, 2) + Math.pow(i, 2));
    },
    getIntersectionRatio: function getIntersectionRatio(t, e) {
      var n,
          i = t.width * t.height;
      return n = Math.max(0, Math.min(t.left + t.width, e.left + e.width) - Math.max(t.left, e.left)), Math.max(0, Math.min(t.top + t.height, e.top + e.height) - Math.max(t.top, e.top)) * n / i;
    },
    closestParent: function closestParent(e, n, i, o) {
      var r = e.parentNode;
      if (o = o || t.document, i && e.matches(n)) return e;

      for (; r && r != o.body;) {
        if (r.matches && r.matches(n)) return r;
        if (!r.parentNode) return null;
        r = r.parentNode;
      }

      return null;
    },
    children: function children(e, n, i) {
      var o = [],
          r = "";
      return i = i || t.doc, e && (e.id || (r = "Temp" + this.randomHexKey(), e.id = r), o = i.querySelectorAll("#" + e.id + " > " + n), r && e.removeAttribute("id")), o;
    },
    clean: function clean(t) {
      var e = [],
          n = -1;

      for (n = 0; n < t.length; n++) {
        "" !== t[n] && e.push(t[n]);
      }

      return e;
    },
    defer: function defer(n) {
      var i = null,
          o = null,
          r = null;
      return o = new this.Deferred(), _e2.features.has.promises ? o.promise = new Promise(function (t, e) {
        o.resolve = t, o.reject = e;
      }) : (r = t.jQuery || n.$) && "function" == typeof r.Deferred ? (i = r.Deferred(), o.promise = i.promise(), o.resolve = i.resolve, o.reject = i.reject) : t.console && console.warn(_e2.messages.warningNoPromiseImplementation()), o;
    },
    all: function all(n, i) {
      var o = null;
      return _e2.features.has.promises ? Promise.all(n) : (o = t.jQuery || i.$) && "function" == typeof o.when ? o.when.apply(o, n).done(function () {
        return arguments;
      }) : (t.console && console.warn(_e2.messages.warningNoPromiseImplementation()), []);
    },
    getPrefix: function getPrefix(t, e, i) {
      var o = -1,
          r = "";
      if (n.dashCase(e) in t.style) return "";

      for (o = 0; r = i[o]; o++) {
        if (r + e in t.style) return r.toLowerCase();
      }

      return "unsupported";
    },
    randomHex: function randomHex() {
      return ("00000" + (16777216 * Math.random() << 0).toString(16)).substr(-6).toUpperCase();
    },
    getDocumentState: function getDocumentState(e) {
      return e = "object" == _typeof(e.body) ? e : t.document, {
        scrollTop: t.pageYOffset,
        scrollLeft: t.pageXOffset,
        docHeight: e.documentElement.scrollHeight,
        docWidth: e.documentElement.scrollWidth,
        viewportHeight: e.documentElement.clientHeight,
        viewportWidth: e.documentElement.clientWidth
      };
    },
    bind: function bind(t, e) {
      return function () {
        return e.apply(t, arguments);
      };
    },
    isVisible: function isVisible(e) {
      var n = null;
      return !!e.offsetParent || "fixed" === (n = t.getComputedStyle(e)).position && "hidden" !== n.visibility && "0" !== n.opacity;
    },
    seal: function seal(t) {
      "function" == typeof Object.seal && Object.seal(t);
    },
    freeze: function freeze(t) {
      "function" == typeof Object.freeze && Object.freeze(t);
    },
    compareVersions: function compareVersions(t, e) {
      var n = t.split("."),
          i = e.split("."),
          o = -1,
          r = -1,
          s = -1;

      for (s = 0; s < n.length; s++) {
        if (o = parseInt(n[s].replace(/[^\d.]/g, "")), (r = parseInt(i[s].replace(/[^\d.]/g, "") || 0)) < o) return !1;
        if (r > o) return !0;
      }

      return !0;
    },
    Deferred: function Deferred() {
      this.promise = null, this.resolve = null, this.reject = null, this.id = n.randomHex();
    },
    isEmptyObject: function isEmptyObject(t) {
      var e = "";
      if ("function" == typeof Object.keys) return 0 === Object.keys(t).length;

      for (e in t) {
        if (t.hasOwnProperty(e)) return !1;
      }

      return !0;
    },
    getClassname: function getClassname(t, e, n) {
      var i = "";
      return (i += t.block).length && (i += t.delineatorElement), i += t["element" + this.pascalCase(e)], n ? (i.length && (i += t.delineatorModifier), i += n) : i;
    },
    getProperty: function getProperty(t, e) {
      var n,
          i = e.split("."),
          o = "",
          r = 0;
      if (!e) return t;

      for (n = function n(t) {
        return t ? t[o] : null;
      }; r < i.length;) {
        o = i[r], t = n(t), r++;
      }

      return void 0 !== t ? t : null;
    }
  }, _e2.h = n, _e2.Base = function () {}, _e2.Base.prototype = {
    constructor: _e2.Base,
    callActions: function callActions(t, e) {
      var i = this.constructor.actions[t],
          o = "";
      if (i && !n.isEmptyObject(i)) for (o in i) {
        i[o].apply(this, e);
      }
    },
    callFilters: function callFilters(t, e, i) {
      var o = this.constructor.filters[t],
          r = e,
          s = "";
      if (!o || n.isEmptyObject(o)) return r;

      for (s in i = i || [], o) {
        (i = n.arrayFromList(i)).unshift(r), r = o[s].apply(this, i);
      }

      return r;
    }
  }, _e2.BaseStatic = function () {
    this.actions = {}, this.filters = {}, this.extend = function (t) {
      n.extend(this.prototype, t);
    }, this.registerAction = function (t, e, n) {
      (this.actions[t] = this.actions[t] || {})[e] = n;
    }, this.registerFilter = function (t, e, n) {
      (this.filters[t] = this.filters[t] || {})[e] = n;
    };
  }, _e2.Features = function () {
    _e2.Base.call(this), this.callActions("beforeConstruct"), this.boxSizingPrefix = "", this.transformPrefix = "", this.transitionPrefix = "", this.boxSizingPrefix = "", this.transformProp = "", this.transformRule = "", this.transitionProp = "", this.perspectiveProp = "", this.perspectiveOriginProp = "", this.has = new _e2.Has(), this.canary = null, this.BOX_SIZING_PROP = "boxSizing", this.TRANSITION_PROP = "transition", this.TRANSFORM_PROP = "transform", this.PERSPECTIVE_PROP = "perspective", this.PERSPECTIVE_ORIGIN_PROP = "perspectiveOrigin", this.VENDORS = ["Webkit", "moz", "O", "ms"], this.TWEENABLE = ["opacity", "width", "height", "marginRight", "marginBottom", "x", "y", "scale", "translateX", "translateY", "translateZ", "rotateX", "rotateY", "rotateZ"], this.callActions("afterConstruct");
  }, _e2.BaseStatic.call(_e2.Features), _e2.Features.prototype = Object.create(_e2.Base.prototype), n.extend(_e2.Features.prototype, {
    constructor: _e2.Features,
    init: function init() {
      var t = this;
      t.callActions("beforeInit", arguments), t.canary = document.createElement("div"), t.setPrefixes(), t.runTests(), t.callActions("beforeInit", arguments);
    },
    runTests: function runTests() {
      var e = this;
      e.callActions("beforeRunTests", arguments), e.has.promises = "function" == typeof t.Promise, e.has.transitions = "unsupported" !== e.transitionPrefix, e.callActions("afterRunTests", arguments), n.freeze(e.has);
    },
    setPrefixes: function setPrefixes() {
      var t = this;
      t.callActions("beforeSetPrefixes", arguments), t.transitionPrefix = n.getPrefix(t.canary, "Transition", t.VENDORS), t.transformPrefix = n.getPrefix(t.canary, "Transform", t.VENDORS), t.boxSizingPrefix = n.getPrefix(t.canary, "BoxSizing", t.VENDORS), t.boxSizingProp = t.boxSizingPrefix ? t.boxSizingPrefix + n.pascalCase(t.BOX_SIZING_PROP) : t.BOX_SIZING_PROP, t.transitionProp = t.transitionPrefix ? t.transitionPrefix + n.pascalCase(t.TRANSITION_PROP) : t.TRANSITION_PROP, t.transformProp = t.transformPrefix ? t.transformPrefix + n.pascalCase(t.TRANSFORM_PROP) : t.TRANSFORM_PROP, t.transformRule = t.transformPrefix ? "-" + t.transformPrefix + "-" + t.TRANSFORM_PROP : t.TRANSFORM_PROP, t.perspectiveProp = t.transformPrefix ? t.transformPrefix + n.pascalCase(t.PERSPECTIVE_PROP) : t.PERSPECTIVE_PROP, t.perspectiveOriginProp = t.transformPrefix ? t.transformPrefix + n.pascalCase(t.PERSPECTIVE_ORIGIN_PROP) : t.PERSPECTIVE_ORIGIN_PROP, t.callActions("afterSetPrefixes", arguments);
    }
  }), _e2.Has = function () {
    this.transitions = !1, this.promises = !1, n.seal(this);
  }, _e2.features = new _e2.Features(), _e2.features.init(), _e2.ConfigAnimation = function () {
    _e2.Base.call(this), this.callActions("beforeConstruct"), this.enable = !0, this.effects = "fade scale", this.effectsIn = "", this.effectsOut = "", this.duration = 600, this.easing = "ease", this.applyPerspective = !0, this.perspectiveDistance = "3000px", this.perspectiveOrigin = "50% 50%", this.queue = !0, this.queueLimit = 3, this.animateResizeContainer = !0, this.animateResizeTargets = !1, this.staggerSequence = null, this.reverseOut = !1, this.nudge = !0, this.clampHeight = !0, this.clampWidth = !0, this.callActions("afterConstruct"), n.seal(this);
  }, _e2.BaseStatic.call(_e2.ConfigAnimation), _e2.ConfigAnimation.prototype = Object.create(_e2.Base.prototype), _e2.ConfigAnimation.prototype.constructor = _e2.ConfigAnimation, _e2.ConfigBehavior = function () {
    _e2.Base.call(this), this.callActions("beforeConstruct"), this.liveSort = !1, this.callActions("afterConstruct"), n.seal(this);
  }, _e2.BaseStatic.call(_e2.ConfigBehavior), _e2.ConfigBehavior.prototype = Object.create(_e2.Base.prototype), _e2.ConfigBehavior.prototype.constructor = _e2.ConfigBehavior, _e2.ConfigCallbacks = function () {
    _e2.Base.call(this), this.callActions("beforeConstruct"), this.onMixStart = null, this.onMixBusy = null, this.onMixEnd = null, this.onMixFail = null, this.onMixClick = null, this.callActions("afterConstruct"), n.seal(this);
  }, _e2.BaseStatic.call(_e2.ConfigCallbacks), _e2.ConfigCallbacks.prototype = Object.create(_e2.Base.prototype), _e2.ConfigCallbacks.prototype.constructor = _e2.ConfigCallbacks, _e2.ConfigControls = function () {
    _e2.Base.call(this), this.callActions("beforeConstruct"), this.enable = !0, this.live = !1, this.scope = "global", this.toggleLogic = "or", this.toggleDefault = "all", this.callActions("afterConstruct"), n.seal(this);
  }, _e2.BaseStatic.call(_e2.ConfigControls), _e2.ConfigControls.prototype = Object.create(_e2.Base.prototype), _e2.ConfigControls.prototype.constructor = _e2.ConfigControls, _e2.ConfigClassNames = function () {
    _e2.Base.call(this), this.callActions("beforeConstruct"), this.block = "mixitup", this.elementContainer = "container", this.elementFilter = "control", this.elementSort = "control", this.elementMultimix = "control", this.elementToggle = "control", this.modifierActive = "active", this.modifierDisabled = "disabled", this.modifierFailed = "failed", this.delineatorElement = "-", this.delineatorModifier = "-", this.callActions("afterConstruct"), n.seal(this);
  }, _e2.BaseStatic.call(_e2.ConfigClassNames), _e2.ConfigClassNames.prototype = Object.create(_e2.Base.prototype), _e2.ConfigClassNames.prototype.constructor = _e2.ConfigClassNames, _e2.ConfigData = function () {
    _e2.Base.call(this), this.callActions("beforeConstruct"), this.uidKey = "", this.dirtyCheck = !1, this.callActions("afterConstruct"), n.seal(this);
  }, _e2.BaseStatic.call(_e2.ConfigData), _e2.ConfigData.prototype = Object.create(_e2.Base.prototype), _e2.ConfigData.prototype.constructor = _e2.ConfigData, _e2.ConfigDebug = function () {
    _e2.Base.call(this), this.callActions("beforeConstruct"), this.enable = !1, this.showWarnings = !0, this.fauxAsync = !1, this.callActions("afterConstruct"), n.seal(this);
  }, _e2.BaseStatic.call(_e2.ConfigDebug), _e2.ConfigDebug.prototype = Object.create(_e2.Base.prototype), _e2.ConfigDebug.prototype.constructor = _e2.ConfigDebug, _e2.ConfigLayout = function () {
    _e2.Base.call(this), this.callActions("beforeConstruct"), this.allowNestedTargets = !0, this.containerClassName = "", this.siblingBefore = null, this.siblingAfter = null, this.callActions("afterConstruct"), n.seal(this);
  }, _e2.BaseStatic.call(_e2.ConfigLayout), _e2.ConfigLayout.prototype = Object.create(_e2.Base.prototype), _e2.ConfigLayout.prototype.constructor = _e2.ConfigLayout, _e2.ConfigLoad = function () {
    _e2.Base.call(this), this.callActions("beforeConstruct"), this.filter = "all", this.sort = "default:asc", this.dataset = null, this.callActions("afterConstruct"), n.seal(this);
  }, _e2.BaseStatic.call(_e2.ConfigLoad), _e2.ConfigLoad.prototype = Object.create(_e2.Base.prototype), _e2.ConfigLoad.prototype.constructor = _e2.ConfigLoad, _e2.ConfigSelectors = function () {
    _e2.Base.call(this), this.callActions("beforeConstruct"), this.target = ".mix", this.control = "", this.callActions("afterConstruct"), n.seal(this);
  }, _e2.BaseStatic.call(_e2.ConfigSelectors), _e2.ConfigSelectors.prototype = Object.create(_e2.Base.prototype), _e2.ConfigSelectors.prototype.constructor = _e2.ConfigSelectors, _e2.ConfigRender = function () {
    _e2.Base.call(this), this.callActions("beforeConstruct"), this.target = null, this.callActions("afterConstruct"), n.seal(this);
  }, _e2.BaseStatic.call(_e2.ConfigRender), _e2.ConfigRender.prototype = Object.create(_e2.Base.prototype), _e2.ConfigRender.prototype.constructor = _e2.ConfigRender, _e2.ConfigTemplates = function () {
    _e2.Base.call(this), this.callActions("beforeConstruct"), this.callActions("afterConstruct"), n.seal(this);
  }, _e2.BaseStatic.call(_e2.ConfigTemplates), _e2.ConfigTemplates.prototype = Object.create(_e2.Base.prototype), _e2.ConfigTemplates.prototype.constructor = _e2.ConfigTemplates, _e2.Config = function () {
    _e2.Base.call(this), this.callActions("beforeConstruct"), this.animation = new _e2.ConfigAnimation(), this.behavior = new _e2.ConfigBehavior(), this.callbacks = new _e2.ConfigCallbacks(), this.controls = new _e2.ConfigControls(), this.classNames = new _e2.ConfigClassNames(), this.data = new _e2.ConfigData(), this.debug = new _e2.ConfigDebug(), this.layout = new _e2.ConfigLayout(), this.load = new _e2.ConfigLoad(), this.selectors = new _e2.ConfigSelectors(), this.render = new _e2.ConfigRender(), this.templates = new _e2.ConfigTemplates(), this.callActions("afterConstruct"), n.seal(this);
  }, _e2.BaseStatic.call(_e2.Config), _e2.Config.prototype = Object.create(_e2.Base.prototype), _e2.Config.prototype.constructor = _e2.Config, _e2.MixerDom = function () {
    _e2.Base.call(this), this.callActions("beforeConstruct"), this.document = null, this.body = null, this.container = null, this.parent = null, this.targets = [], this.callActions("afterConstruct"), n.seal(this);
  }, _e2.BaseStatic.call(_e2.MixerDom), _e2.MixerDom.prototype = Object.create(_e2.Base.prototype), _e2.MixerDom.prototype.constructor = _e2.MixerDom, _e2.UiClassNames = function () {
    _e2.Base.call(this), this.callActions("beforeConstruct"), this.base = "", this.active = "", this.disabled = "", this.callActions("afterConstruct"), n.seal(this);
  }, _e2.BaseStatic.call(_e2.UiClassNames), _e2.UiClassNames.prototype = Object.create(_e2.Base.prototype), _e2.UiClassNames.prototype.constructor = _e2.UiClassNames, _e2.CommandDataset = function () {
    _e2.Base.call(this), this.callActions("beforeConstruct"), this.dataset = null, this.callActions("afterConstruct"), n.seal(this);
  }, _e2.BaseStatic.call(_e2.CommandDataset), _e2.CommandDataset.prototype = Object.create(_e2.Base.prototype), _e2.CommandDataset.prototype.constructor = _e2.CommandDataset, _e2.CommandMultimix = function () {
    _e2.Base.call(this), this.callActions("beforeConstruct"), this.filter = null, this.sort = null, this.insert = null, this.remove = null, this.changeLayout = null, this.callActions("afterConstruct"), n.seal(this);
  }, _e2.BaseStatic.call(_e2.CommandMultimix), _e2.CommandMultimix.prototype = Object.create(_e2.Base.prototype), _e2.CommandMultimix.prototype.constructor = _e2.CommandMultimix, _e2.CommandFilter = function () {
    _e2.Base.call(this), this.callActions("beforeConstruct"), this.selector = "", this.collection = null, this.action = "show", this.callActions("afterConstruct"), n.seal(this);
  }, _e2.BaseStatic.call(_e2.CommandFilter), _e2.CommandFilter.prototype = Object.create(_e2.Base.prototype), _e2.CommandFilter.prototype.constructor = _e2.CommandFilter, _e2.CommandSort = function () {
    _e2.Base.call(this), this.callActions("beforeConstruct"), this.sortString = "", this.attribute = "", this.order = "asc", this.collection = null, this.next = null, this.callActions("afterConstruct"), n.seal(this);
  }, _e2.BaseStatic.call(_e2.CommandSort), _e2.CommandSort.prototype = Object.create(_e2.Base.prototype), _e2.CommandSort.prototype.constructor = _e2.CommandSort, _e2.CommandInsert = function () {
    _e2.Base.call(this), this.callActions("beforeConstruct"), this.index = 0, this.collection = [], this.position = "before", this.sibling = null, this.callActions("afterConstruct"), n.seal(this);
  }, _e2.BaseStatic.call(_e2.CommandInsert), _e2.CommandInsert.prototype = Object.create(_e2.Base.prototype), _e2.CommandInsert.prototype.constructor = _e2.CommandInsert, _e2.CommandRemove = function () {
    _e2.Base.call(this), this.callActions("beforeConstruct"), this.targets = [], this.collection = [], this.callActions("afterConstruct"), n.seal(this);
  }, _e2.BaseStatic.call(_e2.CommandRemove), _e2.CommandRemove.prototype = Object.create(_e2.Base.prototype), _e2.CommandRemove.prototype.constructor = _e2.CommandRemove, _e2.CommandChangeLayout = function () {
    _e2.Base.call(this), this.callActions("beforeConstruct"), this.containerClassName = "", this.callActions("afterConstruct"), n.seal(this);
  }, _e2.BaseStatic.call(_e2.CommandChangeLayout), _e2.CommandChangeLayout.prototype = Object.create(_e2.Base.prototype), _e2.CommandChangeLayout.prototype.constructor = _e2.CommandChangeLayout, _e2.ControlDefinition = function (t, i, o, r) {
    _e2.Base.call(this), this.callActions("beforeConstruct"), this.type = t, this.selector = i, this.live = o || !1, this.parent = r || "", this.callActions("afterConstruct"), n.freeze(this), n.seal(this);
  }, _e2.BaseStatic.call(_e2.ControlDefinition), _e2.ControlDefinition.prototype = Object.create(_e2.Base.prototype), _e2.ControlDefinition.prototype.constructor = _e2.ControlDefinition, _e2.controlDefinitions = [], _e2.controlDefinitions.push(new _e2.ControlDefinition("multimix", "[data-filter][data-sort]")), _e2.controlDefinitions.push(new _e2.ControlDefinition("filter", "[data-filter]")), _e2.controlDefinitions.push(new _e2.ControlDefinition("sort", "[data-sort]")), _e2.controlDefinitions.push(new _e2.ControlDefinition("toggle", "[data-toggle]")), _e2.Control = function () {
    _e2.Base.call(this), this.callActions("beforeConstruct"), this.el = null, this.selector = "", this.bound = [], this.pending = -1, this.type = "", this.status = "inactive", this.filter = "", this.sort = "", this.canDisable = !1, this.handler = null, this.classNames = new _e2.UiClassNames(), this.callActions("afterConstruct"), n.seal(this);
  }, _e2.BaseStatic.call(_e2.Control), _e2.Control.prototype = Object.create(_e2.Base.prototype), n.extend(_e2.Control.prototype, {
    constructor: _e2.Control,
    init: function init(t, n, i) {
      var o = this;
      if (this.callActions("beforeInit", arguments), o.el = t, o.type = n, o.selector = i, o.selector) o.status = "live";else switch (o.canDisable = "boolean" == typeof o.el.disable, o.type) {
        case "filter":
          o.filter = o.el.getAttribute("data-filter");
          break;

        case "toggle":
          o.filter = o.el.getAttribute("data-toggle");
          break;

        case "sort":
          o.sort = o.el.getAttribute("data-sort");
          break;

        case "multimix":
          o.filter = o.el.getAttribute("data-filter"), o.sort = o.el.getAttribute("data-sort");
      }
      o.bindClick(), _e2.controls.push(o), this.callActions("afterInit", arguments);
    },
    isBound: function isBound(t) {
      var e = this,
          n = !1;
      return this.callActions("beforeIsBound", arguments), n = e.bound.indexOf(t) > -1, e.callFilters("afterIsBound", n, arguments);
    },
    addBinding: function addBinding(t) {
      var e = this;
      this.callActions("beforeAddBinding", arguments), e.isBound() || e.bound.push(t), this.callActions("afterAddBinding", arguments);
    },
    removeBinding: function removeBinding(t) {
      var n = this,
          i = -1;
      this.callActions("beforeRemoveBinding", arguments), (i = n.bound.indexOf(t)) > -1 && n.bound.splice(i, 1), n.bound.length < 1 && (n.unbindClick(), i = _e2.controls.indexOf(n), _e2.controls.splice(i, 1), "active" === n.status && n.renderStatus(n.el, "inactive")), this.callActions("afterRemoveBinding", arguments);
    },
    bindClick: function bindClick() {
      var t = this;
      this.callActions("beforeBindClick", arguments), t.handler = function (e) {
        t.handleClick(e);
      }, n.on(t.el, "click", t.handler), this.callActions("afterBindClick", arguments);
    },
    unbindClick: function unbindClick() {
      var t = this;
      this.callActions("beforeUnbindClick", arguments), n.off(t.el, "click", t.handler), t.handler = null, this.callActions("afterUnbindClick", arguments);
    },
    handleClick: function handleClick(t) {
      var i = this,
          o = null,
          r = null,
          s = !1,
          a = {},
          l = null,
          c = [],
          u = -1;

      if (this.callActions("beforeHandleClick", arguments), this.pending = 0, r = i.bound[0], o = i.selector ? n.closestParent(t.target, r.config.selectors.control + i.selector, !0, r.dom.document) : i.el) {
        switch (i.type) {
          case "filter":
            a.filter = i.filter || o.getAttribute("data-filter");
            break;

          case "sort":
            a.sort = i.sort || o.getAttribute("data-sort");
            break;

          case "multimix":
            a.filter = i.filter || o.getAttribute("data-filter"), a.sort = i.sort || o.getAttribute("data-sort");
            break;

          case "toggle":
            a.filter = i.filter || o.getAttribute("data-toggle"), s = "live" === i.status ? n.hasClass(o, i.classNames.active) : "active" === i.status;
        }

        for (u = 0; u < i.bound.length; u++) {
          l = new _e2.CommandMultimix(), n.extend(l, a), c.push(l);
        }

        for (c = i.callFilters("commandsHandleClick", c, arguments), i.pending = i.bound.length, u = 0; r = i.bound[u]; u++) {
          (a = c[u]) && (r.lastClicked || (r.lastClicked = o), _e2.events.fire("mixClick", r.dom.container, {
            state: r.state,
            instance: r,
            originalEvent: t,
            control: r.lastClicked
          }, r.dom.document), "function" == typeof r.config.callbacks.onMixClick && !1 === r.config.callbacks.onMixClick.call(r.lastClicked, r.state, t, r) || ("toggle" === i.type ? s ? r.toggleOff(a.filter) : r.toggleOn(a.filter) : r.multimix(a)));
        }

        this.callActions("afterHandleClick", arguments);
      } else i.callActions("afterHandleClick", arguments);
    },
    update: function update(t, n) {
      var i = this,
          o = new _e2.CommandMultimix();
      i.callActions("beforeUpdate", arguments), i.pending--, i.pending = Math.max(0, i.pending), i.pending > 0 || ("live" === i.status ? i.updateLive(t, n) : (o.sort = i.sort, o.filter = i.filter, i.callFilters("actionsUpdate", o, arguments), i.parseStatusChange(i.el, t, o, n)), i.callActions("afterUpdate", arguments));
    },
    updateLive: function updateLive(t, n) {
      var i = this,
          o = null,
          r = null,
          s = null,
          a = -1;

      if (i.callActions("beforeUpdateLive", arguments), i.el) {
        for (o = i.el.querySelectorAll(i.selector), a = 0; s = o[a]; a++) {
          switch (r = new _e2.CommandMultimix(), i.type) {
            case "filter":
              r.filter = s.getAttribute("data-filter");
              break;

            case "sort":
              r.sort = s.getAttribute("data-sort");
              break;

            case "multimix":
              r.filter = s.getAttribute("data-filter"), r.sort = s.getAttribute("data-sort");
              break;

            case "toggle":
              r.filter = s.getAttribute("data-toggle");
          }

          r = i.callFilters("actionsUpdateLive", r, arguments), i.parseStatusChange(s, t, r, n);
        }

        i.callActions("afterUpdateLive", arguments);
      }
    },
    parseStatusChange: function parseStatusChange(t, e, n, i) {
      var o = this,
          r = "",
          s = -1;

      switch (o.callActions("beforeParseStatusChange", arguments), o.type) {
        case "filter":
          e.filter === n.filter ? o.renderStatus(t, "active") : o.renderStatus(t, "inactive");
          break;

        case "multimix":
          e.sort === n.sort && e.filter === n.filter ? o.renderStatus(t, "active") : o.renderStatus(t, "inactive");
          break;

        case "sort":
          e.sort.match(/:asc/g) && (r = e.sort.replace(/:asc/g, "")), e.sort === n.sort || r === n.sort ? o.renderStatus(t, "active") : o.renderStatus(t, "inactive");
          break;

        case "toggle":
          for (i.length < 1 && o.renderStatus(t, "inactive"), e.filter === n.filter && o.renderStatus(t, "active"), s = 0; s < i.length; s++) {
            if (i[s] === n.filter) {
              o.renderStatus(t, "active");
              break;
            }

            o.renderStatus(t, "inactive");
          }

      }

      o.callActions("afterParseStatusChange", arguments);
    },
    renderStatus: function renderStatus(t, e) {
      var i = this;

      switch (i.callActions("beforeRenderStatus", arguments), e) {
        case "active":
          n.addClass(t, i.classNames.active), n.removeClass(t, i.classNames.disabled), i.canDisable && (i.el.disabled = !1);
          break;

        case "inactive":
          n.removeClass(t, i.classNames.active), n.removeClass(t, i.classNames.disabled), i.canDisable && (i.el.disabled = !1);
          break;

        case "disabled":
          i.canDisable && (i.el.disabled = !0), n.addClass(t, i.classNames.disabled), n.removeClass(t, i.classNames.active);
      }

      "live" !== i.status && (i.status = e), i.callActions("afterRenderStatus", arguments);
    }
  }), _e2.controls = [], _e2.StyleData = function () {
    _e2.Base.call(this), this.callActions("beforeConstruct"), this.x = 0, this.y = 0, this.top = 0, this.right = 0, this.bottom = 0, this.left = 0, this.width = 0, this.height = 0, this.marginRight = 0, this.marginBottom = 0, this.opacity = 0, this.scale = new _e2.TransformData(), this.translateX = new _e2.TransformData(), this.translateY = new _e2.TransformData(), this.translateZ = new _e2.TransformData(), this.rotateX = new _e2.TransformData(), this.rotateY = new _e2.TransformData(), this.rotateZ = new _e2.TransformData(), this.callActions("afterConstruct"), n.seal(this);
  }, _e2.BaseStatic.call(_e2.StyleData), _e2.StyleData.prototype = Object.create(_e2.Base.prototype), _e2.StyleData.prototype.constructor = _e2.StyleData, _e2.TransformData = function () {
    _e2.Base.call(this), this.callActions("beforeConstruct"), this.value = 0, this.unit = "", this.callActions("afterConstruct"), n.seal(this);
  }, _e2.BaseStatic.call(_e2.TransformData), _e2.TransformData.prototype = Object.create(_e2.Base.prototype), _e2.TransformData.prototype.constructor = _e2.TransformData, _e2.TransformDefaults = function () {
    _e2.StyleData.apply(this), this.callActions("beforeConstruct"), this.scale.value = .01, this.scale.unit = "", this.translateX.value = 20, this.translateX.unit = "px", this.translateY.value = 20, this.translateY.unit = "px", this.translateZ.value = 20, this.translateZ.unit = "px", this.rotateX.value = 90, this.rotateX.unit = "deg", this.rotateY.value = 90, this.rotateY.unit = "deg", this.rotateX.value = 90, this.rotateX.unit = "deg", this.rotateZ.value = 180, this.rotateZ.unit = "deg", this.callActions("afterConstruct"), n.seal(this);
  }, _e2.BaseStatic.call(_e2.TransformDefaults), _e2.TransformDefaults.prototype = Object.create(_e2.StyleData.prototype), _e2.TransformDefaults.prototype.constructor = _e2.TransformDefaults, _e2.transformDefaults = new _e2.TransformDefaults(), _e2.EventDetail = function () {
    this.state = null, this.futureState = null, this.instance = null, this.originalEvent = null;
  }, _e2.Events = function () {
    _e2.Base.call(this), this.callActions("beforeConstruct"), this.mixStart = null, this.mixBusy = null, this.mixEnd = null, this.mixFail = null, this.mixClick = null, this.callActions("afterConstruct"), n.seal(this);
  }, _e2.BaseStatic.call(_e2.Events), _e2.Events.prototype = Object.create(_e2.Base.prototype), _e2.Events.prototype.constructor = _e2.Events, _e2.Events.prototype.fire = function (t, i, o, r) {
    var s = this,
        a = null,
        l = new _e2.EventDetail();
    if (s.callActions("beforeFire", arguments), void 0 === s[t]) throw new Error('Event type "' + t + '" not found.');
    l.state = new _e2.State(), n.extend(l.state, o.state), o.futureState && (l.futureState = new _e2.State(), n.extend(l.futureState, o.futureState)), l.instance = o.instance, o.originalEvent && (l.originalEvent = o.originalEvent), a = n.getCustomEvent(t, l, r), s.callFilters("eventFire", a, arguments), i.dispatchEvent(a);
  }, _e2.events = new _e2.Events(), _e2.QueueItem = function () {
    _e2.Base.call(this), this.callActions("beforeConstruct"), this.args = [], this.instruction = null, this.triggerElement = null, this.deferred = null, this.isToggling = !1, this.callActions("afterConstruct"), n.seal(this);
  }, _e2.BaseStatic.call(_e2.QueueItem), _e2.QueueItem.prototype = Object.create(_e2.Base.prototype), _e2.QueueItem.prototype.constructor = _e2.QueueItem, _e2.Mixer = function () {
    _e2.Base.call(this), this.callActions("beforeConstruct"), this.config = new _e2.Config(), this.id = "", this.isBusy = !1, this.isToggling = !1, this.incPadding = !0, this.controls = [], this.targets = [], this.origOrder = [], this.cache = {}, this.toggleArray = [], this.targetsMoved = 0, this.targetsImmovable = 0, this.targetsBound = 0, this.targetsDone = 0, this.staggerDuration = 0, this.effectsIn = null, this.effectsOut = null, this.transformIn = [], this.transformOut = [], this.queue = [], this.state = null, this.lastOperation = null, this.lastClicked = null, this.userCallback = null, this.userDeferred = null, this.dom = new _e2.MixerDom(), this.callActions("afterConstruct"), n.seal(this);
  }, _e2.BaseStatic.call(_e2.Mixer), _e2.Mixer.prototype = Object.create(_e2.Base.prototype), n.extend(_e2.Mixer.prototype, {
    constructor: _e2.Mixer,
    attach: function attach(i, o, r, s) {
      var a = this,
          l = null,
          c = -1;

      for (a.callActions("beforeAttach", arguments), a.id = r, s && n.extend(a.config, s, !0, !0), a.sanitizeConfig(), a.cacheDom(i, o), a.config.layout.containerClassName && n.addClass(a.dom.container, a.config.layout.containerClassName), _e2.features.has.transitions || (a.config.animation.enable = !1), void 0 === t.console && (a.config.debug.showWarnings = !1), a.config.data.uidKey && (a.config.controls.enable = !1), a.indexTargets(), a.state = a.getInitialState(), c = 0; l = a.lastOperation.toHide[c]; c++) {
        l.hide();
      }

      a.config.controls.enable && (a.initControls(), a.buildToggleArray(null, a.state), a.updateControls({
        filter: a.state.activeFilter,
        sort: a.state.activeSort
      })), a.parseEffects(), a.callActions("afterAttach", arguments);
    },
    sanitizeConfig: function sanitizeConfig() {
      var t = this;
      t.callActions("beforeSanitizeConfig", arguments), t.config.controls.scope = t.config.controls.scope.toLowerCase().trim(), t.config.controls.toggleLogic = t.config.controls.toggleLogic.toLowerCase().trim(), t.config.controls.toggleDefault = t.config.controls.toggleDefault.toLowerCase().trim(), t.config.animation.effects = t.config.animation.effects.trim(), t.callActions("afterSanitizeConfig", arguments);
    },
    getInitialState: function getInitialState() {
      var t = this,
          n = new _e2.State(),
          i = new _e2.Operation();

      if (t.callActions("beforeGetInitialState", arguments), n.activeContainerClassName = t.config.layout.containerClassName, t.config.load.dataset) {
        if (!t.config.data.uidKey || "string" != typeof t.config.data.uidKey) throw new TypeError(_e2.messages.errorConfigDataUidKeyNotSet());
        i.startDataset = i.newDataset = n.activeDataset = t.config.load.dataset.slice(), i.startContainerClassName = i.newContainerClassName = n.activeContainerClassName, i.show = t.targets.slice(), n = t.callFilters("stateGetInitialState", n, arguments);
      } else n.activeFilter = t.parseFilterArgs([t.config.load.filter]).command, n.activeSort = t.parseSortArgs([t.config.load.sort]).command, n.totalTargets = t.targets.length, (n = t.callFilters("stateGetInitialState", n, arguments)).activeSort.collection || n.activeSort.attribute || "random" === n.activeSort.order || "desc" === n.activeSort.order ? (i.newSort = n.activeSort, t.sortOperation(i), t.printSort(!1, i), t.targets = i.newOrder) : i.startOrder = i.newOrder = t.targets, i.startFilter = i.newFilter = n.activeFilter, i.startSort = i.newSort = n.activeSort, i.startContainerClassName = i.newContainerClassName = n.activeContainerClassName, "all" === i.newFilter.selector ? i.newFilter.selector = t.config.selectors.target : "none" === i.newFilter.selector && (i.newFilter.selector = "");

      return i = t.callFilters("operationGetInitialState", i, [n]), t.lastOperation = i, i.newFilter && t.filterOperation(i), t.buildState(i);
    },
    cacheDom: function cacheDom(t, e) {
      var n = this;
      n.callActions("beforeCacheDom", arguments), n.dom.document = e, n.dom.body = n.dom.document.querySelector("body"), n.dom.container = t, n.dom.parent = t, n.callActions("afterCacheDom", arguments);
    },
    indexTargets: function indexTargets() {
      var t = this,
          i = null,
          o = null,
          r = null,
          s = -1;
      if (t.callActions("beforeIndexTargets", arguments), t.dom.targets = t.config.layout.allowNestedTargets ? t.dom.container.querySelectorAll(t.config.selectors.target) : n.children(t.dom.container, t.config.selectors.target, t.dom.document), t.dom.targets = n.arrayFromList(t.dom.targets), t.targets = [], (r = t.config.load.dataset) && r.length !== t.dom.targets.length) throw new Error(_e2.messages.errorDatasetPrerenderedMismatch());

      if (t.dom.targets.length) {
        for (s = 0; o = t.dom.targets[s]; s++) {
          (i = new _e2.Target()).init(o, t, r ? r[s] : void 0), i.isInDom = !0, t.targets.push(i);
        }

        t.dom.parent = t.dom.targets[0].parentElement === t.dom.container ? t.dom.container : t.dom.targets[0].parentElement;
      }

      t.origOrder = t.targets, t.callActions("afterIndexTargets", arguments);
    },
    initControls: function initControls() {
      var t = this,
          n = "",
          i = null,
          o = null,
          r = null,
          s = null,
          a = null,
          l = -1,
          c = -1;

      switch (t.callActions("beforeInitControls", arguments), t.config.controls.scope) {
        case "local":
          r = t.dom.container;
          break;

        case "global":
          r = t.dom.document;
          break;

        default:
          throw new Error(_e2.messages.errorConfigInvalidControlsScope());
      }

      for (l = 0; n = _e2.controlDefinitions[l]; l++) {
        if (t.config.controls.live || n.live) {
          if (n.parent) {
            if (!(s = t.dom[n.parent]) || s.length < 0) continue;
            "number" != typeof s.length && (s = [s]);
          } else s = [r];

          for (c = 0; o = s[c]; c++) {
            a = t.getControl(o, n.type, n.selector), t.controls.push(a);
          }
        } else for (i = r.querySelectorAll(t.config.selectors.control + n.selector), c = 0; o = i[c]; c++) {
          (a = t.getControl(o, n.type, "")) && t.controls.push(a);
        }
      }

      t.callActions("afterInitControls", arguments);
    },
    getControl: function getControl(t, i, o) {
      var r = this,
          s = null,
          a = -1;
      if (r.callActions("beforeGetControl", arguments), !o) for (a = 0; s = _e2.controls[a]; a++) {
        if (s.el === t && s.isBound(r)) return r.callFilters("controlGetControl", null, arguments);
        if (s.el === t && s.type === i && s.selector === o) return s.addBinding(r), r.callFilters("controlGetControl", s, arguments);
      }
      return (s = new _e2.Control()).init(t, i, o), s.classNames.base = n.getClassname(r.config.classNames, i), s.classNames.active = n.getClassname(r.config.classNames, i, r.config.classNames.modifierActive), s.classNames.disabled = n.getClassname(r.config.classNames, i, r.config.classNames.modifierDisabled), s.addBinding(r), r.callFilters("controlGetControl", s, arguments);
    },
    getToggleSelector: function getToggleSelector() {
      var t = this,
          e = "or" === t.config.controls.toggleLogic ? ", " : "",
          i = "";
      return t.callActions("beforeGetToggleSelector", arguments), t.toggleArray = n.clean(t.toggleArray), "" === (i = t.toggleArray.join(e)) && (i = t.config.controls.toggleDefault), t.callFilters("selectorGetToggleSelector", i, arguments);
    },
    buildToggleArray: function buildToggleArray(t, e) {
      var i = this,
          o = "";
      if (i.callActions("beforeBuildToggleArray", arguments), t && t.filter) o = t.filter.selector.replace(/\s/g, "");else {
        if (!e) return;
        o = e.activeFilter.selector.replace(/\s/g, "");
      }
      o !== i.config.selectors.target && "all" !== o || (o = ""), "or" === i.config.controls.toggleLogic ? i.toggleArray = o.split(",") : i.toggleArray = i.splitCompoundSelector(o), i.toggleArray = n.clean(i.toggleArray), i.callActions("afterBuildToggleArray", arguments);
    },
    splitCompoundSelector: function splitCompoundSelector(t) {
      var e = t.split(/([\.\[])/g),
          n = [],
          i = "",
          o = -1;

      for ("" === e[0] && e.shift(), o = 0; o < e.length; o++) {
        o % 2 == 0 && (i = ""), i += e[o], o % 2 != 0 && n.push(i);
      }

      return n;
    },
    updateControls: function updateControls(t) {
      var i = this,
          o = null,
          r = new _e2.CommandMultimix(),
          s = -1;

      for (i.callActions("beforeUpdateControls", arguments), t.filter ? r.filter = t.filter.selector : r.filter = i.state.activeFilter.selector, t.sort ? r.sort = i.buildSortString(t.sort) : r.sort = i.buildSortString(i.state.activeSort), r.filter === i.config.selectors.target && (r.filter = "all"), "" === r.filter && (r.filter = "none"), n.freeze(r), s = 0; o = i.controls[s]; s++) {
        o.update(r, i.toggleArray);
      }

      i.callActions("afterUpdateControls", arguments);
    },
    buildSortString: function buildSortString(t) {
      var e = "";
      return e += t.sortString, t.next && (e += " " + this.buildSortString(t.next)), e;
    },
    insertTargets: function insertTargets(t, i) {
      var o = this,
          r = null,
          s = -1,
          a = null,
          l = null,
          c = null,
          u = -1;

      if (o.callActions("beforeInsertTargets", arguments), void 0 === t.index && (t.index = 0), r = o.getNextSibling(t.index, t.sibling, t.position), a = o.dom.document.createDocumentFragment(), s = r ? n.index(r, o.config.selectors.target) : o.targets.length, t.collection) {
        for (u = 0; c = t.collection[u]; u++) {
          if (o.dom.targets.indexOf(c) > -1) throw new Error(_e2.messages.errorInsertPreexistingElement());
          c.style.display = "none", a.appendChild(c), a.appendChild(o.dom.document.createTextNode(" ")), n.isElement(c, o.dom.document) && c.matches(o.config.selectors.target) && ((l = new _e2.Target()).init(c, o), l.isInDom = !0, o.targets.splice(s, 0, l), s++);
        }

        o.dom.parent.insertBefore(a, r);
      }

      i.startOrder = o.origOrder = o.targets, o.callActions("afterInsertTargets", arguments);
    },
    getNextSibling: function getNextSibling(t, e, n) {
      var i = this,
          o = null;
      return t = Math.max(t, 0), e && "before" === n ? o = e : e && "after" === n ? o = e.nextElementSibling || null : i.targets.length > 0 && void 0 !== t ? o = t < i.targets.length || !i.targets.length ? i.targets[t].dom.el : i.targets[i.targets.length - 1].dom.el.nextElementSibling : 0 === i.targets.length && i.dom.parent.children.length > 0 && (i.config.layout.siblingAfter ? o = i.config.layout.siblingAfter : i.config.layout.siblingBefore ? o = i.config.layout.siblingBefore.nextElementSibling : i.dom.parent.children[0]), i.callFilters("elementGetNextSibling", o, arguments);
    },
    filterOperation: function filterOperation(t) {
      var e = this,
          n = !1,
          i = -1,
          o = "",
          r = null,
          s = -1;

      for (e.callActions("beforeFilterOperation", arguments), o = t.newFilter.action, s = 0; r = t.newOrder[s]; s++) {
        n = t.newFilter.collection ? t.newFilter.collection.indexOf(r.dom.el) > -1 : "" !== t.newFilter.selector && r.dom.el.matches(t.newFilter.selector), e.evaluateHideShow(n, r, o, t);
      }

      if (t.toRemove.length) for (s = 0; r = t.show[s]; s++) {
        t.toRemove.indexOf(r) > -1 && (t.show.splice(s, 1), (i = t.toShow.indexOf(r)) > -1 && t.toShow.splice(i, 1), t.toHide.push(r), t.hide.push(r), s--);
      }
      t.matching = t.show.slice(), 0 === t.show.length && "" !== t.newFilter.selector && 0 !== e.targets.length && (t.hasFailed = !0), e.callActions("afterFilterOperation", arguments);
    },
    evaluateHideShow: function evaluateHideShow(t, e, n, i) {
      var o = this,
          r = !1,
          s = Array.prototype.slice.call(arguments, 1);
      r = o.callFilters("testResultEvaluateHideShow", t, s), o.callActions("beforeEvaluateHideShow", arguments), !0 === r && "show" === n || !1 === r && "hide" === n ? (i.show.push(e), !e.isShown && i.toShow.push(e)) : (i.hide.push(e), e.isShown && i.toHide.push(e)), o.callActions("afterEvaluateHideShow", arguments);
    },
    sortOperation: function sortOperation(t) {
      var i = this,
          o = [],
          r = null,
          s = null,
          a = -1;

      if (i.callActions("beforeSortOperation", arguments), t.startOrder = i.targets, t.newSort.collection) {
        for (o = [], a = 0; s = t.newSort.collection[a]; a++) {
          if (i.dom.targets.indexOf(s) < 0) throw new Error(_e2.messages.errorSortNonExistentElement());
          (r = new _e2.Target()).init(s, i), r.isInDom = !0, o.push(r);
        }

        t.newOrder = o;
      } else "random" === t.newSort.order ? t.newOrder = n.arrayShuffle(t.startOrder) : "" === t.newSort.attribute ? (t.newOrder = i.origOrder.slice(), "desc" === t.newSort.order && t.newOrder.reverse()) : (t.newOrder = t.startOrder.slice(), t.newOrder.sort(function (e, n) {
        return i.compare(e, n, t.newSort);
      }));

      n.isEqualArray(t.newOrder, t.startOrder) && (t.willSort = !1), i.callActions("afterSortOperation", arguments);
    },
    compare: function compare(t, e, n) {
      var i = this,
          o = n.order,
          r = i.getAttributeValue(t, n.attribute),
          s = i.getAttributeValue(e, n.attribute);
      return isNaN(1 * r) || isNaN(1 * s) ? (r = r.toLowerCase(), s = s.toLowerCase()) : (r *= 1, s *= 1), r < s ? "asc" === o ? -1 : 1 : r > s ? "asc" === o ? 1 : -1 : r === s && n.next ? i.compare(t, e, n.next) : 0;
    },
    getAttributeValue: function getAttributeValue(t, n) {
      var i = this,
          o = "";
      return null === (o = t.dom.el.getAttribute("data-" + n)) && i.config.debug.showWarnings && console.warn(_e2.messages.warningInconsistentSortingAttributes({
        attribute: "data-" + n
      })), i.callFilters("valueGetAttributeValue", o || 0, arguments);
    },
    printSort: function printSort(e, i) {
      var o = this,
          r = e ? i.newOrder : i.startOrder,
          s = e ? i.startOrder : i.newOrder,
          a = r.length ? r[r.length - 1].dom.el.nextElementSibling : null,
          l = t.document.createDocumentFragment(),
          c = null,
          u = null,
          d = null,
          p = -1;

      for (o.callActions("beforePrintSort", arguments), p = 0; u = r[p]; p++) {
        "absolute" !== (d = u.dom.el).style.position && (n.removeWhitespace(d.previousSibling), d.parentElement.removeChild(d));
      }

      for ((c = a ? a.previousSibling : o.dom.parent.lastChild) && "#text" === c.nodeName && n.removeWhitespace(c), p = 0; u = s[p]; p++) {
        d = u.dom.el, n.isElement(l.lastChild) && l.appendChild(t.document.createTextNode(" ")), l.appendChild(d);
      }

      o.dom.parent.firstChild && o.dom.parent.firstChild !== a && l.insertBefore(t.document.createTextNode(" "), l.childNodes[0]), a ? (l.appendChild(t.document.createTextNode(" ")), o.dom.parent.insertBefore(l, a)) : o.dom.parent.appendChild(l), o.callActions("afterPrintSort", arguments);
    },
    parseSortString: function parseSortString(t, i) {
      var o = this,
          r = t.split(" "),
          s = i,
          a = [],
          l = -1;

      for (l = 0; l < r.length; l++) {
        switch (a = r[l].split(":"), s.sortString = r[l], s.attribute = n.dashCase(a[0]), s.order = a[1] || "asc", s.attribute) {
          case "default":
            s.attribute = "";
            break;

          case "random":
            s.attribute = "", s.order = "random";
        }

        if (!s.attribute || "random" === s.order) break;
        l < r.length - 1 && (s.next = new _e2.CommandSort(), n.freeze(s), s = s.next);
      }

      return o.callFilters("commandsParseSort", i, arguments);
    },
    parseEffects: function parseEffects() {
      var t = this,
          n = "",
          i = t.config.animation.effectsIn || t.config.animation.effects,
          o = t.config.animation.effectsOut || t.config.animation.effects;

      for (n in t.callActions("beforeParseEffects", arguments), t.effectsIn = new _e2.StyleData(), t.effectsOut = new _e2.StyleData(), t.transformIn = [], t.transformOut = [], t.effectsIn.opacity = t.effectsOut.opacity = 1, t.parseEffect("fade", i, t.effectsIn, t.transformIn), t.parseEffect("fade", o, t.effectsOut, t.transformOut, !0), _e2.transformDefaults) {
        _e2.transformDefaults[n] instanceof _e2.TransformData && (t.parseEffect(n, i, t.effectsIn, t.transformIn), t.parseEffect(n, o, t.effectsOut, t.transformOut, !0));
      }

      t.parseEffect("stagger", i, t.effectsIn, t.transformIn), t.parseEffect("stagger", o, t.effectsOut, t.transformOut, !0), t.callActions("afterParseEffects", arguments);
    },
    parseEffect: function parseEffect(t, n, i, o, r) {
      var s = this,
          a = /\(([^)]+)\)/,
          l = -1,
          c = "",
          u = "",
          d = ["%", "px", "em", "rem", "vh", "vw", "deg"],
          p = "",
          f = -1;
      if (s.callActions("beforeParseEffect", arguments), "string" != typeof n) throw new TypeError(_e2.messages.errorConfigInvalidAnimationEffects());
      if (n.indexOf(t) < 0) "stagger" === t && (s.staggerDuration = 0);else {
        switch ((l = n.indexOf(t + "(")) > -1 && (c = n.substring(l), u = a.exec(c)[1]), t) {
          case "fade":
            i.opacity = u ? parseFloat(u) : 0;
            break;

          case "stagger":
            s.staggerDuration = u ? parseFloat(u) : 100;
            break;

          default:
            if (r && s.config.animation.reverseOut && "scale" !== t ? i[t].value = -1 * (u ? parseFloat(u) : _e2.transformDefaults[t].value) : i[t].value = u ? parseFloat(u) : _e2.transformDefaults[t].value, u) {
              for (f = 0; p = d[f]; f++) {
                if (u.indexOf(p) > -1) {
                  i[t].unit = p;
                  break;
                }
              }
            } else i[t].unit = _e2.transformDefaults[t].unit;

            o.push(t + "(" + i[t].value + i[t].unit + ")");
        }

        s.callActions("afterParseEffect", arguments);
      }
    },
    buildState: function buildState(t) {
      var n = this,
          i = new _e2.State(),
          o = null,
          r = -1;

      for (n.callActions("beforeBuildState", arguments), r = 0; o = n.targets[r]; r++) {
        (!t.toRemove.length || t.toRemove.indexOf(o) < 0) && i.targets.push(o.dom.el);
      }

      for (r = 0; o = t.matching[r]; r++) {
        i.matching.push(o.dom.el);
      }

      for (r = 0; o = t.show[r]; r++) {
        i.show.push(o.dom.el);
      }

      for (r = 0; o = t.hide[r]; r++) {
        (!t.toRemove.length || t.toRemove.indexOf(o) < 0) && i.hide.push(o.dom.el);
      }

      return i.id = n.id, i.container = n.dom.container, i.activeFilter = t.newFilter, i.activeSort = t.newSort, i.activeDataset = t.newDataset, i.activeContainerClassName = t.newContainerClassName, i.hasFailed = t.hasFailed, i.totalTargets = n.targets.length, i.totalShow = t.show.length, i.totalHide = t.hide.length, i.totalMatching = t.matching.length, i.triggerElement = t.triggerElement, n.callFilters("stateBuildState", i, arguments);
    },
    goMix: function goMix(i, o) {
      var r = this,
          s = null;
      return r.callActions("beforeGoMix", arguments), r.config.animation.duration && r.config.animation.effects && n.isVisible(r.dom.container) || (i = !1), o.toShow.length || o.toHide.length || o.willSort || o.willChangeLayout || (i = !1), o.startState.show.length || o.show.length || (i = !1), _e2.events.fire("mixStart", r.dom.container, {
        state: o.startState,
        futureState: o.newState,
        instance: r
      }, r.dom.document), "function" == typeof r.config.callbacks.onMixStart && r.config.callbacks.onMixStart.call(r.dom.container, o.startState, o.newState, r), n.removeClass(r.dom.container, n.getClassname(r.config.classNames, "container", r.config.classNames.modifierFailed)), s = r.userDeferred ? r.userDeferred : r.userDeferred = n.defer(_e2.libraries), r.isBusy = !0, i && _e2.features.has.transitions ? (t.pageYOffset !== o.docState.scrollTop && t.scrollTo(o.docState.scrollLeft, o.docState.scrollTop), r.config.animation.applyPerspective && (r.dom.parent.style[_e2.features.perspectiveProp] = r.config.animation.perspectiveDistance, r.dom.parent.style[_e2.features.perspectiveOriginProp] = r.config.animation.perspectiveOrigin), r.config.animation.animateResizeContainer && o.startHeight !== o.newHeight && o.viewportDeltaY !== o.startHeight - o.newHeight && (r.dom.parent.style.height = o.startHeight + "px"), r.config.animation.animateResizeContainer && o.startWidth !== o.newWidth && o.viewportDeltaX !== o.startWidth - o.newWidth && (r.dom.parent.style.width = o.startWidth + "px"), o.startHeight === o.newHeight && (r.dom.parent.style.height = o.startHeight + "px"), o.startWidth === o.newWidth && (r.dom.parent.style.width = o.startWidth + "px"), o.startHeight === o.newHeight && o.startWidth === o.newWidth && (r.dom.parent.style.overflow = "hidden"), requestAnimationFrame(function () {
        r.moveTargets(o);
      }), r.callFilters("promiseGoMix", s.promise, arguments)) : (r.config.debug.fauxAsync ? setTimeout(function () {
        r.cleanUp(o);
      }, r.config.animation.duration) : r.cleanUp(o), r.callFilters("promiseGoMix", s.promise, arguments));
    },
    getStartMixData: function getStartMixData(n) {
      var i = this,
          o = t.getComputedStyle(i.dom.parent),
          r = i.dom.parent.getBoundingClientRect(),
          s = null,
          a = {},
          l = -1,
          c = o[_e2.features.boxSizingProp];

      for (i.incPadding = "border-box" === c, i.callActions("beforeGetStartMixData", arguments), l = 0; s = n.show[l]; l++) {
        a = s.getPosData(), n.showPosData[l] = {
          startPosData: a
        };
      }

      for (l = 0; s = n.toHide[l]; l++) {
        a = s.getPosData(), n.toHidePosData[l] = {
          startPosData: a
        };
      }

      n.startX = r.left, n.startY = r.top, n.startHeight = i.incPadding ? r.height : r.height - parseFloat(o.paddingTop) - parseFloat(o.paddingBottom) - parseFloat(o.borderTop) - parseFloat(o.borderBottom), n.startWidth = i.incPadding ? r.width : r.width - parseFloat(o.paddingLeft) - parseFloat(o.paddingRight) - parseFloat(o.borderLeft) - parseFloat(o.borderRight), i.callActions("afterGetStartMixData", arguments);
    },
    setInter: function setInter(t) {
      var e = this,
          i = null,
          o = -1;

      for (e.callActions("beforeSetInter", arguments), e.config.animation.clampHeight && (e.dom.parent.style.height = t.startHeight + "px", e.dom.parent.style.overflow = "hidden"), e.config.animation.clampWidth && (e.dom.parent.style.width = t.startWidth + "px", e.dom.parent.style.overflow = "hidden"), o = 0; i = t.toShow[o]; o++) {
        i.show();
      }

      t.willChangeLayout && (n.removeClass(e.dom.container, t.startContainerClassName), n.addClass(e.dom.container, t.newContainerClassName)), e.callActions("afterSetInter", arguments);
    },
    getInterMixData: function getInterMixData(t) {
      var e = this,
          n = null,
          i = -1;

      for (e.callActions("beforeGetInterMixData", arguments), i = 0; n = t.show[i]; i++) {
        t.showPosData[i].interPosData = n.getPosData();
      }

      for (i = 0; n = t.toHide[i]; i++) {
        t.toHidePosData[i].interPosData = n.getPosData();
      }

      e.callActions("afterGetInterMixData", arguments);
    },
    setFinal: function setFinal(t) {
      var e = this,
          n = null,
          i = -1;

      for (e.callActions("beforeSetFinal", arguments), t.willSort && e.printSort(!1, t), i = 0; n = t.toHide[i]; i++) {
        n.hide();
      }

      e.callActions("afterSetFinal", arguments);
    },
    getFinalMixData: function getFinalMixData(e) {
      var i = this,
          o = null,
          r = null,
          s = null,
          a = -1;

      for (i.callActions("beforeGetFinalMixData", arguments), a = 0; s = e.show[a]; a++) {
        e.showPosData[a].finalPosData = s.getPosData();
      }

      for (a = 0; s = e.toHide[a]; a++) {
        e.toHidePosData[a].finalPosData = s.getPosData();
      }

      for ((i.config.animation.clampHeight || i.config.animation.clampWidth) && (i.dom.parent.style.height = i.dom.parent.style.width = i.dom.parent.style.overflow = ""), i.incPadding || (o = t.getComputedStyle(i.dom.parent)), r = i.dom.parent.getBoundingClientRect(), e.newX = r.left, e.newY = r.top, e.newHeight = i.incPadding ? r.height : r.height - parseFloat(o.paddingTop) - parseFloat(o.paddingBottom) - parseFloat(o.borderTop) - parseFloat(o.borderBottom), e.newWidth = i.incPadding ? r.width : r.width - parseFloat(o.paddingLeft) - parseFloat(o.paddingRight) - parseFloat(o.borderLeft) - parseFloat(o.borderRight), e.viewportDeltaX = e.docState.viewportWidth - this.dom.document.documentElement.clientWidth, e.viewportDeltaY = e.docState.viewportHeight - this.dom.document.documentElement.clientHeight, e.willSort && i.printSort(!0, e), a = 0; s = e.toShow[a]; a++) {
        s.hide();
      }

      for (a = 0; s = e.toHide[a]; a++) {
        s.show();
      }

      e.willChangeLayout && (n.removeClass(i.dom.container, e.newContainerClassName), n.addClass(i.dom.container, i.config.layout.containerClassName)), i.callActions("afterGetFinalMixData", arguments);
    },
    getTweenData: function getTweenData(t) {
      var n = this,
          i = null,
          o = null,
          r = Object.getOwnPropertyNames(n.effectsIn),
          s = "",
          a = null,
          l = -1,
          c = -1,
          u = -1,
          d = -1;

      for (n.callActions("beforeGetTweenData", arguments), u = 0; i = t.show[u]; u++) {
        for ((o = t.showPosData[u]).posIn = new _e2.StyleData(), o.posOut = new _e2.StyleData(), o.tweenData = new _e2.StyleData(), i.isShown ? (o.posIn.x = o.startPosData.x - o.interPosData.x, o.posIn.y = o.startPosData.y - o.interPosData.y) : o.posIn.x = o.posIn.y = 0, o.posOut.x = o.finalPosData.x - o.interPosData.x, o.posOut.y = o.finalPosData.y - o.interPosData.y, o.posIn.opacity = i.isShown ? 1 : n.effectsIn.opacity, o.posOut.opacity = 1, o.tweenData.opacity = o.posOut.opacity - o.posIn.opacity, i.isShown || n.config.animation.nudge || (o.posIn.x = o.posOut.x, o.posIn.y = o.posOut.y), o.tweenData.x = o.posOut.x - o.posIn.x, o.tweenData.y = o.posOut.y - o.posIn.y, n.config.animation.animateResizeTargets && (o.posIn.width = o.startPosData.width, o.posIn.height = o.startPosData.height, l = (o.startPosData.width || o.finalPosData.width) - o.interPosData.width, o.posIn.marginRight = o.startPosData.marginRight - l, c = (o.startPosData.height || o.finalPosData.height) - o.interPosData.height, o.posIn.marginBottom = o.startPosData.marginBottom - c, o.posOut.width = o.finalPosData.width, o.posOut.height = o.finalPosData.height, l = (o.finalPosData.width || o.startPosData.width) - o.interPosData.width, o.posOut.marginRight = o.finalPosData.marginRight - l, c = (o.finalPosData.height || o.startPosData.height) - o.interPosData.height, o.posOut.marginBottom = o.finalPosData.marginBottom - c, o.tweenData.width = o.posOut.width - o.posIn.width, o.tweenData.height = o.posOut.height - o.posIn.height, o.tweenData.marginRight = o.posOut.marginRight - o.posIn.marginRight, o.tweenData.marginBottom = o.posOut.marginBottom - o.posIn.marginBottom), d = 0; s = r[d]; d++) {
          (a = n.effectsIn[s]) instanceof _e2.TransformData && a.value && (o.posIn[s].value = a.value, o.posOut[s].value = 0, o.tweenData[s].value = o.posOut[s].value - o.posIn[s].value, o.posIn[s].unit = o.posOut[s].unit = o.tweenData[s].unit = a.unit);
        }
      }

      for (u = 0; i = t.toHide[u]; u++) {
        for ((o = t.toHidePosData[u]).posIn = new _e2.StyleData(), o.posOut = new _e2.StyleData(), o.tweenData = new _e2.StyleData(), o.posIn.x = i.isShown ? o.startPosData.x - o.interPosData.x : 0, o.posIn.y = i.isShown ? o.startPosData.y - o.interPosData.y : 0, o.posOut.x = n.config.animation.nudge ? 0 : o.posIn.x, o.posOut.y = n.config.animation.nudge ? 0 : o.posIn.y, o.tweenData.x = o.posOut.x - o.posIn.x, o.tweenData.y = o.posOut.y - o.posIn.y, n.config.animation.animateResizeTargets && (o.posIn.width = o.startPosData.width, o.posIn.height = o.startPosData.height, l = o.startPosData.width - o.interPosData.width, o.posIn.marginRight = o.startPosData.marginRight - l, c = o.startPosData.height - o.interPosData.height, o.posIn.marginBottom = o.startPosData.marginBottom - c), o.posIn.opacity = 1, o.posOut.opacity = n.effectsOut.opacity, o.tweenData.opacity = o.posOut.opacity - o.posIn.opacity, d = 0; s = r[d]; d++) {
          (a = n.effectsOut[s]) instanceof _e2.TransformData && a.value && (o.posIn[s].value = 0, o.posOut[s].value = a.value, o.tweenData[s].value = o.posOut[s].value - o.posIn[s].value, o.posIn[s].unit = o.posOut[s].unit = o.tweenData[s].unit = a.unit);
        }
      }

      n.callActions("afterGetTweenData", arguments);
    },
    moveTargets: function moveTargets(t) {
      var i = this,
          o = null,
          r = null,
          s = null,
          a = "",
          l = !1,
          c = -1,
          u = -1,
          d = i.checkProgress.bind(i);

      for (i.callActions("beforeMoveTargets", arguments), u = 0; o = t.show[u]; u++) {
        r = new _e2.IMoveData(), s = t.showPosData[u], a = o.isShown ? "none" : "show", (l = i.willTransition(a, t.hasEffect, s.posIn, s.posOut)) && c++, o.show(), r.posIn = s.posIn, r.posOut = s.posOut, r.statusChange = a, r.staggerIndex = c, r.operation = t, r.callback = l ? d : null, o.move(r);
      }

      for (u = 0; o = t.toHide[u]; u++) {
        s = t.toHidePosData[u], r = new _e2.IMoveData(), a = "hide", l = i.willTransition(a, s.posIn, s.posOut), r.posIn = s.posIn, r.posOut = s.posOut, r.statusChange = a, r.staggerIndex = u, r.operation = t, r.callback = l ? d : null, o.move(r);
      }

      i.config.animation.animateResizeContainer && (i.dom.parent.style[_e2.features.transitionProp] = "height " + i.config.animation.duration + "ms ease, width " + i.config.animation.duration + "ms ease ", requestAnimationFrame(function () {
        t.startHeight !== t.newHeight && t.viewportDeltaY !== t.startHeight - t.newHeight && (i.dom.parent.style.height = t.newHeight + "px"), t.startWidth !== t.newWidth && t.viewportDeltaX !== t.startWidth - t.newWidth && (i.dom.parent.style.width = t.newWidth + "px");
      })), t.willChangeLayout && (n.removeClass(i.dom.container, i.config.layout.ContainerClassName), n.addClass(i.dom.container, t.newContainerClassName)), i.callActions("afterMoveTargets", arguments);
    },
    hasEffect: function hasEffect() {
      var t = this,
          e = ["scale", "translateX", "translateY", "translateZ", "rotateX", "rotateY", "rotateZ"],
          n = "",
          i = null,
          o = !1,
          r = -1;
      if (1 !== t.effectsIn.opacity) return t.callFilters("resultHasEffect", !0, arguments);

      for (r = 0; n = e[r]; r++) {
        if (0 !== ("undefined" !== (i = t.effectsIn[n]).value ? i.value : i)) {
          o = !0;
          break;
        }
      }

      return t.callFilters("resultHasEffect", o, arguments);
    },
    willTransition: function willTransition(t, e, i, o) {
      var r = this,
          s = !1;
      return s = !(!n.isVisible(r.dom.container) || !("none" !== t && e || i.x !== o.x || i.y !== o.y) && (!r.config.animation.animateResizeTargets || i.width === o.width && i.height === o.height && i.marginRight === o.marginRight && i.marginTop === o.marginTop)), r.callFilters("resultWillTransition", s, arguments);
    },
    checkProgress: function checkProgress(t) {
      var e = this;
      e.targetsDone++, e.targetsBound === e.targetsDone && e.cleanUp(t);
    },
    cleanUp: function cleanUp(t) {
      var i = this,
          o = null,
          r = null,
          s = null,
          a = null,
          l = -1;

      for (i.callActions("beforeCleanUp", arguments), i.targetsMoved = i.targetsImmovable = i.targetsBound = i.targetsDone = 0, l = 0; o = t.show[l]; l++) {
        o.cleanUp(), o.show();
      }

      for (l = 0; o = t.toHide[l]; l++) {
        o.cleanUp(), o.hide();
      }

      if (t.willSort && i.printSort(!1, t), i.dom.parent.style[_e2.features.transitionProp] = i.dom.parent.style.height = i.dom.parent.style.width = i.dom.parent.style.overflow = i.dom.parent.style[_e2.features.perspectiveProp] = i.dom.parent.style[_e2.features.perspectiveOriginProp] = "", t.willChangeLayout && (n.removeClass(i.dom.container, t.startContainerClassName), n.addClass(i.dom.container, t.newContainerClassName)), t.toRemove.length) {
        for (l = 0; o = i.targets[l]; l++) {
          t.toRemove.indexOf(o) > -1 && ((r = o.dom.el.previousSibling) && "#text" === r.nodeName && (s = o.dom.el.nextSibling) && "#text" === s.nodeName && n.removeWhitespace(r), t.willSort || i.dom.parent.removeChild(o.dom.el), i.targets.splice(l, 1), o.isInDom = !1, l--);
        }

        i.origOrder = i.targets;
      }

      t.willSort && (i.targets = t.newOrder), i.state = t.newState, i.lastOperation = t, i.dom.targets = i.state.targets, _e2.events.fire("mixEnd", i.dom.container, {
        state: i.state,
        instance: i
      }, i.dom.document), "function" == typeof i.config.callbacks.onMixEnd && i.config.callbacks.onMixEnd.call(i.dom.container, i.state, i), t.hasFailed && (_e2.events.fire("mixFail", i.dom.container, {
        state: i.state,
        instance: i
      }, i.dom.document), "function" == typeof i.config.callbacks.onMixFail && i.config.callbacks.onMixFail.call(i.dom.container, i.state, i), n.addClass(i.dom.container, n.getClassname(i.config.classNames, "container", i.config.classNames.modifierFailed))), "function" == typeof i.userCallback && i.userCallback.call(i.dom.container, i.state, i), "function" == typeof i.userDeferred.resolve && i.userDeferred.resolve(i.state), i.userCallback = null, i.userDeferred = null, i.lastClicked = null, i.isToggling = !1, i.isBusy = !1, i.queue.length && (i.callActions("beforeReadQueueCleanUp", arguments), a = i.queue.shift(), i.userDeferred = a.deferred, i.isToggling = a.isToggling, i.lastClicked = a.triggerElement, a.instruction.command instanceof _e2.CommandMultimix ? i.multimix.apply(i, a.args) : i.dataset.apply(i, a.args)), i.callActions("afterCleanUp", arguments);
    },
    parseMultimixArgs: function parseMultimixArgs(t) {
      var i = this,
          o = new _e2.UserInstruction(),
          r = null,
          s = -1;

      for (o.animate = i.config.animation.enable, o.command = new _e2.CommandMultimix(), s = 0; s < t.length; s++) {
        null !== (r = t[s]) && ("object" == _typeof(r) ? n.extend(o.command, r) : "boolean" == typeof r ? o.animate = r : "function" == typeof r && (o.callback = r));
      }

      return !o.command.insert || o.command.insert instanceof _e2.CommandInsert || (o.command.insert = i.parseInsertArgs([o.command.insert]).command), !o.command.remove || o.command.remove instanceof _e2.CommandRemove || (o.command.remove = i.parseRemoveArgs([o.command.remove]).command), !o.command.filter || o.command.filter instanceof _e2.CommandFilter || (o.command.filter = i.parseFilterArgs([o.command.filter]).command), !o.command.sort || o.command.sort instanceof _e2.CommandSort || (o.command.sort = i.parseSortArgs([o.command.sort]).command), !o.command.changeLayout || o.command.changeLayout instanceof _e2.CommandChangeLayout || (o.command.changeLayout = i.parseChangeLayoutArgs([o.command.changeLayout]).command), o = i.callFilters("instructionParseMultimixArgs", o, arguments), n.freeze(o), o;
    },
    parseFilterArgs: function parseFilterArgs(t) {
      var i = this,
          o = new _e2.UserInstruction(),
          r = null,
          s = -1;

      for (o.animate = i.config.animation.enable, o.command = new _e2.CommandFilter(), s = 0; s < t.length; s++) {
        "string" == typeof (r = t[s]) ? o.command.selector = r : null === r ? o.command.collection = [] : "object" == _typeof(r) && n.isElement(r, i.dom.document) ? o.command.collection = [r] : "object" == _typeof(r) && void 0 !== r.length ? o.command.collection = n.arrayFromList(r) : "object" == _typeof(r) ? n.extend(o.command, r) : "boolean" == typeof r ? o.animate = r : "function" == typeof r && (o.callback = r);
      }

      if (o.command.selector && o.command.collection) throw new Error(_e2.messages.errorFilterInvalidArguments());
      return o = i.callFilters("instructionParseFilterArgs", o, arguments), n.freeze(o), o;
    },
    parseSortArgs: function parseSortArgs(t) {
      var i = this,
          o = new _e2.UserInstruction(),
          r = null,
          s = "",
          a = -1;

      for (o.animate = i.config.animation.enable, o.command = new _e2.CommandSort(), a = 0; a < t.length; a++) {
        if (null !== (r = t[a])) switch (_typeof(r)) {
          case "string":
            s = r;
            break;

          case "object":
            r.length && (o.command.collection = n.arrayFromList(r));
            break;

          case "boolean":
            o.animate = r;
            break;

          case "function":
            o.callback = r;
        }
      }

      return s && (o.command = i.parseSortString(s, o.command)), o = i.callFilters("instructionParseSortArgs", o, arguments), n.freeze(o), o;
    },
    parseInsertArgs: function parseInsertArgs(t) {
      var i = this,
          o = new _e2.UserInstruction(),
          r = null,
          s = -1;

      for (o.animate = i.config.animation.enable, o.command = new _e2.CommandInsert(), s = 0; s < t.length; s++) {
        null !== (r = t[s]) && ("number" == typeof r ? o.command.index = r : "string" == typeof r && ["before", "after"].indexOf(r) > -1 ? o.command.position = r : "string" == typeof r ? o.command.collection = n.arrayFromList(n.createElement(r).childNodes) : "object" == _typeof(r) && n.isElement(r, i.dom.document) ? o.command.collection.length ? o.command.sibling = r : o.command.collection = [r] : "object" == _typeof(r) && r.length ? o.command.collection.length ? o.command.sibling = r[0] : o.command.collection = r : "object" == _typeof(r) && r.childNodes && r.childNodes.length ? o.command.collection.length ? o.command.sibling = r.childNodes[0] : o.command.collection = n.arrayFromList(r.childNodes) : "object" == _typeof(r) ? n.extend(o.command, r) : "boolean" == typeof r ? o.animate = r : "function" == typeof r && (o.callback = r));
      }

      if (o.command.index && o.command.sibling) throw new Error(_e2.messages.errorInsertInvalidArguments());
      return !o.command.collection.length && i.config.debug.showWarnings && console.warn(_e2.messages.warningInsertNoElements()), o = i.callFilters("instructionParseInsertArgs", o, arguments), n.freeze(o), o;
    },
    parseRemoveArgs: function parseRemoveArgs(t) {
      var i = this,
          o = new _e2.UserInstruction(),
          r = null,
          s = null,
          a = -1;

      for (o.animate = i.config.animation.enable, o.command = new _e2.CommandRemove(), a = 0; a < t.length; a++) {
        if (null !== (s = t[a])) switch (_typeof(s)) {
          case "number":
            i.targets[s] && (o.command.targets[0] = i.targets[s]);
            break;

          case "string":
            o.command.collection = n.arrayFromList(i.dom.parent.querySelectorAll(s));
            break;

          case "object":
            s && s.length ? o.command.collection = s : n.isElement(s, i.dom.document) ? o.command.collection = [s] : n.extend(o.command, s);
            break;

          case "boolean":
            o.animate = s;
            break;

          case "function":
            o.callback = s;
        }
      }

      if (o.command.collection.length) for (a = 0; r = i.targets[a]; a++) {
        o.command.collection.indexOf(r.dom.el) > -1 && o.command.targets.push(r);
      }
      return !o.command.targets.length && i.config.debug.showWarnings && console.warn(_e2.messages.warningRemoveNoElements()), n.freeze(o), o;
    },
    parseDatasetArgs: function parseDatasetArgs(t) {
      var i = new _e2.UserInstruction(),
          o = null,
          r = -1;

      for (i.animate = this.config.animation.enable, i.command = new _e2.CommandDataset(), r = 0; r < t.length; r++) {
        if (null !== (o = t[r])) switch (_typeof(o)) {
          case "object":
            Array.isArray(o) || "number" == typeof o.length ? i.command.dataset = o : n.extend(i.command, o);
            break;

          case "boolean":
            i.animate = o;
            break;

          case "function":
            i.callback = o;
        }
      }

      return n.freeze(i), i;
    },
    parseChangeLayoutArgs: function parseChangeLayoutArgs(t) {
      var i = new _e2.UserInstruction(),
          o = null,
          r = -1;

      for (i.animate = this.config.animation.enable, i.command = new _e2.CommandChangeLayout(), r = 0; r < t.length; r++) {
        if (null !== (o = t[r])) switch (_typeof(o)) {
          case "string":
            i.command.containerClassName = o;
            break;

          case "object":
            n.extend(i.command, o);
            break;

          case "boolean":
            i.animate = o;
            break;

          case "function":
            i.callback = o;
        }
      }

      return n.freeze(i), i;
    },
    queueMix: function queueMix(t) {
      var i = this,
          o = null,
          r = "";
      return i.callActions("beforeQueueMix", arguments), o = n.defer(_e2.libraries), i.config.animation.queue && i.queue.length < i.config.animation.queueLimit ? (t.deferred = o, i.queue.push(t), i.config.controls.enable && (i.isToggling ? (i.buildToggleArray(t.instruction.command), r = i.getToggleSelector(), i.updateControls({
        filter: {
          selector: r
        }
      })) : i.updateControls(t.instruction.command))) : (i.config.debug.showWarnings && console.warn(_e2.messages.warningMultimixInstanceQueueFull()), o.resolve(i.state), _e2.events.fire("mixBusy", i.dom.container, {
        state: i.state,
        instance: i
      }, i.dom.document), "function" == typeof i.config.callbacks.onMixBusy && i.config.callbacks.onMixBusy.call(i.dom.container, i.state, i)), i.callFilters("promiseQueueMix", o.promise, arguments);
    },
    getDataOperation: function getDataOperation(t) {
      var i = this,
          o = new _e2.Operation(),
          r = [];
      if (o = i.callFilters("operationUnmappedGetDataOperation", o, arguments), i.dom.targets.length && !(r = i.state.activeDataset || []).length) throw new Error(_e2.messages.errorDatasetNotSet());
      return o.id = n.randomHex(), o.startState = i.state, o.startDataset = r, o.newDataset = t.slice(), i.diffDatasets(o), o.startOrder = i.targets, o.newOrder = o.show, i.config.animation.enable && (i.getStartMixData(o), i.setInter(o), o.docState = n.getDocumentState(i.dom.document), i.getInterMixData(o), i.setFinal(o), i.getFinalMixData(o), i.parseEffects(), o.hasEffect = i.hasEffect(), i.getTweenData(o)), i.targets = o.show.slice(), o.newState = i.buildState(o), Array.prototype.push.apply(i.targets, o.toRemove), i.callFilters("operationMappedGetDataOperation", o, arguments);
    },
    diffDatasets: function diffDatasets(t) {
      var i = this,
          o = [],
          r = [],
          s = [],
          a = null,
          l = null,
          c = null,
          u = null,
          d = null,
          p = {},
          f = "",
          h = -1;

      for (i.callActions("beforeDiffDatasets", arguments), h = 0; a = t.newDataset[h]; h++) {
        if (void 0 === (f = a[i.config.data.uidKey]) || f.toString().length < 1) throw new TypeError(_e2.messages.errorDatasetInvalidUidKey({
          uidKey: i.config.data.uidKey
        }));
        if (p[f]) throw new Error(_e2.messages.errorDatasetDuplicateUid({
          uid: f
        }));
        p[f] = !0, (l = i.cache[f]) instanceof _e2.Target ? (i.config.data.dirtyCheck && !n.deepEquals(a, l.data) && (c = l.render(a), l.data = a, c !== l.dom.el && (l.isInDom && (l.unbindEvents(), i.dom.parent.replaceChild(c, l.dom.el)), l.isShown || (c.style.display = "none"), l.dom.el = c, l.isInDom && l.bindEvents())), c = l.dom.el) : ((l = new _e2.Target()).init(null, i, a), l.hide()), l.isInDom ? (d = l.dom.el.nextElementSibling, r.push(f), u && (u.lastElementChild && u.appendChild(i.dom.document.createTextNode(" ")), i.insertDatasetFrag(u, l.dom.el, s), u = null)) : (u || (u = i.dom.document.createDocumentFragment()), u.lastElementChild && u.appendChild(i.dom.document.createTextNode(" ")), u.appendChild(l.dom.el), l.isInDom = !0, l.unbindEvents(), l.bindEvents(), l.hide(), t.toShow.push(l), s.push(l)), t.show.push(l);
      }

      for (u && ((d = d || i.config.layout.siblingAfter) && u.appendChild(i.dom.document.createTextNode(" ")), i.insertDatasetFrag(u, d, s)), h = 0; a = t.startDataset[h]; h++) {
        f = a[i.config.data.uidKey], l = i.cache[f], t.show.indexOf(l) < 0 ? (t.hide.push(l), t.toHide.push(l), t.toRemove.push(l)) : o.push(f);
      }

      n.isEqualArray(o, r) || (t.willSort = !0), i.callActions("afterDiffDatasets", arguments);
    },
    insertDatasetFrag: function insertDatasetFrag(t, e, i) {
      var o = this,
          r = e ? n.arrayFromList(o.dom.parent.children).indexOf(e) : o.targets.length;

      for (o.dom.parent.insertBefore(t, e); i.length;) {
        o.targets.splice(r, 0, i.shift()), r++;
      }
    },
    willSort: function willSort(t, e) {
      var n = this,
          i = !1;
      return i = !!(n.config.behavior.liveSort || "random" === t.order || t.attribute !== e.attribute || t.order !== e.order || t.collection !== e.collection || null === t.next && e.next || t.next && null === e.next) || !(!t.next || !e.next) && n.willSort(t.next, e.next), n.callFilters("resultWillSort", i, arguments);
    },
    show: function show() {
      return this.filter("all");
    },
    hide: function hide() {
      return this.filter("none");
    },
    isMixing: function isMixing() {
      return this.isBusy;
    },
    filter: function filter() {
      var t = this,
          e = t.parseFilterArgs(arguments);
      return t.multimix({
        filter: e.command
      }, e.animate, e.callback);
    },
    toggleOn: function toggleOn() {
      var t = this,
          e = t.parseFilterArgs(arguments),
          n = e.command.selector,
          i = "";
      return t.isToggling = !0, t.toggleArray.indexOf(n) < 0 && t.toggleArray.push(n), i = t.getToggleSelector(), t.multimix({
        filter: i
      }, e.animate, e.callback);
    },
    toggleOff: function toggleOff() {
      var t = this,
          e = t.parseFilterArgs(arguments),
          n = e.command.selector,
          i = t.toggleArray.indexOf(n),
          o = "";
      return t.isToggling = !0, i > -1 && t.toggleArray.splice(i, 1), o = t.getToggleSelector(), t.multimix({
        filter: o
      }, e.animate, e.callback);
    },
    sort: function sort() {
      var t = this,
          e = t.parseSortArgs(arguments);
      return t.multimix({
        sort: e.command
      }, e.animate, e.callback);
    },
    changeLayout: function changeLayout() {
      var t = this,
          e = t.parseChangeLayoutArgs(arguments);
      return t.multimix({
        changeLayout: e.command
      }, e.animate, e.callback);
    },
    dataset: function dataset() {
      var t = this,
          n = t.parseDatasetArgs(arguments),
          i = null,
          o = null,
          r = !1;
      return t.callActions("beforeDataset", arguments), t.isBusy ? ((o = new _e2.QueueItem()).args = arguments, o.instruction = n, t.queueMix(o)) : (n.callback && (t.userCallback = n.callback), r = n.animate ^ t.config.animation.enable ? n.animate : t.config.animation.enable, i = t.getDataOperation(n.command.dataset), t.goMix(r, i));
    },
    multimix: function multimix() {
      var t = this,
          n = null,
          i = !1,
          o = null,
          r = t.parseMultimixArgs(arguments);
      return t.callActions("beforeMultimix", arguments), t.isBusy ? ((o = new _e2.QueueItem()).args = arguments, o.instruction = r, o.triggerElement = t.lastClicked, o.isToggling = t.isToggling, t.queueMix(o)) : (n = t.getOperation(r.command), t.config.controls.enable && (r.command.filter && !t.isToggling && (t.toggleArray.length = 0, t.buildToggleArray(n.command)), t.queue.length < 1 && t.updateControls(n.command)), r.callback && (t.userCallback = r.callback), i = r.animate ^ t.config.animation.enable ? r.animate : t.config.animation.enable, t.callFilters("operationMultimix", n, arguments), t.goMix(i, n));
    },
    getOperation: function getOperation(t) {
      var i = this,
          o = t.sort,
          r = t.filter,
          s = t.changeLayout,
          a = t.remove,
          l = t.insert,
          c = new _e2.Operation();
      return (c = i.callFilters("operationUnmappedGetOperation", c, arguments)).id = n.randomHex(), c.command = t, c.startState = i.state, c.triggerElement = i.lastClicked, i.isBusy ? (i.config.debug.showWarnings && console.warn(_e2.messages.warningGetOperationInstanceBusy()), null) : (l && i.insertTargets(l, c), a && (c.toRemove = a.targets), c.startSort = c.newSort = c.startState.activeSort, c.startOrder = c.newOrder = i.targets, o && (c.startSort = c.startState.activeSort, c.newSort = o, c.willSort = i.willSort(o, c.startState.activeSort), c.willSort && i.sortOperation(c)), c.startFilter = c.startState.activeFilter, c.newFilter = r || n.extend(new _e2.CommandFilter(), c.startFilter), "all" === c.newFilter.selector ? c.newFilter.selector = i.config.selectors.target : "none" === c.newFilter.selector && (c.newFilter.selector = ""), i.filterOperation(c), c.startContainerClassName = c.startState.activeContainerClassName, s ? (c.newContainerClassName = s.containerClassName, c.newContainerClassName !== c.startContainerClassName && (c.willChangeLayout = !0)) : c.newContainerClassName = c.startContainerClassName, i.config.animation.enable && (i.getStartMixData(c), i.setInter(c), c.docState = n.getDocumentState(i.dom.document), i.getInterMixData(c), i.setFinal(c), i.getFinalMixData(c), i.parseEffects(), c.hasEffect = i.hasEffect(), i.getTweenData(c)), c.willSort && (i.targets = c.newOrder), c.newState = i.buildState(c), i.callFilters("operationMappedGetOperation", c, arguments));
    },
    tween: function tween(t, e) {
      var n = null,
          i = null,
          o = -1,
          r = -1;

      for (e = Math.min(e, 1), e = Math.max(e, 0), r = 0; n = t.show[r]; r++) {
        i = t.showPosData[r], n.applyTween(i, e);
      }

      for (r = 0; n = t.hide[r]; r++) {
        n.isShown && n.hide(), (o = t.toHide.indexOf(n)) > -1 && (i = t.toHidePosData[o], n.isShown || n.show(), n.applyTween(i, e));
      }
    },
    insert: function insert() {
      var t = this,
          e = t.parseInsertArgs(arguments);
      return t.multimix({
        insert: e.command
      }, e.animate, e.callback);
    },
    insertBefore: function insertBefore() {
      var t = this,
          e = t.parseInsertArgs(arguments);
      return t.insert(e.command.collection, "before", e.command.sibling, e.animate, e.callback);
    },
    insertAfter: function insertAfter() {
      var t = this,
          e = t.parseInsertArgs(arguments);
      return t.insert(e.command.collection, "after", e.command.sibling, e.animate, e.callback);
    },
    prepend: function prepend() {
      var t = this,
          e = t.parseInsertArgs(arguments);
      return t.insert(0, e.command.collection, e.animate, e.callback);
    },
    append: function append() {
      var t = this,
          e = t.parseInsertArgs(arguments);
      return t.insert(t.state.totalTargets, e.command.collection, e.animate, e.callback);
    },
    remove: function remove() {
      var t = this,
          e = t.parseRemoveArgs(arguments);
      return t.multimix({
        remove: e.command
      }, e.animate, e.callback);
    },
    getConfig: function getConfig(t) {
      var e = this,
          i = null;
      return i = t ? n.getProperty(e.config, t) : e.config, e.callFilters("valueGetConfig", i, arguments);
    },
    configure: function configure(t) {
      var e = this;
      e.callActions("beforeConfigure", arguments), n.extend(e.config, t, !0, !0), e.callActions("afterConfigure", arguments);
    },
    getState: function getState() {
      var t = this,
          i = null;
      return i = new _e2.State(), n.extend(i, t.state), n.freeze(i), t.callFilters("stateGetState", i, arguments);
    },
    forceRefresh: function forceRefresh() {
      this.indexTargets();
    },
    forceRender: function forceRender() {
      var t = this,
          e = null,
          n = null,
          i = "";

      for (i in t.cache) {
        (n = (e = t.cache[i]).render(e.data)) !== e.dom.el && (e.isInDom && (e.unbindEvents(), t.dom.parent.replaceChild(n, e.dom.el)), e.isShown || (n.style.display = "none"), e.dom.el = n, e.isInDom && e.bindEvents());
      }

      t.state = t.buildState(t.lastOperation);
    },
    destroy: function destroy(t) {
      var n = this,
          i = null,
          o = null,
          r = 0;

      for (n.callActions("beforeDestroy", arguments), r = 0; i = n.controls[r]; r++) {
        i.removeBinding(n);
      }

      for (r = 0; o = n.targets[r]; r++) {
        t && o.show(), o.unbindEvents();
      }

      n.dom.container.id.match(/^MixItUp/) && n.dom.container.removeAttribute("id"), delete _e2.instances[n.id], n.callActions("afterDestroy", arguments);
    }
  }), _e2.IMoveData = function () {
    _e2.Base.call(this), this.callActions("beforeConstruct"), this.posIn = null, this.posOut = null, this.operation = null, this.callback = null, this.statusChange = "", this.duration = -1, this.staggerIndex = -1, this.callActions("afterConstruct"), n.seal(this);
  }, _e2.BaseStatic.call(_e2.IMoveData), _e2.IMoveData.prototype = Object.create(_e2.Base.prototype), _e2.IMoveData.prototype.constructor = _e2.IMoveData, _e2.TargetDom = function () {
    _e2.Base.call(this), this.callActions("beforeConstruct"), this.el = null, this.callActions("afterConstruct"), n.seal(this);
  }, _e2.BaseStatic.call(_e2.TargetDom), _e2.TargetDom.prototype = Object.create(_e2.Base.prototype), _e2.TargetDom.prototype.constructor = _e2.TargetDom, _e2.Target = function () {
    _e2.Base.call(this), this.callActions("beforeConstruct"), this.id = "", this.sortString = "", this.mixer = null, this.callback = null, this.isShown = !1, this.isBound = !1, this.isExcluded = !1, this.isInDom = !1, this.handler = null, this.operation = null, this.data = null, this.dom = new _e2.TargetDom(), this.callActions("afterConstruct"), n.seal(this);
  }, _e2.BaseStatic.call(_e2.Target), _e2.Target.prototype = Object.create(_e2.Base.prototype), n.extend(_e2.Target.prototype, {
    constructor: _e2.Target,
    init: function init(t, n, i) {
      var o = this,
          r = "";

      if (o.callActions("beforeInit", arguments), o.mixer = n, t || (t = o.render(i)), o.cacheDom(t), o.bindEvents(), "none" !== o.dom.el.style.display && (o.isShown = !0), i && n.config.data.uidKey) {
        if (void 0 === (r = i[n.config.data.uidKey]) || r.toString().length < 1) throw new TypeError(_e2.messages.errorDatasetInvalidUidKey({
          uidKey: n.config.data.uidKey
        }));
        o.id = r, o.data = i, n.cache[r] = o;
      }

      o.callActions("afterInit", arguments);
    },
    render: function render(t) {
      var i = this,
          o = null,
          r = null,
          s = null,
          a = "";
      if (i.callActions("beforeRender", arguments), "function" != typeof (o = i.callFilters("renderRender", i.mixer.config.render.target, arguments))) throw new TypeError(_e2.messages.errorDatasetRendererNotSet());
      return (a = o(t)) && "object" == _typeof(a) && n.isElement(a) ? r = a : "string" == typeof a && ((s = document.createElement("div")).innerHTML = a, r = s.firstElementChild), i.callFilters("elRender", r, arguments);
    },
    cacheDom: function cacheDom(t) {
      var e = this;
      e.callActions("beforeCacheDom", arguments), e.dom.el = t, e.callActions("afterCacheDom", arguments);
    },
    getSortString: function getSortString(t) {
      var e = this,
          n = e.dom.el.getAttribute("data-" + t) || "";
      e.callActions("beforeGetSortString", arguments), n = isNaN(1 * n) ? n.toLowerCase() : 1 * n, e.sortString = n, e.callActions("afterGetSortString", arguments);
    },
    show: function show() {
      var t = this;
      t.callActions("beforeShow", arguments), t.isShown || (t.dom.el.style.display = "", t.isShown = !0), t.callActions("afterShow", arguments);
    },
    hide: function hide() {
      var t = this;
      t.callActions("beforeHide", arguments), t.isShown && (t.dom.el.style.display = "none", t.isShown = !1), t.callActions("afterHide", arguments);
    },
    move: function move(t) {
      var e = this;
      e.callActions("beforeMove", arguments), e.isExcluded || e.mixer.targetsMoved++, e.applyStylesIn(t), requestAnimationFrame(function () {
        e.applyStylesOut(t);
      }), e.callActions("afterMove", arguments);
    },
    applyTween: function applyTween(t, n) {
      var i = this,
          o = "",
          r = null,
          s = t.posIn,
          a = [],
          l = new _e2.StyleData(),
          c = -1;

      for (i.callActions("beforeApplyTween", arguments), l.x = s.x, l.y = s.y, 0 === n ? i.hide() : i.isShown || i.show(), c = 0; o = _e2.features.TWEENABLE[c]; c++) {
        if (r = t.tweenData[o], "x" === o) {
          if (!r) continue;
          l.x = s.x + r * n;
        } else if ("y" === o) {
          if (!r) continue;
          l.y = s.y + r * n;
        } else if (r instanceof _e2.TransformData) {
          if (!r.value) continue;
          l[o].value = s[o].value + r.value * n, l[o].unit = r.unit, a.push(o + "(" + l[o].value + r.unit + ")");
        } else {
          if (!r) continue;
          l[o] = s[o] + r * n, i.dom.el.style[o] = l[o];
        }
      }

      (l.x || l.y) && a.unshift("translate(" + l.x + "px, " + l.y + "px)"), a.length && (i.dom.el.style[_e2.features.transformProp] = a.join(" ")), i.callActions("afterApplyTween", arguments);
    },
    applyStylesIn: function applyStylesIn(t) {
      var n = this,
          i = t.posIn,
          o = 1 !== n.mixer.effectsIn.opacity,
          r = [];
      n.callActions("beforeApplyStylesIn", arguments), r.push("translate(" + i.x + "px, " + i.y + "px)"), n.mixer.config.animation.animateResizeTargets && ("show" !== t.statusChange && (n.dom.el.style.width = i.width + "px", n.dom.el.style.height = i.height + "px"), n.dom.el.style.marginRight = i.marginRight + "px", n.dom.el.style.marginBottom = i.marginBottom + "px"), o && (n.dom.el.style.opacity = i.opacity), "show" === t.statusChange && (r = r.concat(n.mixer.transformIn)), n.dom.el.style[_e2.features.transformProp] = r.join(" "), n.callActions("afterApplyStylesIn", arguments);
    },
    applyStylesOut: function applyStylesOut(t) {
      var n = this,
          i = [],
          o = [],
          r = n.mixer.config.animation.animateResizeTargets,
          s = void 0 !== n.mixer.effectsIn.opacity;
      if (n.callActions("beforeApplyStylesOut", arguments), i.push(n.writeTransitionRule(_e2.features.transformRule, t.staggerIndex)), "none" !== t.statusChange && i.push(n.writeTransitionRule("opacity", t.staggerIndex, t.duration)), r && (i.push(n.writeTransitionRule("width", t.staggerIndex, t.duration)), i.push(n.writeTransitionRule("height", t.staggerIndex, t.duration)), i.push(n.writeTransitionRule("margin", t.staggerIndex, t.duration))), !t.callback) return n.mixer.targetsImmovable++, void (n.mixer.targetsMoved === n.mixer.targetsImmovable && n.mixer.cleanUp(t.operation));

      switch (n.operation = t.operation, n.callback = t.callback, !n.isExcluded && n.mixer.targetsBound++, n.isBound = !0, n.applyTransition(i), r && t.posOut.width > 0 && t.posOut.height > 0 && (n.dom.el.style.width = t.posOut.width + "px", n.dom.el.style.height = t.posOut.height + "px", n.dom.el.style.marginRight = t.posOut.marginRight + "px", n.dom.el.style.marginBottom = t.posOut.marginBottom + "px"), n.mixer.config.animation.nudge || "hide" !== t.statusChange || o.push("translate(" + t.posOut.x + "px, " + t.posOut.y + "px)"), t.statusChange) {
        case "hide":
          s && (n.dom.el.style.opacity = n.mixer.effectsOut.opacity), o = o.concat(n.mixer.transformOut);
          break;

        case "show":
          s && (n.dom.el.style.opacity = 1);
      }

      (n.mixer.config.animation.nudge || !n.mixer.config.animation.nudge && "hide" !== t.statusChange) && o.push("translate(" + t.posOut.x + "px, " + t.posOut.y + "px)"), n.dom.el.style[_e2.features.transformProp] = o.join(" "), n.callActions("afterApplyStylesOut", arguments);
    },
    writeTransitionRule: function writeTransitionRule(t, e, n) {
      var i = this,
          o = i.getDelay(e),
          r = "";
      return r = t + " " + (n > 0 ? n : i.mixer.config.animation.duration) + "ms " + o + "ms " + ("opacity" === t ? "linear" : i.mixer.config.animation.easing), i.callFilters("ruleWriteTransitionRule", r, arguments);
    },
    getDelay: function getDelay(t) {
      var e = this,
          n = -1;
      return "function" == typeof e.mixer.config.animation.staggerSequence && (t = e.mixer.config.animation.staggerSequence.call(e, t, e.state)), n = e.mixer.staggerDuration ? t * e.mixer.staggerDuration : 0, e.callFilters("delayGetDelay", n, arguments);
    },
    applyTransition: function applyTransition(t) {
      var n = this,
          i = t.join(", ");
      n.callActions("beforeApplyTransition", arguments), n.dom.el.style[_e2.features.transitionProp] = i, n.callActions("afterApplyTransition", arguments);
    },
    handleTransitionEnd: function handleTransitionEnd(t) {
      var e = this,
          n = t.propertyName,
          i = e.mixer.config.animation.animateResizeTargets;
      e.callActions("beforeHandleTransitionEnd", arguments), e.isBound && t.target.matches(e.mixer.config.selectors.target) && (n.indexOf("transform") > -1 || n.indexOf("opacity") > -1 || i && n.indexOf("height") > -1 || i && n.indexOf("width") > -1 || i && n.indexOf("margin") > -1) && (e.callback.call(e, e.operation), e.isBound = !1, e.callback = null, e.operation = null), e.callActions("afterHandleTransitionEnd", arguments);
    },
    eventBus: function eventBus(t) {
      var e = this;

      switch (e.callActions("beforeEventBus", arguments), t.type) {
        case "webkitTransitionEnd":
        case "transitionend":
          e.handleTransitionEnd(t);
      }

      e.callActions("afterEventBus", arguments);
    },
    unbindEvents: function unbindEvents() {
      var t = this;
      t.callActions("beforeUnbindEvents", arguments), n.off(t.dom.el, "webkitTransitionEnd", t.handler), n.off(t.dom.el, "transitionend", t.handler), t.callActions("afterUnbindEvents", arguments);
    },
    bindEvents: function bindEvents() {
      var t = this,
          i = "";
      t.callActions("beforeBindEvents", arguments), i = "webkit" === _e2.features.transitionPrefix ? "webkitTransitionEnd" : "transitionend", t.handler = function (e) {
        return t.eventBus(e);
      }, n.on(t.dom.el, i, t.handler), t.callActions("afterBindEvents", arguments);
    },
    getPosData: function getPosData(n) {
      var i = this,
          o = {},
          r = null,
          s = new _e2.StyleData();
      return i.callActions("beforeGetPosData", arguments), s.x = i.dom.el.offsetLeft, s.y = i.dom.el.offsetTop, (i.mixer.config.animation.animateResizeTargets || n) && (r = i.dom.el.getBoundingClientRect(), s.top = r.top, s.right = r.right, s.bottom = r.bottom, s.left = r.left, s.width = r.width, s.height = r.height), i.mixer.config.animation.animateResizeTargets && (o = t.getComputedStyle(i.dom.el), s.marginBottom = parseFloat(o.marginBottom), s.marginRight = parseFloat(o.marginRight)), i.callFilters("posDataGetPosData", s, arguments);
    },
    cleanUp: function cleanUp() {
      var t = this;
      t.callActions("beforeCleanUp", arguments), t.dom.el.style[_e2.features.transformProp] = "", t.dom.el.style[_e2.features.transitionProp] = "", t.dom.el.style.opacity = "", t.mixer.config.animation.animateResizeTargets && (t.dom.el.style.width = "", t.dom.el.style.height = "", t.dom.el.style.marginRight = "", t.dom.el.style.marginBottom = ""), t.callActions("afterCleanUp", arguments);
    }
  }), _e2.Collection = function (t) {
    var e = null,
        i = -1;

    for (this.callActions("beforeConstruct"), i = 0; e = t[i]; i++) {
      this[i] = e;
    }

    this.length = t.length, this.callActions("afterConstruct"), n.freeze(this);
  }, _e2.BaseStatic.call(_e2.Collection), _e2.Collection.prototype = Object.create(_e2.Base.prototype), n.extend(_e2.Collection.prototype, {
    constructor: _e2.Collection,
    mixitup: function mixitup(t) {
      var i = this,
          o = null,
          r = Array.prototype.slice.call(arguments),
          s = [],
          a = -1;

      for (this.callActions("beforeMixitup"), r.shift(), a = 0; o = i[a]; a++) {
        s.push(o[t].apply(o, r));
      }

      return i.callFilters("promiseMixitup", n.all(s, _e2.libraries), arguments);
    }
  }), _e2.Operation = function () {
    _e2.Base.call(this), this.callActions("beforeConstruct"), this.id = "", this.args = [], this.command = null, this.showPosData = [], this.toHidePosData = [], this.startState = null, this.newState = null, this.docState = null, this.willSort = !1, this.willChangeLayout = !1, this.hasEffect = !1, this.hasFailed = !1, this.triggerElement = null, this.show = [], this.hide = [], this.matching = [], this.toShow = [], this.toHide = [], this.toMove = [], this.toRemove = [], this.startOrder = [], this.newOrder = [], this.startSort = null, this.newSort = null, this.startFilter = null, this.newFilter = null, this.startDataset = null, this.newDataset = null, this.viewportDeltaX = 0, this.viewportDeltaY = 0, this.startX = 0, this.startY = 0, this.startHeight = 0, this.startWidth = 0, this.newX = 0, this.newY = 0, this.newHeight = 0, this.newWidth = 0, this.startContainerClassName = "", this.startDisplay = "", this.newContainerClassName = "", this.newDisplay = "", this.callActions("afterConstruct"), n.seal(this);
  }, _e2.BaseStatic.call(_e2.Operation), _e2.Operation.prototype = Object.create(_e2.Base.prototype), _e2.Operation.prototype.constructor = _e2.Operation, _e2.State = function () {
    _e2.Base.call(this), this.callActions("beforeConstruct"), this.id = "", this.activeFilter = null, this.activeSort = null, this.activeContainerClassName = "", this.container = null, this.targets = [], this.hide = [], this.show = [], this.matching = [], this.totalTargets = -1, this.totalShow = -1, this.totalHide = -1, this.totalMatching = -1, this.hasFailed = !1, this.triggerElement = null, this.activeDataset = null, this.callActions("afterConstruct"), n.seal(this);
  }, _e2.BaseStatic.call(_e2.State), _e2.State.prototype = Object.create(_e2.Base.prototype), _e2.State.prototype.constructor = _e2.State, _e2.UserInstruction = function () {
    _e2.Base.call(this), this.callActions("beforeConstruct"), this.command = {}, this.animate = !1, this.callback = null, this.callActions("afterConstruct"), n.seal(this);
  }, _e2.BaseStatic.call(_e2.UserInstruction), _e2.UserInstruction.prototype = Object.create(_e2.Base.prototype), _e2.UserInstruction.prototype.constructor = _e2.UserInstruction, _e2.Messages = function () {
    _e2.Base.call(this), this.callActions("beforeConstruct"), this.ERROR_FACTORY_INVALID_CONTAINER = "[MixItUp] An invalid selector or element reference was passed to the mixitup factory function", this.ERROR_FACTORY_CONTAINER_NOT_FOUND = "[MixItUp] The provided selector yielded no container element", this.ERROR_CONFIG_INVALID_ANIMATION_EFFECTS = "[MixItUp] Invalid value for `animation.effects`", this.ERROR_CONFIG_INVALID_CONTROLS_SCOPE = "[MixItUp] Invalid value for `controls.scope`", this.ERROR_CONFIG_INVALID_PROPERTY = '[MixitUp] Invalid configuration object property "${erroneous}"${suggestion}', this.ERROR_CONFIG_INVALID_PROPERTY_SUGGESTION = '. Did you mean "${probableMatch}"?', this.ERROR_CONFIG_DATA_UID_KEY_NOT_SET = "[MixItUp] To use the dataset API, a UID key must be specified using `data.uidKey`", this.ERROR_DATASET_INVALID_UID_KEY = '[MixItUp] The specified UID key "${uidKey}" is not present on one or more dataset items', this.ERROR_DATASET_DUPLICATE_UID = '[MixItUp] The UID "${uid}" was found on two or more dataset items. UIDs must be unique.', this.ERROR_INSERT_INVALID_ARGUMENTS = "[MixItUp] Please provider either an index or a sibling and position to insert, not both", this.ERROR_INSERT_PREEXISTING_ELEMENT = "[MixItUp] An element to be inserted already exists in the container", this.ERROR_FILTER_INVALID_ARGUMENTS = "[MixItUp] Please provide either a selector or collection `.filter()`, not both", this.ERROR_DATASET_NOT_SET = "[MixItUp] To use the dataset API with pre-rendered targets, a starting dataset must be set using `load.dataset`", this.ERROR_DATASET_PRERENDERED_MISMATCH = "[MixItUp] `load.dataset` does not match pre-rendered targets", this.ERROR_DATASET_RENDERER_NOT_SET = "[MixItUp] To insert an element via the dataset API, a target renderer function must be provided to `render.target`", this.ERROR_SORT_NON_EXISTENT_ELEMENT = "[MixItUp] An element to be sorted does not already exist in the container", this.WARNING_FACTORY_PREEXISTING_INSTANCE = "[MixItUp] WARNING: This element already has an active MixItUp instance. The provided configuration object will be ignored. If you wish to perform additional methods on this instance, please create a reference.", this.WARNING_INSERT_NO_ELEMENTS = "[MixItUp] WARNING: No valid elements were passed to `.insert()`", this.WARNING_REMOVE_NO_ELEMENTS = "[MixItUp] WARNING: No valid elements were passed to `.remove()`", this.WARNING_MULTIMIX_INSTANCE_QUEUE_FULL = "[MixItUp] WARNING: An operation was requested but the MixItUp instance was busy. The operation was rejected because the queue is full or queuing is disabled.", this.WARNING_GET_OPERATION_INSTANCE_BUSY = "[MixItUp] WARNING: Operations can be be created while the MixItUp instance is busy.", this.WARNING_NO_PROMISE_IMPLEMENTATION = "[MixItUp] WARNING: No Promise implementations could be found. If you wish to use promises with MixItUp please install an ES6 Promise polyfill.", this.WARNING_INCONSISTENT_SORTING_ATTRIBUTES = '[MixItUp] WARNING: The requested sorting data attribute "${attribute}" was not present on one or more target elements which may product unexpected sort output', this.callActions("afterConstruct"), this.compileTemplates(), n.seal(this);
  }, _e2.BaseStatic.call(_e2.Messages), _e2.Messages.prototype = Object.create(_e2.Base.prototype), _e2.Messages.prototype.constructor = _e2.Messages, _e2.Messages.prototype.compileTemplates = function () {
    var t = "",
        e = "";

    for (t in this) {
      "string" == typeof (e = this[t]) && (this[n.camelCase(t)] = n.template(e));
    }
  }, _e2.messages = new _e2.Messages(), _e2.Facade = function (t) {
    _e2.Base.call(this), this.callActions("beforeConstruct", arguments), this.configure = t.configure.bind(t), this.show = t.show.bind(t), this.hide = t.hide.bind(t), this.filter = t.filter.bind(t), this.toggleOn = t.toggleOn.bind(t), this.toggleOff = t.toggleOff.bind(t), this.sort = t.sort.bind(t), this.changeLayout = t.changeLayout.bind(t), this.multimix = t.multimix.bind(t), this.dataset = t.dataset.bind(t), this.tween = t.tween.bind(t), this.insert = t.insert.bind(t), this.insertBefore = t.insertBefore.bind(t), this.insertAfter = t.insertAfter.bind(t), this.prepend = t.prepend.bind(t), this.append = t.append.bind(t), this.remove = t.remove.bind(t), this.destroy = t.destroy.bind(t), this.forceRefresh = t.forceRefresh.bind(t), this.forceRender = t.forceRender.bind(t), this.isMixing = t.isMixing.bind(t), this.getOperation = t.getOperation.bind(t), this.getConfig = t.getConfig.bind(t), this.getState = t.getState.bind(t), this.callActions("afterConstruct", arguments), n.freeze(this), n.seal(this);
  }, _e2.BaseStatic.call(_e2.Facade), _e2.Facade.prototype = Object.create(_e2.Base.prototype), _e2.Facade.prototype.constructor = _e2.Facade, "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) ? module.exports = _e2 : "function" == typeof define && define.amd ? define(function () {
    return _e2;
  }) : void 0 !== t.mixitup && "function" == typeof t.mixitup || (t.mixitup = _e2), _e2.BaseStatic.call(_e2.constructor), _e2.NAME = "mixitup", _e2.CORE_VERSION = "3.3.1";
}(window), $(function () {
  $(".slider__carousel-inner").slick({
    autoplay: !0,
    autoplaySpeed: 1e3
  }), $(".blog-items__button-link").on("click", function (t) {
    t.preventDefault(), $("body, html").animate({
      scrollTop: top
    }, 0);
  });
  var t = $('[data-icon="bars"]');
  t.on("click", function () {
    $('[data-menu="bars"]').toggleClass("open"), $('[data-menu="title"]').toggleClass("close"), t.toggleClass("open");
  }), mixitup(".portfolio-items");
});

var Pagination = /*#__PURE__*/function () {
  function Pagination(t) {
    var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    _classCallCheck(this, Pagination);

    this.toolbar = document.querySelector(t), this.elements = e.map(function (t) {
      return document.querySelector(t);
    }), this.headerListener();
  }

  _createClass(Pagination, [{
    key: "headerListener",
    value: function headerListener() {
      var _this = this;

      this.toolbar.addEventListener("click", function (t) {
        t.preventDefault();
        var e = t.target.dataset.class;
        void 0 !== e && _this.open(document.querySelector(e));
        var n = document.querySelector("body");

        switch (e) {
          case ".wrapper-main":
            n.style.backgroundColor = "#7ec1c1";
            break;

          case ".wrapper-about":
            n.style.backgroundColor = "#ddd8c8";
            break;

          case ".wrapper-portfolio":
            n.style.backgroundColor = "#e28968";
            break;

          case ".wrapper-blog":
            n.style.backgroundColor = "#dad7d4";
            break;

          case ".wrapper-contact":
            n.style.backgroundColor = "#4e5258";
        }
      });
    }
  }, {
    key: "open",
    value: function open(t) {
      this.elements.forEach(function (t) {
        return t.classList.remove("open");
      }), t.classList.add("open");
    }
  }]);

  return Pagination;
}();

new Pagination('[data-toolbar="header"]', ['[data-type="main"]', '[data-type="about"]', '[data-type="portofolo"]', '[data-type="blog"]', '[data-type="contact"]']);

var Calculator = /*#__PURE__*/function () {
  function Calculator(t) {
    _classCallCheck(this, Calculator);

    this.form = document.querySelector(t), this.value = null, this.inputType = "", this.formula = "Формула", this.catet = null, this.catet2 = null, this.gip = null, this.formuls = ["c = <span>a<sup>2</sup> + b<sup>2</sup></span>", "a = <span>c<sup>2</sup> - b<sup>2</sup></span>", "s = (A × B)/2 "], this.render();
  }

  _createClass(Calculator, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      this.form.innerHTML = function () {
        var t = '<input type="text" data-info="catet" data-type="value-1" placeholder="Катет" />',
            e = '<input type="text" data-info="catet2" data-type="value-2" placeholder="Катет" />',
            n = '<input type="text" data-info="gip" data-type="value-3" placeholder="Гипотенуза" />',
            i = '<input type="text" data-info="catet" data-type="value-1" placeholder="1 сторона" />',
            o = '<input type="text" data-info="catet2" data-type="value-2" placeholder="2 сторона" />';
        return "\n      <div id=\"select-wrapper\">\n        <div class=\"select\" data-type=\"select\">\n          <div class=\"select__item\" data-id=\"cat\">\n            \u041A\u0430\u0442\u0435\u0442\n          </div>\n          <div class=\"select__item\" data-id=\"gip\">\n            \u0413\u0438\u043F\u043E\u0442\u0435\u043D\u0443\u0437\u0430\n          </div>\n          <div class=\"select__item\" data-id=\"s\">\n            \u041F\u043B\u043E\u0449\u0430\u0434\u044C\n          </div>\n        </div>\n        <input type=\"text\" data-type=\"counter\" placeholder=\"\u0413\u0438\u043F\u043E\u0442\u0435\u043D\u0443\u0437\u0430 / \u041A\u0430\u0442\u0435\u0442 / \u041F\u043B\u043E\u0449\u0430\u0434\u044C\" class=\"true main\" value=\"".concat(_this2.inputType, "\"/>\n      </div>\n      ").concat(function (r) {
          switch (r) {
            case "gip":
              return "\n            ".concat(t, "\n            ").concat(e, "\n            ");

            case "catet":
              return "\n            ".concat(t, "\n            ").concat(n, "\n            ");

            case "s":
              return "\n            ".concat(i, "\n            ").concat(o, "\n            ");
          }

          return "";
        }(_this2.value), "\n      <textarea data-type=\"ansver\" placeholder=\"\u041E\u0442\u0432\u0435\u0442: \"></textarea>\n      <button type=\"submit\" data-type=\"submit\">\u041F\u043E\u0441\u0447\u0438\u0442\u0430\u0442\u044C!</button>\n      <div class=\"contact__button\">\n        <span class=\"contact__button-link\" data-type=\"formula\">\n          ").concat(_this2.formula, "\n        </span>\n      </div>\n      ");
      }(), this.input(), this.clickHandler();
    }
  }, {
    key: "clickHandler",
    value: function clickHandler() {
      var _this3 = this;

      var t = this.form.querySelector('[data-type="select"]');
      document.addEventListener("click", function (e) {
        var _e$target$dataset = e.target.dataset,
            n = _e$target$dataset.type,
            i = _e$target$dataset.id;
        "counter" === n ? (selectOpener(t).open(), _this3.clearValueError(_this3.form)) : selectOpener(t).close();
      }), t.addEventListener("click", function (t) {
        var e = t.target.dataset.id;
        _this3.clearValueError(_this3.form), "cat" === e && (_this3.value = "catet", _this3.inputType = "Катет", _this3.formula = _this3.formuls[1], _this3.render()), "gip" === e && (_this3.inputType = "Гипотенуза", _this3.value = "gip", _this3.formula = _this3.formuls[0], _this3.render()), "s" === e && (_this3.inputType = "Площадь", _this3.value = "s", _this3.formula = _this3.formuls[2], _this3.render());
      });
    }
  }, {
    key: "input",
    value: function input() {
      var _this4 = this;

      this.form.addEventListener("input", function (t) {
        var _t$target$dataset = t.target.dataset,
            e = _t$target$dataset.type,
            n = _t$target$dataset.info,
            i = _this4.form.querySelector("[data-type=\"".concat(e, "\"]")),
            o = i.value.trim().toLowerCase(),
            r = ["катет", "гипотенуза", "площадь"];

        if ("counter" === e) {
          if (r.includes(o)) switch (_this4.trueClass(i), !0) {
            case o === r[0]:
              _this4.value = "catet", _this4.inputType = "Катет", _this4.formula = _this4.formuls[1], _this4.render();
              break;

            case o === r[1]:
              _this4.inputType = "Гипотенуза", _this4.value = "gip", _this4.formula = _this4.formuls[0], _this4.render();
              break;

            case o === r[2]:
              _this4.inputType = "Площадь", _this4.value = "s", _this4.formula = _this4.formuls[2], _this4.render();
          } else _this4.falseClass(i);
        } else if (["value-1", "value-2", "value-3"].includes(e)) {
          var _t2 = +o;

          if (Number.isNaN(_t2)) _this4.falseClass(i), _this4.submit(!0);else switch (_this4.trueClass(i), !0) {
            case "catet" === n:
              _this4.catet = i.value;
              break;

            case "catet2" === n:
              _this4.catet2 = i.value;
              break;

            case "gip" === n:
              _this4.gip = i.value;
          }
        }
      }), this.submit();
    }
  }, {
    key: "submit",
    value: function submit(t) {
      var _this5 = this;

      var e = this.form.querySelector('[data-type="submit"]'),
          n = this.form.querySelector('[data-type="ansver"]');
      e.addEventListener("click", function (e) {
        if (t) n.textContent = _this5.valueError("введены некорректные значения");else switch (e.preventDefault(), !0) {
          case "catet" === _this5.value:
            var _t3 = calcCatet(_this5.gip, _this5.catet);

            n.textContent = Number.isNaN(_t3) ? _this5.valueError("гипотенуза не может быть меньше катета") : _this5.clearValueError(_t3);
            break;

          case "gip" === _this5.value:
            n.textContent = calcGip(_this5.catet, _this5.catet2);
            break;

          case "s" === _this5.value:
            var _e3 = calcS(_this5.catet, _this5.catet2);

            n.textContent = _e3;
        }
      });
    }
  }, {
    key: "trueClass",
    value: function trueClass(t) {
      t.classList.add("true"), t.classList.remove("false");
    }
  }, {
    key: "falseClass",
    value: function falseClass(t) {
      t.classList.add("false"), t.classList.remove("true");
    }
  }, {
    key: "valueError",
    value: function valueError(t) {
      return this.form.classList.add("error"), t;
    }
  }, {
    key: "clearValueError",
    value: function clearValueError(t) {
      return this.form.classList.remove("error"), t;
    }
  }]);

  return Calculator;
}();

var calculator = new Calculator('[data-form="calculator"]'),
    calcCatet = function calcCatet(t, e) {
  return Math.sqrt(Math.pow(t, 2) - Math.pow(e, 2));
},
    calcGip = function calcGip(t, e) {
  return Math.sqrt(Math.pow(e, 2) + Math.pow(t, 2));
},
    calcS = function calcS(t, e) {
  return t * e / 2;
};

function selectOpener(t) {
  function e() {
    return t.classList.add("open");
  }

  function n() {
    return t.classList.remove("open");
  }

  return {
    open: e,
    close: n,
    toggle: function toggle() {
      t.classList.contains("open") ? n() : e();
    }
  };
}

var Gallery = /*#__PURE__*/function () {
  function Gallery(t, e) {
    _classCallCheck(this, Gallery);

    this.$main = document.querySelector(t), this.$overlay = this.$main.querySelector(e), this.img = "", this.init();
  }

  _createClass(Gallery, [{
    key: "overlayHandler",
    value: function overlayHandler() {
      var _this6 = this;

      this.$overlay.addEventListener("click", function (t) {
        selectOpener(_this6.$img).close(), selectOpener(_this6.$overlay).close(), document.querySelector("body").style.overflow = "visible", _this6.$img.style.display = "none";
      });
    }
  }, {
    key: "clickHandler",
    value: function clickHandler(t) {
      t.preventDefault();
      var e = t.target.closest('[data-type="gallery-item"]').dataset.order;
      this.$img = document.querySelector(".portfolio-item__img-" + e), selectOpener(this.$img).open(), selectOpener(this.$overlay).open(), document.querySelector("body").style.overflow = "hidden", this.$img.classList.contains("open") && (this.$img.style.display = "block", this.$img.style.zIndex = "3000");
    }
  }, {
    key: "init",
    value: function init() {
      var _this7 = this;

      this.$main.addEventListener("click", function (t) {
        return _this7.clickHandler(t);
      }), this.overlayHandler();
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var _this8 = this;

      this.$main.removeEventListener("click", function (t) {
        return _this8.clickHandler(t);
      });
    }
  }]);

  return Gallery;
}();

new Gallery(".portfolio-items", '[data-overlay="img"]');
},{"jquery":"../node_modules/jquery/dist/jquery.js"}],"../../../../../../../data/data/com.termux/files/usr/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "40657" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../../../data/data/com.termux/files/usr/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/main.min.js"], null)
//# sourceMappingURL=/main.min.990badd4.js.map