/*!
 * timeAgo v1.0.0 (https://github.com/xc0d3rz/timeAgo,js)
 * Copyright 2016-2017 xc0d3rz.
 * Licensed under the MIT license
 */

(function () {
    function timeAgo() {
        this.setTime(arguments);
        this.options = extend({}, this.DEFAULTS);
    };
    var extend = function (a, b) {
        for (var i in b) {
            if (b.hasOwnProperty(i)) {
                a[i] = b[i];
            }
        }
        return a;
    };
    Date.prototype.toTimestamp = function () {
        var
            a = new Date(this.valueOf()),
            b = a.getTime() / 1000;
        return Math.floor(b);
    };
    Date.prototype.setArguments = function () {
        var args = Array.prototype.slice.call(arguments);
        return new Date(args);
    };
    timeAgo.prototype = {
        DEFAULTS: {
            currentTime: "",
            langauge: "ar"
        },
        intervals: {
            year: 31556926,
            month: 2629744,
            week: 604800,
            day: 86400,
            hour: 3600,
            minute: 60
        },
        langauge: {
            ar: {
                now: {
                    a: "الآن"
                },
                seconds: {
                    a: "منذ ثانية",
                    b: "منذ ثانيتين",
                    c: "منذ %s ثواني",
                    d: "منذ %s ثانية"
                },
                minutes: {
                    a: "منذ دقيقة",
                    b: "منذ دقيقتين",
                    c: "منذ %s دقائق",
                    d: "منذ %s دقيقة"
                },
                hours: {
                    a: "منذ ساعة",
                    b: "منذ ساعتين",
                    c: "منذ %s ساعات",
                    d: "منذ %s ساعة",
                },
                days: {
                    a: "بألامس",
                    b: "منذ يومين",
                    c: "منذ %s أيام",
                    d: "منذ %s يوم"
                },
                weeks: {
                    a: "الأسبوع الماضي",
                    b: "منذ أسبوعين",
                    c: "منذ %s أسابيع"
                },
                months: {
                    a: "منذ شهر",
                    b: "منذ شهرين",
                    c: "منذ %s شهور",
                    d: "منذ %s شهر"
                },
                years: {
                    a: "منذ سنة"
                }
            }
        },
        setOptions: function (o) {
            var options = extend(this.options, o);
            var keys = Object.keys(options);
            for (var i in keys) {
                var key = keys[i];

                if (typeof (this.DEFAULTS[key]) === 'undefined') {
                    delete options[key];
                }
            }
            this.options = options;
        }
    };
    timeAgo.prototype.getPhrase = function (a, b, c) {
        var
            phrase = (this.langauge.hasOwnProperty(this.options.langauge)) ? this.langauge[this.options.langauge] : this.langauge.ar,
            $return = "UNKNOWN_PHRASE";
        if (phrase.hasOwnProperty(a)) {
            var group = phrase[a];
            if (group.hasOwnProperty(b)) {
                var phr = group[b];
            }
            if (phr.search("%s") > -1) {
                var $return = phr.replace("%s", c);
            } else {
                var $return = phr;
            }
        }
        return $return;
    };
    timeAgo.prototype.setTime = function () {
        var args = arguments[0];
        if (args.length > 1) {
            var a = Date.prototype.setArguments.apply(this, args);
        } else if (args.length == 1 && typeof args[0] == "number") {
            var a = new Date(args[0] * 1000);
        } else {
            var a = new Date();
        }
        this.timestamp = a;
    };
    timeAgo.prototype.currentTime = function () {
        if (typeof this.options.currentTime == "object") {
            return this.options.currentTime.toTimestamp();
        } else {
            return new Date().toTimestamp();
        }
    };
    timeAgo.prototype.getTime = function () {
        var
            timestamp = this.timestamp.toTimestamp(),
            currentTime = this.currentTime(),
            diff = Math.abs(currentTime - timestamp),
            intervals = this.intervals,
            $return = "";
        if (diff == 0) {
            $return = this.getPhrase('now', 'a');
        }
        if (diff < 60) {
            if (diff == 1) {
                $return = this.getPhrase('seconds', 'a');
            } else if (diff == 2) {
                $return = this.getPhrase('seconds', 'b');
            } else if (diff > 2 && diff < 11) {
                $return = this.getPhrase('seconds', 'c', diff);
            } else if (diff > 10) {
                $return = this.getPhrase('seconds', 'd', diff);
            }
        }

        if (diff >= 60 && diff < intervals.hour) {
            diff = Math.floor(diff / intervals.minute);
            if (diff == 1) {
                $return = this.getPhrase('minutes', 'a');
            } else if (diff == 2) {
                $return = this.getPhrase('minutes', 'b');
            } else if (diff > 2 && diff < 11) {
                $return = this.getPhrase('minutes', 'c', diff);
            } else if (diff > 10) {
                $return = this.getPhrase('minutes', 'd', diff);
            }
        }
        if (diff >= intervals.hour && diff < intervals.day) {
            diff = Math.floor(diff / intervals.hour);
            if (diff == 1) {
                $return = this.getPhrase('hours', 'a');
            } else if (diff == 2) {
                $return = this.getPhrase('hours', 'b');
            } else if (diff > 2 && diff < 11) {
                $return = this.getPhrase('hours', 'c', diff);
            } else if (diff > 10) {
                $return = this.getPhrase('hours', 'd', diff);
            }
        }
        if (diff >= intervals.day && diff < intervals.week) {
            diff = Math.floor(diff / intervals.day);
            if (diff == 1) {
                $return = this.getPhrase('days', 'a');
            } else if (diff == 2) {
                $return = this.getPhrase('days', 'b');
            } else if (diff > 2 && diff < 11) {
                $return = this.getPhrase('days', 'c', diff);
            } else if (diff > 10) {
                $return = this.getPhrase('days', 'd', diff);
            }
        }
        if (diff >= intervals.week && diff < intervals.month) {
            diff = Math.floor(diff / intervals.week);
            if (diff == 1) {
                $return = this.getPhrase('weeks', 'a');
            } else if (diff == 2) {
                $return = this.getPhrase('weeks', 'b');
            } else if (diff > 2) {
                $return = this.getPhrase('weeks', 'c', diff);
            }
        }

        if (diff >= intervals.month && diff < intervals.year) {
            diff = Math.floor(diff / intervals.month);
            if (diff == 1) {
                $return = this.getPhrase('months', 'a');
            } else if (diff == 2) {
                $return = this.getPhrase('months', 'b');
            } else if (diff > 2 && diff < 11) {
                $return = this.getPhrase('months', 'c', diff);
            } else if (diff > 10) {
                $return = this.getPhrase('months', 'd', diff);
            }
        }

        if (diff >= intervals.year) {
            diff = Math.floor(diff / intervals.year);
            if (diff == 1) {
                $return = this.getPhrase('years', 'a');
            } else {
                $return = this.timestamp.toDateString();
            }

        }

        return $return;
    };
    if (typeof define === "function" && define.amd) {
        define("timeAgo", [], function () {
            return timeAgo;
        });
    } else {
        (this.exports || this).timeAgo = timeAgo;
    }
}.call(window, this));
