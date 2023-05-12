import dbConnect from "@/db/connect";
import { hashPassword } from "@/db/auth";
import User from "@/db/models/user";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "POST") {
    try {
      const userData = request.body;
      const { name, email, password } = userData;

      if (
        !userData.name ||
        !userData.email.includes('@') ||
        !userData.password
      ) {
        response
          .status(422)
          .json({
            message: 'Invalid input!'
          });
      }

      const existingUser = await User.findOne({ name: name });
      const existingEmail = await User.findOne({ email: email });

      if (existingUser || existingEmail) {
        const errorMessage = existingUser
          ? 'Your Username is existing'
          : 'This E-Mail is used';
        return response.status(422).json({ message: errorMessage });
      }

      const hashedPassword = await hashPassword(password)
      const user = new User({ name, email, password: hashedPassword });
      await user.save();
      return response.status(200).json({ message: 'New User is created'});
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}