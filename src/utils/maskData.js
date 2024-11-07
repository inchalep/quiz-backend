const maskEmail = (email) => {
  const [localPart, domain] = email.split("@");
  const maskedLocalPart =
    localPart.length > 2 ? localPart.slice(0, 2) + "***" : "***";
  return `${maskedLocalPart}@${domain}`;
};

const maskPhoneNumber = (phoneNumber) => {
  const phonePattern = /^(\d{3})(\d{3})(\d{4})$/;
  return phoneNumber.replace(phonePattern, "$1****$2");
};
module.exports = {
  maskEmail,
  maskPhoneNumber,
};
