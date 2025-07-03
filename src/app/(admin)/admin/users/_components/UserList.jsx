"use client";

import {useState, useEffect} from "react";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";

import {Input} from "@/components/ui/input";

import {toast} from "sonner";

import {Card, CardContent} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
} from "@/components/ui/pagination";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    Search,
    KeySquare,
    Trash,
    Loader2,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

import {getUsersData, updateUserRole, removeUser} from "@/actions/users";
import {getPaginationRange} from "@/lib/helpers";

const UserList = () => {
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [sorting, setSorting] = useState([]);
    const [filterValue, setFilterValue] = useState("all");

    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogType, setDialogType] = useState("role");
    const [search, setSearch] = useState("");

    const [isMounted, setIsMounted] = useState(false);

    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const queryKey = ["users", search, pageIndex, pageSize, filterValue, sorting];

    const {
        isLoading: loadingUsers,
        data: responseData,
        error,
    } = useQuery({
        queryKey,
        queryFn: async () => {
            const params = {
                search,
                page: pageIndex,
                limit: pageSize,
                filter: filterValue === "all" ? null : filterValue,
                sortBy: sorting.length > 0 ? sorting[0].id : null,
                order: sorting.length > 0 ? (sorting[0].desc ? "desc" : "asc") : null,
            };
            const res = await getUsersData(params);
            return res;
        },
        placeholderData: (previousData) => previousData,
    });

    const queryClient = useQueryClient();

    const updateRoleMutation = useMutation({
        mutationFn: async ({id, newRole}) => {
            console.log("antes da update");
            const res = await updateUserRole({id, role: newRole});
            console.log("mutation");

            if (!res.success) {
                throw new Error(
                    `Erro ao atualizar a função do usuário: ${res.error.message}`
                );
            }

            return res;
        },
        onSuccess: () => {
            toast.success("Função do usuário atualizada.");
            queryClient.invalidateQueries({queryKey: ["users"]});
            setDialogOpen(false);
            setSelectedUser(null);
        },
        onError: () => {
            toast.error(`Erro ao atualizar função do usuário: ${error.message}`);
        },
    });

    const deleteUserMutation = useMutation({
        mutationFn: async (id) => {
            const res = await removeUser(id);

            if (!res.success) {
                throw new Error(res.error || "Erro ao excluir usuário");
            }
        },
        onSuccess: () => {
            toast.success("usuário excluído com sucesso!");
            queryClient.invalidateQueries({queryKey: ["users"]});
            setDialogOpen(false);
            setSelectedUser(null);
        },
        onError: (error) => {
            toast.error(`Erro ao excluir usuário: ${error.message}`);
        },
    });

    useEffect(() => {
        if (responseData?.success && responseData.data) {
            setUsers(responseData.data);
        }
    }, [responseData]);
    const totalCount = responseData?.totalCount ?? 0;

    const handleSearchSubmit = (e) => {
        e.preventDefault();
    };

    useEffect(() => {
    });

    const handleRoleChange = (user) => {
        setSelectedUser(user);
        setDialogType("role");
        setDialogOpen(true);
    };

    const handleDelete = (user) => {
        setSelectedUser(user);
        setDialogType("delete");
        setDialogOpen(true);
    };

    const confirmRoleChange = () => {
        if (!selectedUser) return;
        const currentRole = selectedUser.role;
        const newRole = currentRole === "ADMIN" ? "USER" : "ADMIN";
        updateRoleMutation.mutate({id: selectedUser.id, newRole: newRole});
    };

    const confirmDelete = async () => {
        if (!selectedUser) return;
        deleteUserMutation.mutate(selectedUser.id);
    };

    const getInitials = (name) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    const numberOfRecordsLabel = (() => {
        if (totalCount === 0) {
            return "Nenhum usuário";
        }

        const firstRecordIndex = pageIndex * pageSize + 1;

        const lastRecordIndex = Math.min(
            firstRecordIndex + pageSize - 1,
            totalCount
        );

        if (lastRecordIndex === totalCount && firstRecordIndex === 1) {
            return `${totalCount} de ${totalCount} usuários.`;
        } else {
            return `${firstRecordIndex}-${lastRecordIndex} de ${totalCount} usuários.`;
        }
    })();

    const totalPages = Math.ceil(totalCount / pageSize);
    const paginationRange = getPaginationRange(totalPages, pageIndex + 1);

    return (
        <div className="w-full py-2 font-medium">
            <div className="flex  justify-end py-4">
                <form onSubmit={handleSearchSubmit} className="flex w-full sm:w-auto">
                    <div className="relative flex-1">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500"/>
                        <Input
                            className="pl-9 w-full right-0 sm:w-60"
                            placeholder="Buscar usuários..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            type="search"
                        />
                    </div>
                </form>
            </div>
            <Card>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Usuário</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Função</TableHead>
                                <TableHead className="text-right px-24">Ações</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loadingUsers ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center">
                                        <div className="flex items-center justify-center py-4">
                                            <Loader2 className="h-6 w-6 animate-spin text-gray-500"/>
                                            <span className="ml-2">Carregando usuários...</span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                users.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar>
                                                    <AvatarImage
                                                        src={user.avatar || "/placeholder.svg"}
                                                        alt={user.name}
                                                    />
                                                    <AvatarFallback>
                                                        {getInitials(user.name)}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <span className="font-medium">{user.name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">
                                            {user.email}
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={user.role === "ADMIN" ? "default" : "secondary"}
                                                className={
                                                    user.role === "ADMIN"
                                                        ? "bg-green-600 hover:bg-green-700 text-white"
                                                        : "bg-black hover:bg-gray-800 text-white"
                                                }
                                            >
                                                {user.role === "ADMIN" ? "Administrador" : "Usuário"}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleRoleChange(user)}
                                                >
                                                    <KeySquare
                                                        className={`h-4 w-4 mr-2 ${
                                                            user.role === "ADMIN"
                                                                ? "text-yellow-500 fill-current"
                                                                : ""
                                                        }`}
                                                    />
                                                    {user.role === "ADMIN"
                                                        ? "Remover Administrador"
                                                        : "Tornar Administrador"}
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleDelete(user)}
                                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                                >
                                                    <Trash className="h-4 w-4"/>
                                                    <span className="sr-only">Excluir usuário</span>
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Pagination */}
            {totalCount > 0 && (
                <div className="flex items-center justify-between space-x-2 py-4">
                    <div className="flex-1 text-sm text-muted-foreground">
                        {numberOfRecordsLabel}
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex items-center space-x-2">
                            <p className="text-sm font-medium">Registros por página</p>
                            <Select
                                value={`${pageSize}`}
                                onValueChange={(value) => {
                                    setPageSize(Number(value));
                                    setPageIndex(0);
                                }}
                            >
                                <SelectTrigger className="h-8 w-[70px]">
                                    <SelectValue placeholder={pageSize}/>
                                </SelectTrigger>
                                <SelectContent side="top">
                                    {[10, 20, 30, 40, 50].map((size) => (
                                        <SelectItem key={size} value={`${size}`}>
                                            {size}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <Pagination className=" mx-4 w-auto ">
                            <PaginationContent className="flex items-center gap-1 mr-4">
                                <PaginationItem>
                                    <Button
                                        href="#"
                                        variant="outline"
                                        className={`mx-1 ${
                                            pageIndex === 0 ? "cursor-not-allowed" : "cursor-pointer"
                                        }`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setPageIndex(pageIndex - 1);
                                        }}
                                        disabled={pageIndex === 0}
                                        aria-disabled={pageIndex === 0}
                                    >
                                        <ChevronLeft className="h-4 w-4 mr-1"/>
                                    </Button>
                                </PaginationItem>

                                {paginationRange.map((pageNumber, index) => {
                                    if (pageNumber === "...") {
                                        return (
                                            <PaginationItem key={`ellipsis-${index}`}>
                                                <PaginationEllipsis/>
                                            </PaginationItem>
                                        );
                                    }

                                    const isActive = pageIndex + 1 === pageNumber;
                                    return (
                                        <PaginationItem
                                            key={pageNumber}
                                            className="cursor-pointer mx-1"
                                        >
                                            <div className="flex items-center space-x-1">
                                                <PaginationLink
                                                    href="#"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setPageIndex(pageNumber - 1);
                                                    }}
                                                    isActive={isActive}
                                                    className={
                                                        isActive ? "border-gray-500 bg-gray-200" : ""
                                                    }
                                                >
                                                    {pageNumber}
                                                </PaginationLink>
                                            </div>
                                        </PaginationItem>
                                    );
                                })}

                                <PaginationItem>
                                    <Button
                                        href="#"
                                        className={`mx-1 ${
                                            pageIndex + 1 >= totalPages
                                                ? "cursor-not-allowed"
                                                : "cursor-pointer"
                                        }`}
                                        variant="outline"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setPageIndex(pageIndex + 1);
                                        }}
                                        disabled={pageIndex + 1 >= totalPages}
                                        aria-disabled={pageIndex + 1 >= totalPages}
                                    >
                                        <ChevronRight className="h-4 w-4 ml-1"/>
                                    </Button>
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                </div>
            )}

            {/* Dialogs */}

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {dialogType === "role"
                                ? "Alterar Função do Usuário"
                                : "Excluir Usuário"}
                        </DialogTitle>
                        <DialogDescription>
                            {dialogType === "role" ? (
                                <>
                                    Tem certeza que deseja alterar a função de{" "}
                                    <strong>{selectedUser?.name}</strong> de{" "}
                                    <strong>
                                        {selectedUser?.role === "ADMIN"
                                            ? "Administrador"
                                            : "Usuário"}
                                    </strong>{" "}
                                    para{" "}
                                    <strong>
                                        {selectedUser?.role === "ADMIN"
                                            ? "Usuário"
                                            : "Administrador"}
                                    </strong>
                                    ?
                                </>
                            ) : (
                                <>
                                    Tem certeza que deseja excluir o usuário{" "}
                                    <strong>{selectedUser?.name}</strong>? Esta ação não pode ser
                                    desfeita.
                                </>
                            )}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDialogOpen(false)}>
                            Cancelar
                        </Button>
                        <Button
                            variant={dialogType === "delete" ? "destructive" : "default"}
                            onClick={
                                dialogType === "role" ? confirmRoleChange : confirmDelete
                            }
                        >
                            {dialogType === "role" ? "Alterar Função" : "Excluir"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default UserList;
