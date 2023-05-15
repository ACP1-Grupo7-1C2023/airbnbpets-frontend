import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Button, Flex, Heading, Icon, Spacer, Text, VStack } from "@chakra-ui/react";
import { Applications } from "../../interfaces/AppInterfaces";
import { MdStar, MdStarBorder } from "react-icons/md";

type ApplicationsSectionProps = {
  applicants: Applications[]
}

export const ApplicationsSection = ({ applicants }: ApplicationsSectionProps) => {
  return (
    <AccordionItem>
      <h1>
        <AccordionButton p={4}>
          <Heading size="lg" flex="1">Applications</Heading>
          <AccordionIcon />
        </AccordionButton>
      </h1>
      <AccordionPanel pb={4}>
        <VStack>
          {
            applicants.map((applicant: Applications) => (
              <Flex width="75%" alignItems="center">
                <Text mr={4}>{`${applicant.name} ${applicant.lastname}`}</Text>
                {Array(3)
                  .fill('')
                  .map((_, i) => (
                    <Icon
                      as={MdStar}
                      key={i}
                      color='teal.500'
                    />
                  ))}
                {Array(2)
                  .fill('')
                  .map((_, i) => (
                    <Icon
                      as={MdStarBorder}
                      color='teal.500'
                    />
                  ))}
                <Spacer />
                <Button colorScheme="teal" size="sm" onClick={() => { }}>Select</Button>
              </Flex>
            ))
          }
        </VStack>
      </AccordionPanel>
    </AccordionItem>
  );
};