import { useNavigate, useParams } from "react-router-dom";
import { HostHeader } from "../../components/header/HostHeader";
import { useEffect, useState } from "react";
import { Accordion, Card, Container, Flex, Heading, Icon, Skeleton, SkeletonText, Text, VStack } from "@chakra-ui/react";
import api from "../../api";
import { ErrorAlert } from "../../components/ErrorAlert";
import { MdCalendarMonth, MdLocationPin } from "react-icons/md";
import { parseDate } from "../../utils/date";
import { Applications, Post } from "../../interfaces/AppInterfaces";
import { PetsSection } from "../../components/post/PetsSection";
import { ApplicationsSection } from "../../components/post/ApplicationsSection";
import { ImagesGallery } from "../../components/ImagesGallery";
import { FaArrowLeft } from "react-icons/fa";
import "../../styles/Post.scss";

export const HostPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post>();
  const [applicants, setApplicants] = useState<Applications[]>([]);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  useEffect(() => {
    const getPosts = async () => {
      try {
        const post = await api.get(`/posts/${id}`);
        setPost(post.data);
      } catch (error: any) {
        if (error.response.data.detail && typeof error.response.data.detail === 'string') {
          setError(error.response.data.detail);
        } else {
          setError('Something went wrong, try again later');
        }
      }
    };

    const getApplicants = async () => {
      try {
        const applicants = await api.get(`/applications/${id}`);
        setApplicants(applicants.data);
      } catch (error: any) {
        if (error.response.data.detail && typeof error.response.data.detail === 'string') {
          setError(error.response.data.detail);
        } else {
          setError('Something went wrong, try again later');
        }
      }
    };
    getPosts();
    getApplicants();
  }, [id]);

  if (!post) {
    return (
      <div>
        <HostHeader />
        <ErrorAlert error={error} onClose={() => { setError(''); navigate(-1); }} />
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
    <div className="single_post_container">
      <HostHeader />
      <ErrorAlert error={error} onClose={() => { setError(''); navigate(-1); }} />
      <Card w="1000px" my={6}>
        <button style={{ position: 'absolute', top: '20px', left: '20px' }} onClick={() => { navigate(-1); }}>
          <Icon as={FaArrowLeft} />
        </button>
        <VStack mt="50px" ml="50px" mr="50px" mb="50px">
          {post.homeUrls.length > 0 && (
            <Container maxW='md'>
              <ImagesGallery images={post.homeUrls} />
            </Container>
          )}
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
          {post.petUrls.length > 0 && <PetsSection pets={post.petUrls} />}
          <ApplicationsSection applicants={applicants} postId={post.id} />
        </Accordion>
      </Card>
    </div>
  );
}