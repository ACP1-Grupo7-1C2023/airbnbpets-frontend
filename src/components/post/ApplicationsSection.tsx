import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Button, Flex, Heading, Icon, Spacer, Text, VStack, useToast } from "@chakra-ui/react";
import { Applications } from "../../interfaces/AppInterfaces";
import { MdStar, MdStarBorder } from "react-icons/md";
import api from "../../api";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../state";
import { logout } from "../../state/actions";

type ApplicationsSectionProps = {
  applicants: Applications[];
  postId: number;
}

export const ApplicationsSection = ({ applicants, postId }: ApplicationsSectionProps) => {
  const session = useAppSelector(state => state.auth.session);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const dispatch = useAppDispatch();

  const onSelect = async (applicant: Applications) => {
    setLoading(true);
    try {
      await api.post('/accept', { postId, applicantEmail: applicant.email }, { headers: {
        Authorization: `Bearer ${session?.token}`
      }});
      toast({ title: 'Applicant selected successfully!', status: 'success' });
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      if (error?.response && error.response.data.code === 401) {
        dispatch(logout());
      } else {
        toast({ title: "Something went wrong, try again later", status: "error" });
      }
    }
  }

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
          {applicants.length === 0 && <Text p="4">No applications yet</Text>}
          {
            applicants.map((applicant: Applications) => (
              <Flex width="75%" alignItems="center" key={applicant.email}>
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
                      key={i}
                      color='teal.500'
                    />
                  ))}
                <Spacer />
                <Button
                  colorScheme="teal"
                  size="sm"
                  onClick={() => { onSelect(applicant) }}
                  isLoading={loading}
                >
                  Select
                </Button>
              </Flex>
            ))
          }
        </VStack>
      </AccordionPanel>
    </AccordionItem>
  );
};