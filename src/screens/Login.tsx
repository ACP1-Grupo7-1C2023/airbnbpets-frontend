import { useState } from 'react';
import '../styles/Login.scss';
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Background } from '../components/Background';
import { useAppDispatch } from '../state';
import { login } from '../state/actions';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { BeatLoader } from 'react-spinners';

type LoginInputs = {
  email: string;
  password: string;
};

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required')
});

export const Login = () => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginInputs>({
    resolver: yupResolver(schema),
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (data: LoginInputs) => {
    setError('');
    setLoading(true);
    try {
      await dispatch(login(data.email, data.password));
    } catch (error: any) {
      if (error?.code && error.code === 404) {
        setError('Incorrect email or password');
      } else {
        setError('Something went wrong, try again later');
      }
    }
    setLoading(false);
  };

  return <main className="login-container">
    <Background />
    <div className="login-card">
      <h2 className="login-title">Log in to your account</h2>
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <div className={errors.email ? "login-form-item-error" : "login-form-item"}>
          <FaEnvelope className="login-form-icon"/>
          <input className="login-form-input" type="text" placeholder="Email" {...register("email")} maxLength={50} />
        </div>
        {errors.email && <p className="login-form-input-error">{errors.email.message}</p>}
        <div className={errors.password ? "login-form-item-error" : "login-form-item"}>
          <FaLock className="login-form-icon"/>
          <input className="login-form-input" type="password" placeholder="Password" {...register("password")} maxLength={50} />
        </div>
        {errors.password && <p className="login-form-input-error">{errors.password.message}</p>}
        {error && <p className="login-error">{error}</p>}
        <button type="submit" className="login-btn" disabled={loading}>{
          loading ? (
            <BeatLoader color="#fff" />
          ) : 'Login'
        }</button>
      </form>
      <p className="login-link">Don't have an account?
        <span><a href="/signup">Sign Up</a></span>
      </p>
    </div>
  </main>
};
