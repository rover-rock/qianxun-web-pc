const routers = [
    {
        path: '/',
        component: () => import('./views/shared-components/layout'),
        children:[
            {
                path: '',
                components: {
                    'search-panel': () => import('./views/shared-components/search-panel') ,
                    'info-panel': () => import('./views/shared-components/info-panel') ,
                    'sider': () => import('./views/shared-components/sider') 
                }
            },
            {
                path: 'report/A-stock',
                components: {
                    'search-panel': () => import('./views/report-A/search-panel') ,
                    'info-panel': () => import('./views/report-A/info-panel') ,
                    'sider': () => import('./views/report-A/sider') 
                }
            },
            {
                path: 'IPO/:cat',
                components: {
                    'search-panel': () => import('./views/IPO/search-panel') ,
                    'info-panel': () => import('./views/IPO/info-panel') 
                }
            },
            {
                path: 'audit-data/case',
                components: {
                    'search-panel':  () => import('./views/case/search-panel') ,
                    'info-panel':  () => import('./views/case/result-panel') ,
                    'sider':  () => import('./views/case/sider') 
                }
            },
            {
                path: 'audit-data/data-search',
                components: {
                    'search-panel':  () => import('./views/audit-data/search-panel') ,
                    'info-panel': () => import('./views/audit-data/result-panel') ,
                    'sider': () => import('./views/case/sider') 
                }
            },
            {
                path: 'punish',
                components: {
                    'search-panel': () => import('./views/punish/search-panel') ,
                    'info-panel':  () => import('./views/punish/info-panel') ,
                    'sider':  () => import('./views/punish/sider-panel') 
                }
            }
        ]
    },
    {
        path: '/login',
        component: () => import('./views/login/main') 
    },
    {
        path: '/tools',
        component: () => import('./views/shared-components/layout') ,
        children:[
            {
                path: '',
                components:{
                    'search-panel': () => import('./views/tools/main') ,
                    'sider':  () => import('./views/tools/sider') 
                }
            },
            {
                path: 'package',
                components:{
                    'search-panel': () => import('./views/tools/package') ,
                    'sider':  () => import('./views/tools/sider') 
                }
            },
            
        ]
    }
];

export default routers;