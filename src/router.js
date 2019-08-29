const routers = [
    {
        path: '/',
        component: () => import('./views/components/layout'),
        children:[
            {
                path: '',
                components: {
                    'search-panel': () => import('./views/components/search-panel') ,
                    'info-panel': () => import('./views/components/info-panel') ,
                    'sider': () => import('./views/components/sider') 
                }
            },
            {
                path: 'report/Astock',
                components: {
                    'search-panel': () => import('./views/report/search-panel') ,
                    'info-panel': () => import('./views/report/info-panel') ,
                    'sider': () => import('./views/report/sider') 
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
                path: 'audit/case',
                components: {
                    'search-panel':  () => import('./views/audit/case/search-panel') ,
                    'info-panel':  () => import('./views/audit/case/result-panel') ,
                    'sider':  () => import('./views/audit/case/sider') 
                }
            },
            {
                path: 'audit/fees',
                components: {
                    'search-panel':  () => import('./views/audit/fees/search-panel') ,
                    'info-panel':  () => import('./views/audit/fees/result-panel') ,
                    'sider':  () => import('./views/audit/case/sider') 
                }
            },
            {
                path: 'audit/feibiao',
                components: {
                    'search-panel':  () => import('./views/audit/feibiao/search-panel') ,
                    'info-panel': () => import('./views/audit/feibiao/result-panel') ,
                    'sider':  () => import('./views/audit/case/sider')  
                }
            },
            {
                path: 'audit/wenda',
                components: {
                    'search-panel':  () => import('./views/audit/wenda/search-panel') ,
                    'info-panel': () => import('./views/audit/wenda/result-panel') ,
                    'sider':  () => import('./views/audit/case/sider')  
                }
            },
            {
                path: 'tax/law',
                components: {
                    'search-panel':  () => import('./views/tax/law/search-panel') ,
                    'info-panel': () => import('./views/tax/law/result-panel') ,
                    'sider':  () => import('./views/audit/case/sider')  
                }
            },
            {
                path: 'tax/wenda',
                components: {
                    'search-panel':  () => import('./views/tax/wenda/search-panel') ,
                    'info-panel': () => import('./views/tax/wenda/result-panel') ,
                    'sider':  () => import('./views/audit/case/sider')  
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
        path: '/audit/tools',
        component: () => import('./views/components/layout') ,
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