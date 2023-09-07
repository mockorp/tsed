import {getJsonSchema, Title} from "../../index";

describe("Title()", () => {
  it("should store data", () => {
    class Test {
      @Title("Title")
      test: string;
    }

    expect(getJsonSchema(Test)).toEqual({
      properties: {
        test: {
          title: "Title",
          type: "string"
        }
      },
      type: "object"
    });
  });
});
