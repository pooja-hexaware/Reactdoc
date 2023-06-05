import React, { lazy } from 'react'
import Loadable from 'components/Loadable/Loadable'

const DeveloperList = Loadable(lazy(() => import('./DeveloperList')))
const EditDeveloper = Loadable(lazy(() => import('./EditDeveloper')))
const AddDeveloper = Loadable(lazy(() => import('./AddDeveloper')))

const developerRoutes = [
    {
        path: '/developer',
        element: <DeveloperList />,
    },
    {
        path: '/developer/edit/:id',
        element: <EditDeveloper />,
    },
    {
        path: '/developer/add',
        element: <AddDeveloper />,
    },
]

export default developerRoutes
