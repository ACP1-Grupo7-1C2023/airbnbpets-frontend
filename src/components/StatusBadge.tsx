import { Badge, Icon } from "@chakra-ui/react";
import { HiOutlineClock, HiCheck, HiBan } from "react-icons/hi";

interface Props {
  status: "pending" | "accepted" | "rejected";
}

export const StatusBadge = ({ status }: Props) => {
  return (
    <>
      {status === "pending" && (
        <Badge variant="subtle" colorScheme="yellow" display="inline-flex" flexDirection="row" alignItems="center">
          <Icon as={HiOutlineClock} mr={1} />
          Pending
        </Badge>
      )}
      {status === "accepted" && (
        <Badge variant="subtle" colorScheme="green" display="inline-flex" flexDirection="row" alignItems="center">
          <Icon as={HiCheck} mr={1} />
          Accepted
        </Badge>
      )}
      {status === "rejected" && (
        <Badge variant="subtle" colorScheme="red" display="inline-flex" flexDirection="row" alignItems="center">
          <Icon as={HiBan} mr={1} />
          Rejected
        </Badge>
      )}
    </>
  );
}
