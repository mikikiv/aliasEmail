class EmailAlias {
  private emailPattern = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  private aliasedEmailPattern = /^[a-zA-Z0-9._%-][+][a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  private email: string;
  private alias: string;
  private timestamp: Date;

  constructor(email: string, alias?: string) {
    this.email = email;
    this.timestamp = new Date();
    this.alias =
      alias?.trim() !== "" && alias
        ? alias.trim().replace(/\s+/g, ".")
        : this.timestamp.toISOString().slice(0, -5).replace(/:/g, ".");
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
    const isEmailInvalid = this.invalidEmail(this.email);

    return {
      aliasedEmail: isEmailInvalid ? "" : this.addAliasToEmail(this.alias),
      email: this.email,
      alias: this.alias,
      createdAt: this.timestamp,
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
