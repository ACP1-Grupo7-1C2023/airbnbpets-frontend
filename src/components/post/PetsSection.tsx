import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, AspectRatio, Card, CardBody, CardFooter, Heading, Image, Wrap, WrapItem } from "@chakra-ui/react"

type PetsSectionProps = {
  pets: any[]
}

export const PetsSection = ({ pets }: PetsSectionProps) => {
  return (
    <AccordionItem>
      <h1>
        <AccordionButton p={4}>
          <Heading size="lg" flex="1">Pets</Heading>
          <AccordionIcon />
        </AccordionButton>
      </h1>
      <AccordionPanel pb={4}>
        <Wrap justify="center" spacing={8}>
          {pets.map((pet: any) => (
            <WrapItem>
              <Card>
                <CardBody>
                  <AspectRatio w="250px" ratio={1}>
                    <Image
                      src={pet.image}
                      borderRadius='lg'
                    />
                  </AspectRatio>
                </CardBody>
                <CardFooter>
                  <Heading size="md" >
                    {pet.name}
                  </Heading>
                </CardFooter>
              </Card>
            </WrapItem>
          ))}
        </Wrap>
      </AccordionPanel>
    </AccordionItem>
  )
}