import {
    ReactNode,
} from 'react';
import { Menu } from 'primereact/menu';
import { useHistory } from 'react-router-dom';
import { getMenuItems } from './AdminMenuUtils';

interface AdminMenuContainerProps {
    children: ReactNode;
}

const AdminMenuContainer = ({ children }: AdminMenuContainerProps) => {
    const history = useHistory();

    const navigate = (path: string) => {
        history.push(path);
    };

    const menuItems = getMenuItems(navigate);

    return (
        <div className="grid p-0 m-0">
            {/* <div className="col-3 card flex justify-content-start grid h-full"> */}
            <div className="col-2 ">
                <Menu model={menuItems} className="w-full " style={{ minHeight: '80vh' }} />
            </div>
            {/* </div> */}
            <div className="col-10 p-5">
                {children}
            </div>
        </div>
    );
};

export default AdminMenuContainer;
