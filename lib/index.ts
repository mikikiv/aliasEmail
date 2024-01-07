export default function aliasedEmail(email: string, alias?: string) {
  if (!email || email.trim() === "") return "";
  if (!emailPattern.test(email)) return "";
  const timestamp = new Date().toISOString().replace(":", ".").replace(":", ".");
  if (!alias || alias.trim() === "") {
    return joinData(email, timestamp);
  } else {
    return joinData(email, alias.trim());
  }
  function joinData(email: string, alias: string) {
    return email.split("@").join("+" + alias + "@");
  }
}

const emailPattern = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
