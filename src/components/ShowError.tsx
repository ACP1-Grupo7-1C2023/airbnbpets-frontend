import { Flex, Heading, Icon } from "@chakra-ui/react";
import { MdWarning } from 'react-icons/md';

export const ShowError = ({ error }: { error: string }) => {
  return (
    <Flex direction='column' align='center' justify='center' h='100%' gap={2}>
      <Icon as={MdWarning} boxSize={8} color='tomato' />
      <Heading fontSize='lg' color='tomato'>{error}</Heading>
    </Flex>
  );
}
