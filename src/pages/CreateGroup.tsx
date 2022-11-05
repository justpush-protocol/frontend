import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { OutLetContextType } from "../components/container/Container";
import CreateGroupForm from "../components/CreateGroup";

const CreateGroupPage = () => {
  const { setContentLoading } = useOutletContext<OutLetContextType>();
  useEffect(() => {
    setContentLoading(false);
  }, []);
  return <CreateGroupForm />;
};

export default CreateGroupPage;
