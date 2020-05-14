import React, { useState, useContext, FunctionComponent } from 'react';

export interface Modals {
    addModal(key: string, modal: FunctionComponent<any>): void;
    openModal(key: string, props?: { [key: string]: any }): void;
    closeModal(): void;
}

const initialState: Modals = {
    closeModal: () => {
        throw new Error('Not implemented');
    },
    openModal: () => {
        throw new Error('Not implemented');
    },
    addModal: () => {
        throw new Error('Not implemented');
    },
};

export const ModalsContext = React.createContext(initialState);
export const useModals = () => useContext(ModalsContext);

interface Props {
    children: JSX.Element | JSX.Element[];
    initialModals?: { [key: string]: FunctionComponent<any> };
}

export const ModalsProvider: React.FC<Props> = ({ children, initialModals = {} }: Props) => {
    const [modals, setModals] = useState<{ [key: string]: FunctionComponent<any> }>(initialModals);
    const [modal, setModal] = useState<{
        open: boolean;
        key: string;
        Component: FunctionComponent<any>;
        props: { [key: string]: any };
    }>({
        open: false,
        key: null,
        Component: null,
        props: null,
    });

    const addModal: Modals['addModal'] = (key, ModalComponent) => {
        setModals((state) => {
            return { ...state, [key]: ModalComponent };
        });
    };

    const openModal: Modals['openModal'] = (key, props = {}) => {
        setModal({
            open: true,
            key,
            Component: modals[key],
            props,
        });
    };

    const closeModal: Modals['closeModal'] = () => setModal({ open: false, key: null, Component: null, props: null });
    console.log(modal);
    return (
        <ModalsContext.Provider
            value={{
                addModal,
                openModal,
                closeModal,
            }}
        >
            {modal.open ? <modal.Component {...modal.props} open /> : null}
            {children}
        </ModalsContext.Provider>
    );
};
