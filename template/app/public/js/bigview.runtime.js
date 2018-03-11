/* global localStorage, location, XMLHttpRequest */
// debug bigview
var _bigviewDebug = (function (id, string) {
  var _startTime = new Date().getTime()
  var getTimeDiffStr = function () {
    var time = new Date().getTime()
    return '[+' + (time - _startTime) + 'ms];'
  }
  var isDebugOpen = false
  if (typeof process !== 'undefined') {
    isDebugOpen = process.env._bigview
  } else if (typeof window !== 'undefined') {
    isDebugOpen = window.localStorage && localStorage._bigview
  }
  return function (id, string) {
    if (isDebugOpen) {
      id = id || 'bigview'
      string = string || ''
      console.log('Module: ' + id + '  ' + string + '%c ' + getTimeDiffStr(), 'color: blue')
    }
  }
}())

var _errorTemplate = '<div class="bigview-error-template" style="position:relative;height:100%; text-align:center;padding-top:10px;">'
_errorTemplate += '<img style="display:inline-block;height:50px;" src="https://gw.alicdn.com/tfs/TB1iNyybgmTBuNjy1XbXXaMrVXa-100-100.png" />'
_errorTemplate += '<p>Some Errors ~</p>'
_errorTemplate += '<p><a href="javascript:;" class="js-bigview-retry" style="display:inline-block; padding:4px 12px;line-height:32px; text-decoration:none; color: blue;">Retry </a>'

var BigEvent = function () {
}

BigEvent.prototype.on = function (eventName, func) {
  this._listeners = this._listeners || {}
  this._listeners[eventName] = this._listeners[eventName] || []
  this._listeners[eventName].push(func)
}

BigEvent.prototype.off = function (eventName, func) {
  this._listeners = this._listeners || {}
  this._listeners[eventName].splice(this._listeners[eventName].indexOf(func), 1)
}

BigEvent.prototype.trigger = function (eventName) {
  this._listeners = this._listeners || {}

  var dataArgument = arguments[1] ? arguments[1] : null
  var events = this._listeners[eventName] || []
  for (var i = 0; i < events.length; i++) {
    var ev = events[i]
    if (dataArgument) {
      ev.call(this, dataArgument)
    } else {
      ev.call(this)
    }
  };
}

BigEvent.extend = function (obj) {
  var functions = [
    'on',
    'off',
    'trigger'
  ]

  for (var i = 0; i < functions.length; i++) {
    var func = functions[i]

    if (typeof obj === 'function') {
      obj.prototype[func] = BigEvent.prototype[func]
    } else {
      obj[func] = BigEvent.prototype[func]
    }
  };
}

var Bigview = function () {
  var self = this

  this.log = function (id, str) {
    _bigviewDebug(id, str)
  }
    // payload={domid, html='',}
  this.view = function (payload) {
    self.trigger('pageletArrive', payload)
    self.log(payload.domid, 'pageletArrive')
    if (payload.domid) {
      self.trigger(payload.domid, payload)
    }
  }

  this.ready = function (data) {
    this.log('ready')
    self.trigger('ready', data)
  }

  this.end = function (data) {
    this.log('end')
    this.trigger('end', data)
  }

  this.error = function (payload) {
    this.trigger('error', payload)
    var el = this.replaceHtml(payload.domid, this.errorTemplate)
    var btn = el.querySelector('.js-bigview-retry')
    if (btn) {
      btn.addEventListener('click', function () {
        self._request(payload)
      })
    }
  }

  this.beforePageletArrive = function (string) {
    self.trigger('beforePageletArrive', string)
  }

  this.on('pageletArrive', function (payload) {
    if (payload.error) {
      self.error(payload)
    }
    // css -> html -> js
    if (payload.css) {
      var css = Array.isArray(payload.css) ? payload.css : [payload.css]
      css.forEach(function (item) {
        self.insertCss(item)
      })
    }
    if (payload.domid && payload.html && !payload.error) {
      self.replaceHtml(payload.domid, payload.html)
    }
    if (payload.js) {
      var js = Array.isArray(payload.js) ? payload.js : [payload.js]
      js.forEach(function (item) {
        self.insertScript(item)
      })
    }
  })

  this.replaceHtml = function (el, html) {
    var oldEl = typeof el === 'string' ? document.getElementById(el) : el
    /* @cc_on // Pure innerHTML is slightly faster in IE
     * oldEl.innerHTML = html;
     * return oldEl;
     */
    if (!oldEl) {
      return
    }
    var newEl = oldEl.cloneNode(false)
    newEl.innerHTML = html.replace(/~~~~~~~/g, '<').replace(/=========/g, '>')
    oldEl.parentNode.replaceChild(newEl, oldEl)
    // excute script intime
    var scripts = newEl.getElementsByTagName('script')
    scripts = Array.prototype.slice.call(scripts)
    var len = scripts.length
    for (var i = 0; i < len; i++) {
      var item = scripts[i]
      var node = document.createElement('SCRIPT')
      if (item.src) {
        node.src = item.src
        item.parentNode.replaceChild(node, item)
      } else if (item.innerText.trim()) {
        node.text = item.innerText
        item.parentNode.replaceChild(node, item)
      }
    }
    /* Since we just removed the old element from the DOM, return a reference
    to the new element, which can be used to restore variable references. */
    return newEl
  }

  this.insertCss = function (src) {
    var link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = src
    document.getElementsByTagName('head')[0].appendChild(link)
  }

  this.insertScript = function (src) {
    var node = document.createElement('SCRIPT')
    node.src = src
    document.body.appendChild(node)
  }

  // requert an signle pagelet via ajax
  this._request = function (payload) {
    var url = location.href
    if (location.search) {
      url += ('&_pagelet_id=' + payload.domid)
    } else {
      url += ('?_pagelet_id=' + payload.domid)
    }
    var xhr = new XMLHttpRequest()
    // TODO jaso or html ?
    xhr.onload = function (response) {
      var data = xhr.response
      var json = {}
      try {
        json = JSON.parse(data)
      } catch (_e) {
        if (xhr.status === 401) {
          _bigviewDebug('access_denied', xhr.statusText)
        }
      }
      json.error = false
      self.view(json)
    }
    xhr.onerror = function (err) {
      self.error(payload)
      console.error(err)
    }
    xhr.open('GET', url, true)
    xhr.setRequestHeader('bigview_error_time', Date.now())
    xhr.send()
  }
}

BigEvent.extend(Bigview)

var _bigview = new Bigview()
_bigview.errorTemplate = _errorTemplate
if (typeof define === 'function' && define.amd) {
  define('bigview', [], function () {
    return _bigview
  })
} else if (typeof exports === 'object') {
  module.exports = _bigview
} else {
  window.bigview = _bigview
}
