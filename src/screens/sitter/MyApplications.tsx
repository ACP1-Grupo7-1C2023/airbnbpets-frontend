import { useEffect, useState } from "react";
import { Skeleton, Stack, Text } from "@chakra-ui/react";
import { SitterHeader } from "../../components/header/SitterHeader";
import api from "../../api";
import { ShowError } from "../../components/ShowError";
import { useAppDispatch, useAppSelector } from "../../state";
import { logout } from "../../state/actions";
import { ApplicationItem, ApplicationList } from "../../components/ApplicationItem";
import "../../styles/Post.scss";

export const MyApplications = () => {
  const [applications, setApplications] = useState<ApplicationList>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const session = useAppSelector(state => state.auth.session);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getApplications = async () => {
      setLoading(true);
      try {
        const response = await api.get<ApplicationList>('/my-applications', { headers: {
          Authorization: `Bearer ${session?.token}`
        }});
        setApplications(response.data);
        setLoading(false);
      } catch (error: any) {
        if (error?.response && error.response.data.code === 401) {
          dispatch(logout());
        } else {
          if (error.response.data.detail && typeof error.response.data.detail === 'string') {
            setError(error.response.data.detail);
          } else {
            setError('Something went wrong, try again later');
          }
          setLoading(false);
        }
      }
    }

    getApplications();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="post_container">
        <SitterHeader />
        <div className="post_list_container">
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
        {applications.length === 0 && (
          <div className="post_empty">
            <Text fontSize='lg' colorScheme='grey'>You haven't applied to any post yet</Text>
          </div>
        )}
        {applications.map((a) => (
          <ApplicationItem key={a.postId} application={a} />
        ))}
      </div>
    </div>
  );
}
