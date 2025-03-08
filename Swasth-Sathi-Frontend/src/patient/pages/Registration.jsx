import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import useTextToSpeech from '../../components/TextToSpeech';
import axiosInstance from '../../utils/axiosInstance';

const Registration = () => {
  const { t, i18n } = useTranslation();
  const speakText = useTextToSpeech(i18n.language);

  useEffect(() => {
    speakText(`${t('registration_page.page_title')}`);
  }, [speakText, t, i18n.language]);

  const navigate = useNavigate();
  const location = useLocation();
  const patientId = location.state?.patientId;

  const initialValues = {
    name: '',
    gender: '',
    age: '',
    phone: '',
    alternativeNumber: '000000000',
    email: '',
    address: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required(t('registration_page.validation_errors.required')),
    gender: Yup.string().required(t('registration_page.validation_errors.required')),
    age: Yup.number().required(t('registration_page.validation_errors.required')).positive().integer(),
    phone: Yup.string().required(t('registration_page.validation_errors.required')),
    alternateNumber: Yup.string().matches(/^\d{10}$/, t('registration_page.validation_errors.phone_invalid')),
    email: Yup.string().email(t('registration_page.validation_errors.email_invalid')),
    address: Yup.string().required(t('registration_page.validation_errors.required'))
  });

  const onSubmit = async (values) => {
    const language = localStorage.getItem('selectedLanguage') || 'en';
    const formData = { ...values, language };
    console.log('Form data', formData);
    try {
      await axiosInstance.post('/patient/save', formData);
      navigate('/doctor-ai');
    } catch (error) {
      console.error('Error', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-400 to-blue-200 ">
      <header className="bg-gray-800 text-white py-6">
        <div className="flex items-center justify-center space-x-2">
        <h1
            className="text-3xl font-bold"
            onMouseEnter={() => speakText(t('registration_page.header_title'))} // Trigger text-to-speech on hover
          >
            {t('registration_page.header_title')}
          </h1>
        </div>
      </header>
      <main className="flex-grow flex flex-col items-center justify-center px-4">
        <div className="max-w-2xl w-full bg-white rounded-lg shadow-xl px-4 py-2">
        <h1
            className="text-xl pb-2 font-bold"
            onMouseEnter={() => speakText(t('registration_page.page_title'))}
          >
            {t('registration_page.page_title')}
          </h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {() => (
              <Form className="space-y-2">
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-1"
                    onMouseEnter={() => speakText(t('registration_page.form_labels.name'))}
                  >
                    {t('registration_page.form_labels.name')}
                  </label>
                  <Field
                    type="text"
                    name="name"
                    className="w-full p-3 border rounded-lg"
                  />
                  <ErrorMessage name="name" component="div" className="text-red-500" />
                </div>

                <div className="flex gap-4">
                  <div className="w-1/2">
                    <label
                      className="block text-sm font-medium text-gray-700 mb-1"
                      onMouseEnter={() => speakText(t('registration_page.form_labels.gender'))}
                    >
                      {t('registration_page.form_labels.gender')}
                    </label>
                    <Field as="select" name="gender" className="w-full p-3 border rounded-lg">
                      {t('registration_page.gender_options', { returnObjects: true }).map((option, index) => (
                        <option key={index} value={option.toLowerCase()}>
                          {option}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage name="gender" component="div" className="text-red-500" />
                  </div>

                  <div className="w-1/2">
                    <label
                      className="block text-sm font-medium text-gray-700 mb-1"
                      onMouseEnter={() => speakText(t('registration_page.form_labels.age'))}
                    >
                      {t('registration_page.form_labels.age')}
                    </label>
                    <Field
                      type="number"
                      name="age"
                      className="w-full p-3 border rounded-lg"
                    />
                    <ErrorMessage name="age" component="div" className="text-red-500" />
                  </div>
                </div>

                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-1"
                    onMouseEnter={() => speakText(t('registration_page.form_labels.phone'))}
                  >
                    {t('registration_page.form_labels.phone')}
                  </label>
                  <Field
                    type="text"
                    name="phone"
                    className="w-full p-3 border rounded-lg"
                  />
                  <ErrorMessage name="phone" component="div" className="text-red-500" />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-1"
                    onMouseEnter={() => speakText(t('registration_page.form_labels.relative_phone'))}
                  >
                    {t('registration_page.form_labels.relative_phone')}
                  </label>
                  <Field
                    type="text"
                    name="alternativeNumber"
                    className="w-full p-3 border rounded-lg"
                  />
                  <ErrorMessage name="alternativeNumber" component="div" className="text-red-500" />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-1"
                    onMouseEnter={() => speakText(t('registration_page.form_labels.email'))}
                  >
                    {t('registration_page.form_labels.email')}
                  </label>
                  <Field
                    type="email"
                    name="email"
                    className="w-full p-3 border rounded-lg"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500" />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-1"
                    onMouseEnter={() => speakText(t('registration_page.form_labels.address'))}
                  >
                    {t('registration_page.form_labels.address')}
                  </label>
                  <Field
                    as="textarea"
                    name="address"
                    className="w-full p-3 border rounded-lg"
                  />
                  <ErrorMessage name="address" component="div" className="text-red-500" />
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600"
                  onMouseEnter={() => speakText(t('registration_page.submit_button'))}
                >
                  {t('registration_page.submit_button')}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </main>
      <footer className="bg-gray-800 text-white py-4">
        <div className="flex items-center justify-center">
          <p
            className="text-sm"
            onMouseEnter={() => speakText(t('registration_page.footer_text'))}
          >
            {t('registration_page.footer_text')}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Registration;
