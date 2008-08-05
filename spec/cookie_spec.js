load("jsspec/config.js");
load("src/cookie.js");

with(Spec) {
  describe("Cookie set", function() {with(this) {
    it("should set a cookie with an expiration", function() {
      Cookie.set("foo", "value", 60);
      var cookie = document.cookie.split("; ")
      cookie.length.should(equal(3));
      cookie[0].should(equal("foo=value"));
      cookie[1].should(match(/^expires=\w+, \d+ \w+ \d\d\d\d \d\d:\d\d:\d\d \w+$/));
      cookie[2].should(equal("path=/"));
    });
    it("should set a cookie without an expiration", function() {
      Cookie.set("foo", "value");
      var cookie = document.cookie.split("; ")
      cookie.length.should(equal(2));
      cookie[0].should(equal("foo=value"));
      cookie[1].should(equal("path=/"));
    });
    it("should trigger a 'set' event ", function() {
      var eventCounter = 0;
      Cookie.observeOnce("set", function() {
        eventCounter++;  
      });
      Cookie.set("foo", "value");
      eventCounter.should(equal(1));
    });
  }});
  describe("Cookie get", function() {with(this) {
    it("should trigger a 'get' event ", function() {
      var eventCounter = 0;
      Cookie.observeOnce("get", function() {
        eventCounter++;
      });
      Cookie.get("foo");
      eventCounter.should(equal(1));
    });
    it("returns null if there is no value for this name", function() {
      document.cookie = "no name value pair here";
      (!Cookie.get("foo")).should(equal(true));
    });
    it("returns value from a cookie with no expiration", function() {
      document.cookie = "foo=value; path=/";
      Cookie.get("foo").should(equal("value"));
    });
    it("returns value from a cookie with an expiration", function() {
      document.cookie="foo=transientValue; expires=Wed, 23 Jul 2008 18:16:12 GMT; path=/";
      Cookie.get("foo").should(equal("transientValue"));
    });
  }});
}

Specs.report = "ConsoleReport";
Specs.run();