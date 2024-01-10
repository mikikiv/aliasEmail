class EmailAlias {
  private emailPattern = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  private aliasedEmailPattern = /^[a-zA-Z0-9._%-][+][a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  private email: string;
  private alias: string;

  constructor(email: string, alias?: string) {
    this.email = email;
    this.alias = alias?.trim().replace(/s/g, "")
      ? alias?.trim().replace(/\s+/g, ".")
      : new Date().toISOString().replace(/:/g, ".");
  }

  private invalidEmail(email: string) {
    if (!this.emailPattern.test(email)) return "Invalid email address";
    if (this.aliasedEmailPattern.test(email)) return "Invalid email format";
    return false;
  }

  aliasedEmail() {
    if (this.invalidEmail(this.email)) return "";

    return this.addAliasToEmail(this.alias.trim().replace(/\s+/gm, "."));
  }

  aliasedEmailObject() {
    const timestamp = new Date().toISOString();
    const isEmailInvalid = this.invalidEmail(this.email);

    if (isEmailInvalid) {
      return {
        aliasedEmail: "",
        email: this.email,
        alias: this.alias,
        createdAt: timestamp,
        error: isEmailInvalid,
      };
    }

    return {
      aliasedEmail: this.addAliasToEmail(this.alias.trim().replace(/\s+/g, ".")),
      email: this.email,
      alias: this.alias.trim().replace(/\s+/gm, "."),
      createdAt: timestamp,
      error: isEmailInvalid,
    };
  }

  private addAliasToEmail(alias: string) {
    return this.email.replace(/@/, `+${alias}@`);
  }
}

const aliasedEmail = (email: string, alias?: string) => {
  return new EmailAlias(email, alias).aliasedEmail();
};

const aliasedEmailObject = (email: string, alias?: string) => {
  return new EmailAlias(email, alias).aliasedEmailObject();
};

export { aliasedEmailObject };
export default aliasedEmail;
