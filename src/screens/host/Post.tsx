import { useNavigate, useParams } from "react-router-dom";
import { HostHeader } from "../../components/header/HostHeader";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../state";
import { Accordion, Container, Flex, Heading, Icon, Skeleton, SkeletonText, Text, VStack } from "@chakra-ui/react";
import api from "../../api";
import { logout } from "../../state/actions";
import { ErrorAlert } from "../../components/ErrorAlert";
import { MdCalendarMonth, MdLocationPin } from "react-icons/md";
import { parseDate } from "../../utils/date";
import { Applications, Post } from "../../interfaces/AppInterfaces";
import { PetsSection } from "../../components/post/PetsSection";
import { ApplicationsSection } from "../../components/post/ApplicationsSection";
import { ImagesGallery } from "../../components/ImagesGallery";

export const HostPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post>();
  const [applicants, setApplicants] = useState<Applications[]>([]);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [error, setError] = useState('');

  useEffect(() => {
    const getPosts = async () => {
      try {
        const post = await api.get(`/posts/${id}`);
        setPost(post.data);
      } catch (error: any) {
        if (error?.response && error.response.data.code === 401) {
          dispatch(logout());
        } else {
          setError(error.response.data.detail ?? 'Something went wrong, try again later');
        }
      }
    };

    const getApplicants = async () => {
      try {
        const applicants = await api.get(`/applications/${id}`);
        setApplicants(applicants.data);
      } catch (error: any) {
        if (error?.response && error.response.data.code === 401) {
          dispatch(logout());
        } else {
          setError(error.response.data.detail ?? 'Something went wrong, try again later');
        }
      }
    };
    getPosts();
    getApplicants();
  }, [id, dispatch]);

  if (!post) {
    return (
      <div>
        <HostHeader />
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
      <HostHeader />
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
            {parseDate(post.startAt)} - {parseDate(post.finishAt)}
          </Text>
        </Flex>
      </VStack>
      <Accordion defaultIndex={[0, 1]} allowMultiple>
        <PetsSection pets={post.petUrls} />
        <ApplicationsSection applicants={applicants} />
      </Accordion>
    </div>
  );
}