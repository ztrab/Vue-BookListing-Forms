const assert = require("chai").assert;
const parse5 = require("parse5");
const cheerio = require("cheerio");
const helpers = require("../helpers");

describe("BookForm.vue", () => {
  it("should contain a textarea with a `v-model` directive @book-form-will-contain-textarea", () => {
    const file = helpers.readFile("src/components/BookForm.vue");
    const nodes = helpers.parseFile(file);
    const tagName = helpers.getHtmlTag("template", nodes);
    const content = parse5.serialize(tagName[0].content);
    const $ = cheerio.load(content);
    const textarea = $("form textarea");

    assert(textarea.length > 0, "The form doesn't have an `<textarea>`");

    assert.hasAnyKeys(
      textarea.attr(),
      ["v-model"],
      "The BookForm textarea does not have a `v-model` directive containing `bookData.notes` as its value"
    );

    assert.propertyVal(
      textarea.attr(),
      "v-model",
      "bookData.notes",
      "The BookForm textarea does not have a `v-model` directive containing `bookData.notes` as its value"
    );
  });
});
