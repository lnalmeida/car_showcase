"use server";
import {auth, currentUser} from "@clerk/nextjs/server";
import { db } from "./prisma";

export const checkUser = async () => {
  const user =  await currentUser();

  // console.log("id: "+user.id);

  if (!user) return null;

  try {
    const loggedInUser = await db.user.findUnique({
      where: {
        clerkUserId: user.id,
      },
    });

    if (loggedInUser) return loggedInUser;

    const newUser = await db.user.create({
      data: {
        clerkUserId: user.id,
        name: `${user.firstName} ${user.lastName}`,
        imageUrl: user.imageUrl,
        email: user.emailAddresses[0].emailAddress,
      },
    });

    console.log(newUser);
    return newUser;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};
