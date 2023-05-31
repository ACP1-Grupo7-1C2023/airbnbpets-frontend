import "../../styles/Login.scss";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { BeatLoader } from 'react-spinners';
import { useState } from "react";
import { Box, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useToast } from '@chakra-ui/react';
import api from "../../api";
import { useAppDispatch, useAppSelector } from "../../state";
import { ImagesPicker } from "../ImagesPicker";
import { logout } from "../../state/actions";
import { MapComponent } from "./MapComponent";
import { reverseGeocode } from "../../utils/geoCoding";

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

export const NewPostModal = ({ isOpen, onClose, onSuccess }: { isOpen: boolean, onClose: () => void, onSuccess: () => void }) => {
  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm<PostInputs>({
    resolver: yupResolver(schema),
  });
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const session = useAppSelector(state => state.auth.session);
  const [homeImages, setHomeImages] = useState<{ images: any[], previews: string[] }>({
    images: [],
    previews: []
  });
  const [petsImages, setPetsImages] = useState<{ images: any[], previews: string[] }>({
    images: [],
    previews: []
  });
  const [position, setPosition] = useState<{ latitude: number, longitude: number }>();

  const onSubmit = async (data: PostInputs) => {
    setLoading(true);
    try {
      const startAt = new Date(data.startAt).toISOString().split('T')[0];
      const finishAt = new Date(data.finishAt).toISOString().split('T')[0];
      const formData = new FormData();
      for (let i = 0; i < homeImages.images.length; i++) {
        formData.append('home', homeImages.images[i]);
      }
      for (let i = 0; i < petsImages.images.length; i++) {
        formData.append('pet', petsImages.images[i]);
      }
      formData.append('hostEmail', session?.email || "");
      formData.append('hostType', session?.type || "");
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('location', data.location);
      formData.append('startAt', startAt);
      formData.append('finishAt', finishAt);
      await api.post('/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${session?.token}`
        }
      });
      reset();
      onSuccess();
      setLoading(false);
      toast({ title: 'Post created successfully!', status: 'success' });
      onClose();
    } catch (error: any) {
      if (error?.response?.status === 401) {
        dispatch(logout());
      } else if (error?.response && error.response.data.detail) {
        toast({ title: error.response.data.detail, status: 'error' });
      } else {
        toast({ title: 'Something went wrong, try again later', status: 'error' });
      }
      setLoading(false);
    }
  };

  const selectImages = async (e: any, type: 'home' | 'pets') => {
    let urls = []
    for (let i = 0; i < e.target.files.length; i++) {
      urls.push(URL.createObjectURL(e.target.files[i]));
    }
    if (type === 'pets') setPetsImages({
      images: e.target.files,
      previews: urls
    })
    else setHomeImages({
        images: e.target.files,
        previews: urls
      })
  }

  return (
    <Modal isCentered onClose={onClose} size="3xl" isOpen={isOpen}>
      <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Post</ModalHeader>
          <ModalCloseButton disabled={loading} />
          <ModalBody mt={8} mb={8}>
            <form className="post_form" onSubmit={(e) => { e.preventDefault() }}>
              <ImagesPicker images={homeImages?.previews} onChanges={(e) => {selectImages(e, "home")}} />
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
              <Box p={16} h={800}>
                <MapComponent position={position} onChangePosition={(position) => {
                  setPosition(position)
                  reverseGeocode(position.latitude, position.longitude).then((res) => {
                    register("location", {
                      value: `${position.latitude}|${position.longitude}|${res}`
                    });
                  })
                }}/>
              </Box>
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
            <Heading size="md" mt={5} mb={2}>Pets</Heading>
            <ImagesPicker images={petsImages?.previews} onChanges={(e) => { selectImages(e, "pets") }} />
            </form>
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
