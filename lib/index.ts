const emailPattern = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const aliasedEmailPattern = /^[a-zA-Z0-9._%-][+][a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function aliasedEmail(email: string, alias?: string) {
  const timestamp = new Date().toISOString();
  if (invalidEmail(email)) return "";

  if (!alias || alias.trim() === "") {
    alias = timestamp.replace(/:/g, ".");
  }
  return addAliasToEmail(email, alias.trim().replace(/\s+/gm, "."));
}

function aliasedEmailObject(email: string, alias?: string) {
  const timestamp = new Date().toISOString();
  const isEmailInvalid = invalidEmail(email);

  if (!alias || alias == undefined || alias.trim() === "") {
    alias = timestamp.replace(/:/g, ".");
  }

  if (isEmailInvalid) {
    return {
      aliasedEmail: "",
      email: email,
      alias: alias,
      createdAt: timestamp,
      error: isEmailInvalid,
    };
  }

  return {
    aliasedEmail: addAliasToEmail(email, alias.trim().replace(/\s+/g, ".")),
    email: email,
    alias: alias.trim().replace(/\s+/gm, "."),
    createdAt: timestamp,
    error: isEmailInvalid,
  };
}

function addAliasToEmail(email: string, alias: string) {
  return email.split("@").join("+" + alias + "@");
}

function invalidEmail(email: string) {
  if (!email || email.trim() === "") return "No email provided";
  if (aliasedEmailPattern.test(email)) return "Email already has an alias";
  if (!emailPattern.test(email)) return "Invalid email address";
  return false;
}

export { aliasedEmail, aliasedEmailObject };
