import { Badge, Icon } from "@chakra-ui/react";
import { HiOutlineClock, HiCheck, HiBan } from "react-icons/hi";

interface Props {
  status: string;
}

export const StatusBadge = ({ status }: Props) => {
  return (
    <>
      {status === "pending" && (
        <Badge variant="subtle" py="1" px="2" colorScheme="yellow" display="flex" flexDirection="row" alignItems="center">
          <Icon as={HiOutlineClock} mr={1} />
          Pending
        </Badge>
      )}
      {status === "accepted" && (
        <Badge variant="subtle" py="1" px="2" colorScheme="green" display="flex" flexDirection="row" alignItems="center">
          <Icon as={HiCheck} mr={1} />
          Accepted
        </Badge>
      )}
      {status === "rejected" && (
        <Badge variant="subtle" py="1" px="2" colorScheme="red" display="flex" flexDirection="row" alignItems="center">
          <Icon as={HiBan} mr={1} />
          Rejected
        </Badge>
      )}
    </>
  );
}
