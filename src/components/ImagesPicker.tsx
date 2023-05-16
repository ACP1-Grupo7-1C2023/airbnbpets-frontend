import { Flex, Icon, Image } from "@chakra-ui/react";
import { useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

type ImagesPickerProps = {
  images: string[];
  onChanges: (e: any) => void;
}

export const ImagesPicker = ({ images, onChanges }: ImagesPickerProps) => {
  
  const [index, setIndex] = useState(0);

  return (
    <Flex justifyContent='center' alignItems='center'>
      <Icon
        as={MdChevronLeft}
        cursor="pointer"
        onClick={() => setIndex(index - 1)}
        color="gray.400"
        w={100}
        h={100}
        visibility={index === 0 ? 'hidden' : 'visible'}
      />
      <label>
        <Image
          src={images[index]}
          alt="Post image"
          boxSize="250px"
          objectFit="cover"
          borderRadius="md"
          fallbackSrc="https://via.placeholder.com/150"
          _hover={{ cursor: 'pointer', opacity: 0.8 }}
        />
        <input type="file" multiple accept="image/*" onChange={onChanges} style={{ display: 'none' }} />
      </label>
      <Icon
        as={MdChevronRight}
        cursor="pointer"
        onClick={() => setIndex(index + 1)}
        color="gray.400"
        w={100}
        h={100}
        visibility={(index === images.length - 1 || images.length === 0) ? 'hidden' : 'visible'}
      />
    </Flex>
  )
}