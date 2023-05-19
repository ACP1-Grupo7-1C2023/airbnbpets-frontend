import '../../styles/Login.scss';
import { useState } from 'react';
import { FaEnvelope, FaLock, FaUserAlt } from "react-icons/fa";
import { Background } from '../../components/Background';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { BeatLoader } from 'react-spinners';
import { useAppDispatch } from '../../state';
import { signup } from '../../state/actions';
import { TypeSwitch } from '../../components/TypeSwitch';
import { UserType } from '../../interfaces/AppInterfaces';

type SignupInputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  repeatPassword: string;
};

const schema = yup.object().shape({
  firstName: yup.string().required('First name is required')
    .min(2, 'First name must be at least 2 characters long'),
  lastName: yup.string().required('Last name is required')
    .min(2, 'Last name must be at least 2 characters long'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required')
    .min(8, 'Password must be at least 8 characters long'),
  repeatPassword: yup.string().required('Repeat password is required')
    .oneOf([yup.ref('password'), ''], 'Passwords must match'),
});

export const Signup = () => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm<SignupInputs>({
    resolver: yupResolver(schema),
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [type, setType] = useState<UserType>(UserType.Sitter);

  const onSubmit = async (data: SignupInputs) => {
    setError('');
    setLoading(true);
    try {
      await dispatch(signup(data.firstName, data.lastName, data.email, data.password, type));
    } catch (error: any) {
      if (error?.code && error.code === 409) {
        setError('Email already in use');
      } else {
        setError('Something went wrong, try again later');
      }
    }
    setLoading(false);
  };

  return <main className="login-container">
    <Background />
    <div className="login-card">
      <h2 className="login-title">Create a new account</h2>
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <div className={errors.firstName ? "login-form-item-error" : "login-form-item"}>
          <FaUserAlt className="login-form-icon"/>
          <input
            className="login-form-input login-form-input-icon"
            type="text"
            placeholder="First name"
            {...register("firstName")}
            maxLength={50} />
        </div>
        {errors.firstName && <p className="login-form-input-error">{errors.firstName.message}</p>}
        <div className={errors.lastName ? "login-form-item-error" : "login-form-item"}>
          <FaUserAlt className="login-form-icon"/>
          <input
            className="login-form-input login-form-input-icon"
            type="text"
            placeholder="Last name"
            {...register("lastName")}
            maxLength={50} />
        </div>
        {errors.lastName && <p className="login-form-input-error">{errors.lastName.message}</p>}
        <div className={errors.email ? "login-form-item-error" : "login-form-item"}>
          <FaEnvelope className="login-form-icon"/>
          <input
            className="login-form-input login-form-input-icon"
            type="text"
            placeholder="Email"
            {...register("email")}
            maxLength={50} />
        </div>
        {errors.email && <p className="login-form-input-error">{errors.email.message}</p>}
        <div className={errors.password ? "login-form-item-error" : "login-form-item"}>
          <FaLock className="login-form-icon"/>
          <input
            className="login-form-input login-form-input-icon"
            type="password"
            placeholder="Password"
            {...register("password")}
            maxLength={50} />
        </div>
        {errors.password && <p className="login-form-input-error">{errors.password.message}</p>}
        <div className={errors.repeatPassword ? "login-form-item-error" : "login-form-item"}>
          <FaLock className="login-form-icon"/>
          <input
            className="login-form-input login-form-input-icon"
            type="password"
            placeholder="Repeat password"
            {...register("repeatPassword")}
            maxLength={50} />
        </div>
        {errors.repeatPassword && <p className="login-form-input-error">{errors.repeatPassword.message}</p>}
        <div className="login-form-type">
          <p className="login-form-type-label">I want to be a {type === 'petSitter' ? 'Pet sitter' : 'Host'}</p>
          <TypeSwitch type={type} setType={setType} />
        </div>
        {error && <p className="login-error">{error}</p>}
        <button type="submit" className="login-btn" disabled={loading}>{
          loading ? (
            <BeatLoader color="#fff" />
          ) : 'Signup'
        }</button>
      </form>
      <p className="login-link">Already have an account?
        <span><a href="/login">Login</a></span>
      </p>
    </div>
  </main>
};
