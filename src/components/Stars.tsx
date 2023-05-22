import { Flex, Icon } from "@chakra-ui/react";
import { MdStar, MdStarOutline } from "react-icons/md";

type StarsProps = {
  score: number;
}

export const Stars = ({ score }: StarsProps) => {
  return (
    <Flex>
      {Array(score)
        .fill('')
        .map((_, i) => (
          <Icon
            as={MdStar}
            key={i}
            color='teal.500'
          />
        ))}
      {Array(5 - score)
        .fill('')
        .map((_, i) => (
          <Icon
            as={MdStarOutline}
            key={i}
            color='teal.500'
          />
        ))}
    </Flex>
  )
}