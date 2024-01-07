import { expect, test } from "@jest/globals";
import aliasedEmail from "../dist/index";

test("Adding a custom alias", () => {
  expect(aliasedEmail("example@test.com", "test")).toEqual("example+test@test.com");
  expect(aliasedEmail("example@test.com", "9235479")).toEqual("example+9235479@test.com");
  expect(aliasedEmail("example@test.com", "9235479")).toEqual("example+9235479@test.com");
});
test("Invalid input has expected response", () => {
  expect(aliasedEmail("example@@test.com")).toEqual("");
  expect(aliasedEmail("exampletest.com")).toEqual("");
  expect(aliasedEmail("example@testcom")).toEqual("");
  expect(aliasedEmail("exampletestcom")).toEqual("");
  expect(aliasedEmail("b@d.e", "test")).toEqual("");
  expect(aliasedEmail("b@d.e")).toEqual("");
});

const timestampRegex = /\d{4}-\d{2}-\d{2}T\d{2}\.\d{2}\.\d{2}\.\d{3}Z/;

const parseTimestamp = (email: string) => {
  return email.split("+")[1].split("@")[0];
};

test("timestamps are added to emails", () => {
  expect(parseTimestamp(aliasedEmail("example@test.com"))).toMatch(timestampRegex);

  expect(parseTimestamp(aliasedEmail("example@test.com", " "))).toMatch(timestampRegex);

  expect(parseTimestamp(aliasedEmail("example@test.com", ""))).toMatch(timestampRegex);
});
