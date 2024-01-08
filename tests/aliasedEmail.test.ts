import { describe, expect, test } from "@jest/globals";
import { aliasedEmail, aliasedEmailObject } from "../dist/index";

test("Adding a custom alias", () => {
  expect(aliasedEmail("example@test.com", "test")).toEqual("example+test@test.com");
  expect(aliasedEmail("example@test.com", "9235479")).toEqual("example+9235479@test.com");
  expect(aliasedEmail("example@test.com", "9235479")).toEqual("example+9235479@test.com");
  expect(aliasedEmail("example@test.com", "this is a test")).toEqual("example+this.is.a.test@test.com");
});
test("Invalid input has expected response", () => {
  expect(aliasedEmail("example@@test.com")).toEqual("");
  expect(aliasedEmail("exampletest.com", "hi")).toEqual("");
  expect(aliasedEmail("example@testcom")).toEqual("");
  expect(aliasedEmail("example@testcom", "alias")).toEqual("");
  expect(aliasedEmail("exampletestcom")).toEqual("");
  expect(aliasedEmail("b@d.e", "test")).toEqual("");
  expect(aliasedEmail("b@d.e")).toEqual("");
  expect(aliasedEmail("alreadyAliased+this@test.com", "test")).toEqual("");
  expect(
    aliasedEmail(
      "spacesInAlias@test.com",
      " a big   \
   empty line",
    ),
  ).toEqual("spacesInAlias+a.big.empty.line@test.com");
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

describe("aliasedEmailObject", () => {
  test("bad aliasedEmail object has expected values", () => {
    const email = aliasedEmailObject("example+this@test.com", "test");
    expect(email.email).toEqual("example+this@test.com");
    expect(email.alias).toEqual("test");
    expect(email.aliasedEmail).toEqual("");
    expect(email.error).toEqual("Invalid email address");
  });
  test("bad aliasedEmail object has expected values", () => {
    const email = aliasedEmailObject("example!@+this@testcom");
    expect(email.email).toEqual("example!@+this@testcom");
    testTimestampValue(email.alias, new Date().toISOString());
    expect(email.aliasedEmail).toEqual("");
    expect(email.error).toEqual("Invalid email address");
  });
  test("aliasedEmail object has expected values", () => {
    const email = aliasedEmailObject("example@test.com", "test");
    expect(email.email).toEqual("example@test.com");
    expect(email.alias).toEqual("test");
    expect(email.aliasedEmail).toEqual("example+test@test.com");
    expect(email.error).toEqual(false);
  });
  test("aliasedEmail object has expected values", () => {
    const email = aliasedEmailObject("example@test.com");
    expect(email.email).toEqual("example@test.com");
    testTimestampValue(email.createdAt, new Date().toISOString());
    expect(parseTimestamp(email.aliasedEmail)).toMatch(timestampRegex);
    expect(email.aliasedEmail).toEqual("example+" + parseTimestamp(email.aliasedEmail) + "@test.com");
    expect(email.error).toEqual(false);
  });
});

const testTimestampValue = (expected: string, actual: string) => {
  const expectedTimestamp = parseInt(expected.replace(/\D+/g, ""));
  const actualTimestamp = parseInt(actual.replace(/\D+/g, ""));
  expect(expectedTimestamp).toBeCloseTo(actualTimestamp);
};
