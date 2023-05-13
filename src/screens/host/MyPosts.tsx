import { useState } from "react";
import "../../styles/PostHost.scss";
import "../../styles/Login.scss";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { BeatLoader } from 'react-spinners';
import { HostHeader } from "../../components/header/HostHeader";

type PostInputs = {
  title: string;
  description: string;
  location: string;
  startAt: string;
  finishAt: string;
};

const schema = yup.object().shape({
  title: yup.string().required('Title is required').min(5, 'Title must be at least 5 characters'),
  description: yup.string().required('Description is required').min(10, 'Description must be at least 10 characters'),
  location: yup.string().required('Location is required'),
  startAt: yup.string().required('Start date is required'),
  finishAt: yup.string().required('Finish date is required')
});


export const MyPosts = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<PostInputs>({
    resolver: yupResolver(schema),
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (data: PostInputs) => {
    console.log(data);
  }

  return (
    <div className="post_host_container">
      <HostHeader />
      <div className="post_host_content">
        <h1 className="post_host_title">Make a post</h1>
        <form className="post_host_form" onSubmit={handleSubmit(onSubmit)}>

          <div className={errors.title ? "login-form-item-error" : "login-form-item"}>
            <input className="login-form-input" type="text" placeholder="Title" {...register("title")} maxLength={30} />
          </div>
          {errors.title && <p className="login-form-input-error">{errors.title.message}</p>}

          <div className={errors.description ? "login-form-item-error" : "login-form-item"}>
            <input
              className="login-form-input"
              placeholder="Description"
              maxLength={200}
              {...register("description")}
            />
          </div>
          {errors.description && <p className="login-form-input-error">{errors.description.message}</p>}

          <div className={errors.location ? "login-form-item-error" : "login-form-item"}>
            <input className="login-form-input" type="text" placeholder="Location" {...register("location")} maxLength={30} />
          </div>
          {errors.location && <p className="login-form-input-error">{errors.location.message}</p>}

          <div className={errors.startAt ? "login-form-item-error" : "login-form-item"}>
            <input className="login-form-input" type="text" placeholder="Start date" {...register("startAt")} maxLength={10} />
          </div>
          {errors.startAt && <p className="login-form-input-error">{errors.startAt.message}</p>}

          <div className={errors.finishAt ? "login-form-item-error" : "login-form-item"}>
            <input className="login-form-input" type="text" placeholder="Finish date" {...register("finishAt")} maxLength={10} />
          </div>
          {errors.finishAt && <p className="login-form-input-error">{errors.finishAt.message}</p>}

          {error && <p className="login-error">{error}</p>}
          <div className="post_host_submit_container">
            <button type="submit" className="main_button" disabled={loading}>{
              loading ? (
                <BeatLoader color="#fff" />
              ) : 'Submit'
            }</button>
          </div>
        </form>
      </div>
    </div>
  );
}
