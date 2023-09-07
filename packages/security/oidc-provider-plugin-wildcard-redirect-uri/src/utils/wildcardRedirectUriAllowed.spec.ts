import {wildcardRedirectUriAllowed} from "./wildcardRedirectUriAllowed";

describe("wildcardRedirectUriAllowed()", () => {
  it("should call the original function if there is no wildcard in client redirect_uris", () => {
    const originalRedirectUriAllowed = jest.fn();
    wildcardRedirectUriAllowed(originalRedirectUriAllowed).call(
      {
        redirectUris: ["https://redirect.test.com"]
      },
      "https://redirect.test.com"
    );
    expect(originalRedirectUriAllowed).toHaveBeenCalledWith("https://redirect.test.com");
  });

  it("should return original function result if client has wildcard uris but not used", () => {
    const originalRedirectUriAllowed = jest.fn().mockReturnValue(true);
    const result = wildcardRedirectUriAllowed(originalRedirectUriAllowed).call(
      {
        redirectUris: ["https://test.com/titi", "https://*.test.com/toto"]
      },
      "https://test.com/titi"
    );
    expect(originalRedirectUriAllowed).toHaveBeenCalledWith("https://test.com/titi");
    expect(result).toEqual(true);
  });
  it("should return true if the redirect_uri match client redirect_uri with wildcard", () => {
    const originalRedirectUriAllowed = jest.fn();
    const result = wildcardRedirectUriAllowed(originalRedirectUriAllowed).call(
      {
        redirectUris: ["https://*.test.com/"]
      },
      "https://toto.test.com/"
    );
    expect(originalRedirectUriAllowed).not.toHaveBeenCalledWith();
    expect(result).toEqual(true);
  });
});
