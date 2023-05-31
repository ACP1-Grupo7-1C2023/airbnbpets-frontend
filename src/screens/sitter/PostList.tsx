import { useEffect, useState } from "react";
import { Box, Button, Flex, FormControl, FormLabel, Input,
  Popover, PopoverArrow, PopoverBody, PopoverCloseButton,
  PopoverContent, PopoverHeader, PopoverTrigger, Skeleton, Slider, SliderFilledTrack,
  SliderThumb, SliderTrack, Stack, Text, Tooltip } from "@chakra-ui/react";
import { SitterHeader } from "../../components/header/SitterHeader";
import "../../styles/Post.scss";
import { PostItem, PostsList } from "../../components/post/PostItem";
import api from "../../api";
import { ShowError } from "../../components/ShowError";
import "../../styles/Search.scss"
import { MapComponent } from "../../components/post/MapComponent";
import { getDistance } from "../../utils/geoCoding";

type Filters = {
  location: {
    latitude: number;
    longitude: number;
  } | undefined;
  radio: number;
  startAt: string;
  finishAt: string;
}

export const PostList = () => {
  const [posts, setPosts] = useState<PostsList>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState<Filters>({
    location: undefined,
    radio: 20,
    startAt: '',
    finishAt: ''
  });
  const [currentFilters, setCurrentFilters] = useState<Filters>({
    location: undefined,
    radio: 20,
    startAt: '',
    finishAt: ''
  });
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);
      try {
        const response = await api.get<PostsList>('/posts');
        setPosts(response.data);
        setLoading(false);
      } catch (error: any) {
        if (error.response.data.detail && typeof error.response.data.detail === 'string') {
          setError(error.response.data.detail);
        } else {
          setError('Something went wrong, try again later');
        }
        setLoading(false);
      }
    }

    getPosts();
  }, []);

  if (loading) {
    return (
      <div className="post_container">
        <SitterHeader />
        <div className="post_list_container">
          <Flex
            direction="column"
            gap="4"
            mb="2"
            borderRadius="16"
            py="4"
            px="6"
            bg="#ffffff"
            shadow="sm"
          >
            <Flex
              alignItems="center" justifyContent="space-between" gap="4">
              <FormControl isDisabled>
                <FormLabel>Start Date</FormLabel>
                <Input type="date"/>
              </FormControl>
              <FormControl isDisabled>
                <FormLabel>End Date</FormLabel>
                <Input type="date" />
              </FormControl>
              <FormControl isDisabled>
                <FormLabel>Location</FormLabel>
                <Button isDisabled>Open Map</Button>
              </FormControl>
            </Flex>
            <Button isDisabled size="lg" pt="4" pb="4" pl="8" pr="8" colorScheme="blue">Search</Button>
          </Flex>
          <Stack w="800px" h="100%" spacing="4" overflow="hidden">
            <Skeleton h='200px' />
            <Skeleton h='200px' />
            <Skeleton h='200px' />
            <Skeleton h='200px' />
            <Skeleton h='200px' />
          </Stack>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="post_container">
        <SitterHeader />
        <ShowError error={error} />
      </div>
    );
  }

  return (
    <div className="post_container">
      <SitterHeader />
      <div className="post_list_container">
        <Flex
          direction="column"
          gap="4"
          mb="2"
          borderRadius="16"
          py="4"
          px="6"
          bg="#ffffff"
          shadow="sm"
        >
          <Flex
            alignItems="center" justifyContent="space-between" gap="4">
            <FormControl>
              <FormLabel>Start Date</FormLabel>
              <Input onChange={(e) => {
                setFilters({
                  ...filters,
                  startAt: e.target.value
                })
              }} type="date" />
            </FormControl>
            <FormControl>
              <FormLabel>End Date</FormLabel>
              <Input onChange={(e) => {
                setFilters({
                  ...filters,
                  finishAt: e.target.value
                })
              }} type="date" /> 
            </FormControl>
            <FormControl>
              <FormLabel>Location</FormLabel>
              <Popover>
                <PopoverTrigger>
                  <Button>Open Map</Button>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverHeader>Pick a location</PopoverHeader>
                  <PopoverBody>
                    <Box h={300} w={300}>
                      <MapComponent position={filters.location} onChangePosition={(position) => {
                        setFilters({ ...filters, location: position });
                      }} />
                    </Box>
                    <Flex alignItems="center" justifyContent="center">
                      <Flex p={2} flex="1" flexDirection="column">
                        <Text>Select location range:</Text>
                        <Slider
                          flex='1'
                          focusThumbOnChange={false}
                          value={filters.radio}
                          min={1}
                          max={200}
                          onChange={(value) => {setFilters({ ...filters, radio: value })}}
                          onMouseEnter={() => setShowTooltip(true)}
                          onMouseLeave={() => setShowTooltip(false)}
                        >
                          <SliderTrack>
                            <SliderFilledTrack />
                          </SliderTrack>
                          <Tooltip
                            hasArrow
                            bg='teal.500'
                            color='white'
                            placement='top'
                            isOpen={showTooltip}
                            label={`${filters.radio}km`}
                          >
                            <SliderThumb borderColor="teal" borderWidth={4}/>
                          </Tooltip>
                        </Slider>
                      </Flex>
                      <Button ml={8} onClick={() => {setFilters({ ...filters, location: undefined })}}>Clear</Button>
                    </Flex>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </FormControl>
          </Flex>
          <Button w="100%" size="md" pt="4" pb="4" pl="8" pr="8" onClick={() => {
            setCurrentFilters({ ...filters });
          }} colorScheme="blue">Search</Button>
        </Flex>
        {posts.length === 0 && (
          <div className="post_empty">
            <Text fontSize='lg' colorScheme='grey'>There aren't any posts yet</Text>
          </div>
        )}
        {posts
          .filter((post) => {
            if (currentFilters.location) {
              const [postLatitude, postLongitude] = post.location.split('|').map((value) => parseFloat(value));
              const distance = getDistance(
                { latitude: postLatitude, longitude: postLongitude },
                { latitude: currentFilters.location.latitude, longitude: currentFilters.location.longitude }
              );
              console.log(distance);
              return distance <= currentFilters.radio;
            } else {
              return true;
            }
          })
          .filter((post) => (currentFilters.startAt !== "") ? post.startAt.split('T')[0] === currentFilters.startAt : true)
          .filter((post) => (currentFilters.finishAt !== "") ? post.finishAt.split('T')[0] === currentFilters.finishAt : true)
          .map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
