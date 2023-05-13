import "../styles/Login.scss";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { BeatLoader } from 'react-spinners';
import { useState } from "react";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';

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

export const NewPostModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<PostInputs>({
    resolver: yupResolver(schema),
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (data: PostInputs) => {
    console.log(data);
  }

  return (
    <Modal isCentered onClose={onClose} size="3xl" isOpen={isOpen}>
      <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form className="post_form" onSubmit={(e) => { e.preventDefault() }}>
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

            </form>
            {error && <p className="login-error">{error}</p>}
          </ModalBody>
          <ModalFooter>
            <button className="main_button" disabled={loading} onClick={handleSubmit(onSubmit)}>{
              loading ? (
                <BeatLoader color="#fff" />
              ) : 'Post'
            }</button>
          </ModalFooter>
        </ModalContent>
    </Modal>
  );
}
