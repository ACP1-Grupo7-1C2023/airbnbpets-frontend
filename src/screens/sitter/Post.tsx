import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SitterHeader } from "../../components/header/SitterHeader";
import { AlertDialog, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, AspectRatio, Button, Card, CardBody, CardFooter, Center, Container, Divider, Flex, HStack, Heading, Icon, Image, Skeleton, SkeletonText, Text, VStack } from "@chakra-ui/react";
import { MdCalendarMonth, MdLocationPin } from "react-icons/md";
import { parseDate } from "../../utils/date";
import api from "../../api";

type Post = {
  id: number;
  useremail: string;
  usertype: string;
  title: string;
  description: string;
  location: string;
  startat: string;
  finishat: string;
  image: string;
}

export const SitterPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post>();
  const navigate = useNavigate();
  const cancelRef = useRef(null)
  const [error, setError] = useState('');
  const pets = [{
    id: 1,
    name: "Luna",
    image: "https://estaticos-cdn.prensaiberica.es/clip/823f515c-8143-4044-8f13-85ea1ef58f3a_16-9-discover-aspect-ratio_default_0.jpg"
  }, {
    id: 2,
    name: "Michi",
    image: "https://cloudfront-us-east-1.images.arcpublishing.com/infobae/OF3SZKCXHZADLOGT3V5KFAXG4E.png"
  }];

  useEffect(() => {
    const getPosts = async () => {
      const post = await api.get(`/posts/${id}`);
      if (!post.data) {
        setError('No se encontró el post');
        return;
      }
      setPost(post.data);
    };
    getPosts();
  }, [id]);

  if (!post) {
    return (
      <div>
        <SitterHeader />
        <Center>
          <AlertDialog
            isOpen={error !== ''}
            leastDestructiveRef={cancelRef}
            onClose={() => { navigate('/posts'); }}
            isCentered
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize='2xl' fontWeight='bold'>
                  {error}
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <Button ref={cancelRef}  onClick={() => { navigate('/posts'); }}>
                    Volver a la lista
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </Center>
        <VStack mt="50px" ml="50px" mr="50px" mb="50px">
          <Container maxW='md'>
          <Skeleton height="200px" />
        </Container>
        <Container maxW='md'>
          <SkeletonText noOfLines={1} skeletonHeight={8}/>
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
      <VStack mt="50px" ml="50px" mr="50px" mb="50px">
        <Container maxW='md'>
          <Image
            src={post.image}
            borderRadius='lg'
          />
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
        <Divider orientation="horizontal" />
        <Heading size="md">Mascotas</Heading>
        <HStack>
          {pets.map((pet: any) => (
            <Card>
              <CardBody>
                <AspectRatio w="250px" ratio={1}>
                  <Image
                    src={pet.image}
                    borderRadius='lg'
                  />
                </AspectRatio>
              </CardBody>
              <CardFooter>
                <Heading size="md" >
                  {pet.name}
                </Heading>
              </CardFooter>
            </Card>
          ))}
        </HStack>
      </VStack>
    </div>
  );
}