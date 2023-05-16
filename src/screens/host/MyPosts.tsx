import "../../styles/Post.scss";
import { useEffect, useState } from "react";
import { HostHeader } from "../../components/header/HostHeader";
import { PostItem, PostsList } from "../../components/PostItem";
import { Flex, Skeleton, Stack, Text } from "@chakra-ui/react";
import Icon from '@chakra-ui/icon';
import { HiOutlinePlus } from 'react-icons/hi';
import { NewPostModal } from "../../components/NewPostModal";
import api from "../../api";
import { useAppDispatch, useAppSelector } from "../../state";
import { logout } from "../../state/actions";
import { ShowError } from "../../components/ShowError";

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

  useEffect(() => {
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
          setError(error.response.data.detail ?? 'Something went wrong, try again later');
          setLoading(false);
        }
      }
    }

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
          <PostItem key={post.id} post={post} />
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
      <NewPostModal isOpen={modalVisible} onClose={onModalClose} />
    </div>
  );
}
