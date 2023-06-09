import dbConnect from "@/db/connect";
import Player from "@/db/models/player";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const player = await Player.findById(id);
    if (!player) {
      return response.status(404).json({ status: 'Not found', message: `Player with ${id} not found.` })
    }
    return response.status(200).json(player)
  }

  if (request.method === "PATCH") {
    await Player.findByIdAndUpdate( id , {
      $set: request.body,
    });
    return response.status(200).json({ status: "Player is updated" })
  }

  if (request.method === "DELETE") {
    try {
      await Player.findByIdAndDelete(id);
      return response.status(200).json({ status: "Player is deleted" });
    } catch (error) {
      return response.status(400).json({ status: error.message });
    }
  }
}