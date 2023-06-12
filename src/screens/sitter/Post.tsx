import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SitterHeader } from "../../components/header/SitterHeader";
import { Accordion, Button, Card, Container, Flex, Heading, Icon, Skeleton, SkeletonText, Stack, Text, VStack, useDisclosure, useToast } from "@chakra-ui/react";
import { MdCalendarMonth, MdLocationPin, MdPerson } from "react-icons/md";
import { parseDate } from "../../utils/date";
import api from "../../api";
import { useAppDispatch, useAppSelector } from "../../state";
import { logout } from "../../state/actions";
import { ErrorAlert } from "../../components/ErrorAlert";
import { Post, Qualification } from "../../interfaces/AppInterfaces";
import { PetsSection } from "../../components/post/PetsSection";
import { ImagesGallery } from "../../components/ImagesGallery";
import { FaArrowLeft } from "react-icons/fa";
import { QualificationsModal } from "../../components/rating/QualificationsModal";
import { Stars } from "../../components/rating/Stars";
import { PetTypeBadge } from "../../components/PetTypeBadge";

export const SitterPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post>();
  const [qualifications, setQualifications] = useState<Qualification[]>([]);
  const { 
    isOpen: isOpenHostQualification,
    onOpen: onOpenHostQualification,
    onClose: onCloseHostQualification } = useDisclosure();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [error, setError] = useState('');
  const session = useAppSelector(state => state.auth.session);
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [applied, setApplied] = useState(false);

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
    getPosts();
  }, [id]);

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
      toast({ title: "Applied successfully", status: "success" });
      setApplied(true);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      if (error?.response && error.response.data.code === 401) {
        dispatch(logout());
      } else if (error?.response?.data?.name === "ApplicationAlreadyError") {
        toast({ title: "You already applied to this post", status: "error" });
      } else if (error?.response && error.response.data.detail) {
        toast({ title: error.response.data.detail, status: "error" });
      } else {
        toast({ title: "Something went wrong, try again later", status: "error" });
      }
    }
  }

  const newQualification = async (score: number, rating: string, tip: number) => {
    try {
      setLoading(true);
      await api.post("/qualify/user", {
        "postId": id,
        rating,
        score,
        tip,
        type: "host",
        hostEmail: post?.hostEmail,
        petSitterEmail: session?.email,
      }, {
        headers: {
          Authorization: `Bearer ${session?.token}`
        }
      })
      toast({ title: "Rating added successfully", status: "success" });
      const qualis = await api.get(`/qualifications/host?email=${post?.hostEmail}`);
      setQualifications(qualis.data);
      onCloseHostQualification();
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      if (error?.response && error.response.data.name === "UserNotAllowedToQualifyError") {
        toast({ title: "You are not allowed to qualify this post", status: "error" });
      } else if (error?.response && error.response.data.code === 401) {
        dispatch(logout());
      } else {
        toast({ title: "Something went wrong, try again later", status: "error" });
      }
    }
  }

  const applicantsText = () => {
    let applicants = post?.applicants || 0;
    if (applied) {
      applicants++;
    }
    if (applicants === 0) {
      return "Be the first to apply!";
    }
    if (applicants === 1) {
      return "1 applicant";
    }
    return applicants ? `${applicants} applicants` : "";
  }

  const isActive = (currentPost: Post) => {
    if (currentPost.status === 'active'){
      return (
        <>
          <Text>{applicantsText()}</Text>
          <Button colorScheme="green" size="lg" isLoading={loading} onClick={apply} isDisabled={applied}>
            {applied ? 'Applied' : 'Apply'}
          </Button>
        </>
    )}
    if (currentPost.applicantEmail === session?.email) {
      return (
        <Text fontSize="md" color="green.500">
          Your application was accepted
        </Text>
      );
    }

    return (
      <Text fontSize="md" color="red.500">
        Your application was rejected
      </Text>
    );
  }

  if (!post) {
    return (
      <div className="single_post_container">
        <SitterHeader />
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
      <SitterHeader />
      <ErrorAlert error={error} onClose={() => { setError(''); navigate(-1); }} />
      <QualificationsModal
        isOpen={isOpenHostQualification}
        onClose={onCloseHostQualification}
        qualifications={qualifications}
        onNewQualification={newQualification}
        loading={loading}
        canAdd={post.applicantEmail === session?.email}
      />
      <Card w="1200px" my={6}>
        <button style={{ position: 'absolute', top: '20px', left: '20px' }} onClick={() => { navigate(-1); }}>
          <Icon as={FaArrowLeft} />
        </button>
        <VStack mt="50px" ml="50px" mr="50px" mb="50px">
          <Flex flexDirection="row" gap="50px">
            {post.homeUrls.length > 0 && (
              <Container maxW='400px'>
                <ImagesGallery images={post.homeUrls} />
              </Container>
            )}
            <Container flex={1} m="0px">
              <Heading size="lg">{post.title}</Heading>
              <Text mt="4px">{post.description}</Text>
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
        <Accordion defaultIndex={[0]} allowMultiple>
          {post.petUrls.length > 0 && (
            <PetsSection pets={post.petUrls} />
          )}
        </Accordion>
        <Flex p={4} justifyContent="flex-end" alignItems="center" gap={4}>
          {isActive(post)}
        </Flex>
      </Card>
    </div>
  );
}