import { Flex, Icon, Image } from "@chakra-ui/react";
import { useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

type ImagesGalleryProps = {
  images: string[];
}

export const ImagesGallery = ({ images }: ImagesGalleryProps) => {

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
      <Image
        src={images[index]}
        alt="Post image"
        h={250}
        objectFit="cover"
        borderRadius="md"
        fallbackSrc="https://via.placeholder.com/150"
      />
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