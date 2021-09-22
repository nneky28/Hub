import * as yup from 'yup';
const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

export const validationSchema = yup.object().shape({
    firstName: yup
      .string()
      .min(3, 'Too Short!')
      .max(30, 'Too Long!')
      .matches(/^[a-z ,.'-]+$/i, 'Enter valid first name')
      .required('First name is required'),
    middleName: yup
      .string()
      .min(3, 'Too Short!')
      .max(30, 'Too Long!')
      .matches(/^[a-z ,.'-]+$/i, 'Enter valid middle name')
      .required('Middle name is required'),
    lastName: yup
      .string()
      .min(3, 'Too Short!')
      .max(30, 'Too Long!')
      .matches(/^[a-z ,.'-]+$/i, 'Enter valid last name')
      .required('Last name is required'),
    mobileNumber1: yup
      .string()
      .min(11)
      .matches(phoneRegExp, 'Enter a valid mobile number')
      .required('Mobile number is required'),
    mobileNumber2: yup
      .string()
      .matches(phoneRegExp, 'Enter a valid mobile number')
      .optional('Mobile number 2 is optional'),
    email: yup
      .string()
      .email("Please enter valid email")
      .required('Email is required'),
    address: yup
      .string()
      .min(3, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Address is required'),
    address2: yup
      .string()
      .min(3, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Address 2 is required'),
    dateOfBirth: yup
      .string()
      .min(3, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Date of Birth is required'),
    gender: yup
      .string()
      .min(3, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Gender is required'),
    maritalStatus: yup
      .string()
      .min(3, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Marital Status is required'),
  }
);