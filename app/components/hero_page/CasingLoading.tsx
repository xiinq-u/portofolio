export default function CasingLoading() {
    return (
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
            {/* Casing Kaca Kiri */}
            <div className="absolute inset-y-0 left-0 hidden overflow-hidden border-r-[2px] border-white/70 bg-[rgba(10,15,30,0.6)] shadow-[inset_-15px_0_40px_rgba(56,189,248,0.2)] backdrop-blur-[15px] [right:calc(50%+88.8889vh-0.7373vh)] [@media(min-aspect-ratio:16/9)]:block">
                <PecahanKaca sisi="kiri" />
            </div>

            {/* Casing Kaca Kanan (Dibuat jauh lebih acak dan berantakan) */}
            <div className="absolute inset-y-0 right-0 hidden overflow-hidden border-l-[2px] border-white/70 bg-[rgba(10,15,30,0.6)] shadow-[inset_15px_0_40px_rgba(56,189,248,0.2)] backdrop-blur-[15px] [left:calc(50%+88.8889vh-1.7602vh)] [@media(min-aspect-ratio:16/9)]:block">
                <PecahanKaca sisi="kanan" />
            </div>
        </div>
    );
}

function PecahanKaca({ sisi }: { sisi: "kiri" | "kanan" }) {
    // ==========================================
    // SISI KIRI: Pola Asli Anda
    // ==========================================
    if (sisi === "kiri") {
        return (
            <>
                <div className="absolute -inset-[50%] z-[1] rotate-[25deg] -translate-y-[20%] border-t border-white/40 bg-linear-to-br from-white/15 to-transparent shadow-[0_-10px_30px_rgba(56,189,248,0.1)]" />
                <div className="absolute -inset-[50%] z-[2] -rotate-[15deg] translate-y-[30%] border-b border-white/30 bg-linear-to-tr from-transparent via-transparent to-white/8 shadow-[0_10px_30px_rgba(56,189,248,0.1)]" />
                <div className="absolute -inset-[50%] z-[3] rotate-[55deg] translate-x-[30%] border-r border-white/50" />
            </>
        );
    }

    // ==========================================
    // SISI KANAN: Coretan Pecahan Berantakan & Liar
    // ==========================================
    return (
        <>
            {/* Retakan Utama Miring Tajam */}
            <div className="absolute -inset-[60%] z-[1] -rotate-[42deg] translate-y-[10%] border-t border-white/50 bg-linear-to-tl from-white/20 to-transparent shadow-[0_-5px_20px_rgba(56,189,248,0.15)]" />
            
            {/* Retakan Menyilang Berlawanan Arah */}
            <div className="absolute -inset-[60%] z-[2] rotate-[65deg] -translate-x-[20%] border-b border-white/40 bg-linear-to-br from-transparent via-white/5 to-white/15 shadow-[0_5px_20px_rgba(56,189,248,0.1)]" />
            
            {/* Garis Potong Vertikal Kasar */}
            <div className="absolute -inset-[60%] z-[3] -rotate-[18deg] translate-x-[35%] -translate-y-[25%] border-r border-white/60" />
            
            {/* Coretan Retakan Ekstra 1 (Menghantam dari sudut bawah) */}
            <div className="absolute -inset-[60%] z-[4] rotate-[33deg] translate-y-[40%] border-t border-white/30" />
            
            {/* Coretan Retakan Ekstra 2 (Serpihan kecil menyilang tajam) */}
            <div className="absolute -inset-[60%] z-[5] -rotate-[75deg] -translate-x-[10%] translate-y-[15%] border-l border-white/45" />

            {/* Garis Serpihan Halus Tambahan */}
            <div className="absolute -inset-[60%] z-[6] rotate-[6deg] -translate-y-[35%] border-b border-white/20" />
        </>
    );
}