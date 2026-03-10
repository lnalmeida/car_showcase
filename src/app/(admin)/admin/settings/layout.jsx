import Link from "next/link";

export default function SettingsLayout({ children }) {
    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Configurações Base</h2>
            </div>
            <div className="flex space-x-6 mb-8 border-b pb-4 overflow-x-auto">
                <Link href="/admin/settings/store-info" className="text-sm font-medium text-slate-500 hover:text-blue-700 transition-colors">Informações da Loja</Link>
                <Link href="/admin/settings/categories" className="text-sm font-medium text-slate-500 hover:text-blue-700 transition-colors">Categorias</Link>
                <Link href="/admin/settings/brands" className="text-sm font-medium text-slate-500 hover:text-blue-700 transition-colors">Marcas</Link>
                <Link href="/admin/settings/vehicle-types" className="text-sm font-medium text-slate-500 hover:text-blue-700 transition-colors">Tipos de Veículos</Link>
            </div>
            {children}
        </div>
    );
}
