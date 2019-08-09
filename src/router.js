import sharedComponents from './views/shared-components'
import {Main} from './views/login'
import IPOPage from "./views/IPO";
import auditDataPage from "./views/audit-data";
import punishPage from "./views/punish";
import casePage from "./views/case";
import toolsPage from "./views/tools";
import reportAPage from "./views/report-A"
const routers = [
    {
        path: '/',
        component: sharedComponents.layoutComponent,
        children:[
            {
                path: '',
                components: {
                    'search-panel':sharedComponents.searchPanel,
                    'info-panel':sharedComponents.infoPanel,
                    'sider':sharedComponents.siderPanel
                }
            },
            {
                path: 'report/A-stock',
                components: {
                    'search-panel':reportAPage.searchPanel,
                    'info-panel':reportAPage.infoPanel,
                    'sider':sharedComponents.siderPanel
                }
            },
            {
                path: 'IPO/:cat',
                components: {
                    'search-panel':IPOPage.searchPanel,
                    'info-panel':IPOPage.infoPanel
                }
            },
            {
                path: 'audit-data/case',
                components: {
                    'search-panel': casePage.searchPanel,
                    'info-panel': casePage.infoPanel,
                    'sider': casePage.siderPanel
                }
            },
            {
                path: 'audit-data/data-search',
                components: {
                    'search-panel': auditDataPage.searchPanel,
                    'info-panel':auditDataPage.infoPanel,
                    'sider':casePage.siderPanel
                }
            },
            {
                path: 'punish',
                components: {
                    'search-panel': punishPage.searchPanel,
                    'info-panel': punishPage.infoPanel,
                    'sider': punishPage.siderPanel
                }
            }
        ]
    },
    {
        path: '/login',
        component:Main
    },
    {
        path: '/tools',
        component:sharedComponents.layoutComponent,
        children:[
            {
                path: '',
                components:{
                    'search-panel':toolsPage.mainPanel,
                    'sider': toolsPage.siderPanel
                }
            },
            {
                path: 'package',
                components:{
                    'search-panel':toolsPage.packagePanel,
                    'sider': toolsPage.siderPanel
                }
            },
            
        ]
    }
];

export default routers;