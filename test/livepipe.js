module("livepipe base");
test("Basic requirements", function () {
    ok(Prototype, "Prototype");
    ok(Control, "Control");
    ok($proc, "$proc");
    ok($value, "$value");
    ok(Object.Event, "Object.Event");
    ok($$("*").first().observeOnce, "Element#observeOnce");
    ok(IframeShim, "IframeShim");
});
