import { useParams } from "react-router-dom";
import { SitterHeader } from "../../components/header/SitterHeader";

export const SitterPost = () => {
  const { id } = useParams();

  return (
    <div>
      <SitterHeader />
      <h1>Post {id}</h1>
    </div>  
  );
}