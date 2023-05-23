import { Button, Center, Divider, Flex, Icon, Modal,
  ModalBody, ModalCloseButton, ModalContent, ModalFooter,
  ModalHeader, ModalOverlay, Spinner, Text, Textarea, VStack, useToast } from "@chakra-ui/react";
import { Qualification } from "../../interfaces/AppInterfaces";
import { Stars } from "./Stars";
import { useEffect, useState } from "react";
import { MdAdd, MdRemove } from "react-icons/md";
import api from "../../api";

type Props = {
  onClose: () => void;
  sitterEmail: string | null;
  canAdd?: boolean;
}

export const SitterRatingModal = ({ onClose, sitterEmail, canAdd = true }: Props) => {
  const [score, setScore] = useState(3);
  const [rating, setRating] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingPost, setLoadingPost] = useState(false);
  const [ratings, setRatings] = useState<Qualification[]>([]);
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

  const onPostRating = () => {
    console.log(score, rating);
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
          <VStack>
            {ratings.length === 0 && (
              <Text p="4">No ratings yet</Text>
            )}
            {ratings.map((rating, index) => {
              return (
                <>
                    <Flex direction='column' align='center' gap={2}>
                      <Text>{rating.rating}</Text>
                      <Stars score={rating.score} />
                    </Flex>
                  <Divider />
                </>
              )
            })}
          </VStack>
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
                <Flex alignItems="center" direction="row" gap={10} p={4}>
                  <Button isLoading={loading} colorScheme="teal" mr={3} onClick={onPostRating}>
                    Post
                  </Button>
                  <Button variant="ghost" onClick={onClose}>Close</Button>
                </Flex>
              </Flex>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
