import { useRouter } from "next/router";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import PlayerForm from "@/components/PlayerForm";
import { StyledWrapper } from "@/components/StyledWrapper";
import { StyledLink } from "@/components/StyledLink";


async function sendRequest(url, { arg }) {
  const response = await fetch(url, {
    method: "PATCH",
    body: JSON.stringify(arg),
    headers:  {
      "Content-Type": "application/json",
    }
  });

  if(!response.ok) {
    console.error("Something went wrong");
  }
}

export default function EditPlayer() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;

  const { data: player, isLoading, error} = useSWR(id ? `/api/players/${id}` : null);

  const { trigger, isMutation } = useSWRMutation(
    `/api/players/${id}`,
    sendRequest
  );

  async function updatePlayer(player) {
    const formData = new FormData(event.target);
    const playerData = Object.fromEntries(formData);

    await trigger(playerData);
    await router.push(`/players/${id}`);
  }

  if (!isReady || isLoading || error) return <h2>Loading...</h2>;

  return (
    <StyledWrapper>
      <h1 id="edit-player">Edit Player</h1>
      <PlayerForm onSubmit={updatePlayer} formName={'update-player'} defaultData={player}/>
      <StyledLink variant="btn-primary" href="/players">Back to Players</StyledLink>
    </StyledWrapper>
  );
}