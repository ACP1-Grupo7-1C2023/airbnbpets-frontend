import "../../styles/Post.scss";
import { useState } from "react";
import { HostHeader } from "../../components/header/HostHeader";
import { Post } from "../../interfaces/AppInterfaces";
import { PostItem } from "../../components/PostItem";
import { Flex, Text, useToast } from "@chakra-ui/react";
import Icon from '@chakra-ui/icon';
import { HiOutlinePlus } from 'react-icons/hi';
import { NewPostModal } from "../../components/NewPostModal";

const data: Post[] = [
  {
    id: 1,
    title: "departamento en palermo",
    description: "el lugar es un departamento 3 ambientes y las mascotas dos gatos",
    location: "CABA",
    startAt: "2023-06-10T00:00:00.000Z",
    finishAt: "2023-06-10T00:00:00.000Z"
  },
  {
    id: 2,
    title: "departamento en palermo",
    description: "el lugar es un departamento 3 ambientes y las mascotas dos gatos",
    location: "CABA",
    startAt: "2023-06-10T00:00:00.000Z",
    finishAt: "2023-06-10T00:00:00.000Z"
  },
  {
    id: 3,
    title: "departamento en palermo",
    description: "el lugar es un departamento 3 ambientes y las mascotas dos gatos",
    location: "CABA",
    startAt: "2023-06-10T00:00:00.000Z",
    finishAt: "2023-06-10T00:00:00.000Z"
  },
  {
    id: 4,
    title: "departamento en palermo",
    description: "el lugar es un departamento 3 ambientes y las mascotas dos gatos",
    location: "CABA",
    startAt: "2023-06-10T00:00:00.000Z",
    finishAt: "2023-06-10T00:00:00.000Z"
  },
  {
    id: 5,
    title: "departamento en palermo",
    description: "el lugar es un departamento 3 ambientes y las mascotas dos gatos",
    location: "CABA",
    startAt: "2023-06-10T00:00:00.000Z",
    finishAt: "2023-06-10T00:00:00.000Z"
  }
]

export const MyPosts = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const toast = useToast();

  const onPostClick = () => {
    setModalVisible(true);
  }

  const onModalClose = () => {
    setModalVisible(false);
  }

  return (
    <div className="post_container">
      <HostHeader />
      <div className="post_list_container">
        {data.length === 0 && (
          <div className="post_empty">
            <Text fontSize='lg' colorScheme='grey'>You haven't made any posts yet</Text>
          </div>
        )}
        {data.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
      <button className="main_button post_add_post_button" onClick={onPostClick}>
        <Flex direction='row' align='center' gap={1}>
          <Icon as={HiOutlinePlus} />
          <Text>
            New Post
          </Text>
        </Flex>
      </button>
      <NewPostModal isOpen={modalVisible} onClose={onModalClose} />
    </div>
  );
}
