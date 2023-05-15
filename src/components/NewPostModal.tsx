import "../styles/Login.scss";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { BeatLoader } from 'react-spinners';
import { useState } from "react";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useToast } from '@chakra-ui/react';
import api from "../api";
import { useAppSelector } from "../state";

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
  startAt: yup.date().required('Start date is required'),
  finishAt: yup.date().required('Finish date is required')
});

export const NewPostModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm<PostInputs>({
    resolver: yupResolver(schema),
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const toast = useToast();
  const session = useAppSelector(state => state.auth.session);

  const onSubmit = async (data: PostInputs) => {
    setLoading(true);
    if (!session) {
      setError('You must be logged in to post');
      setLoading(false);
      return;
    }
    try {
      const startAt = new Date(data.startAt).toISOString().split('T')[0];
      const finishAt = new Date(data.finishAt).toISOString().split('T')[0];
      await api.post('/posts', {
        userEmail: session.email,
        userType: session.type,
        ...data,
        startAt,
        finishAt
      });
      reset();
      setLoading(false);
      toast({ title: 'Post created successfully!', status: 'success' });
      onClose();
    } catch (error) {
      setLoading(false);
      setError('Something went wrong, try again later');
    }
  };

  return (
    <Modal isCentered onClose={onClose} size="3xl" isOpen={isOpen}>
      <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Post</ModalHeader>
          <ModalCloseButton disabled={loading} />
          <ModalBody>
            <form className="post_form" onSubmit={(e) => { e.preventDefault() }}>
              <Text ml={1} color="#535657">Title</Text>
              <div className={errors.title ? "login-form-item-error" : "login-form-item"}>
                <input
                  className="login-form-input"
                  type="text"
                  placeholder="Enter post title"
                  {...register("title")}
                  maxLength={30}
                />
              </div>
              {errors.title && <p className="login-form-input-error">{errors.title.message}</p>}

              <Text ml={1} color="#535657">Description</Text>
              <div className={errors.description ? "login-form-item-error" : "login-form-item"}>
                <input
                  className="login-form-input"
                  placeholder="Enter post description"
                  maxLength={200}
                  {...register("description")}
                />
              </div>
              {errors.description && <p className="login-form-input-error">{errors.description.message}</p>}
    
              <Text ml={1} color="#535657">Location</Text>
              <div className={errors.location ? "login-form-item-error" : "login-form-item"}>
                <input
                  className="login-form-input"
                  type="text"
                  placeholder="Enter city"
                  {...register("location")}
                  maxLength={30}
                />
              </div>
              {errors.location && <p className="login-form-input-error">{errors.location.message}</p>}
    
              <Text ml={1} color="#535657">Start date</Text>
              <div className={errors.startAt ? "login-form-item-error" : "login-form-item"}>
                <input
                  className="login-form-input"
                  type="date"
                  {...register("startAt")}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              {errors.startAt && <p className="login-form-input-error">{errors.startAt.message}</p>}
    
              <Text ml={1} color="#535657">Finish date</Text>
              <div className={errors.finishAt ? "login-form-item-error" : "login-form-item"}>
                <input
                  className="login-form-input"
                  type="date"
                  {...register("finishAt")}
                  min={watch('startAt')}
                />
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
