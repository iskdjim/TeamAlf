describe("PocketStats", function() {


  it("load the most remixed graph", function() {
    // expect something to be ^^
  });

});

describe("Initialiserung", function() {
  it("init ok", function() {
  	var index = new Index();
    expect(index.init()).toBe(1);
  });
});

describe("id parameter check", function() {
  it("parameter has to be a integer", function() {
    expect(getInfoForID("hello")).toBe(0);
  });
});

describe("get data for id parameter", function() {
  it("got data", function() {
    expect(getInfoForID(15)).not.toBe(0);
  });
});

describe("not paramter for getInfo Function", function() {
  it("need id", function() {
    expect(getInfoForID()).toBe(0);
  });
});


describe("check hide funktion", function() {
  it("hide works", function() {
    expect(hidder("downloaded")).toBe(1);
  });
});

describe("check hide funktion auf falschen input", function() {
  it("wrong inut", function() {
    expect(hidder("")).toBe(0);
  });
});



describe("mostDownloaded", function() {
  it("got data", function() {
    expect(getMostDownloaded()).not.toBe(0);
  });
});

describe("mostViewed", function() {
  it("got data", function() {
    expect(getMostViewed()).not.toBe(0);
  });
});

describe("mostDRemixed", function() {
  it("got data", function() {
    expect(getMostRemixed()).not.toBe(0);
  });
});