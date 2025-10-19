import { create } from "zustand";

interface hamburgerInterface {
    isOpen: boolean
    toggleIsOpen:(changeTo?: boolean) => void
}

const hamburgerState = create<hamburgerInterface>()((set) => ({
    isOpen: false,
    toggleIsOpen: (changeTo) => {
        const newState = changeTo ?? !hamburgerState.getState().isOpen
        set(() => ({isOpen:newState}))
    }
}))

export default hamburgerState;