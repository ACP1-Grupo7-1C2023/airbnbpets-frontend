import { useParams } from "react-router-dom";
import { HostHeader } from "../../components/header/HostHeader";

export const HostPost = () => {
  const { id } = useParams();

  return (
    <div>
      <HostHeader />
      <h1>Post {id}</h1>
    </div>  
  );
}
