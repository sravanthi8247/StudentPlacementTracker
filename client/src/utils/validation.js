export const validateEmail = (email) => {
  if (!email?.trim()) return 'Email is required';
  if (!/^\S+@\S+\.\S+$/.test(email.trim())) return 'Please enter a valid email';
  return '';
};

export const validatePassword = (password, minLength = 6) => {
  if (!password) return 'Password is required';
  if (password.length < minLength) return `Password must be at least ${minLength} characters`;
  return '';
};

export const validateName = (name) => {
  if (!name?.trim()) return 'Name is required';
  if (name.trim().length < 2) return 'Name must be at least 2 characters';
  return '';
};

export const validateRequired = (value, fieldName) => {
  if (!value?.toString().trim()) return `${fieldName} is required`;
  return '';
};

export const validateYear = (year) => {
  if (!year?.toString().trim()) return 'Year is required';
  const yearNum = Number(year);
  if (Number.isNaN(yearNum) || yearNum < 1 || yearNum > 4) {
    return 'Year must be between 1 and 4';
  }
  return '';
};

export const validateLoginForm = ({ email, password }) => {
  const errors = {};
  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);

  if (emailError) errors.email = emailError;
  if (passwordError) errors.password = passwordError;

  return errors;
};

export const validateRegisterForm = (formData) => {
  const errors = {};

  const nameError = validateName(formData.name);
  const emailError = validateEmail(formData.email);
  const passwordError = validatePassword(formData.password);
  const collegeError = validateRequired(formData.college, 'College');
  const branchError = validateRequired(formData.branch, 'Branch');
  const yearError = validateYear(formData.year);

  if (nameError) errors.name = nameError;
  if (emailError) errors.email = emailError;
  if (passwordError) errors.password = passwordError;
  if (collegeError) errors.college = collegeError;
  if (branchError) errors.branch = branchError;
  if (yearError) errors.year = yearError;

  if (formData.confirmPassword !== formData.password) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return errors;
};
