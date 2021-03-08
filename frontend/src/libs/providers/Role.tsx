import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { AppStateType, TState } from '#src/redux/types/common_types';
import { TRole } from '#src/redux/types/role';

export type TRoleContext = {
    role?: TRole | null
}

export const RoleContext = React.createContext<TRoleContext>({})

export const Role: React.FC = ({ children }: any) => {

    const { data } = useSelector((state: AppStateType): TState => state.auth);
    const [role, setRole] = useState<TRole | null>(null)

    useEffect(() => {
        if (data?.user) setRole(data.user?.group)
    },[data])

    return (
        <RoleContext.Provider value={{ role: role }}>
            {children}
        </RoleContext.Provider>
    )
}