import { Card, CardBody, CardHeader, Flex, Heading, Text } from "@chakra-ui/react";
import { Icon } from '@chakra-ui/react';
import { MdLocationPin, MdCalendarMonth } from 'react-icons/md';
import { parseDate } from "../utils/date";
import { useNavigate } from "react-router-dom";

export type ApplicationList = Application[];

interface Application {
  postId: number;
  hostEmail: string;
  title: string;
  description: string;
  startAt: string;
  finishAt: string;
  homeUrls: string[];
  petUrls: string[];
}

export const ApplicationItem = ({ application }: { application: Application }) => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/post/${application.postId}`);
  }

  return (
    <Card w="800px" _hover={{
      background: "#dcdcdc",
      cursor: "pointer"
    }}
      onClick={onClick}
    >
      <CardHeader>
        <Heading size='md'>{application.title}</Heading>
      </CardHeader>
      <CardBody pt={0}>
        <Text fontSize='sm'>
          {application.description}
        </Text>
        <Flex direction='column' mt={4}>
          <Flex direction='row' align='center' gap={1}>
            <Icon as={MdCalendarMonth} />
            <Text>
              {parseDate(application.startAt)} - {parseDate(application.finishAt)}
            </Text>
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  )
}
