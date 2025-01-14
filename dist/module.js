(() => {
    var e = {
            669: (e, t, n) => {
                e.exports = n(609)
            },
            448: (e, t, n) => {
                "use strict";
                var r = n(867),
                    o = n(26),
                    s = n(372),
                    i = n(327),
                    a = n(97),
                    c = n(109),
                    u = n(985),
                    f = n(61);
                e.exports = function(e) {
                    return new Promise((function(t, n) {
                        var l = e.data,
                            d = e.headers;
                        r.isFormData(l) && delete d["Content-Type"];
                        var p = new XMLHttpRequest;
                        if (e.auth) {
                            var h = e.auth.username || "",
                                m = e.auth.password ? unescape(encodeURIComponent(e.auth.password)) : "";
                            d.Authorization = "Basic " + btoa(h + ":" + m)
                        }
                        var g = a(e.baseURL, e.url);
                        if (p.open(e.method.toUpperCase(), i(g, e.params, e.paramsSerializer), !0), p.timeout = e.timeout, p.onreadystatechange = function() {
                                if (p && 4 === p.readyState && (0 !== p.status || p.responseURL && 0 === p.responseURL.indexOf("file:"))) {
                                    var r = "getAllResponseHeaders" in p ? c(p.getAllResponseHeaders()) : null,
                                        s = {
                                            data: e.responseType && "text" !== e.responseType ? p.response : p.responseText,
                                            status: p.status,
                                            statusText: p.statusText,
                                            headers: r,
                                            config: e,
                                            request: p
                                        };
                                    o(t, n, s), p = null
                                }
                            }, p.onabort = function() {
                                p && (n(f("Request aborted", e, "ECONNABORTED", p)), p = null)
                            }, p.onerror = function() {
                                n(f("Network Error", e, null, p)), p = null
                            }, p.ontimeout = function() {
                                var t = "timeout of " + e.timeout + "ms exceeded";
                                e.timeoutErrorMessage && (t = e.timeoutErrorMessage), n(f(t, e, "ECONNABORTED", p)), p = null
                            }, r.isStandardBrowserEnv()) {
                            var y = (e.withCredentials || u(g)) && e.xsrfCookieName ? s.read(e.xsrfCookieName) : void 0;
                            y && (d[e.xsrfHeaderName] = y)
                        }
                        if ("setRequestHeader" in p && r.forEach(d, (function(e, t) {
                                void 0 === l && "content-type" === t.toLowerCase() ? delete d[t] : p.setRequestHeader(t, e)
                            })), r.isUndefined(e.withCredentials) || (p.withCredentials = !!e.withCredentials), e.responseType) try {
                            p.responseType = e.responseType
                        } catch (t) {
                            if ("json" !== e.responseType) throw t
                        }
                        "function" == typeof e.onDownloadProgress && p.addEventListener("progress", e.onDownloadProgress), "function" == typeof e.onUploadProgress && p.upload && p.upload.addEventListener("progress", e.onUploadProgress), e.cancelToken && e.cancelToken.promise.then((function(e) {
                            p && (p.abort(), n(e), p = null)
                        })), l || (l = null), p.send(l)
                    }))
                }
            },
            609: (e, t, n) => {
                "use strict";
                var r = n(867),
                    o = n(849),
                    s = n(321),
                    i = n(185);

                function a(e) {
                    var t = new s(e),
                        n = o(s.prototype.request, t);
                    return r.extend(n, s.prototype, t), r.extend(n, t), n
                }
                var c = a(n(655));
                c.Axios = s, c.create = function(e) {
                    return a(i(c.defaults, e))
                }, c.Cancel = n(263), c.CancelToken = n(972), c.isCancel = n(502), c.all = function(e) {
                    return Promise.all(e)
                }, c.spread = n(713), c.isAxiosError = n(268), e.exports = c, e.exports.default = c
            },
            263: e => {
                "use strict";

                function t(e) {
                    this.message = e
                }
                t.prototype.toString = function() {
                    return "Cancel" + (this.message ? ": " + this.message : "")
                }, t.prototype.__CANCEL__ = !0, e.exports = t
            },
            972: (e, t, n) => {
                "use strict";
                var r = n(263);

                function o(e) {
                    if ("function" != typeof e) throw new TypeError("executor must be a function.");
                    var t;
                    this.promise = new Promise((function(e) {
                        t = e
                    }));
                    var n = this;
                    e((function(e) {
                        n.reason || (n.reason = new r(e), t(n.reason))
                    }))
                }
                o.prototype.throwIfRequested = function() {
                    if (this.reason) throw this.reason
                }, o.source = function() {
                    var e;
                    return {
                        token: new o((function(t) {
                            e = t
                        })),
                        cancel: e
                    }
                }, e.exports = o
            },
            502: e => {
                "use strict";
                e.exports = function(e) {
                    return !(!e || !e.__CANCEL__)
                }
            },
            321: (e, t, n) => {
                "use strict";
                var r = n(867),
                    o = n(327),
                    s = n(782),
                    i = n(572),
                    a = n(185);

                function c(e) {
                    this.defaults = e, this.interceptors = {
                        request: new s,
                        response: new s
                    }
                }
                c.prototype.request = function(e) {
                    "string" == typeof e ? (e = arguments[1] || {}).url = arguments[0] : e = e || {}, (e = a(this.defaults, e)).method ? e.method = e.method.toLowerCase() : this.defaults.method ? e.method = this.defaults.method.toLowerCase() : e.method = "get";
                    var t = [i, void 0],
                        n = Promise.resolve(e);
                    for (this.interceptors.request.forEach((function(e) {
                            t.unshift(e.fulfilled, e.rejected)
                        })), this.interceptors.response.forEach((function(e) {
                            t.push(e.fulfilled, e.rejected)
                        })); t.length;) n = n.then(t.shift(), t.shift());
                    return n
                }, c.prototype.getUri = function(e) {
                    return e = a(this.defaults, e), o(e.url, e.params, e.paramsSerializer).replace(/^\?/, "")
                }, r.forEach(["delete", "get", "head", "options"], (function(e) {
                    c.prototype[e] = function(t, n) {
                        return this.request(a(n || {}, {
                            method: e,
                            url: t,
                            data: (n || {}).data
                        }))
                    }
                })), r.forEach(["post", "put", "patch"], (function(e) {
                    c.prototype[e] = function(t, n, r) {
                        return this.request(a(r || {}, {
                            method: e,
                            url: t,
                            data: n
                        }))
                    }
                })), e.exports = c
            },
            782: (e, t, n) => {
                "use strict";
                var r = n(867);

                function o() {
                    this.handlers = []
                }
                o.prototype.use = function(e, t) {
                    return this.handlers.push({
                        fulfilled: e,
                        rejected: t
                    }), this.handlers.length - 1
                }, o.prototype.eject = function(e) {
                    this.handlers[e] && (this.handlers[e] = null)
                }, o.prototype.forEach = function(e) {
                    r.forEach(this.handlers, (function(t) {
                        null !== t && e(t)
                    }))
                }, e.exports = o
            },
            97: (e, t, n) => {
                "use strict";
                var r = n(793),
                    o = n(303);
                e.exports = function(e, t) {
                    return e && !r(t) ? o(e, t) : t
                }
            },
            61: (e, t, n) => {
                "use strict";
                var r = n(481);
                e.exports = function(e, t, n, o, s) {
                    var i = new Error(e);
                    return r(i, t, n, o, s)
                }
            },
            572: (e, t, n) => {
                "use strict";
                var r = n(867),
                    o = n(527),
                    s = n(502),
                    i = n(655);

                function a(e) {
                    e.cancelToken && e.cancelToken.throwIfRequested()
                }
                e.exports = function(e) {
                    return a(e), e.headers = e.headers || {}, e.data = o(e.data, e.headers, e.transformRequest), e.headers = r.merge(e.headers.common || {}, e.headers[e.method] || {}, e.headers), r.forEach(["delete", "get", "head", "post", "put", "patch", "common"], (function(t) {
                        delete e.headers[t]
                    })), (e.adapter || i.adapter)(e).then((function(t) {
                        return a(e), t.data = o(t.data, t.headers, e.transformResponse), t
                    }), (function(t) {
                        return s(t) || (a(e), t && t.response && (t.response.data = o(t.response.data, t.response.headers, e.transformResponse))), Promise.reject(t)
                    }))
                }
            },
            481: e => {
                "use strict";
                e.exports = function(e, t, n, r, o) {
                    return e.config = t, n && (e.code = n), e.request = r, e.response = o, e.isAxiosError = !0, e.toJSON = function() {
                        return {
                            message: this.message,
                            name: this.name,
                            description: this.description,
                            number: this.number,
                            fileName: this.fileName,
                            lineNumber: this.lineNumber,
                            columnNumber: this.columnNumber,
                            stack: this.stack,
                            config: this.config,
                            code: this.code
                        }
                    }, e
                }
            },
            185: (e, t, n) => {
                "use strict";
                var r = n(867);
                e.exports = function(e, t) {
                    t = t || {};
                    var n = {},
                        o = ["url", "method", "data"],
                        s = ["headers", "auth", "proxy", "params"],
                        i = ["baseURL", "transformRequest", "transformResponse", "paramsSerializer", "timeout", "timeoutMessage", "withCredentials", "adapter", "responseType", "xsrfCookieName", "xsrfHeaderName", "onUploadProgress", "onDownloadProgress", "decompress", "maxContentLength", "maxBodyLength", "maxRedirects", "transport", "httpAgent", "httpsAgent", "cancelToken", "socketPath", "responseEncoding"],
                        a = ["validateStatus"];

                    function c(e, t) {
                        return r.isPlainObject(e) && r.isPlainObject(t) ? r.merge(e, t) : r.isPlainObject(t) ? r.merge({}, t) : r.isArray(t) ? t.slice() : t
                    }

                    function u(o) {
                        r.isUndefined(t[o]) ? r.isUndefined(e[o]) || (n[o] = c(void 0, e[o])) : n[o] = c(e[o], t[o])
                    }
                    r.forEach(o, (function(e) {
                        r.isUndefined(t[e]) || (n[e] = c(void 0, t[e]))
                    })), r.forEach(s, u), r.forEach(i, (function(o) {
                        r.isUndefined(t[o]) ? r.isUndefined(e[o]) || (n[o] = c(void 0, e[o])) : n[o] = c(void 0, t[o])
                    })), r.forEach(a, (function(r) {
                        r in t ? n[r] = c(e[r], t[r]) : r in e && (n[r] = c(void 0, e[r]))
                    }));
                    var f = o.concat(s).concat(i).concat(a),
                        l = Object.keys(e).concat(Object.keys(t)).filter((function(e) {
                            return -1 === f.indexOf(e)
                        }));
                    return r.forEach(l, u), n
                }
            },
            26: (e, t, n) => {
                "use strict";
                var r = n(61);
                e.exports = function(e, t, n) {
                    var o = n.config.validateStatus;
                    n.status && o && !o(n.status) ? t(r("Request failed with status code " + n.status, n.config, null, n.request, n)) : e(n)
                }
            },
            527: (e, t, n) => {
                "use strict";
                var r = n(867);
                e.exports = function(e, t, n) {
                    return r.forEach(n, (function(n) {
                        e = n(e, t)
                    })), e
                }
            },
            655: (e, t, n) => {
                "use strict";
                var r = n(867),
                    o = n(16),
                    s = {
                        "Content-Type": "application/x-www-form-urlencoded"
                    };

                function i(e, t) {
                    !r.isUndefined(e) && r.isUndefined(e["Content-Type"]) && (e["Content-Type"] = t)
                }
                var a, c = {
                    adapter: (("undefined" != typeof XMLHttpRequest || "undefined" != typeof process && "[object process]" === Object.prototype.toString.call(process)) && (a = n(448)), a),
                    transformRequest: [function(e, t) {
                        return o(t, "Accept"), o(t, "Content-Type"), r.isFormData(e) || r.isArrayBuffer(e) || r.isBuffer(e) || r.isStream(e) || r.isFile(e) || r.isBlob(e) ? e : r.isArrayBufferView(e) ? e.buffer : r.isURLSearchParams(e) ? (i(t, "application/x-www-form-urlencoded;charset=utf-8"), e.toString()) : r.isObject(e) ? (i(t, "application/json;charset=utf-8"), JSON.stringify(e)) : e
                    }],
                    transformResponse: [function(e) {
                        if ("string" == typeof e) try {
                            e = JSON.parse(e)
                        } catch (e) {}
                        return e
                    }],
                    timeout: 0,
                    xsrfCookieName: "XSRF-TOKEN",
                    xsrfHeaderName: "X-XSRF-TOKEN",
                    maxContentLength: -1,
                    maxBodyLength: -1,
                    validateStatus: function(e) {
                        return e >= 200 && e < 300
                    },
                    headers: {
                        common: {
                            Accept: "application/json, text/plain, */*"
                        }
                    }
                };
                r.forEach(["delete", "get", "head"], (function(e) {
                    c.headers[e] = {}
                })), r.forEach(["post", "put", "patch"], (function(e) {
                    c.headers[e] = r.merge(s)
                })), e.exports = c
            },
            849: e => {
                "use strict";
                e.exports = function(e, t) {
                    return function() {
                        for (var n = new Array(arguments.length), r = 0; r < n.length; r++) n[r] = arguments[r];
                        return e.apply(t, n)
                    }
                }
            },
            327: (e, t, n) => {
                "use strict";
                var r = n(867);

                function o(e) {
                    return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]")
                }
                e.exports = function(e, t, n) {
                    if (!t) return e;
                    var s;
                    if (n) s = n(t);
                    else if (r.isURLSearchParams(t)) s = t.toString();
                    else {
                        var i = [];
                        r.forEach(t, (function(e, t) {
                            null != e && (r.isArray(e) ? t += "[]" : e = [e], r.forEach(e, (function(e) {
                                r.isDate(e) ? e = e.toISOString() : r.isObject(e) && (e = JSON.stringify(e)), i.push(o(t) + "=" + o(e))
                            })))
                        })), s = i.join("&")
                    }
                    if (s) {
                        var a = e.indexOf("#"); - 1 !== a && (e = e.slice(0, a)), e += (-1 === e.indexOf("?") ? "?" : "&") + s
                    }
                    return e
                }
            },
            303: e => {
                "use strict";
                e.exports = function(e, t) {
                    return t ? e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "") : e
                }
            },
            372: (e, t, n) => {
                "use strict";
                var r = n(867);
                e.exports = r.isStandardBrowserEnv() ? {
                    write: function(e, t, n, o, s, i) {
                        var a = [];
                        a.push(e + "=" + encodeURIComponent(t)), r.isNumber(n) && a.push("expires=" + new Date(n).toGMTString()), r.isString(o) && a.push("path=" + o), r.isString(s) && a.push("domain=" + s), !0 === i && a.push("secure"), document.cookie = a.join("; ")
                    },
                    read: function(e) {
                        var t = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)"));
                        return t ? decodeURIComponent(t[3]) : null
                    },
                    remove: function(e) {
                        this.write(e, "", Date.now() - 864e5)
                    }
                } : {
                    write: function() {},
                    read: function() {
                        return null
                    },
                    remove: function() {}
                }
            },
            793: e => {
                "use strict";
                e.exports = function(e) {
                    return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)
                }
            },
            268: e => {
                "use strict";
                e.exports = function(e) {
                    return "object" == typeof e && !0 === e.isAxiosError
                }
            },
            985: (e, t, n) => {
                "use strict";
                var r = n(867);
                e.exports = r.isStandardBrowserEnv() ? function() {
                    var e, t = /(msie|trident)/i.test(navigator.userAgent),
                        n = document.createElement("a");

                    function o(e) {
                        var r = e;
                        return t && (n.setAttribute("href", r), r = n.href), n.setAttribute("href", r), {
                            href: n.href,
                            protocol: n.protocol ? n.protocol.replace(/:$/, "") : "",
                            host: n.host,
                            search: n.search ? n.search.replace(/^\?/, "") : "",
                            hash: n.hash ? n.hash.replace(/^#/, "") : "",
                            hostname: n.hostname,
                            port: n.port,
                            pathname: "/" === n.pathname.charAt(0) ? n.pathname : "/" + n.pathname
                        }
                    }
                    return e = o(window.location.href),
                        function(t) {
                            var n = r.isString(t) ? o(t) : t;
                            return n.protocol === e.protocol && n.host === e.host
                        }
                }() : function() {
                    return !0
                }
            },
            16: (e, t, n) => {
                "use strict";
                var r = n(867);
                e.exports = function(e, t) {
                    r.forEach(e, (function(n, r) {
                        r !== t && r.toUpperCase() === t.toUpperCase() && (e[t] = n, delete e[r])
                    }))
                }
            },
            109: (e, t, n) => {
                "use strict";
                var r = n(867),
                    o = ["age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent"];
                e.exports = function(e) {
                    var t, n, s, i = {};
                    return e ? (r.forEach(e.split("\n"), (function(e) {
                        if (s = e.indexOf(":"), t = r.trim(e.substr(0, s)).toLowerCase(), n = r.trim(e.substr(s + 1)), t) {
                            if (i[t] && o.indexOf(t) >= 0) return;
                            i[t] = "set-cookie" === t ? (i[t] ? i[t] : []).concat([n]) : i[t] ? i[t] + ", " + n : n
                        }
                    })), i) : i
                }
            },
            713: e => {
                "use strict";
                e.exports = function(e) {
                    return function(t) {
                        return e.apply(null, t)
                    }
                }
            },
            867: (e, t, n) => {
                "use strict";
                var r = n(849),
                    o = Object.prototype.toString;

                function s(e) {
                    return "[object Array]" === o.call(e)
                }

                function i(e) {
                    return void 0 === e
                }

                function a(e) {
                    return null !== e && "object" == typeof e
                }

                function c(e) {
                    if ("[object Object]" !== o.call(e)) return !1;
                    var t = Object.getPrototypeOf(e);
                    return null === t || t === Object.prototype
                }

                function u(e) {
                    return "[object Function]" === o.call(e)
                }

                function f(e, t) {
                    if (null != e)
                        if ("object" != typeof e && (e = [e]), s(e))
                            for (var n = 0, r = e.length; n < r; n++) t.call(null, e[n], n, e);
                        else
                            for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && t.call(null, e[o], o, e)
                }
                e.exports = {
                    isArray: s,
                    isArrayBuffer: function(e) {
                        return "[object ArrayBuffer]" === o.call(e)
                    },
                    isBuffer: function(e) {
                        return null !== e && !i(e) && null !== e.constructor && !i(e.constructor) && "function" == typeof e.constructor.isBuffer && e.constructor.isBuffer(e)
                    },
                    isFormData: function(e) {
                        return "undefined" != typeof FormData && e instanceof FormData
                    },
                    isArrayBufferView: function(e) {
                        return "undefined" != typeof ArrayBuffer && ArrayBuffer.isView ? ArrayBuffer.isView(e) : e && e.buffer && e.buffer instanceof ArrayBuffer
                    },
                    isString: function(e) {
                        return "string" == typeof e
                    },
                    isNumber: function(e) {
                        return "number" == typeof e
                    },
                    isObject: a,
                    isPlainObject: c,
                    isUndefined: i,
                    isDate: function(e) {
                        return "[object Date]" === o.call(e)
                    },
                    isFile: function(e) {
                        return "[object File]" === o.call(e)
                    },
                    isBlob: function(e) {
                        return "[object Blob]" === o.call(e)
                    },
                    isFunction: u,
                    isStream: function(e) {
                        return a(e) && u(e.pipe)
                    },
                    isURLSearchParams: function(e) {
                        return "undefined" != typeof URLSearchParams && e instanceof URLSearchParams
                    },
                    isStandardBrowserEnv: function() {
                        return ("undefined" == typeof navigator || "ReactNative" !== navigator.product && "NativeScript" !== navigator.product && "NS" !== navigator.product) && "undefined" != typeof window && "undefined" != typeof document
                    },
                    forEach: f,
                    merge: function e() {
                        var t = {};

                        function n(n, r) {
                            c(t[r]) && c(n) ? t[r] = e(t[r], n) : c(n) ? t[r] = e({}, n) : s(n) ? t[r] = n.slice() : t[r] = n
                        }
                        for (var r = 0, o = arguments.length; r < o; r++) f(arguments[r], n);
                        return t
                    },
                    extend: function(e, t, n) {
                        return f(t, (function(t, o) {
                            e[o] = n && "function" == typeof t ? r(t, n) : t
                        })), e
                    },
                    trim: function(e) {
                        return e.replace(/^\s*/, "").replace(/\s*$/, "")
                    },
                    stripBOM: function(e) {
                        return 65279 === e.charCodeAt(0) && (e = e.slice(1)), e
                    }
                }
            },
            564: (e, t, n) => {
                "use strict";
                e.exports = n.p + "2a10823efe521b02cd19.png"
            }
        },
        t = {};

    function n(r) {
        var o = t[r];
        if (void 0 !== o) return o.exports;
        var s = t[r] = {
            exports: {}
        };
        return e[r](s, s.exports, n), s.exports
    }
    n.p = "", (() => {
        "use strict";
        class e {
            constructor(e, t) {
                this.visibility = !1, this.axios = n(669).default, this.toggleVisibility = () => {
                    this.visibility = !this.visibility, this.visibility ? (this.element.classList.remove("gif-hidden"), this.element.classList.add("slide-in-bottom")) : (this.element.classList.remove("slide-in-bottom"), this.element.classList.add("gif-hidden"), this.element.firstElementChild.value = "", this.element.lastElementChild.innerHTML = "")
                }, this.getFoundryVersion = () => {
                    var e;
                    return null === (e = null === game || void 0 === game ? void 0 : game.data) || void 0 === e ? void 0 : e.version
                }, this.isFoundry8 = () => {
                    const e = this.getFoundryVersion();
                    return e >= "0.8.0" && e < "0.9.0"
                }, this.createChatMessage = e => {
                    const t = {
                        content: `<div class="giphy-container"><img src="${e}" alt="chat-reactions-gif"></div>`,
                        type: CONST.CHAT_MESSAGE_TYPES.OOC || 1
                    };
                    return this.isFoundry8() && (t.user = game.user), ChatMessage.create(t)
                }, this._onKeyDown = e => {
                    const t = e.target.value;
                    t.length >= 3 && (console.log("search functionality"), this.source.cancel(), this.axios.get("https://api.giphy.com/v1/gifs/search", {
                        params: {
                            q: t,
                            api_key: this.apiKey,
                            cancelToken: this.source.token,
                            limit: 20
                        }
                    }).then((e => {
                        console.log(e.data.data.length), this.populateImages(e.data.data)
                    })).catch((function(e) {
                        console.log(e)
                    }))), console.log("change detected")
                }, this.onKeyUp = e => this._onKeyUp(e), this.element = e, this.gifButtonElement = t, this.apiKey = "D4p2zMgMNgUEF8nt9pXd8KskWCFAwNZc", this.cancelToken = this.axios.CancelToken, this.source = this.cancelToken.source(), this.activateListeners(e)
            }
            activateListeners(e) {
                console.log(e);
                const t = this.element.firstElementChild;
                this.gifButtonElement.onclick = this.toggleVisibility, t.oninput = this._onKeyDown
            }
            populateImages(e) {
                console.log("populating images");
                const t = this.element.lastElementChild;
                t.innerHTML = "", e.forEach((e => {
                    const n = document.createElement("img");
                    n.src = e.images.preview_gif.url, n.onclick = () => {
                        this.createChatMessage(e.images.downsized.url), this.toggleVisibility()
                    }, null == t || t.appendChild(n)
                }))
            }
            _onKeyUp(e) {
                console.log(e)
            }
            static bind(t, n) {
                return new e(t, n)
            }
        }
        var t = n(564);
        Hooks.once("init", (async () => {
            console.log("=============================Chat GIFS Loading============================"), game.settings.register("chatgifs", "gif-search-background", {
                name: "Background color for gif searcher ",
                hint: "Background color in hex that will appear behind the gif searcher",
                scope: "world",
                config: !0,
                type: String,
                default: "d2d2c6",
                onChange: e => {
                    var t, n;
                    "string" != typeof(n = e) || 6 !== n.length || isNaN(Number("0x" + n)) ? null === (t = ui.notifications) || void 0 === t || t.warn("The value provided is NOT a hex value") : window.location.reload()
                }
            })
        })), Hooks.once("ready", (async () => {})), Hooks.on("renderChatLog", ((n, r, o) => {
            const s = r.find("#chat-controls")[0],
                i = r.find("#chat-form")[0];
            i.classList += "relative ";
            const a = document.createElement("div");
            a.id = "gifSearch", a.style.background = `#${game.settings.get("chatgifs","gif-search-background")}`, a.classList.add("gif-hidden");
            const c = document.createElement("input");
            c.style.background = `#${function(e,t){const n=parseInt(e,16);return((255&n)-1|(n>>8&255)-1<<8|(n>>16)-1<<16).toString(16)}(game.settings.get("chatgifs","gif-search-background"))}`, c.placeholder = "Search for a Gif! 🔍", a.appendChild(c);
            const u = document.createElement("img");
            u.className = "attribution", u.src = `modules/chatgifs/${t}`, a.appendChild(u);
            const f = document.createElement("div");
            f.id = "gifSearchResults", a.appendChild(f), s.appendChild(a);
            const l = document.createElement("button");
            l.id = "gifButton", l.textContent = "GIF", l.className += "optionsButton", l.type = "button", e.bind(a, l), i.appendChild(l)
        }))
    })()
})();