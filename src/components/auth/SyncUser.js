import { checkUser } from "@/lib/checkUser";

export default async function SyncUser() {
    // This server component triggers the user synchronization logic
    // whenever any page is loaded, ensuring consistently updated records.
    const user = await checkUser();
    if (user) {
        console.log(`[SyncUser] Usuário sincronizado: ${user.email} (${user.name})`);
    }
    return null;
}
