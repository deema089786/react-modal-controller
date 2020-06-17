import React, { useState, useContext, FunctionComponent } from 'react';

export interface Modals {
    addModal(key: string, modal: FunctionComponent<any>): void;
    openModal(key: string, props?: { [key: string]: any }): void;
    closeModal(key?: string): void;
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
        key: string;
        Component: FunctionComponent<any>;
        props: { [key: string]: any };
    }[]>([]);

    const addModal: Modals['addModal'] = (key, ModalComponent) => {
        setModals((state) => ({ ...state, [key]: ModalComponent }));
    };

    const openModal: Modals['openModal'] = (key, props = {}) => {
        setModal((state) => [...state, {
            key,
            Component: modals[key],
            props,
        }]);
    };

    const closeModal: Modals['closeModal'] = (key?: string) => {
        if (key === undefined) {
            setModal([]);
        } else {
            setModal((state) => state.filter((item) => item.key !== key));
        }
    };

    return (
        <ModalsContext.Provider
            value={{
                addModal,
                openModal,
                closeModal,
            }}
        >
            {modal.map((item) => (
                <item.Component {...item.props} open key={item.key} />
            ))}
            {children}
        </ModalsContext.Provider>
    );
};
