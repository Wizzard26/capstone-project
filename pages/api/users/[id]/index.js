import dbConnect from "@/db/connect";
import User from "@/db/models/user";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const user = await User?.findById(id);
    if (!user) {
      return response.status(404).json({ status: 'User not found', message: `User with ${id} was not found` })
    }

    return response.status(200).json(user)
  }

  if (request.method === "PATCH") {
    await User.findByIdAndUpdate( id , {
      $set: request.body,
    });

    return response.status(200).json({ status: "User is updated" })
  }

  if (request.method === "DELETE") {
    try {
      await User.findByIdAndDelete(id);
      return response.status(200).json({ status: "User is deleted" });
    } catch (error) {
      return response.status(400).json({ status: error.message })
    }
  }
}