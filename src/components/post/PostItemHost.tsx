import { Card, CardBody, CardHeader, Flex, Heading, Image, Stack, Text, VStack } from "@chakra-ui/react";
import { Icon } from '@chakra-ui/react';
import { MdLocationPin, MdCalendarMonth } from 'react-icons/md';
import { parseDate } from "../../utils/date";
import { useNavigate } from "react-router-dom";
import { PetTypeBadge } from "../PetTypeBadge";

export type PostsList = Post[];

interface Post {
  id: number;
  title: string;
  description: string;
  location: string;
  startat: string;
  finishat: string;
  homeUrls?: string[];
  petUrls?: string[];
  pets: string[];
}

export const PostItemHost = ({ post }: { post: Post }) => {
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
      <Flex dir="row">
        <div style={{ flex: 1 }}>
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
                  {post.location.split("|")[2] || post.location.split("|")[1] || post.location.split("|")[0]}
                </Text>
              </Flex>
              <Flex direction='row' align='center' gap={1}>
                <Icon as={MdCalendarMonth} />
                <Text>
                  {parseDate(post.startat)} - {parseDate(post.finishat)}
                </Text>
              </Flex>
            </Flex>
            <Stack mt={4} spacing={4} direction='row'>
              {post.pets.map((pet) => (
                <PetTypeBadge type={pet} />
              ))}
            </Stack>
          </CardBody>
        </div>
        {post.homeUrls && post.homeUrls.length > 0 && (
          <Image src={post.homeUrls[0]} w="200px" h="auto" objectFit="cover" margin="20px" />
        )}
      </Flex>
    </Card>
  )
}
