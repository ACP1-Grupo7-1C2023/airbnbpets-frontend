import { Button, Center, Divider, Flex, Heading, Icon, Modal,
  ModalBody, ModalCloseButton, ModalContent, ModalFooter,
  ModalHeader, ModalOverlay, Text, Textarea, VStack } from "@chakra-ui/react";
import { Qualification } from "../../interfaces/AppInterfaces";
import { Stars } from "./Stars";
import { useState } from "react";
import { MdAdd, MdRemove } from "react-icons/md";

type QualificationsModalProps = {
  isOpen: boolean;
  onNewQualification: (score: number, rating: string) => void;
  onClose: () => void;
  qualifications: Qualification[];
  loading?: boolean;
  canAdd?: boolean;
}

export const QualificationsModal = ({ isOpen, onNewQualification ,onClose, qualifications, canAdd, loading }: QualificationsModalProps) => {
  const [score, setScore] = useState(3);
  const [rating, setRating] = useState('');

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Ratings</ModalHeader>
        <ModalCloseButton />
        <ModalBody mb="4">
          <Flex direction="column" align="flex-start" gap={3}>
            {qualifications.length === 0 && (
              <Text p="4">No ratings yet</Text>
            )}
            {qualifications.map((qualification, index) => {
              return (
                <>
                  <Flex direction='column' align='flex-start' justifyContent="flexStart" gap={1}>
                    <Stars score={qualification.score} />
                    <Text>{qualification.rating}</Text>
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
                <Button alignSelf="flex-end" isLoading={loading} colorScheme="teal" onClick={() => onNewQualification(score, rating)}>
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

QualificationsModal.defaultProps = {
  canAdd: false,
  loading: false
}