const routers = [
    {
        path: '/',
        component: () => import('./views/components/layout'),
        children: [
            {
                path: '',
                name: '_home',
                redirect: '/home'
            },
            {
                path: 'home',
                components: {
                    'search-panel': () => import('./views/home')
                }
            },
            {
                path: 'report/:type',
                name: 'Astock',
                components: {
                    'search-panel': () => import('./views/report/search-panel'),
                    'info-panel': () => import('./views/report/result-panel'),
                    'sider': () => import('./views/report/sider')
                }
            },
            {
                path: 'IPO/sanban',
                components: {
                    'search-panel': () => import('./views/IPO/sanban/search-panel'),
                    'info-panel': () => import('./views/IPO/sanban/result-panel')
                }
            },
            {
                path: 'IPO/kcb',
                components: {
                    'search-panel': () => import('./views/IPO/kcb/search-panel'),
                    'info-panel': () => import('./views/IPO/kcb/result-panel')
                }
            },
            {
                path: 'IPO/acquisition',
                components: {
                    'search-panel': () => import('./views/IPO/acquisition/search-panel'),
                    'info-panel': () => import('./views/IPO/acquisition/result-panel')
                }
            },
            {
                path: 'audit/case',
                components: {
                    'search-panel': () => import('./views/audit/case/search-panel'),
                    'info-panel': () => import('./views/audit/case/result-panel'),
                    'sider': () => import('./views/audit/case/sider')
                }
            },
            {
                path: 'audit/fees',
                components: {
                    'search-panel': () => import('./views/audit/fees/search-panel'),
                    'info-panel': () => import('./views/audit/fees/result-panel'),
                    'sider': () => import('./views/audit/case/sider')
                }
            },
            {
                path: 'audit/feibiao',
                components: {
                    'search-panel': () => import('./views/audit/feibiao/search-panel'),
                    'info-panel': () => import('./views/audit/feibiao/result-panel'),
                    'sider': () => import('./views/audit/case/sider')
                }
            },
            {
                path: 'audit/wenda',
                components: {
                    'search-panel': () => import('./views/audit/wenda/search-panel'),
                    'info-panel': () => import('./views/audit/wenda/result-panel'),
                    'sider': () => import('./views/audit/case/sider')
                }
            },
            {
                path: 'tax/law',
                components: {
                    'search-panel': () => import('./views/tax/law/search-panel'),
                    'info-panel': () => import('./views/tax/law/result-panel'),
                    'sider': () => import('./views/audit/case/sider')
                }
            },
            {
                path: 'tax/wenda',
                components: {
                    'search-panel': () => import('./views/tax/wenda/search-panel'),
                    'info-panel': () => import('./views/tax/wenda/result-panel'),
                    'sider': () => import('./views/audit/case/sider')
                }
            },
            {
                path: 'punish',
                components: {
                    'search-panel': () => import('./views/punish/search-panel'),
                    'info-panel': () => import('./views/punish/info-panel'),
                    'sider': () => import('./views/punish/sider-panel')
                }
            }
        ]
    },
    {
        path: '/401',
        name: 'error_401',
        meta: {
            hideInMenu: true
        },
        component: () => import('./views/error-page/401.vue')
    },
    {
        path: '/audit/tools',
        component: () => import('./views/components/layout'),
        children: [
            {
                path: '',
                components: {
                    'search-panel': () => import('./views/tools/main'),
                    'sider': () => import('./views/tools/sider')
                }
            },
            {
                path: 'package',
                components: {
                    'search-panel': () => import('./views/tools/package'),
                    'sider': () => import('./views/tools/sider')
                }
            },

        ]
    },
    {
        path: '/user',
        component: () => import('./views/components/layout'),
        children: [
            {
                path: 'config',
                components: {
                    'search-panel': () => import('./views/user/config')
                }
            },
            {
                path: 'message',
                components: {
                    'search-panel': () => import('./views/user/message')
                }
            }
        ]
    },
    {
        path: '/one-report/:id',
        component: () => import('./views/report/one-report.vue')
    }
];

export default routers;