import {Get, getSpec, JsonMethodStore, SpecTypes} from "../../index";
import {AcceptMime} from "./acceptMime";

describe("AcceptMime", () => {
  it("should set metadata", () => {
    class Test {
      @Get("/")
      @AcceptMime("application/json")
      test() {}
    }

    const endpoint = JsonMethodStore.get(Test, "test");
    expect(endpoint.acceptMimes).toEqual(["application/json"]);

    const spec = getSpec(Test, {specType: SpecTypes.OPENAPI});

    expect(spec).toEqual({
      paths: {
        "/": {
          get: {
            operationId: "testTest",
            parameters: [],
            responses: {
              "200": {
                description: "Success"
              }
            },
            tags: ["Test"]
          }
        }
      },
      tags: [
        {
          name: "Test"
        }
      ]
    });
  });
});
