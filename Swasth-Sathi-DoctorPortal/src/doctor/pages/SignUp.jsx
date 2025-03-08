import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axiosInstance from '../../utils/axiosInstance';
import { useAuthStore } from '../../context/useAuthStore';

const SignupPage = () => {
  const { signup, isSigningUp } = useAuthStore();
  const navigate = useNavigate();

  const initialValues = {
    name: '',
    languagesKnown: [],
    mciRegNo: '',
    certificateNo: '',
    phone: '',
    email: '',
    password: ''
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    languagesKnown: Yup.array().min(1, 'At least one language must be selected').required('Languages are required'),
    mciRegNo: Yup.string().required('MCI Registration Number is required'),
    certificateNo: Yup.string().required('Certificate Number is required'),
    phone: Yup.string().matches(/^\d{10}$/, 'Phone number is not valid').required('Phone number is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      await signup(values);
      navigate('/doctorprofile');
    } catch (error) {
      setErrors({ submit: 'Error during signup' });
    } finally {
      setSubmitting(false);
    }
  };

  const languages = ['English', 'Hindi', 'Marathi', 'Gujrati', 'Punjabi', 'Tamil'];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white w-96 p-8 rounded shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">Signup</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, isSubmitting, errors }) => (
            <Form>
              <div className="mb-4">
                <Field
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
              </div>

              <div className="mb-4">
                <Field
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <ErrorMessage name="phone" component="div" className="text-red-500 text-sm" />
              </div>

              <div className="mb-4">
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
              </div>

              <div className="mb-4">
                <Field
                  type="text"
                  name="mciRegNo"
                  placeholder="MCI Registration Number"
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <ErrorMessage name="mciRegNo" component="div" className="text-red-500 text-sm" />
              </div>

              <div className="mb-4">
                <Field
                  type="text"
                  name="certificateNo"
                  placeholder="Certificate Number"
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <ErrorMessage name="certificateNo" component="div" className="text-red-500 text-sm" />
              </div>

              <div className="mb-4">
                <label className="block text-left mb-2">Languages Known</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded mb-2"
                  onChange={(e) => {
                    const selectedLanguage = e.target.value;
                    if (selectedLanguage && !values.languagesKnown.includes(selectedLanguage)) {
                      setFieldValue('languagesKnown', [...values.languagesKnown, selectedLanguage]);
                    }
                  }}
                >
                  <option value="">Select a language</option>
                  {languages.map((language) => (
                    <option key={language} value={language}>
                      {language}
                    </option>
                  ))}
                </select>
                <div className="flex flex-wrap gap-2">
                  {values.languagesKnown.map((language) => (
                    <div key={language} className="flex items-center bg-gray-200 p-2 rounded">
                      <span>{language}</span>
                      <button
                        type="button"
                        className="ml-2 text-red-500"
                        onClick={() => {
                          setFieldValue('languagesKnown', values.languagesKnown.filter((lang) => lang !== language));
                        }}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
                <ErrorMessage name="languagesKnown" component="div" className="text-red-500 text-sm" />

                <div className="my-6">
                  <Field
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                </div>

              </div>


              {errors.submit && <div className="text-red-500 mb-4">{errors.submit}</div>}

              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                disabled={isSubmitting}
              >
                Signup
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignupPage;