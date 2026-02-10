export const hideEmail = (email) => {
  if (!email) return "";

  const [name, domain] = email.split("@");

  if (name.length <= 2) {
    return `${name[0]}*@${domain}`;
  }

  const visibleStart = name.slice(0, 2);
  const visibleEnd = name.slice(-1);
  const masked = "*".repeat(name.length - 3);

  return `${visibleStart}${masked}${visibleEnd}@${domain}`;
};
