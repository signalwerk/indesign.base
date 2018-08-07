// load console object
// @include "./console.js"

// Polyfill ECMAScript 6
// from https://developer.mozilla.org

if (!String.prototype.endsWith) {
  String.prototype.endsWith = function(searchString, position) {
      var subjectString = this.toString();
      if (position === undefined || position > subjectString.length) {
        position = subjectString.length;
      }
      position -= searchString.length;
      var lastIndex = subjectString.indexOf(searchString, position);
      return lastIndex !== -1 && lastIndex === position;
  };
}

if (!String.prototype.startsWith) {
  String.prototype.startsWith = function(searchString, position) {
    position = position || 0;
    return this.lastIndexOf(searchString, position) === position;
  };
}

if (!Date.now) {
  Date.now = function now() {
    return new Date().getTime();
  };
}


if (!String.prototype.trim) {
  (function() {
    // Make sure we trim BOM and NBSP
    var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
    String.prototype.trim = function() {
      return this.replace(rtrim, '');
    };
  })();
}


// Production steps of ECMA-262, Edition 5, 15.4.4.14
// Reference: http://es5.github.io/#x15.4.4.14
if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function(searchElement, fromIndex) {

    var k;

    // 1. Let o be the result of calling ToObject passing
    //    the this value as the argument.
    if (this == null) {
      throw new TypeError('"this" is null or not defined');
    }

    var o = Object(this);

    // 2. Let lenValue be the result of calling the Get
    //    internal method of o with the argument "length".
    // 3. Let len be ToUint32(lenValue).
    var len = o.length >>> 0;

    // 4. If len is 0, return -1.
    if (len === 0) {
      return -1;
    }

    // 5. If argument fromIndex was passed let n be
    //    ToInteger(fromIndex); else let n be 0.
    var n = +fromIndex || 0;

    if (Math.abs(n) === Infinity) {
      n = 0;
    }

    // 6. If n >= len, return -1.
    if (n >= len) {
      return -1;
    }

    // 7. If n >= 0, then Let k be n.
    // 8. Else, n<0, Let k be len - abs(n).
    //    If k is less than 0, then let k be 0.
    k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

    // 9. Repeat, while k < len
    while (k < len) {
      // a. Let Pk be ToString(k).
      //   This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the
      //    HasProperty internal method of o with argument Pk.
      //   This step can be combined with c
      // c. If kPresent is true, then
      //    i.  Let elementK be the result of calling the Get
      //        internal method of o with the argument ToString(k).
      //   ii.  Let same be the result of applying the
      //        Strict Equality Comparison Algorithm to
      //        searchElement and elementK.
      //  iii.  If same is true, return k.
      if (k in o && o[k] === searchElement) {
        return k;
      }
      k++;
    }
    return -1;
  };
}


// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
if (!Object.keys) {
  Object.keys = (function() {
    'use strict';
    var hasOwnProperty = Object.prototype.hasOwnProperty,
        hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
        dontEnums = [
          'toString',
          'toLocaleString',
          'valueOf',
          'hasOwnProperty',
          'isPrototypeOf',
          'propertyIsEnumerable',
          'constructor'
        ],
        dontEnumsLength = dontEnums.length;

    return function(obj) {
      if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
        throw new TypeError('Object.keys called on non-object');
      }

      var result = [], prop, i;

      for (prop in obj) {
        if (hasOwnProperty.call(obj, prop)) {
          result.push(prop);
        }
      }

      if (hasDontEnumBug) {
        for (i = 0; i < dontEnumsLength; i++) {
          if (hasOwnProperty.call(obj, dontEnums[i])) {
            result.push(dontEnums[i]);
          }
        }
      }
      return result;
    };
  }());
}


// https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties
if (!Object.defineProperty) {

	Object.defineProperty = function defineProperty(obj, properties) {
		  function convertToDescriptor(desc) {
			function hasProperty(obj, prop) {
			  return Object.prototype.hasOwnProperty.call(obj, prop);
			}

			function isCallable(v) {
			  // NB: modify as necessary if other values than functions are callable.
			  return typeof v === "function";
			}

			if (typeof desc !== "object" || desc === null)
			  throw new TypeError("bad desc");

			var d = {};

			if (hasProperty(desc, "enumerable"))
			  d.enumerable = !!desc.enumerable;
			if (hasProperty(desc, "configurable"))
			  d.configurable = !!desc.configurable;
			if (hasProperty(desc, "value"))
			  d.value = desc.value;
			if (hasProperty(desc, "writable"))
			  d.writable = !!desc.writable;
			if (hasProperty(desc, "get")) {
			  var g = desc.get;

			  if (!isCallable(g) && typeof g !== "undefined")
				throw new TypeError("bad get");
			  d.get = g;
			}
			if (hasProperty(desc, "set")) {
			  var s = desc.set;
			  if (!isCallable(s) && typeof s !== "undefined")
				throw new TypeError("bad set");
			  d.set = s;
			}

			if (("get" in d || "set" in d) && ("value" in d || "writable" in d))
			  throw new TypeError("identity-confused descriptor");

			return d;
		  }

		  if (typeof obj !== "object" || obj === null)
			throw new TypeError("bad obj");

		  properties = Object(properties);

		  var keys = Object.keys(properties);
		  var descs = [];

		  for (var i = 0; i < keys.length; i++)
			descs.push([keys[i], convertToDescriptor(properties[keys[i]])]);

		  for (var i = 0; i < descs.length; i++)
			Object.defineProperty(obj, descs[i][0], descs[i][1]);

		  return obj;

	};
}




// JSON LIB
// https://github.com/douglascrockford/JSON-js
// @include "./lib/JSON-js/json2.js"

// JSON Prune
// https://github.com/Canop/JSON.prune
// @include "./lib/JSON.prune/JSON.prune.js"




