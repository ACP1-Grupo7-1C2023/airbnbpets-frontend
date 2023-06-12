import { useNavigate, useParams } from "react-router-dom";
import { HostHeader } from "../../components/header/HostHeader";
import { useEffect, useState } from "react";
import { Accordion, Button, Card, Container, Flex, Heading, Icon, Skeleton, SkeletonText, Stack, Text, VStack, useDisclosure } from "@chakra-ui/react";
import api from "../../api";
import { ErrorAlert } from "../../components/ErrorAlert";
import { MdCalendarMonth, MdLocationPin, MdPerson } from "react-icons/md";
import { parseDate } from "../../utils/date";
import { Applications, Post, Qualification } from "../../interfaces/AppInterfaces";
import { PetsSection } from "../../components/post/PetsSection";
import { ApplicationsSection } from "../../components/post/ApplicationsSection";
import { ImagesGallery } from "../../components/ImagesGallery";
import { FaArrowLeft } from "react-icons/fa";
import "../../styles/Post.scss";
import { Stars } from "../../components/rating/Stars";
import { QualificationsModal } from "../../components/rating/QualificationsModal";
import { PetTypeBadge } from "../../components/PetTypeBadge";

export const HostPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post>();
  const [qualifications, setQualifications] = useState<Qualification[]>([]);
  const {
    isOpen: isOpenHostQualification,
    onOpen: onOpenHostQualification,
    onClose: onCloseHostQualification } = useDisclosure();
  const [applicants, setApplicants] = useState<Applications[]>([]);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  useEffect(() => {
    const getPosts = async () => {
      try {
        const post = await api.get(`/posts/${id}`);
        const qualis = await api.get(`/qualifications/host?email=${post.data.hostEmail}`);
        setQualifications(qualis.data);
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

  const newQualification = (score: number, rating: string) => {
    console.log(score, rating);
    onCloseHostQualification();
  }


  if (!post) {
    return (
      <div className="single_post_container">
        <HostHeader />
        <ErrorAlert error={error} onClose={() => { setError(''); navigate(-1); }} />
        <VStack w="1000px" mt="50px" ml="50px" mr="50px" mb="50px">
          <Flex flexDirection="row" gap="50px">
            <Skeleton height="250px" w="400px" />
            <Flex flexDirection="column">
              <SkeletonText noOfLines={1} skeletonHeight="36px" />
              <SkeletonText mt='4' noOfLines={1} skeletonHeight="24px" />
              <Flex direction='row' align='center' gap={2} mt="20px">
                <Icon as={MdLocationPin} />
                <SkeletonText w="100px" noOfLines={1} skeletonHeight={2} />
              </Flex>
              <Flex direction='row' align='center' gap={2} mt="10px">
                <Icon as={MdCalendarMonth} />
                <Text>
                  <SkeletonText w="200px" noOfLines={1} skeletonHeight={2} />
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </VStack>
      </div>
    )
  }

  return (
    <div className="single_post_container">
      <HostHeader />
      <ErrorAlert error={error} onClose={() => { setError(''); navigate(-1); }} />
      <QualificationsModal
        isOpen={isOpenHostQualification}
        onClose={onCloseHostQualification}
        qualifications={qualifications}
        onNewQualification={newQualification}
      />
      <Card w="1200px" my={6}>
        <button style={{ position: 'absolute', top: '20px', left: '20px' }} onClick={() => { navigate(-1); }}>
          <Icon as={FaArrowLeft} />
        </button>
        <VStack mt="50px" ml="50px" mr="50px" mb="50px">
          <Flex flexDirection="row" gap="50px">
            {post.homeUrls.length > 0 && (
              <Container maxW='md'>
                <ImagesGallery images={post.homeUrls} />
              </Container>
            )}
            <Container flex={1} m="0px">
              <Heading size="lg">{post.title}</Heading>
              <Text>{post.description}</Text>
              <Stack mt={4} spacing={4} direction='row'>
                {post.pets.map((pet) => (
                  <PetTypeBadge type={pet} />
                ))}
              </Stack>
              <Flex direction='row' align='center' gap={2} mt="20px">
                <Icon as={MdPerson} />
                <Text>
                  {post.hostEmail}
                </Text>
                {qualifications.length > 0 && (
                  <Stars score={Math.floor(qualifications.reduce((acc, curr) => acc + curr.score, 0) / qualifications.length)} />
                )}
                <Button colorScheme="teal" size="sm" onClick={onOpenHostQualification}>Ratings</Button>
              </Flex>
              <Flex direction='row' align='center' gap={2} mt="4px">
                <Icon as={MdLocationPin} />
                <Text>
                  {post.location.split("|")[2] || post.location.split("|")[1] || post.location.split("|")[0]}
                </Text>
              </Flex>
              <Flex direction='row' align='center' gap={2} mt="4px">
                <Icon as={MdCalendarMonth} />
                <Text>
                  {parseDate(post.startAt)} - {parseDate(post.finishAt)}
                </Text>
              </Flex>
            </Container>
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