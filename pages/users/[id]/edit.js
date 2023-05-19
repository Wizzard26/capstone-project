import { useRouter} from "next/router";
import useSWR from "swr";
import styled from "styled-components";
import useSWRMutation from "swr/mutation";
import UserForm from "@/components/UserForm";
import { StyledLink } from "@/components/StyledLink";

async function sendRequest(url, { arg }) {
  const response = await fetch(url, {
    method: "PATCH",
    body: JSON.stringify(arg),
    headers: {
      "Content-Type": "application/json",
    }
  });

  if(!response.ok) {
    console.error("Something went wrong");
  }
}

export default function EditUser() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;

  const { data: user, isLoading, error } = useSWR(id ? `/api/users/${id}` : null);

  const { trigger, isMutation } = useSWRMutation(
    `/api/users/${id}`,
    sendRequest
  );

  async function updateUser(user) {
    const formData = new FormData(event.target);
    const userData = Object.fromEntries(formData);

    await trigger(userData);
    await router.push(`/users/${id}`);
  }

  if (!isReady || isLoading || error) return <h2>Loading...</h2>;

  return (
    <StyledWrapper>
      <h1 id="edit-player">Edit User</h1>
      <UserForm onSubmit={updateUser} formName={'update-user'} defaultData={user}/>
      <StyledLink variant="btn-primary" href={`/users/${id}`}>Back to Profile</StyledLink>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  margin: 0 auto;
  padding: 0 10px 20px;

  form {
    margin-bottom: 50px;
  }
`;