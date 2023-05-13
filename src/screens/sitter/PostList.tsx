import { Text } from "@chakra-ui/react";
import { SitterHeader } from "../../components/header/SitterHeader";
import "../../styles/Post.scss";
import { PostItem } from "../../components/PostItem";
import { Post } from "../../interfaces/AppInterfaces";

const data: Post[] = [
  {
    id: 1,
    title: "departamento en palermo",
    description: "el lugar es un departamento 3 ambientes y las mascotas dos gatos",
    location: "CABA",
    startAt: "2023-06-10",
    finishAt: "2023-06-10"
  },
  {
    id: 2,
    title: "departamento en palermo",
    description: "el lugar es un departamento 3 ambientes y las mascotas dos gatos",
    location: "CABA",
    startAt: "2023-06-10",
    finishAt: "2023-06-10"
  },
  {
    id: 3,
    title: "departamento en palermo",
    description: "el lugar es un departamento 3 ambientes y las mascotas dos gatos",
    location: "CABA",
    startAt: "2023-06-10",
    finishAt: "2023-06-10"
  },
  {
    id: 4,
    title: "departamento en palermo",
    description: "el lugar es un departamento 3 ambientes y las mascotas dos gatos",
    location: "CABA",
    startAt: "2023-06-10",
    finishAt: "2023-06-10"
  },
  {
    id: 5,
    title: "departamento en palermo",
    description: "el lugar es un departamento 3 ambientes y las mascotas dos gatos",
    location: "CABA",
    startAt: "2023-06-10",
    finishAt: "2023-06-10"
  }
]

export const PostList = () => {
  return (
    <div className="post_container">
      <SitterHeader />
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
    </div>
  );
}