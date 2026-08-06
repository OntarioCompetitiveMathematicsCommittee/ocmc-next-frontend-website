// shared validation rules so the signup, edit user and reset password forms stay in sync
export const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
export const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
export const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
