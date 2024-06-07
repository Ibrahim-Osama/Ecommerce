import React, { useState } from 'react';
import styles from './Contact.module.css';
import toast from "react-hot-toast";
import { useForm, ValidationError } from '@formspree/react';
import { Navigate } from 'react-router-dom';
import * as yup from 'yup';
import {Helmet} from "react-helmet";
const schema = yup.object().shape({
  email: yup.string().email().required(),
  message: yup.string().required(),
  name: yup.string().required(),
});

export default function Contact() {
  const [state, handleSubmit] = useForm("xpzvgakj");
  const [formData, setFormData] = useState({ email: '', message: '' ,nameL:''});
  const [errors, setErrors] = useState({});

  const notify = () => toast('Message sent To Us.', {
    icon: '📩✅Ⓜ',
    style: {
      borderRadius: '10px',
      background: '#333',
      margin:'50px 0px',
      color: '#fff',
    },
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBlur = async () => {
    try {
      await schema.validate(formData, { abortEarly: false });
      setErrors({});
    } catch (err) {
      const newErrors = {};
      err.inner.forEach(error => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
    }
  };

  if (state.succeeded) {
    notify();
    return <Navigate to='/'/>;
  }

  return  <>
     <Helmet>
                <meta charSet="utf-8" />
                <title>Contact Us</title>
            </Helmet>
    <form onSubmit={handleSubmit} className='py-5 d-flex flex-column justify-content-center align-items-center mt-free bg-dark rounded-3 lighty'>
      <label htmlFor="email" className='mt-3'>
        <h4>Email Address</h4>
      </label>
      <input
        className='form-control w-50'
        id="email"
        type="email" 
        name="email"
        placeholder='Write Ur Name'
        value={formData.email}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {errors.email && <span className="text-info">{errors.email}</span>}
      <label htmlFor="name" className='mt-3'>
        <h4>Full Name</h4>
      </label>
      <input
        className='form-control w-50'
        id="name"
        type="name" 
        name="name"
        placeholder='Write Ur name'
        value={formData.name}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {errors.name && <span className="text-info">{errors.name}</span>}
      <h4 className='mt-4'>Happy to Hear U</h4>
      <textarea
        className='form-control w-50'
        id="message"
        name="message"
        placeholder='Write Ur message'
        value={formData.message}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {errors.message && <span className="text-info">{errors.message}</span>}
      <button
        type="submit"
        className='btn lighty btn-outline-success mt-4'
        disabled={state.submitting || Object.keys(errors).length > 0} 
      >
        Send Now
      </button>
    </form>
  );
</>
}