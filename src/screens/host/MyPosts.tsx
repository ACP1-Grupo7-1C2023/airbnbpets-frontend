import "../../styles/Post.scss";
import { useEffect, useState } from "react";
import { HostHeader } from "../../components/header/HostHeader";
import { Flex, Skeleton, Stack, Text } from "@chakra-ui/react";
import Icon from '@chakra-ui/icon';
import { HiOutlinePlus } from 'react-icons/hi';
import { NewPostModal } from "../../components/post/NewPostModal";
import api from "../../api";
import { useAppDispatch, useAppSelector } from "../../state";
import { logout } from "../../state/actions";
import { ShowError } from "../../components/ShowError";
import { PostItemHost, PostsList } from "../../components/post/PostItemHost";

export const MyPosts = () => {
  const [posts, setPosts] = useState<PostsList>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState('');
  const session = useAppSelector(state => state.auth.session);
  const dispatch = useAppDispatch();

  const onPostClick = () => {
    setModalVisible(true);
  }

  const onModalClose = () => {
    setModalVisible(false);
  }

  const getMyPosts = async () => {
    setLoading(true);
    if (!session) {
      setError('You must be logged in to view your posts');
      setLoading(false);
      return;
    }
    try {
      const response = await api.get<PostsList>('/my-posts', { headers: { Authorization: `Bearer ${session.token}` } });
      setPosts(response.data);
      setLoading(false);
    } catch (error: any) {
      if (error?.response && error.response.data.code === 401) {
        dispatch(logout());
      } else {
        if (error.response.data.detail && typeof error.response.data.detail === 'string') {
          setError(error.response.data.detail);
        } else {
          setError('Something went wrong, try again later');
        }
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    getMyPosts();
  }, [session, dispatch]);

  if (loading) {
    return (
      <div className="post_container">
        <HostHeader />
        <div className="post_list_container">
          <Stack w="800px" h="100%" spacing="4" overflow="hidden">
            <Skeleton h='200px' />
            <Skeleton h='200px' />
            <Skeleton h='200px' />
            <Skeleton h='200px' />
            <Skeleton h='200px' />
          </Stack>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="post_container">
        <HostHeader />
        <ShowError error={error} />
      </div>
    );
  }

  return (
    <div className="post_container">
      <HostHeader />
      <div className="post_list_container">
        {posts.length === 0 && (
          <div className="post_empty">
            <Text fontSize='lg' colorScheme='grey'>You haven't made any posts yet</Text>
          </div>
        )}
        {posts.map((post) => (
          <PostItemHost key={post.id} post={post} />
        ))}
      </div>
      <button className="main_button post_add_post_button" onClick={onPostClick}>
        <Flex direction='row' align='center' gap={1}>
          <Icon as={HiOutlinePlus} />
          <Text>
            New Post
          </Text>
        </Flex>
      </button>
      <NewPostModal isOpen={modalVisible} onClose={onModalClose} onSuccess={getMyPosts} />
    </div>
  );
}
