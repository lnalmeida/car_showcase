import React from "react";

import { Users } from "lucide-react";

import UserList from "./_components/UserList";

export const metadata = {
  title: "Usuários | Administração",
  description: "Administre os usuários do sistema",
};

const UsersPage = () => {
  return (
    <div className="p-6">
      <div className="flex items-center space-x-4 py-2">
        <Users className="h-8 w-8 mb-6" />
        <h1 className="text-2xl font-bold mb-6">Administração de Usuários</h1>
      </div>

      <UserList />
    </div>
  );
};

export default UsersPage;
