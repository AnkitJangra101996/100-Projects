import { createContext, useContext, useEffect, useState } from "react";
import PricingModal from "../components/PricingModal";

type PricingModal = {
    modalOpen: boolean,
    setModalOpen: () => void
}

const PricingModalContext = createContext<PricingModal | null>(null)

export const PricingModalProvider = ({ children }: { children: React.ReactNode }) => {
    const [pricingModalOpen, setPricingModal] = useState(false);

    useEffect(() => {
        document.documentElement.classList.toggle('overflow-hidden', pricingModalOpen);

        return () => document.documentElement.classList.remove('overflow-hidden');
    }, [pricingModalOpen])

    return (
        <PricingModalContext.Provider value={{
            modalOpen: pricingModalOpen,
            setModalOpen: () => setPricingModal(true)
        }}>
            {children}
            <PricingModal isOpen={pricingModalOpen} onClose={() => setPricingModal(false)} />
        </PricingModalContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export const usePricingModal = () => {
    const context = useContext(PricingModalContext);
    if (!context) {
        throw new Error("Pricing Modal Context must be used within a PricingModalProvider");
    }
    return context;
}