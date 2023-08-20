import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputField from '../../component/InputField/InputField';

const schema = yup.object().shape({
  email: yup.string().required('Email is required').email('Invalid email'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
});

const Index = () => {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
    // Here, you can implement your authentication logic
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputField label="Email" type="text" name="email" placeholder="Enter your email" register={register} error={errors?.email} />
      <InputField label="Password" type="password" name="password" placeholder="Enter your password" register={register} error={errors?.password} />
      <button type="submit">Login</button>
    </form>
  );
};

export default Index;
