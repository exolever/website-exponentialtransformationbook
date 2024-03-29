"use strict";

function hs_i18n_log(n) {
    console.log("i18n_getmessage: " + n)
}

function hs_i18n_substituteStrings(n, e) {
    var l = n.match(new RegExp("\\$[0-9]+", "g"));
    if (null == l) return n;
    for (var r = 0; r < l.length; r++) {
        var s = l[r],
            t = parseInt(s.replace("$", ""));
        0 >= t || null == e || t > e.length ? hs_i18n_log("no substitution string at index " + t + " found for string '" + n + "'") : n = n.replace(s, e[t - 1])
    }
    return n
}

function hs_i18n_insertPlaceholders(n, e) {
    var l = n.message,
        r = l.match(new RegExp("\\$\\w+\\$", "g"));
    if (null == r) return l;
    for (var s = 0; s < r.length; s++) {
        var t = r[s],
            o = t.replace(new RegExp("\\$", "g"), "").toLowerCase(),
            a = n.placeholders[o];
        null == a && hs_i18n_log("no placeholder found for '" + o + "'");
        l = l.replace(t, a.content)
    }
    l = hs_i18n_substituteStrings(l, e);
    return l.replace(/\$\$/g, "$")
}

function hs_i18n_getMessage(n, e) {
    if (null == n) {
        hs_i18n_log("no messages found");
        return ""
    }
    var l = arguments[2];
    if (null == l || 0 == l.length || null == l[0]) {
        hs_i18n_log("no message name passed");
        return ""
    }
    var r = l[0],
        s = e.split("-")[0],
        t = null == t && s != e ? n[s] : n[e];
    if (null == t) {
        hs_i18n_log("no messages found for language '" + e + "'");
        return ""
    }
    var o = null == o && s != e ? n[s][r] : t[r];
    if (null == o) {
        hs_i18n_log("no message found for language '" + e + "' named '" + r + "'");
        return ""
    }
    return hs_i18n_insertPlaceholders(o.placeholders, l[1])
}