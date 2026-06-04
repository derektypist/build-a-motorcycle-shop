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
})({"QCba":[function(require,module,exports) {
"use strict";

function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
function fetchMotorcycles() {
  return fetch("https://cdn.freecodecamp.org/curriculum/labs/data/motorcycles.json").then(res => res.json());
}
function renderMotorcycleCard(motorcycle) {
  return "\n      <div class=\"motorcycle-card\">\n        <div class=\"motorcycle-card-image-container\">\n          <img\n            src=\"".concat(motorcycle.image_url, "\"\n            alt=\"").concat(motorcycle.name, "\"\n            class=\"motorcycle-card-image\"\n          />\n          <div class=\"motorcycle-card-year-badge\">\n            ").concat(motorcycle.year, "\n          </div>\n        </div>\n        <div class=\"motorcycle-card-content\">\n          <div class=\"motorcycle-card-header\">\n            <div>\n              <h3 class=\"motorcycle-card-title\">").concat(motorcycle.name, "</h3>\n              <p class=\"motorcycle-card-manufacturer\">").concat(motorcycle.manufacturer, "</p>\n            </div>\n            <span class=\"motorcycle-card-category\">\n              ").concat(motorcycle.category, "\n            </span>\n          </div>\n          <p class=\"motorcycle-card-description\">").concat(motorcycle.description, "</p>\n          <div class=\"motorcycle-card-footer\">\n            <div>\n              <p class=\"motorcycle-card-price\">\n                $").concat(motorcycle.price.toLocaleString(), "\n              </p>\n              <p class=\"motorcycle-card-engine\">").concat(motorcycle.engine_cc, "cc</p>\n            </div>\n            <button class=\"motorcycle-card-button\" data-motorcycle-id=\"").concat(motorcycle.id, "\">\n              View Details\n            </button>\n          </div>\n        </div>\n      </div>\n    ");
}
class MotorcycleGalleryApp {
  constructor() {
    _defineProperty(this, "allMotorcycles", []);
    _defineProperty(this, "filteredMotorcycles", []);
    _defineProperty(this, "nameFilter", '');
    this.init();
  }
  async init() {
    await this.loadMotorcycles();
    this.setupEventListeners();
    this.render();
  }
  async loadMotorcycles() {
    this.showLoading(true);
    try {
      const data = await fetchMotorcycles();
      this.allMotorcycles = [...data];
      this.applyFilters();
    } catch (error) {
      console.error('Error loading motorcycles:', error);
    } finally {
      this.showLoading(false);
    }
  }
  applyFilters() {
    this.filteredMotorcycles = this.allMotorcycles.filter(motorcycle => {
      const matchesName = this.nameFilter === '' || motorcycle.name.toLowerCase().includes(this.nameFilter.toLowerCase());
      return matchesName;
    });
    this.render();
  }
  setupEventListeners() {
    const nameFilterInput = document.getElementById('name-filter-input');
    if (nameFilterInput) {
      nameFilterInput.addEventListener('input', event => {
        const target = event.target;
        this.nameFilter = target.value;
        this.applyFilters();
      });
    }
  }
  render() {
    this.renderResultsCount();
    this.renderMotorcycles();
  }
  renderResultsCount() {
    const resultsNumber = document.getElementById('results-number');
    if (resultsNumber) {
      resultsNumber.textContent = this.filteredMotorcycles.length.toString();
    }
  }
  renderMotorcycles() {
    const container = document.getElementById('motorcycle-grid');
    const noResults = document.getElementById('no-results');
    if (!container) return;
    if (this.filteredMotorcycles.length === 0) {
      container.style.display = 'none';
      if (noResults) {
        noResults.style.display = 'block';
      }
      return;
    }
    if (noResults) {
      noResults.style.display = 'none';
    }
    container.style.display = 'grid';
    container.innerHTML = this.filteredMotorcycles.map(motorcycle => renderMotorcycleCard(motorcycle)).join('');
  }
  showLoading(show) {
    const loadingContainer = document.getElementById('loading-container');
    const motorcycleGrid = document.getElementById('motorcycle-grid');
    if (loadingContainer) {
      loadingContainer.style.display = show ? 'flex' : 'none';
    }
    if (motorcycleGrid) {
      motorcycleGrid.style.display = show ? 'none' : 'grid';
    }
  }
}
document.addEventListener('DOMContentLoaded', () => {
  new MotorcycleGalleryApp();
});
},{}]},{},["QCba"], null)
//# sourceMappingURL=/src.a0241758.js.map