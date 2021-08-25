module.exports = {
  isPasswordValid: (password) => {
    // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
    const regex =
      /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/;

    // if the regex produces any match with the password, return true
    return password.match(regex) !== null;
  },
};
