import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SitterHeader } from "../../components/header/SitterHeader";
import { Accordion, Button, Container, Flex, Heading, Icon, Skeleton, SkeletonText, Text, VStack, useToast } from "@chakra-ui/react";
import { MdCalendarMonth, MdLocationPin } from "react-icons/md";
import { parseDate } from "../../utils/date";
import api from "../../api";
import { useAppDispatch, useAppSelector } from "../../state";
import { logout } from "../../state/actions";
import { ErrorAlert } from "../../components/ErrorAlert";
import { Post } from "../../interfaces/AppInterfaces";
import { PetsSection } from "../../components/post/PetsSection";
import { ImagesGallery } from "../../components/ImagesGallery";

export const SitterPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [error, setError] = useState('');
  const session = useAppSelector(state => state.auth.session);
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const post = await api.get(`/posts/${id}`);
        setPost(post.data);
      } catch (error: any) {
        console.log(error);
        if (error?.code && error.code === 401) {
          dispatch(logout());
        } else {
          setError(error.response.data.detail ?? 'Something went wrong, try again later');
        }
      }
    };
    getPosts();
  }, [id, dispatch]);

  const apply = async () => {
    try {
      setLoading(true);
      await api.post("/apply", {
        "postId": id,
        "userEmail": session?.email,
        "userType": session?.type,
      }, {
        headers: {
          Authorization: `Bearer ${session?.token}`
        }
      });
      toast({
        title: "Applied successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setLoading(false);
    } catch (error: any) {
      console.log(error);
      setLoading(false);
      if (error?.code && error.code === 401) {
        dispatch(logout());
      } else if (error?.response?.data?.name === "ApplicationAlreadyError") {
        toast({
          title: "You already applied to this post",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Something went wrong, try again later",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  }

  if (!post) {
    return (
      <div>
        <SitterHeader />
        <ErrorAlert error={error} onClose={() => { setError(''); navigate('/posts'); }} />
        <VStack mt="50px" ml="50px" mr="50px" mb="50px">
          <Container maxW='md'>
            <Skeleton height="200px" />
          </Container>
          <Container maxW='md'>
            <SkeletonText noOfLines={1} skeletonHeight={8} />
            <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
          </Container>
          <Flex direction='row' align='center' gap={2}>
            <Icon as={MdLocationPin} />
            <SkeletonText w="100px" noOfLines={1} skeletonHeight={2} />
          </Flex>
          <Flex direction='row' align='center' gap={2}>
            <Icon as={MdCalendarMonth} />
            <Text>
              <SkeletonText w="200px" noOfLines={1} skeletonHeight={2} />
            </Text>
          </Flex>
        </VStack>
      </div>
    )
  }

  return (
    <div>
      <SitterHeader />
      <ErrorAlert error={error} onClose={() => { setError(''); navigate('/posts'); }} />
      <VStack mt="50px" ml="50px" mr="50px" mb="50px">
        <Container maxW='md'>
          <ImagesGallery images={post.homeUrls} />
        </Container>
        <Heading size="lg">{post.title}</Heading>
        <Text>{post.description}</Text>
        <Flex direction='row' align='center' gap={2}>
          <Icon as={MdLocationPin} />
          <Text>
            {post.location}
          </Text>
        </Flex>
        <Flex direction='row' align='center' gap={2}>
          <Icon as={MdCalendarMonth} />
          <Text>
            {parseDate(post.startat)} - {parseDate(post.finishat)}
          </Text>
        </Flex>
      </VStack>
      <Accordion defaultIndex={[0]} allowMultiple>
        <PetsSection pets={post.petUrls} />
      </Accordion>
      <Flex p={4} justifyContent="center" gap={4}>
        <Button colorScheme="red" size="lg" onClick={() => { navigate('/posts'); }}>
          Go back
        </Button>
        <Button colorScheme="green" size="lg" isLoading={loading} onClick={apply}>
          Apply
        </Button>
      </Flex>
    </div>
  );
}