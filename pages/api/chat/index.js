import Pusher from "pusher";
//import Chat from "@/db/models/chat";

export const pusher = new Pusher({
  appId: process.env.NEXT_PUBLIC_PUSHER_APP_ID,
  key: process.env.NEXT_PUBLIC_PUSHER_KEY,
  secret: process.env.NEXT_PUBLIC_PUSHER_SECRET,
  cluster: "eu",
  useTLS: true,
});

export default async function handler(request, response) {
  const { message, sender, receiver } = request.body;
  await pusher.trigger("chat", "chatMessages", {
      message,
      sender,
      receiver
    });
    response.json({ message: "completed" });
}