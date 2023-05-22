import { useRouter } from "next/router";
import PlayerForm from "@/components/PlayerForm";
import StyledWrapper from "@/components/StyledWrapper";
import { StyledLink } from "@/components/StyledLink";

export default function CreateNewPLayer() {
  const router = useRouter();

  async function addPlayer(player) {
    const formData = new FormData(event.target);
    const playerData = Object.fromEntries(formData);

    const response = await fetch("/api/players", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(playerData),
    });

    if (response.ok) {
      await response.json();
      await router.push("/");
    } else {
      console.error(response.status);
    }
  }

  return (
    <StyledWrapper>
      <h1 id="add-player">Add New Player</h1>
      <PlayerForm onSubmit={addPlayer} formName={'add-player'} />
      <StyledLink variant="btn-primary" href="/players">Back to Players</StyledLink>
    </StyledWrapper>
  )
}