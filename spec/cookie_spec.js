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
}

Specs.report = "ConsoleReport";
Specs.run();