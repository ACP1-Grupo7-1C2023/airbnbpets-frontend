import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Button, Divider, Flex, Heading, Icon, Spacer, Text, VStack, useDisclosure, useToast } from "@chakra-ui/react";
import { Applications } from "../../interfaces/AppInterfaces";
import api from "../../api";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../state";
import { logout } from "../../state/actions";
import { SitterRatingModal } from "../rating/SitterRatingModal";

type ApplicationsSectionProps = {
  applicants: Applications[];
  postId: number;
}

export const ApplicationsSection = ({ applicants, postId }: ApplicationsSectionProps) => {
  const session = useAppSelector(state => state.auth.session);
  const [loading, setLoading] = useState(false);
  const [ratingsEmail, setRatingsEmail] = useState<string | null>(null);
  const [canRate, setCanRate] = useState<boolean>(false);
  const toast = useToast();
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState<string | null>(null);
  
  // useEffect(() => {
  //   console.log(applicants);
  //   for (let i = 0; i < applicants.length; i++) {
  //     if (applicants[i].status === 'accepted') {
  //       setSelected(true)
  //     }
  //   }
  // }, [applicants])

  const onSelect = async (applicant: Applications) => {
    setLoading(true);
    try {
      await api.post('/accept', { postId, applicantEmail: applicant.email }, { headers: {
        Authorization: `Bearer ${session?.token}`
      }});
      setSelected(applicant.email);
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

  const onCloseRatings = () => {
    setRatingsEmail(null);
  }

  const onOpenRatings = (email: string, canAdd: boolean) => {
    setCanRate(canAdd);
    setRatingsEmail(email);
  }

  return (
    <AccordionItem>
      <SitterRatingModal
        postId={postId}
        sitterEmail={ratingsEmail}
        onClose={onCloseRatings}
        canAdd={canRate}
      />
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
              <>
                {(
                  (applicant.status === 'accepted' || applicant.status === 'pending') &&
                  (!selected || selected === applicant.email)
                ) &&
                <Flex width="75%" alignItems="center" key={applicant.email}>
                  <Text mr={4}>{`${applicant.name} ${applicant.lastname}`}</Text>
                  <Spacer />
                  <Button
                    size="sm"
                    colorScheme="teal"
                    variant="outline"
                    isLoading={loading}
                    onClick={() => {
                      onOpenRatings(applicant.email, applicant.status === 'accepted' || selected === applicant.email)
                    }}
                    mr="6px"
                  >
                    Ratings
                  </Button>
                  {applicant.status === 'accepted' || selected === applicant.email ? (
                    <Text color="green.500" ml="10px">Accepted</Text>
                  ) : (
                    <Button
                      colorScheme="teal"
                      size="sm"
                      onClick={() => { onSelect(applicant) }}
                      isLoading={loading}
                    >
                      Select
                    </Button>
                  )}
                  </Flex>
                }
                <Divider width="75%" />
              </>
            ))
          }
        </VStack>
      </AccordionPanel>
    </AccordionItem>
  );
};