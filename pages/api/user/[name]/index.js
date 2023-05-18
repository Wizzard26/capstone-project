import dbConnect from "@/db/connect";
import User from "@/db/models/user";

export default async function handler(request, response) {
  await dbConnect();
  const { name } = request.query;

  if (request.method === "GET") {
    const user = await User.find({ name });
    if (!user) {
      return response.status(404).json({ status: 'User not found', message: `User was not found` })
    }

    return response.status(200).json(user)
  }
}