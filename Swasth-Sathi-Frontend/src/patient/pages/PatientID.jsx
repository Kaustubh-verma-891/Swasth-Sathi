import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useTextToSpeech from '../../components/TextToSpeech';
import axiosInstance from '../../utils/axiosInstance';

const PatientId = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const speakText = useTextToSpeech(i18n.language);

  useEffect(() => {
    // Speak the main heading on page load
    speakText(`${t('patient_id_page.page_title')}`);
  }, [speakText, t, i18n.language]);

  const formik = useFormik({
    initialValues: {
      patientId: '',
      phone: '',
    },
    validationSchema: Yup.object({
      patientId: Yup.string()
        .required(t('patient_id_page.validation_errors.required'))
        .matches(/^[A-Za-z0-9]+$/, t('patient_id_page.validation_errors.invalid_format')),
      phone: Yup.string()
        .required(t('patient_id_page.validation_errors.required'))
        .matches(/^\d{10}$/, t('patient_id_page.validation_errors.phone_invalid')),
    }),
    onSubmit: async (values) => {
      try {
        console.log(values);
        const res = await axiosInstance.post('/patient/get', values);
        navigate('/doctor-ai');
      } catch (error) {
        console.error('Error', error);
      }
    },
  });

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-400 to-blue-200 text-center">
      <header className="bg-gray-800 text-white py-6">
        <div className="flex items-center justify-center">
        <h1
            className="text-3xl font-bold"
            onMouseEnter={() => speakText(t('patient_id_page.header_title'))} // Trigger text-to-speech on hover
          >
            {t('patient_id_page.header_title')}
          </h1>
        </div>
      </header>
      <main className="flex-grow flex flex-col items-center justify-center px-4">
        <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <h2
            className="text-2xl pb-4 font-bold"
            onMouseEnter={() => speakText(t('patient_id_page.page_title'))}
          >
            {t('patient_id_page.page_title')}
          </h2>
          <form onSubmit={formik.handleSubmit}>
            <input
              type="text"
              id="patientId"
              name="patientId"
              value={formik.values.patientId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder={t('patient_id_page.patient_id_placeholder')}
              className={`w-full p-3 border rounded-lg mb-2 ${formik.touched.patientId && formik.errors.patientId
                ? 'border-red-500'
                : 'border-gray-300'
                }`}
              onMouseEnter={() => speakText(t('patient_id_page.patient_id_placeholder'))}
            />
            {formik.touched.patientId && formik.errors.patientId ? (
              <div
                className="text-red-500 text-sm mb-4"
                onMouseEnter={() => speakText(formik.errors.patientId)}
              >
                {formik.errors.patientId}
              </div>
            ) : null}

            <input
              type="text"
              id="phone"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder={t('patient_id_page.phone_placeholder')}
              className={`w-full p-3 border rounded-lg mb-2 ${formik.touched.phone && formik.errors.phone
                ? 'border-red-500'
                : 'border-gray-300'
                }`}
              onMouseEnter={() => speakText(t('patient_id_page.phone_placeholder'))}
            />
            {formik.touched.phone && formik.errors.phone ? (
              <div
                className="text-red-500 text-sm mb-4"
                onMouseEnter={() => speakText(formik.errors.phone)}
              >
                {formik.errors.phone}
              </div>
            ) : null}

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 text-center block"
              onMouseEnter={() => speakText(t('patient_id_page.continue_button'))}
            >
              {t('patient_id_page.continue_button')}
            </button>
          </form>
        </div>
      </main>
      <footer className="bg-gray-800 text-white py-4">
        <div className="flex items-center justify-center">
          <p
            className="text-sm"
            onMouseEnter={() => speakText(t('patient_id_page.footer_text'))}
          >
            {t('patient_id_page.footer_text')}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PatientId;
