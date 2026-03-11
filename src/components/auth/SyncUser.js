import { checkUser } from "@/lib/checkUser";

export default async function SyncUser() {
    await checkUser();
    return null;
}
