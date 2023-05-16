import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Heading, Image, Wrap } from "@chakra-ui/react"

type PetsSectionProps = {
  pets: string[]
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
            <Image
              src={pet}
              borderRadius='lg'
              objectFit="cover"
              boxSize="250px"
            />
          ))}
        </Wrap>
      </AccordionPanel>
    </AccordionItem>
  )
}