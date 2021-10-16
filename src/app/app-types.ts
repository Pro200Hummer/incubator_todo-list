export type RequestStatusType = 'idle' | 'loading' | 'succeed' | 'failed';
export type ModalStatusType = 'no-status' | 'add-list' | 'add-task';

export type ModalType = {
    isOpen: boolean
    modalStatus: ModalStatusType
    modalTitle: string | null
    itemID?: string
};

export type AppReducerStateType = {
    status: RequestStatusType
    error: string | null,
    isInitialized: boolean
    modal: ModalType
};