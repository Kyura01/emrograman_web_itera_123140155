import { useState } from 'react';

export const useFormValidation = (initialState) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!values.title || values.title.trim() === '') {
      newErrors.title = 'Judul buku harus diisi';
    }
    
    if (!values.author || values.author.trim() === '') {
      newErrors.author = 'Nama penulis harus diisi';
    }
    
    if (!values.status) {
      newErrors.status = 'Status harus dipilih';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const resetForm = () => {
    setValues(initialState);
    setErrors({});
  };

  return { values, setValues, errors, handleChange, validateForm, resetForm };
};