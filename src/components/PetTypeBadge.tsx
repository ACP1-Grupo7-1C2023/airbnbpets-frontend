import { Badge } from "@chakra-ui/react"
import { PetTypes } from "../interfaces/AppInterfaces";

export const PetTypeBadge = ({ type }: { type: string }) => {
  const colorScheme = () => {
    switch (type) {
      case 'Dog':
        return 'blue';
      case 'Cat':
        return 'green';
      case 'Bird':
        return 'yellow';
      case 'Fish':
        return 'cyan';
      case 'Reptile':
        return 'orange';
      default:
        return 'gray';
    }
  }

  return (
    <Badge colorScheme={colorScheme()}>
      {PetTypes.includes(type) ? type : 'Other'}
    </Badge>
  );
}