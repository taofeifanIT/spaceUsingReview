export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/login',
          },
        ],
      },
    ],
  },
  {
    path: '/restRomUsingReview',
    name: 'restRomUsingReview',
    icon: 'crown',
    routes: [
      {
        path: '/restRomUsingReview/DeviceManagement',
        name: 'DeviceManagement',
        icon: 'smile',
        component: './restRomUsingReview/DeviceManagement',
      },
    ],
  },
  {
    path: '/',
    redirect: '/restRomUsingReview/DeviceManagement',
  },
  {
    component: './404',
  },
];
