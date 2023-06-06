import { Button, Center, Divider, Flex, Icon, Modal,
  ModalBody, ModalCloseButton, ModalContent, ModalFooter,
  ModalHeader, ModalOverlay, Spinner, Text, Textarea, VStack, useToast } from "@chakra-ui/react";
import { Qualification } from "../../interfaces/AppInterfaces";
import { Stars } from "./Stars";
import { useEffect, useState } from "react";
import { MdAdd, MdRemove } from "react-icons/md";
import api from "../../api";
import { useAppDispatch, useAppSelector } from "../../state";
import { logout } from "../../state/actions";

type Props = {
  postId: number;
  onClose: () => void;
  sitterEmail: string | null;
  canAdd?: boolean;
}

export const SitterRatingModal = ({ postId, onClose, sitterEmail, canAdd = true }: Props) => {
  const [score, setScore] = useState(3);
  const [rating, setRating] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingPost, setLoadingPost] = useState(false);
  const [ratings, setRatings] = useState<Qualification[]>([]);
  const session = useAppSelector(state => state.auth.session);
  const dispatch = useAppDispatch();
  const toast = useToast();

  useEffect(() => {
    const getRatings = async () => {
      try {
        const resp = await api.get(`/qualifications/petSitter?email=${sitterEmail}`);
        setRatings(resp.data);
        setLoading(false);
      } catch (error) {
        toast({ title: "Something went wrong, try again later", status: "error" });
        onClose();
      }
    }

    if (!sitterEmail) return;
    setLoading(true);
    getRatings();
  }, [sitterEmail]);

  const onPostRating = async () => {
    setLoadingPost(true);
    try {
      await api.post("/qualify/user", {
        type: "petSitter",
        petSitterEmail: sitterEmail,
        postId,
        rating,
        score,
        hostEmail: session?.email,
      }, {
        headers: {
          Authorization: `Bearer ${session?.token}`
        }
      })
      toast({ title: "Rating added successfully", status: "success" });
      setLoadingPost(false);
      onClose();
    } catch (error: any) {
      if (error?.response && error.response.data.name === "UserNotAllowedToQualifyError") {
        toast({ title: "You are not allowed to qualify this user", status: "error" });
      } else if (error?.response && error.response.data.name === "QualificationAlreadyMadeError") {
        toast({ title: "You have already rated this user", status: "error" });
      } else if (error?.response && error.response.data.code === 401) {
        dispatch(logout());
      } else {
        toast({ title: "Something went wrong, try again later", status: "error" });
      }
      setLoadingPost(false);
      onClose();
    }
  }

  if (loading) {
    return (
      <Modal isOpen={sitterEmail !== null} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Ratings</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack h="200px" justifyContent="center">
              <Spinner />
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  }

  return (
    <Modal isOpen={sitterEmail !== null} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Ratings</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex direction="column" align="flex-start" gap={3}>
            {ratings.length === 0 && (
              <Text p="4">No ratings yet</Text>
            )}
            {ratings.map((rating, index) => {
              return (
                <>
                  <Flex direction='column' align='flex-start' justifyContent="flexStart" gap={1}>
                    <Stars score={rating.score} />
                    <Text>{rating.rating}</Text>
                  </Flex>
                </>
              )
            })}
          </Flex>
        </ModalBody>
        {canAdd && (
          <>
            <Divider orientation='horizontal' />
            <ModalFooter>
              <Flex alignItems="center" direction="column" w="100%">
                <Text fontSize="xl" fontWeight="bold" alignSelf="flex-start" mb="8px">Add rating</Text>
                <Textarea placeholder="Write a comment" onChange={(e) => {setRating(e.target.value)}}/>
                <Flex alignItems="center" direction="row" gap={10} p={4}>
                  <Text>Select a score</Text> 
                  <Center p={2} _hover={{ cursor: "pointer" }} onClick={() => score > 0 && setScore(score - 1)}>
                    <Icon as={MdRemove} />
                  </Center>
                  <Stars score={score} />
                  <Center p={2} _hover={{ cursor: "pointer" }} onClick={() => score < 5 && setScore(score + 1)}>
                    <Icon as={MdAdd} />
                  </Center>
                </Flex>
                <Button alignSelf="flex-end" isLoading={loadingPost} colorScheme="teal" onClick={onPostRating}>
                  Post
                </Button>
              </Flex>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
