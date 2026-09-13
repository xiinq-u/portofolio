"use client";

import { useRouter } from "next/navigation";

type NavigasiProps = {
    href?: string;
};

export default function Navigasi({ href = "/" }: NavigasiProps) {
    const router = useRouter();

    return (
        <>
            <style jsx>{`
                .nav-container {
                    position: relative;
                    display: inline-block;
                }

                .back-btn {
                    position: relative;
                    /* Latar belakang kaca digelapkan sedikit lagi agar kontras */
                    background: linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(8, 15, 28, 0.75));
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    
                    /* GARIS TIPIS, ELEGAN & JELAS */
                    border: 1.5px solid rgba(255, 255, 255, 0.7);
                    border-radius: 16px;
                    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.65), 0 0 15px rgba(155, 220, 250, 0.2);
                    
                    /* UKURAN BESAR & NYAMAN */
                    width: 60px;
                    height: 60px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #ffffff;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    z-index: 50;
                }

                .back-btn:hover {
                    background: rgba(255, 255, 255, 0.18);
                    border-color: #9cd8f1;
                    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.8), 0 0 25px rgba(156, 216, 241, 0.6);
                    transform: translateY(-2px) scale(1.05);
                }

                .back-btn svg {
                    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.8));
                    transition: transform 0.3s ease;
                }

                .back-btn:hover svg {
                    transform: translateX(-4px);
                }

                @media (hover: none) and (pointer: coarse) and (max-width: 1024px),
                       (hover: none) and (pointer: coarse) and (max-height: 600px) {
                    .back-btn {
                        width: 36px;
                        height: 36px;
                        padding: 0;
                        border-width: 1px;
                        border-radius: 10px;
                        box-shadow: 0 3px 12px rgba(0, 0, 0, 0.5);
                    }

                    .back-btn svg {
                        width: 18px;
                        height: 18px;
                    }

                    /* Keep the touch target comfortable around the smaller visual. */
                    .back-btn::after {
                        content: "";
                        position: absolute;
                        inset: -4px;
                    }

                    .back-btn:hover,
                    .back-btn:hover svg {
                        transform: none;
                    }
                }
            `}</style>

            <div className="nav-container">
                <button 
                    type="button"
                    onClick={() => router.push(href)}
                    className="back-btn"
                    aria-label="Kembali"
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="28" 
                        height="28" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                    >
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                </button>
            </div>
        </>
    );
}
