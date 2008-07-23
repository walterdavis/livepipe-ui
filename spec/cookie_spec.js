load("jsspec/config.js");
load("src/cookie.js");

with(Spec) {
  describe("Cookie", function() {with(this) {
    it("should set a cookie", function() {
      Cookie.set("foo", "value", 60);
      //TODO: check something!
    });

  }});

}

Specs.report = "ConsoleReport";
Specs.run();