import { useEffect, useState } from "react";
import { Button, Flex, FormControl, FormLabel, Input, Skeleton, Stack, Text } from "@chakra-ui/react";
import { SitterHeader } from "../../components/header/SitterHeader";
import "../../styles/Post.scss";
import { PostItem, PostsList } from "../../components/PostItem";
import api from "../../api";
import { ShowError } from "../../components/ShowError";
import "../../styles/Search.scss"

type Filters = {
  location: string;
  startAt: string;
  finishAt: string;
}

export const PostList = () => {
  const [posts, setPosts] = useState<PostsList>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState<Filters>({
    location: '',
    startAt: '',
    finishAt: ''
  });
  const [currentFilters, setCurrentFilters] = useState<Filters>({
    location: '',
    startAt: '',
    finishAt: ''
  });

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);
      try {
        const response = await api.get<PostsList>('/posts');
        setPosts(response.data);
        setLoading(false);
      } catch (error: any) {
        setError(error.response.data.detail ?? 'Something went wrong, try again later');
        setLoading(false);
      }
    }

    getPosts();
  }, []);

  if (loading) {
    return (
      <div className="post_container">
        <SitterHeader />
        <div className="post_list_container">
          <Flex
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb="4"
            gap="4"
            borderRadius="16"
            p="8"
            bg="#ffffff"
            shadow="sm"
          >
            <FormControl isDisabled>
              <FormLabel>Start Date</FormLabel>
              <Input type="date"/>
            </FormControl>
            <FormControl isDisabled>
              <FormLabel>End Date</FormLabel>
              <Input type="date" />
            </FormControl>
            <FormControl isDisabled>
              <FormLabel>Location</FormLabel>
              <Input type="text" placeholder="Location" />
            </FormControl>
            <Button isDisabled size="lg" pt="4" pb="4" pl="8" pr="8" colorScheme="blue">Search</Button>
          </Flex>
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
            <Text fontSize='lg' colorScheme='grey'>There aren't any posts yet</Text>
          </div>
        )}
        <Flex
          direction="column"
          gap="4"
          mb="4"
          borderRadius="16"
          py="6"
          px="8"
          bg="#ffffff"
          shadow="sm"
        >
          <Flex
            alignItems="center" justifyContent="space-between" gap="4">
            <FormControl>
              <FormLabel>Start Date</FormLabel>
              <Input onChange={(e) => {
                setFilters({
                  ...filters,
                  startAt: e.target.value
                })
              }} type="date" />
            </FormControl>
            <FormControl>
              <FormLabel>End Date</FormLabel>
              <Input onChange={(e) => {
                setFilters({
                  ...filters,
                  finishAt: e.target.value
                })
              }} type="date" /> 
            </FormControl>
            <FormControl>
              <FormLabel>Location</FormLabel>
              <Input onChange={(e) => {
                setFilters({
                  ...filters,
                  location: e.target.value
                })
              }} type="text" placeholder="Location" />
            </FormControl>
          </Flex>
          <Button w="100%" size="md" pt="4" pb="4" pl="8" pr="8" onClick={() => {
            setCurrentFilters({ ...filters });
          }} colorScheme="blue">Search</Button>
        </Flex>
        {posts
          .filter((post) => (currentFilters.location !== "")
            ? post.location.toLowerCase().includes(currentFilters.location.toLocaleLowerCase())
            : true)
          .filter((post) => (currentFilters.startAt !== "") ? post.startat.split('T')[0] === currentFilters.startAt : true)
          .filter((post) => (currentFilters.finishAt !== "") ? post.finishat.split('T')[0] === currentFilters.finishAt : true)
          .map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
