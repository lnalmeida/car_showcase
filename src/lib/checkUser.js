"use server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";

export const checkUser = async () => {
  try {
    const { userId } = await auth();
    if (!userId) return null;

    // First attempt: Get user seamlessly from DB without waking up Clerk API
    const loggedInUser = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (loggedInUser) return loggedInUser;

    // Second attempt: Only if user is new, request his data from Clerk API
    let user;
    try {
      user = await currentUser();
    } catch (apiErr) {
      console.error("Clerk API Response error fetching new user profile:", apiErr.message);
      return null;
    }

    if (!user) return null;

    const newUser = await db.user.create({
      data: {
        clerkUserId: user.id,
        name: `${user.firstName} ${user.lastName}`,
        imageUrl: user.imageUrl,
        email: user.emailAddresses[0].emailAddress,
      },
    });

    console.log("New User Created in DB:", newUser);
    return newUser;
  } catch (error) {
    console.error("checkUser error:", error.message);
    return null;
  }
};
