export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-[#1e1e1e] text-white min-h-screen">
            {children}
        </div>
    );
}
