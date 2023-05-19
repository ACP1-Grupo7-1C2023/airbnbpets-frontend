import { useEffect, useState } from "react";
import { Skeleton, Stack, Text } from "@chakra-ui/react";
import { SitterHeader } from "../../components/header/SitterHeader";
import { PostItem, PostsList } from "../../components/PostItem";
import api from "../../api";
import { ShowError } from "../../components/ShowError";
import { useAppDispatch } from "../../state";
import { logout } from "../../state/actions";
import "../../styles/Post.scss";

export const MyApplications = () => {
  const [posts, setPosts] = useState<PostsList>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);
      try {
        const response = await api.get<PostsList>('/posts');
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

    getPosts();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="post_container">
        <SitterHeader />
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
        <SitterHeader />
        <ShowError error={error} />
      </div>
    );
  }

  return (
    <div className="post_container">
      <SitterHeader />
      <div className="post_list_container">
        {posts.length === 0 && (
          <div className="post_empty">
            <Text fontSize='lg' colorScheme='grey'>You haven't made any applications yet</Text>
          </div>
        )}
        {posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
