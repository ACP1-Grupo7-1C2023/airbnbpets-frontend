import { Card, CardBody, CardHeader, Flex, Heading, Text } from "@chakra-ui/react";
import { Icon } from '@chakra-ui/react';
import { MdLocationPin, MdCalendarMonth } from 'react-icons/md';
import { parseDate } from "../utils/date";
import { useNavigate } from "react-router-dom";

export type PostsList = Post[];

interface Post {
  id: number;
  title: string;
  description: string;
  location: string;
  startat: string;
  finishat: string;
}

export const PostItem = ({ post }: { post: Post }) => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/post/${post.id}`);
  }

  return (
    <Card w="800px" _hover={{
      background: "#dcdcdc",
      cursor: "pointer"
    }}
      onClick={onClick}
    >
      <CardHeader>
        <Heading size='md'>{post.title}</Heading>
      </CardHeader>
      <CardBody pt={0}>
        <Text fontSize='sm'>
          {post.description}
        </Text>
        <Flex direction='column' mt={4}>
          <Flex direction='row' align='center' gap={1}>
            <Icon as={MdLocationPin} />
            <Text>
              {post.location}
            </Text>
          </Flex>
          <Flex direction='row' align='center' gap={1}>
            <Icon as={MdCalendarMonth} />
            <Text>
              {parseDate(post.startat)} - {parseDate(post.finishat)}
            </Text>
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  )
}
