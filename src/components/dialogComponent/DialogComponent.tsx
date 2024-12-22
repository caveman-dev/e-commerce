import { Dialog, DialogProps } from 'primereact/dialog';
import { ReactNode } from 'react';

interface DialogComponentProps extends Omit<DialogProps, 'header' | 'visible' | 'onHide' | 'children'> {
    open: boolean;
    onClose: () => void;
    header: string;
    actions?: ReactNode;
    children: ReactNode;
}

const DialogComponent = (props: DialogComponentProps) => {
    const {
        open, onClose, header, actions, children, className, ...otherProps
    } = props;

    return (
        <Dialog
            header={header}
            visible={open}
            onHide={onClose}
            className={className}
            baseZIndex={0}
            // style={{ overflowY: 'auto' }}
            {...otherProps}
        >
            {children}
            {/* {actions && (
                <div className="flex justify-content-end p-3">
                    {actions}
                </div>
            )} */}
        </Dialog>
    );
};

export default DialogComponent;
