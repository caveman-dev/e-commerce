import React, {
    ReactNode,
    // useCallback,
    // useMemo,
} from 'react';
import { Menu } from 'primereact/menu';
import { useHistory } from 'react-router-dom';
// import { MenuItemType } from '../../types/commonTypes';
// import useFetchJsonFile from '../../hooks/useFetchJsonFile';
// import { isTextValidAndNotEmpty } from '../../utils/nullChecks';
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
    // const { data, error, isLoading } = useFetchJsonFile('/jsons/adminSideMenu.json');
    // const history = useHistory();

    // const handleMenuClick = useCallback(
    //     (item: MenuItemType) => {
    //         console.log('Clicked item:', item, new Date().getTime());
    //         if (isTextValidAndNotEmpty(item.route)) {
    //             history.push(item.route);
    //         }
    //     },
    //     [history],
    // );
    // console.log('suspense check');

    // const enhancedData = useMemo(() => {
    //     if (!data) {
    //         return []; // Return an empty array while data is undefined
    //     }
    //     console.log('RENDER CHECK');
    //     return data.map((item: MenuItemType) => ({
    //         ...item,
    //         command: () => handleMenuClick(item),
    //     }));
    // }, [data, handleMenuClick]);

    // if (isLoading) return <div>Loading...</div>;
    // if (error) {
    //     return (
    //         <div>
    //             Error:
    //             {error.message}
    //         </div>
    //     );
    // }

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
