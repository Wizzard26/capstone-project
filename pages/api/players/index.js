import dbConnect from "@/db/connect";
import Player from "@/db/models/player";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const players = await Player.find();
    return response.status(200).json(players);
  }

  if (request.method === "POST") {
    try {
      const playerData = request.body;
      const player = new Player(playerData);
      await player.save();
      return response.status(201).json({ status: "Player Created" });
    } catch (error) {
      return response.status(400).json({ error: error.message});
    }
  }
}