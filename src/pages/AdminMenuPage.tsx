import React, { ReactNode } from 'react';
import AdminMenuContainer from '../containers/adminContainer/AdminMenuContainer';

interface AdminLayoutProps {
    children: ReactNode;
}

const AdminMenuPage: React.FC<AdminLayoutProps> = ({ children }) => (
    <AdminMenuContainer>
        {children}
    </AdminMenuContainer>
);

export default AdminMenuPage;
