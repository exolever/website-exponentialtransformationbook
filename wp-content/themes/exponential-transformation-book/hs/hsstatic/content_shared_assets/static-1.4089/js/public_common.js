(function() {
    var e, t, n, a;
    window.hs_show_tools_menu_if_author = function() {
        var t, n, a, i, s, r, o;
        if (window.location === window.parent.location) {
            a = hsVars.page_id;
            n = hsVars.content_group_id;
            t = hsVars.category_id;
            s = hsVars.portal_id;
            r = a;
            if (a && n) o = 6 === t ? "knowledge-articles" : "blog-posts";
            else if (n) {
                o = 6 === t ? "knowledge-bases" : "blogs";
                r = n
            } else o = "landing-pages";
            i = hsVars.app_hs_base_url + "/content-tools-menu/api/v1/tools-menu/has-permission?portalId=" + s;
            return jQuery.ajax(i, {
                dataType: "jsonp",
                success: function(t) {
                    return t.has_permission ? e(o, r, s) : void 0
                }
            })
        }
    };
    e = function(e, t, n) {
        return jQuery.ajax(hsVars.app_hs_base_url + ("/content-tools-menu/api/v1/tools-menu/" + e + "/" + t + "/actions?portalId=" + n), {
            dataType: "jsonp",
            success: function(e) {
                return e.actions ? a(e.actions) : void 0
            }
        })
    };
    a = function(e) {
        var t, a, i, s, r, o, l, d, c, u, v;
        o = hsVars.page_id;
        l = hsVars.portal_id;
        r = jQuery("[data-sitemap-name]").filter(function(e, t) {
            return !!jQuery.trim(t.getAttribute("data-sitemap-name"))
        });
        s = r.length > 0 ? r[0] : null;
        if (null != s) {
            d = jQuery(s).attr("data-menu-id");
            c = "" + hsVars.app_hs_base_url + "/settings/" + l + "/website/navigation/" + d;
            e.push(["Edit Navigation Menu", c])
        }
        i = "";
        for (u = 0, v = e.length; v > u; u++) {
            a = e[u];
            i += '<li><a target="_blank" href=\'' + a[1] + "'>\n    " + a[0] + "\n</a></li>"
        }
        t = jQuery("<div class='hs-tools-menu hs-collapsed'>\n    <img class='hs-sprocket' src='https://cdn2.hubspot.net/static/sprocket_white_80.png'>\n    <div class='hs-dropdown'>\n        <div class='hs-title'>HubSpot Tools</div>\n        <ul>\n            " + i + '\n            <li class="hs-menu-hider"><a>Hide This Menu</a></li>\n        </ul>\n    </div>\n</div>');
        jQuery("body").append(t);
        return n()
    };
    n = function() {
        var e;
        e = jQuery(".hs-tools-menu");
        t(e);
        return e.find(".hs-menu-hider").click(function(t) {
            t.stopPropagation();
            return e.hide()
        })
    };
    t = function(e) {
        var t, n, a, i, s, r;
        a = e.find(".hs-dropdown");
        i = function() {
            return e.addClass("hs-collapsed")
        };
        s = function() {
            return e.removeClass("hs-collapsed")
        };
        n = jQuery("body");
        t = function(e) {
            return n.bind("click.hs-tools-menu", e)
        };
        r = function() {
            return n.unbind(".hs-tools-menu")
        };
        return e.bind("click", function(n) {
            if (!jQuery(n.target).attr("href")) {
                n.preventDefault();
                n.stopPropagation();
                if (e.hasClass("hs-collapsed")) {
                    s();
                    return t(function() {
                        i();
                        return r()
                    })
                }
                i();
                return r()
            }
        })
    }
}).call(this);
! function(e) {
    e.flexslider = function(t, n) {
        var a = e(t);
        a.vars = e.extend({}, e.flexslider.defaults, n);
        var i, s = a.vars.namespace,
            r = window.navigator && window.navigator.msPointerEnabled && window.MSGesture,
            o = ("ontouchstart" in window || r || window.DocumentTouch && document instanceof DocumentTouch) && a.vars.touch,
            l = "click touchend MSPointerUp",
            d = "",
            c = "vertical" === a.vars.direction,
            u = a.vars.reverse,
            v = a.vars.itemWidth > 0,
            m = "fade" === a.vars.animation,
            p = "" !== a.vars.asNavFor,
            f = {},
            h = !0;
        e.data(t, "flexslider", a);
        f = {
            init: function() {
                a.animating = !1;
                a.currentSlide = parseInt(a.vars.startAt ? a.vars.startAt : 0);
                isNaN(a.currentSlide) && (a.currentSlide = 0);
                a.animatingTo = a.currentSlide;
                a.atEnd = 0 === a.currentSlide || a.currentSlide === a.last;
                a.containerSelector = a.vars.selector.substr(0, a.vars.selector.search(" "));
                a.slides = e(a.vars.selector, a);
                a.container = e(a.containerSelector, a);
                a.count = a.slides.length;
                a.syncExists = e(a.vars.sync).length > 0;
                "slide" === a.vars.animation && (a.vars.animation = "swing");
                a.prop = c ? "top" : "marginLeft";
                a.args = {};
                a.manualPause = !1;
                a.stopped = !1;
                a.started = !1;
                a.startTimeout = null;
                a.transitions = !a.vars.video && !m && a.vars.useCSS && function() {
                    var e = document.createElement("div"),
                        t = ["perspectiveProperty", "WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"];
                    for (var n in t)
                        if (void 0 !== e.style[t[n]]) {
                            a.pfx = t[n].replace("Perspective", "").toLowerCase();
                            a.prop = "-" + a.pfx + "-transform";
                            return !0
                        }
                    return !1
                }();
                "" !== a.vars.controlsContainer && (a.controlsContainer = e(a.vars.controlsContainer).length > 0 && e(a.vars.controlsContainer));
                "" !== a.vars.manualControls && (a.manualControls = e(a.vars.manualControls).length > 0 && e(a.vars.manualControls));
                if (a.vars.randomize) {
                    a.slides.sort(function() {
                        return Math.round(Math.random()) - .5
                    });
                    a.container.empty().append(a.slides)
                }
                a.doMath();
                a.setup("init");
                a.vars.controlNav && f.controlNav.setup();
                a.vars.directionNav && f.directionNav.setup();
                a.vars.keyboard && (1 === e(a.containerSelector).length || a.vars.multipleKeyboard) && e(document).bind("keyup", function(e) {
                    var t = e.keyCode;
                    if (!a.animating && (39 === t || 37 === t)) {
                        var n = 39 === t ? a.getTarget("next") : 37 === t ? a.getTarget("prev") : !1;
                        a.flexAnimate(n, a.vars.pauseOnAction)
                    }
                });
                a.vars.mousewheel && a.bind("mousewheel", function(e, t, n, i) {
                    e.preventDefault();
                    var s = 0 > t ? a.getTarget("next") : a.getTarget("prev");
                    a.flexAnimate(s, a.vars.pauseOnAction)
                });
                a.vars.pausePlay && f.pausePlay.setup();
                a.vars.slideshow && a.vars.pauseInvisible && f.pauseInvisible.init();
                if (a.vars.slideshow) {
                    a.vars.pauseOnHover && a.hover(function() {
                        a.manualPlay || a.manualPause || a.pause()
                    }, function() {
                        a.manualPause || a.manualPlay || a.stopped || a.play()
                    });
                    a.vars.pauseInvisible && f.pauseInvisible.isHidden() || (a.vars.initDelay > 0 ? a.startTimeout = setTimeout(a.play, a.vars.initDelay) : a.play())
                }
                p && f.asNav.setup();
                o && a.vars.touch && f.touch();
                (!m || m && a.vars.smoothHeight) && e(window).bind("resize orientationchange focus", f.resize);
                a.find("img").attr("draggable", "false");
                setTimeout(function() {
                    a.vars.start(a)
                }, 200)
            },
            asNav: {
                setup: function() {
                    a.asNav = !0;
                    a.animatingTo = Math.floor(a.currentSlide / a.move);
                    a.currentItem = a.currentSlide;
                    a.slides.removeClass(s + "active-slide").eq(a.currentItem).addClass(s + "active-slide");
                    if (r) {
                        t._slider = a;
                        a.slides.each(function() {
                            var t = this;
                            t._gesture = new MSGesture;
                            t._gesture.target = t;
                            t.addEventListener("MSPointerDown", function(e) {
                                e.preventDefault();
                                e.currentTarget._gesture && e.currentTarget._gesture.addPointer(e.pointerId)
                            }, !1);
                            t.addEventListener("MSGestureTap", function(t) {
                                t.preventDefault();
                                var n = e(this),
                                    i = n.index();
                                if (!e(a.vars.asNavFor).data("flexslider").animating && !n.hasClass("active")) {
                                    a.direction = a.currentItem < i ? "next" : "prev";
                                    a.flexAnimate(i, a.vars.pauseOnAction, !1, !0, !0)
                                }
                            })
                        })
                    } else a.slides.click(function(t) {
                        t.preventDefault();
                        var n = e(this),
                            i = n.index(),
                            r = n.offset().left - e(a).scrollLeft();
                        if (0 >= r && n.hasClass(s + "active-slide")) a.flexAnimate(a.getTarget("prev"), !0);
                        else if (!e(a.vars.asNavFor).data("flexslider").animating && !n.hasClass(s + "active-slide")) {
                            a.direction = a.currentItem < i ? "next" : "prev";
                            a.flexAnimate(i, a.vars.pauseOnAction, !1, !0, !0)
                        }
                    })
                }
            },
            controlNav: {
                setup: function() {
                    a.manualControls ? f.controlNav.setupManual() : f.controlNav.setupPaging()
                },
                setupPaging: function() {
                    var t, n, i = "thumbnails" === a.vars.controlNav ? "control-thumbs" : "control-paging",
                        r = 1;
                    a.controlNavScaffold = e('<ol class="' + s + "control-nav " + s + i + '"></ol>');
                    if (a.pagingCount > 1)
                        for (var o = 0; o < a.pagingCount; o++) {
                            n = a.slides.eq(o);
                            t = "thumbnails" === a.vars.controlNav ? '<img src="' + n.attr("data-thumb") + '"/>' : "<a>" + r + "</a>";
                            if ("thumbnails" === a.vars.controlNav && !0 === a.vars.thumbCaptions) {
                                var c = n.attr("data-thumbcaption");
                                "" != c && void 0 != c && (t += '<span class="' + s + 'caption">' + c + "</span>")
                            }
                            a.controlNavScaffold.append("<li>" + t + "</li>");
                            r++
                        }
                    a.controlsContainer ? e(a.controlsContainer).append(a.controlNavScaffold) : a.append(a.controlNavScaffold);
                    f.controlNav.set();
                    f.controlNav.active();
                    a.controlNavScaffold.delegate("a, img", l, function(t) {
                        t.preventDefault();
                        if ("" === d || d === t.type) {
                            var n = e(this),
                                i = a.controlNav.index(n);
                            if (!n.hasClass(s + "active")) {
                                a.direction = i > a.currentSlide ? "next" : "prev";
                                a.flexAnimate(i, a.vars.pauseOnAction)
                            }
                        }
                        "" === d && (d = t.type);
                        f.setToClearWatchedEvent()
                    })
                },
                setupManual: function() {
                    a.controlNav = a.manualControls;
                    f.controlNav.active();
                    a.controlNav.bind(l, function(t) {
                        t.preventDefault();
                        if ("" === d || d === t.type) {
                            var n = e(this),
                                i = a.controlNav.index(n);
                            if (!n.hasClass(s + "active")) {
                                i > a.currentSlide ? a.direction = "next" : a.direction = "prev";
                                a.flexAnimate(i, a.vars.pauseOnAction)
                            }
                        }
                        "" === d && (d = t.type);
                        f.setToClearWatchedEvent()
                    })
                },
                set: function() {
                    var t = "thumbnails" === a.vars.controlNav ? "img" : "a";
                    a.controlNav = e("." + s + "control-nav li " + t, a.controlsContainer ? a.controlsContainer : a)
                },
                active: function() {
                    a.controlNav.removeClass(s + "active").eq(a.animatingTo).addClass(s + "active")
                },
                update: function(t, n) {
                    a.pagingCount > 1 && "add" === t ? a.controlNavScaffold.append(e("<li><a>" + a.count + "</a></li>")) : 1 === a.pagingCount ? a.controlNavScaffold.find("li").remove() : a.controlNav.eq(n).closest("li").remove();
                    f.controlNav.set();
                    a.pagingCount > 1 && a.pagingCount !== a.controlNav.length ? a.update(n, t) : f.controlNav.active()
                }
            },
            directionNav: {
                setup: function() {
                    var t = e('<ul class="' + s + 'direction-nav"><li><a class="' + s + 'prev" href="#">' + a.vars.prevText + '</a></li><li><a class="' + s + 'next" href="#">' + a.vars.nextText + "</a></li></ul>");
                    if (a.controlsContainer) {
                        e(a.controlsContainer).append(t);
                        a.directionNav = e("." + s + "direction-nav li a", a.controlsContainer)
                    } else {
                        a.append(t);
                        a.directionNav = e("." + s + "direction-nav li a", a)
                    }
                    f.directionNav.update();
                    a.directionNav.bind(l, function(t) {
                        t.preventDefault();
                        var n;
                        if ("" === d || d === t.type) {
                            n = e(this).hasClass(s + "next") ? a.getTarget("next") : a.getTarget("prev");
                            a.flexAnimate(n, a.vars.pauseOnAction)
                        }
                        "" === d && (d = t.type);
                        f.setToClearWatchedEvent()
                    })
                },
                update: function() {
                    var e = s + "disabled";
                    1 === a.pagingCount ? a.directionNav.addClass(e).attr("tabindex", "-1") : a.vars.animationLoop ? a.directionNav.removeClass(e).removeAttr("tabindex") : 0 === a.animatingTo ? a.directionNav.removeClass(e).filter("." + s + "prev").addClass(e).attr("tabindex", "-1") : a.animatingTo === a.last ? a.directionNav.removeClass(e).filter("." + s + "next").addClass(e).attr("tabindex", "-1") : a.directionNav.removeClass(e).removeAttr("tabindex")
                }
            },
            pausePlay: {
                setup: function() {
                    var t = e('<div class="' + s + 'pauseplay"><a></a></div>');
                    if (a.controlsContainer) {
                        a.controlsContainer.append(t);
                        a.pausePlay = e("." + s + "pauseplay a", a.controlsContainer)
                    } else {
                        a.append(t);
                        a.pausePlay = e("." + s + "pauseplay a", a)
                    }
                    f.pausePlay.update(a.vars.slideshow ? s + "pause" : s + "play");
                    a.pausePlay.bind(l, function(t) {
                        t.preventDefault();
                        if ("" === d || d === t.type)
                            if (e(this).hasClass(s + "pause")) {
                                a.manualPause = !0;
                                a.manualPlay = !1;
                                a.pause()
                            } else {
                                a.manualPause = !1;
                                a.manualPlay = !0;
                                a.play()
                            }
                        "" === d && (d = t.type);
                        f.setToClearWatchedEvent()
                    })
                },
                update: function(e) {
                    "play" === e ? a.pausePlay.removeClass(s + "pause").addClass(s + "play").html(a.vars.playText) : a.pausePlay.removeClass(s + "play").addClass(s + "pause").html(a.vars.pauseText)
                }
            },
            touch: function() {
                function e(e) {
                    if (a.animating) e.preventDefault();
                    else if (window.navigator.msPointerEnabled || 1 === e.touches.length) {
                        a.pause();
                        h = c ? a.h : a.w;
                        x = Number(new Date);
                        b = e.touches[0].pageX;
                        C = e.touches[0].pageY;
                        f = v && u && a.animatingTo === a.last ? 0 : v && u ? a.limit - (a.itemW + a.vars.itemMargin) * a.move * a.animatingTo : v && a.currentSlide === a.last ? a.limit : v ? (a.itemW + a.vars.itemMargin) * a.move * a.currentSlide : u ? (a.last - a.currentSlide + a.cloneOffset) * h : (a.currentSlide + a.cloneOffset) * h;
                        d = c ? C : b;
                        p = c ? b : C;
                        t.addEventListener("touchmove", n, !1);
                        t.addEventListener("touchend", i, !1)
                    }
                }

                function n(e) {
                    b = e.touches[0].pageX;
                    C = e.touches[0].pageY;
                    g = c ? d - C : d - b;
                    y = c ? Math.abs(g) < Math.abs(b - p) : Math.abs(g) < Math.abs(C - p);
                    var t = 500;
                    if (!y || Number(new Date) - x > t) {
                        e.preventDefault();
                        if (!m && a.transitions) {
                            a.vars.animationLoop || (g /= 0 === a.currentSlide && 0 > g || a.currentSlide === a.last && g > 0 ? Math.abs(g) / h + 2 : 1);
                            a.setProps(f + g, "setTouch")
                        }
                    }
                }

                function i(e) {
                    t.removeEventListener("touchmove", n, !1);
                    if (a.animatingTo === a.currentSlide && !y && null !== g) {
                        var s = u ? -g : g,
                            r = s > 0 ? a.getTarget("next") : a.getTarget("prev");
                        a.canAdvance(r) && (Number(new Date) - x < 550 && Math.abs(s) > 50 || Math.abs(s) > h / 2) ? a.flexAnimate(r, a.vars.pauseOnAction) : m || a.flexAnimate(a.currentSlide, a.vars.pauseOnAction, !0)
                    }
                    t.removeEventListener("touchend", i, !1);
                    d = null;
                    p = null;
                    g = null;
                    f = null
                }

                function s(e) {
                    e.stopPropagation();
                    if (a.animating) e.preventDefault();
                    else {
                        a.pause();
                        t._gesture.addPointer(e.pointerId);
                        w = 0;
                        h = c ? a.h : a.w;
                        x = Number(new Date);
                        f = v && u && a.animatingTo === a.last ? 0 : v && u ? a.limit - (a.itemW + a.vars.itemMargin) * a.move * a.animatingTo : v && a.currentSlide === a.last ? a.limit : v ? (a.itemW + a.vars.itemMargin) * a.move * a.currentSlide : u ? (a.last - a.currentSlide + a.cloneOffset) * h : (a.currentSlide + a.cloneOffset) * h
                    }
                }

                function o(e) {
                    e.stopPropagation();
                    var n = e.target._slider;
                    if (n) {
                        var a = -e.translationX,
                            i = -e.translationY;
                        w += c ? i : a;
                        g = w;
                        y = c ? Math.abs(w) < Math.abs(-a) : Math.abs(w) < Math.abs(-i);
                        if (e.detail !== e.MSGESTURE_FLAG_INERTIA) {
                            if (!y || Number(new Date) - x > 500) {
                                e.preventDefault();
                                if (!m && n.transitions) {
                                    n.vars.animationLoop || (g = w / (0 === n.currentSlide && 0 > w || n.currentSlide === n.last && w > 0 ? Math.abs(w) / h + 2 : 1));
                                    n.setProps(f + g, "setTouch")
                                }
                            }
                        } else setImmediate(function() {
                            t._gesture.stop()
                        })
                    }
                }

                function l(e) {
                    e.stopPropagation();
                    var t = e.target._slider;
                    if (t) {
                        if (t.animatingTo === t.currentSlide && !y && null !== g) {
                            var n = u ? -g : g,
                                a = n > 0 ? t.getTarget("next") : t.getTarget("prev");
                            t.canAdvance(a) && (Number(new Date) - x < 550 && Math.abs(n) > 50 || Math.abs(n) > h / 2) ? t.flexAnimate(a, t.vars.pauseOnAction) : m || t.flexAnimate(t.currentSlide, t.vars.pauseOnAction, !0)
                        }
                        d = null;
                        p = null;
                        g = null;
                        f = null;
                        w = 0
                    }
                }
                var d, p, f, h, g, x, y = !1,
                    b = 0,
                    C = 0,
                    w = 0;
                if (r) {
                    t.style.msTouchAction = "none";
                    t._gesture = new MSGesture;
                    t._gesture.target = t;
                    t.addEventListener("MSPointerDown", s, !1);
                    t._slider = a;
                    t.addEventListener("MSGestureChange", o, !1);
                    t.addEventListener("MSGestureEnd", l, !1)
                } else t.addEventListener("touchstart", e, !1)
            },
            resize: function() {
                if (!a.animating && a.is(":visible")) {
                    v || a.doMath();
                    if (m) f.smoothHeight();
                    else if (v) {
                        a.slides.width(a.computedW);
                        a.update(a.pagingCount);
                        a.setProps()
                    } else if (c) {
                        a.viewport.height(a.h);
                        a.setProps(a.h, "setTotal")
                    } else {
                        a.vars.smoothHeight && f.smoothHeight();
                        a.newSlides.width(a.computedW);
                        a.setProps(a.computedW, "setTotal")
                    }
                }
            },
            smoothHeight: function(e) {
                if (!c || m) {
                    var t = m ? a : a.viewport;
                    e ? t.animate({
                        height: a.slides.eq(a.animatingTo).height()
                    }, e) : t.height(a.slides.eq(a.animatingTo).height())
                }
            },
            sync: function(t) {
                var n = e(a.vars.sync).data("flexslider"),
                    i = a.animatingTo;
                switch (t) {
                    case "animate":
                        n.flexAnimate(i, a.vars.pauseOnAction, !1, !0);
                        break;
                    case "play":
                        n.playing || n.asNav || n.play();
                        break;
                    case "pause":
                        n.pause()
                }
            },
            pauseInvisible: {
                visProp: null,
                init: function() {
                    var e = ["webkit", "moz", "ms", "o"];
                    if ("hidden" in document) return "hidden";
                    for (var t = 0; t < e.length; t++) e[t] + "Hidden" in document && (f.pauseInvisible.visProp = e[t] + "Hidden");
                    if (f.pauseInvisible.visProp) {
                        var n = f.pauseInvisible.visProp.replace(/[H|h]idden/, "") + "visibilitychange";
                        document.addEventListener(n, function() {
                            f.pauseInvisible.isHidden() ? a.startTimeout ? clearTimeout(a.startTimeout) : a.pause() : a.started ? a.play() : a.vars.initDelay > 0 ? setTimeout(a.play, a.vars.initDelay) : a.play()
                        })
                    }
                },
                isHidden: function() {
                    return document[f.pauseInvisible.visProp] || !1
                }
            },
            setToClearWatchedEvent: function() {
                clearTimeout(i);
                i = setTimeout(function() {
                    d = ""
                }, 3e3)
            }
        };
        a.flexAnimate = function(t, n, i, r, l) {
            a.vars.animationLoop || t === a.currentSlide || (a.direction = t > a.currentSlide ? "next" : "prev");
            p && 1 === a.pagingCount && (a.direction = a.currentItem < t ? "next" : "prev");
            if (!a.animating && (a.canAdvance(t, l) || i) && a.is(":visible")) {
                if (p && r) {
                    var d = e(a.vars.asNavFor).data("flexslider");
                    a.atEnd = 0 === t || t === a.count - 1;
                    d.flexAnimate(t, !0, !1, !0, l);
                    a.direction = a.currentItem < t ? "next" : "prev";
                    d.direction = a.direction;
                    if (Math.ceil((t + 1) / a.visible) - 1 === a.currentSlide || 0 === t) {
                        a.currentItem = t;
                        a.slides.removeClass(s + "active-slide").eq(t).addClass(s + "active-slide");
                        return !1
                    }
                    a.currentItem = t;
                    a.slides.removeClass(s + "active-slide").eq(t).addClass(s + "active-slide");
                    t = Math.floor(t / a.visible)
                }
                a.animating = !0;
                a.animatingTo = t;
                n && a.pause();
                a.vars.before(a);
                a.syncExists && !l && f.sync("animate");
                a.vars.controlNav && f.controlNav.active();
                v || a.slides.removeClass(s + "active-slide").eq(t).addClass(s + "active-slide");
                a.atEnd = 0 === t || t === a.last;
                a.vars.directionNav && f.directionNav.update();
                if (t === a.last) {
                    a.vars.end(a);
                    a.vars.animationLoop || a.pause()
                }
                if (m)
                    if (o) {
                        a.slides.eq(a.currentSlide).css({
                            opacity: 0,
                            zIndex: 1
                        });
                        a.slides.eq(t).css({
                            opacity: 1,
                            zIndex: 2
                        });
                        a.wrapup(y)
                    } else {
                        a.slides.eq(a.currentSlide).css({
                            zIndex: 1
                        }).animate({
                            opacity: 0
                        }, a.vars.animationSpeed, a.vars.easing);
                        a.slides.eq(t).css({
                            zIndex: 2
                        }).animate({
                            opacity: 1
                        }, a.vars.animationSpeed, a.vars.easing, a.wrapup)
                    }
                else {
                    var h, g, x, y = c ? a.slides.filter(":first").height() : a.computedW;
                    if (v) {
                        h = a.vars.itemMargin;
                        x = (a.itemW + h) * a.move * a.animatingTo;
                        g = x > a.limit && 1 !== a.visible ? a.limit : x
                    } else g = 0 === a.currentSlide && t === a.count - 1 && a.vars.animationLoop && "next" !== a.direction ? u ? (a.count + a.cloneOffset) * y : 0 : a.currentSlide === a.last && 0 === t && a.vars.animationLoop && "prev" !== a.direction ? u ? 0 : (a.count + 1) * y : u ? (a.count - 1 - t + a.cloneOffset) * y : (t + a.cloneOffset) * y;
                    a.setProps(g, "", a.vars.animationSpeed);
                    if (a.transitions) {
                        if (!a.vars.animationLoop || !a.atEnd) {
                            a.animating = !1;
                            a.currentSlide = a.animatingTo
                        }
                        a.container.unbind("webkitTransitionEnd transitionend");
                        a.container.bind("webkitTransitionEnd transitionend", function() {
                            a.wrapup(y)
                        })
                    } else a.container.animate(a.args, a.vars.animationSpeed, a.vars.easing, function() {
                        a.wrapup(y)
                    })
                }
                a.vars.smoothHeight && f.smoothHeight(a.vars.animationSpeed)
            }
        };
        a.wrapup = function(e) {
            m || v || (0 === a.currentSlide && a.animatingTo === a.last && a.vars.animationLoop ? a.setProps(e, "jumpEnd") : a.currentSlide === a.last && 0 === a.animatingTo && a.vars.animationLoop && a.setProps(e, "jumpStart"));
            a.animating = !1;
            a.currentSlide = a.animatingTo;
            a.vars.after(a)
        };
        a.animateSlides = function() {
            !a.animating && h && a.flexAnimate(a.getTarget("next"))
        };
        a.pause = function() {
            clearInterval(a.animatedSlides);
            a.animatedSlides = null;
            a.playing = !1;
            a.vars.pausePlay && f.pausePlay.update("play");
            a.syncExists && f.sync("pause")
        };
        a.play = function() {
            a.playing && clearInterval(a.animatedSlides);
            a.animatedSlides = a.animatedSlides || setInterval(a.animateSlides, a.vars.slideshowSpeed);
            a.started = a.playing = !0;
            a.vars.pausePlay && f.pausePlay.update("pause");
            a.syncExists && f.sync("play")
        };
        a.stop = function() {
            a.pause();
            a.stopped = !0
        };
        a.canAdvance = function(e, t) {
            var n = p ? a.pagingCount - 1 : a.last;
            return t ? !0 : p && a.currentItem === a.count - 1 && 0 === e && "prev" === a.direction ? !0 : p && 0 === a.currentItem && e === a.pagingCount - 1 && "next" !== a.direction ? !1 : e !== a.currentSlide || p ? a.vars.animationLoop ? !0 : a.atEnd && 0 === a.currentSlide && e === n && "next" !== a.direction ? !1 : a.atEnd && a.currentSlide === n && 0 === e && "next" === a.direction ? !1 : !0 : !1
        };
        a.getTarget = function(e) {
            a.direction = e;
            return "next" === e ? a.currentSlide === a.last ? 0 : a.currentSlide + 1 : 0 === a.currentSlide ? a.last : a.currentSlide - 1
        };
        a.setProps = function(e, t, n) {
            var i = function() {
                var n = e ? e : (a.itemW + a.vars.itemMargin) * a.move * a.animatingTo,
                    i = function() {
                        if (v) return "setTouch" === t ? e : u && a.animatingTo === a.last ? 0 : u ? a.limit - (a.itemW + a.vars.itemMargin) * a.move * a.animatingTo : a.animatingTo === a.last ? a.limit : n;
                        switch (t) {
                            case "setTotal":
                                return u ? (a.count - 1 - a.currentSlide + a.cloneOffset) * e : (a.currentSlide + a.cloneOffset) * e;
                            case "setTouch":
                                return u ? e : e;
                            case "jumpEnd":
                                return u ? e : a.count * e;
                            case "jumpStart":
                                return u ? a.count * e : e;
                            default:
                                return e
                        }
                    }();
                return -1 * i + "px"
            }();
            if (a.transitions) {
                i = c ? "translate3d(0," + i + ",0)" : "translate3d(" + i + ",0,0)";
                n = void 0 !== n ? n / 1e3 + "s" : "0s";
                a.container.css("-" + a.pfx + "-transition-duration", n)
            }
            a.args[a.prop] = i;
            (a.transitions || void 0 === n) && a.container.css(a.args)
        };
        a.setup = function(t) {
            if (m) {
                a.slides.css({
                    width: "100%",
                    "float": "left",
                    marginRight: "-100%",
                    position: "relative"
                });
                "init" === t && (o ? a.slides.css({
                    opacity: 0,
                    display: "block",
                    webkitTransition: "opacity " + a.vars.animationSpeed / 1e3 + "s ease",
                    zIndex: 1
                }).eq(a.currentSlide).css({
                    opacity: 1,
                    zIndex: 2
                }) : a.slides.css({
                    opacity: 0,
                    display: "block",
                    zIndex: 1
                }).eq(a.currentSlide).css({
                    zIndex: 2
                }).animate({
                    opacity: 1
                }, a.vars.animationSpeed, a.vars.easing));
                a.vars.smoothHeight && f.smoothHeight()
            } else {
                var n, i;
                if ("init" === t) {
                    a.viewport = e('<div class="' + s + 'viewport"></div>').css({
                        overflow: "hidden",
                        position: "relative"
                    }).appendTo(a).append(a.container);
                    a.cloneCount = 0;
                    a.cloneOffset = 0;
                    if (u) {
                        i = e.makeArray(a.slides).reverse();
                        a.slides = e(i);
                        a.container.empty().append(a.slides)
                    }
                }
                if (a.vars.animationLoop && !v) {
                    a.cloneCount = 2;
                    a.cloneOffset = 1;
                    "init" !== t && a.container.find(".clone").remove();
                    a.container.append(a.slides.first().clone().addClass("clone").attr("aria-hidden", "true")).prepend(a.slides.last().clone().addClass("clone").attr("aria-hidden", "true"))
                }
                a.newSlides = e(a.vars.selector, a);
                n = u ? a.count - 1 - a.currentSlide + a.cloneOffset : a.currentSlide + a.cloneOffset;
                if (c && !v) {
                    a.container.height(200 * (a.count + a.cloneCount) + "%").css("position", "absolute").width("100%");
                    setTimeout(function() {
                        a.newSlides.css({
                            display: "block"
                        });
                        a.doMath();
                        a.viewport.height(a.h);
                        a.setProps(n * a.h, "init")
                    }, "init" === t ? 100 : 0)
                } else {
                    a.container.width(200 * (a.count + a.cloneCount) + "%");
                    a.setProps(n * a.computedW, "init");
                    setTimeout(function() {
                        a.doMath();
                        a.newSlides.css({
                            width: a.computedW,
                            "float": "left",
                            display: "block"
                        });
                        a.vars.smoothHeight && f.smoothHeight()
                    }, "init" === t ? 100 : 0)
                }
            }
            v || a.slides.removeClass(s + "active-slide").eq(a.currentSlide).addClass(s + "active-slide")
        };
        a.doMath = function() {
            var e = a.slides.first(),
                t = a.vars.itemMargin,
                n = a.vars.minItems,
                i = a.vars.maxItems;
            a.w = void 0 === a.viewport ? a.width() : a.viewport.width();
            a.h = e.height();
            a.boxPadding = e.outerWidth() - e.width();
            if (v) {
                a.itemT = a.vars.itemWidth + t;
                a.minW = n ? n * a.itemT : a.w;
                a.maxW = i ? i * a.itemT - t : a.w;
                a.itemW = a.minW > a.w ? (a.w - t * (n - 1)) / n : a.maxW < a.w ? (a.w - t * (i - 1)) / i : a.vars.itemWidth > a.w ? a.w : a.vars.itemWidth;
                a.visible = Math.floor(a.w / a.itemW);
                a.move = a.vars.move > 0 && a.vars.move < a.visible ? a.vars.move : a.visible;
                a.pagingCount = Math.ceil((a.count - a.visible) / a.move + 1);
                a.last = a.pagingCount - 1;
                a.limit = 1 === a.pagingCount ? 0 : a.vars.itemWidth > a.w ? a.itemW * (a.count - 1) + t * (a.count - 1) : (a.itemW + t) * a.count - a.w - t
            } else {
                a.itemW = a.w;
                a.pagingCount = a.count;
                a.last = a.count - 1
            }
            a.computedW = a.itemW - a.boxPadding
        };
        a.update = function(e, t) {
            a.doMath();
            if (!v) {
                e < a.currentSlide ? a.currentSlide += 1 : e <= a.currentSlide && 0 !== e && (a.currentSlide -= 1);
                a.animatingTo = a.currentSlide
            }
            if (a.vars.controlNav && !a.manualControls)
                if ("add" === t && !v || a.pagingCount > a.controlNav.length) f.controlNav.update("add");
                else if ("remove" === t && !v || a.pagingCount < a.controlNav.length) {
                if (v && a.currentSlide > a.last) {
                    a.currentSlide -= 1;
                    a.animatingTo -= 1
                }
                f.controlNav.update("remove", a.last)
            }
            a.vars.directionNav && f.directionNav.update()
        };
        a.addSlide = function(t, n) {
            var i = e(t);
            a.count += 1;
            a.last = a.count - 1;
            c && u ? void 0 !== n ? a.slides.eq(a.count - n).after(i) : a.container.prepend(i) : void 0 !== n ? a.slides.eq(n).before(i) : a.container.append(i);
            a.update(n, "add");
            a.slides = e(a.vars.selector + ":not(.clone)", a);
            a.setup();
            a.vars.added(a)
        };
        a.removeSlide = function(t) {
            var n = isNaN(t) ? a.slides.index(e(t)) : t;
            a.count -= 1;
            a.last = a.count - 1;
            isNaN(t) ? e(t, a.slides).remove() : c && u ? a.slides.eq(a.last).remove() : a.slides.eq(t).remove();
            a.doMath();
            a.update(n, "remove");
            a.slides = e(a.vars.selector + ":not(.clone)", a);
            a.setup();
            a.vars.removed(a)
        };
        f.init()
    };
    e(window).blur(function(e) {
        focused = !1
    }).focus(function(e) {
        focused = !0
    });
    e.flexslider.defaults = {
        namespace: "flex-",
        selector: ".slides > li",
        animation: "fade",
        easing: "swing",
        direction: "horizontal",
        reverse: !1,
        animationLoop: !0,
        smoothHeight: !1,
        startAt: 0,
        slideshow: !0,
        slideshowSpeed: 7e3,
        animationSpeed: 600,
        initDelay: 0,
        randomize: !1,
        thumbCaptions: !1,
        pauseOnAction: !0,
        pauseOnHover: !1,
        pauseInvisible: !0,
        useCSS: !0,
        touch: !0,
        video: !1,
        controlNav: !0,
        directionNav: !0,
        prevText: "Previous",
        nextText: "Next",
        keyboard: !0,
        multipleKeyboard: !1,
        mousewheel: !1,
        pausePlay: !1,
        pauseText: "Pause",
        playText: "Play",
        controlsContainer: "",
        manualControls: "",
        sync: "",
        asNavFor: "",
        itemWidth: 0,
        itemMargin: 0,
        minItems: 1,
        maxItems: 0,
        move: 0,
        allowOneSlide: !0,
        start: function() {},
        before: function() {},
        after: function() {},
        end: function() {},
        added: function() {},
        removed: function() {}
    };
    e.fn.flexslider = function(t) {
        void 0 === t && (t = {});
        if ("object" == typeof t) return this.each(function() {
            var n = e(this),
                a = t.selector ? t.selector : ".slides > li",
                i = n.find(a);
            if (1 === i.length && t.allowOneSlide === !0 || 0 === i.length) {
                i.fadeIn(400);
                t.start && t.start(n)
            } else void 0 === n.data("flexslider") && new e.flexslider(this, t)
        });
        var n = e(this).data("flexslider");
        switch (t) {
            case "play":
                n.play();
                break;
            case "pause":
                n.pause();
                break;
            case "stop":
                n.stop();
                break;
            case "next":
                n.flexAnimate(n.getTarget("next"), !0);
                break;
            case "prev":
            case "previous":
                n.flexAnimate(n.getTarget("prev"), !0);
                break;
            default:
                "number" == typeof t && n.flexAnimate(t, !0)
        }
    }
}(window.hsjQuery || jQuery);
(function() {
    var e;
    e = function(e) {
        var t, n;
        t = !1;
        e(function() {
            var a;
            a = (document.body || document.documentElement).style;
            t = void 0 !== a.animation || void 0 !== a.WebkitAnimation || void 0 !== a.MozAnimation || void 0 !== a.MsAnimation || void 0 !== a.OAnimation;
            return e(window).bind("keyup.vex", function(e) {
                return 27 === e.keyCode ? n.closeByEscape() : void 0
            })
        });
        return n = {
            globalID: 1,
            animationEndEvent: "animationend webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend",
            baseClassNames: {
                vex: "vex",
                content: "vex-content",
                overlay: "vex-overlay",
                close: "vex-close",
                closing: "vex-closing",
                open: "vex-open"
            },
            defaultOptions: {
                content: "",
                showCloseButton: !0,
                escapeButtonCloses: !0,
                overlayClosesOnClick: !0,
                appendLocation: "body",
                className: "",
                css: {},
                overlayClassName: "",
                overlayCSS: {},
                contentClassName: "",
                contentCSS: {},
                closeClassName: "",
                closeCSS: {}
            },
            open: function(t) {
                t = e.extend({}, n.defaultOptions, t);
                t.id = n.globalID;
                n.globalID += 1;
                t.$vex = e("<div>").addClass(n.baseClassNames.vex).addClass(t.className).css(t.css).data({
                    vex: t
                });
                t.$vexOverlay = e("<div>").addClass(n.baseClassNames.overlay).addClass(t.overlayClassName).css(t.overlayCSS).data({
                    vex: t
                });
                t.overlayClosesOnClick && t.$vexOverlay.bind("click.vex", function(t) {
                    return t.target === this ? n.close(e(this).data().vex.id) : void 0
                });
                t.$vex.append(t.$vexOverlay);
                t.$vexContent = e("<div>").addClass(n.baseClassNames.content).addClass(t.contentClassName).css(t.contentCSS).append(t.content).data({
                    vex: t
                });
                t.$vex.append(t.$vexContent);
                if (t.showCloseButton) {
                    t.$closeButton = e("<div>").addClass(n.baseClassNames.close).addClass(t.closeClassName).css(t.closeCSS).data({
                        vex: t
                    }).bind("click.vex", function() {
                        return n.close(e(this).data().vex.id)
                    });
                    t.$vexContent.append(t.$closeButton)
                }
                e(t.appendLocation).append(t.$vex);
                n.setupBodyClassName(t.$vex);
                t.afterOpen && t.afterOpen(t.$vexContent, t);
                setTimeout(function() {
                    return t.$vexContent.trigger("vexOpen", t)
                }, 0);
                return t.$vexContent
            },
            getAllVexes: function() {
                return e("." + n.baseClassNames.vex + ':not(".' + n.baseClassNames.closing + '") .' + n.baseClassNames.content)
            },
            getVexByID: function(t) {
                return n.getAllVexes().filter(function() {
                    return e(this).data().vex.id === t
                })
            },
            close: function(e) {
                var t;
                if (!e) {
                    t = n.getAllVexes().last();
                    if (!t.length) return !1;
                    e = t.data().vex.id
                }
                return n.closeByID(e)
            },
            closeAll: function() {
                var t;
                t = n.getAllVexes().map(function() {
                    return e(this).data().vex.id
                }).toArray();
                if (!(null != t ? t.length : void 0)) return !1;
                e.each(t.reverse(), function(e, t) {
                    return n.closeByID(t)
                });
                return !0
            },
            closeByID: function(a) {
                var i, s, r, o, l;
                s = n.getVexByID(a);
                if (s.length) {
                    i = s.data().vex.$vex;
                    l = e.extend({}, s.data().vex);
                    r = function() {
                        return l.beforeClose ? l.beforeClose(s, l) : void 0
                    };
                    o = function() {
                        s.trigger("vexClose", l);
                        i.remove();
                        return l.afterClose ? l.afterClose(s, l) : void 0
                    };
                    if (t) {
                        r();
                        i.unbind(n.animationEndEvent).bind(n.animationEndEvent, function() {
                            return o()
                        }).addClass(n.baseClassNames.closing)
                    } else {
                        r();
                        o()
                    }
                    return !0
                }
            },
            closeByEscape: function() {
                var t, a, i;
                i = n.getAllVexes().map(function() {
                    return e(this).data().vex.id
                }).toArray();
                if (!(null != i ? i.length : void 0)) return !1;
                a = Math.max.apply(Math, i);
                t = n.getVexByID(a);
                return t.data().vex.escapeButtonCloses !== !0 ? !1 : n.closeByID(a)
            },
            setupBodyClassName: function(t) {
                return t.bind("vexOpen.vex", function() {
                    return e("body").addClass(n.baseClassNames.open)
                }).bind("vexClose.vex", function() {
                    return n.getAllVexes().length ? void 0 : e("body").removeClass(n.baseClassNames.open)
                })
            },
            hideLoading: function() {
                return e(".vex-loading-spinner").remove()
            },
            showLoading: function() {
                n.hideLoading();
                return e("body").append('<div class="vex-loading-spinner ' + n.defaultOptions.className + '"></div>')
            }
        }
    };
    window.vex = e("undefined" != typeof hsjQuery && null !== hsjQuery ? hsjQuery : jQuery)
}).call(this);
(function() {
    var e, t, n, a;
    e = "undefined" != typeof hsjQuery && null !== hsjQuery ? hsjQuery : jQuery;
    e.fn.nextWrap = function() {
        var e;
        e = this.next();
        return 0 === e.length ? this.siblings().first() : e
    };
    e.fn.prevWrap = function() {
        var e;
        e = this.prev();
        return 0 === e.length ? this.siblings().last() : e
    };
    e.loadImage = function(t) {
        var n;
        n = function(e) {
            var n, a, i, s;
            i = function() {
                s();
                e.resolve(a)
            };
            n = function() {
                s();
                e.reject(a)
            };
            s = function() {
                a.onload = null;
                a.onerror = null;
                a.onabort = null
            };
            a = new Image;
            a.onload = i;
            a.onerror = n;
            a.onabort = n;
            a.src = t
        };
        return e.Deferred(n).promise()
    };
    n = {
        x: 1e3,
        y: 600
    };
    window.hsInitSlider = a = function() {
        if (window.hsSliderConfig) {
            e("html").removeClass("no-js");
            return e.each(window.hsSliderConfig, t)
        }
    };
    t = function(t, a) {
        var i, s, r, o, l, d, c, u, v, m, p;
        r = e("#hs_cos_flex_slider_control_panel_" + t);
        i = e("#hs_cos_flex_slider_" + t);
        o = null;
        l = null;
        c = null;
        u = function() {
            l = i.clone();
            return e(window).resize(p)
        };
        v = function(t) {
            return t.attr("data-src") ? e.loadImage(t.data("src")).done(function() {
                t.attr("src", t.data("src"));
                return t.removeAttr("data-src")
            }) : void 0
        };
        m = function(t) {
            var n, i;
            n = function(t) {
                var n, a;
                n = e(t.slides.get(t.animatingTo)).find("img");
                if (!n.data("naturalWidth") || !n.data("naturalHeight")) {
                    a = new Image;
                    a.src = n.attr("src");
                    n.data("naturalWidth", a.width);
                    n.data("naturalHeight", a.height)
                }
                return p({
                    x: n.data("naturalWidth"),
                    y: n.data("naturalHeight")
                })
            };
            o = vex.open({
                content: l,
                contentClassName: "hs-gallery",
                overlayClassName: "hs-gallery"
            });
            i = e.extend(a.mainConfig, {
                before: n,
                after: function(e) {
                    return e.resize()
                },
                startAt: t,
                keyboard: !0,
                multipleKeyboard: !0
            });
            window.gallerySlider = l.flexslider(i);
            c = l.data("flexslider");
            return n(c)
        };
        p = function(t) {
            var a, i, s, r, l, d, u;
            if (!t || !t.currentTarget) {
                if (e.isPlainObject(t)) {
                    s = t.x / t.y;
                    u = e(window).width() / e(window).height();
                    a = t;
                    i = {
                        x: e(window).width() - 20,
                        y: e(window).height() - 20
                    };
                    if (u > s) {
                        if (t.y > i.y) {
                            l = i.y / t.y;
                            a.x = t.x * l;
                            a.y = i.y
                        }
                    } else if (t.x > i.x) {
                        r = i.x / t.x;
                        a.y = t.y * r;
                        a.x = i.x
                    }
                    d = {
                        x: Math.max(e(window).width() - a.x, 0),
                        y: Math.max(e(window).height() - a.y, 0)
                    }
                } else d = {
                    x: Math.max(e(window).width() - n.x, 20),
                    y: Math.max(e(window).height() - n.y, 20)
                };
                o.css({
                    left: d.x / 2,
                    top: d.y / 2,
                    bottom: d.y / 2,
                    right: d.x / 2
                });
                o.find(".hs_cos_flex-slides li").width(a.x + "px");
                return setTimeout(function() {
                    return c.resize()
                }, 100)
            }
        };
        d = function(t) {
            var n, i, s, r;
            n = e(t);
            r = n.hasClass("hs-cos-flex-slider-control-panel") ? ".hs_cos_flex-slides > li > a > img" : ".hs_cos_flex-slides > li > img";
            i = [];
            n.find(r).each(function() {
                return i.push(e(this).height())
            });
            s = Math.min.apply(Math, i);
            a.mainConfig.smoothHeight || n.find(".hs_cos_flex-viewport").height(s);
            return n.find(r).each(function() {
                var t;
                t = e(this).width() / e(this).height();
                return e(this).width(s * t)
            })
        };
        if ("lightbox" === a.mode) {
            a.mainConfig.sync = null;
            return r.find("li").show().each(function() {
                return e(this).find("a").click(function() {
                    var t;
                    t = e(this).parent().index();
                    u();
                    m(t);
                    return !1
                })
            })
        }
        if (a.thumbConfig) {
            s = r.find(".hs_cos_flex-slides-thumb > li");
            e.extend(a.thumbConfig, {
                itemWidth: s.length && s.width() ? s.width() : a.thumbConfig.itemWidth,
                start: d
            });
            r.flexslider(a.thumbConfig)
        }
        if (e(".hs_cos_flex-slides-main img[data-src]")) {
            e.extend(a.mainConfig, {
                start: a.thumbConfig ? d : function() {},
                before: function(e) {
                    var t, n;
                    n = i.find(".hs_cos_flex-active-slide").prevWrap().find("img");
                    v(n);
                    t = i.find(".hs_cos_flex-active-slide").nextWrap().find("img");
                    return v(t)
                }
            });
            return e.when(v(i.find("img:eq(0)")), v(i.find("img:eq(1)")), v(i.find("img").last())).then(function() {
                return i.flexslider(a.mainConfig)
            })
        }
        return i.flexslider(a.mainConfig)
    };
    e(window).bind("load hs:previewLoad", function() {
        try {
            return a()
        } catch (e) {
            if (console && "function" == typeof console.log) return console.log(e)
        }
    })
}).call(this);
! function(e) {
    function t(t) {
        function n(t, n) {
            var a = e("<div></div>");
            n ? a.addClass("hs-common-error-message") : a.addClass("hs-common-confirm-message");
            a.html(t);
            e("form#blog-comment-form").prepend(a)
        }

        function i(e) {
            var t, n, a, i, s;
            t = hsVars.ticks + "-" + hsVars.page_id;
            n = [];
            for (var r = 0; r < t.length; r++) {
                a = t.charCodeAt(r);
                i = l[e].charCodeAt(r);
                s = a - 96;
                s > 126 && (s -= 126);
                s += 49;
                n.push(String.fromCharCode(s))
            }
            return n.join("")
        }

        function s() {
            var t = [];
            e("#id_user_name").val() || t.push("Name is required");
            e("#id_user_email").val() ? -1 == e("#id_user_email").val().indexOf("@") && t.push("Email address is not valid") : t.push("Email is required");
            e("#id_comment").val() || t.push("Comment is required");
            return r(t)
        }

        function r(e) {
            if (e.length > 0) {
                e.unshift("One or more errors occurred:");
                n(e.join("<br/>&bull; "), !0);
                return !1
            }
            return !0
        }

        function o(e) {
            var t, n = [],
                a = ["comment", "user_name", "user_email", "user_website"];
            if (e.recaptcha_response_field) {
                n.push("Enter a valid captcha response.");
                delete e.recaptcha_response_field
            }
            for (var i = 0; i < a.length; i++) {
                t = a[i];
                e.hasOwnProperty(t) && n.push(e[t][0])
            }
            n.length > 0 && window.Recaptcha && Recaptcha.reload();
            return r(n)
        }
        e("form#blog-comment-form .hs-common-error-message").remove();
        e("form#blog-comment-form .hs-common-confirm-message").remove();
        var l = {
            a: "bZVI3LbCjMC5ATa0Xe6u5lHhnp846imYJaUEBsNS1osqQoMvEpuaW8BqUjkmOnbH5MjQqZDrWtbhJrAq",
            b: "sNYWQs1vIh842hn9i7uUN3SY0ku2l22xtaSYledfPc30n2d4FOjSOL8zx7P6P7389qqW0jfrm3ge3yWH",
            c: "BsqFip3YGP2NfbWKePmqmWaLgf4TPlsLaAC2MoFLo6ZzwB17Z8GNxaWrxDBMkSISQQwZ7sN07B2yYao7"
        };
        t.preventDefault();
        t.stopPropagation();
        if (a.isSaving) return !1;
        if (!s()) return !1;
        a.isSaving = !0;
        e('form#blog-comment-form input[type="submit"]').val("Saving...");
        data = e("form#blog-comment-form").serialize();
        data += "&anti_spam_key=" + i("a");
        data += "&key_check_" + i("b") + "=" + i("c");
        e.ajax(e("form#blog-comment-form").attr("action"), {
            data: data,
            dataType: "json",
            type: "POST",
            error: function(t) {
                e('form#blog-comment-form input[type="submit"]').val("Submit");
                n(t.message, !0);
                a.isSaving = !1
            },
            success: function(t) {
                e('form#blog-comment-form input[type="submit"]').val("Submit");
                if (t.succeeded) {
                    n(t.message + '<span id="hs-added-comment-id" style="display:none">' + t.comment_id + "</span>", !1);
                    a.isSaving = !1;
                    e("input#add-comment-button").addClass("hidden");
                    e("form#blog-comment-form .field").hide("slow")
                } else {
                    o(t.error_dict);
                    a.isSaving = !1
                }
            }
        });
        return !1
    }

    function n() {
        e("form#blog-comment-form").not(".new-comments").submit(t)
    }
    var a = {
        isSaving: !1
    };
    e(document).ready(n)
}(jQuery);
! function(e) {
    function t(t) {
        e(this).prev("ul").children("li").show();
        e(this).hide();
        t.preventDefault();
        t.stopPropagation()
    }

    function n() {
        e(".filter-expand-link").click(t);
        window.hs_show_tools_menu_if_author();
        var n = function(t, n) {
                t.find(".hs-classic-form-errors") && t.find(".hs-classic-form-errors").remove();
                $errors = e('<div class="hs-classic-form-errors message">');
                $errors.append('<div class="top-message">Error submitting form</div>');
                e(n).each(function(t, n) {
                    var a;
                    switch (n.error) {
                        case "required":
                            a = 'Field "' + n.field.label + '" is required';
                            break;
                        case "email_invalid":
                            a = 'Invalid email address in "' + n.field.name + '" (will be kept private, of course)'
                    }
                    $errors.append(e('<div class="ValidationErrorMessage">').html(a))
                });
                t.prepend($errors)
            },
            a = /^(([^<>()\[\]\\.,;:\s@\"]+(\.[^<>()\[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        e("form[data-hs-classic-form-key]").submit(function() {
            if (!window.hsClassicFormSchema) return !0;
            var t = e(this),
                i = [],
                s = window.hsClassicFormSchema[t.data("hs-classic-form-key")];
            t.find("input").each(function() {
                var t, n, r = e(this),
                    o = e(this).attr("name").split(":")[1];
                t = e.grep(s, function(e) {
                    return e.name == o
                });
                if (t.length) {
                    n = t[0];
                    n.required && (r.val() || i.push({
                        field: n,
                        error: "required"
                    }));
                    "email" == n.name.toLowerCase() && (a.test(r.val()) || i.push({
                        field: n,
                        error: "email_invalid"
                    }))
                }
            });
            if (i.length) {
                n(t, i);
                return !1
            }
        })
    }
    e(document).ready(n)
}(jQuery);