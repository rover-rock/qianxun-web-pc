import Env from './env';

let config = {
    env: Env,
    // API_POINT: 'http://106.52.130.31:3000', //部署
    API_POINT: 'http://localhost:3000', //开发
    options:{
        shortcuts: [
            {
                text: '近一周', 
                value () {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    return [start, end];
                }
            },
            {
                text: '近一月',
                value () {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    return [start, end];
                }
            },
            {
                text: '近三月',
                value () {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    return [start, end];
                }
            },
            {
                text: '近半年',
                value () {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30 * 6);
                    return [start, end];
                }
            },
            {
                text: '近一年',
                value () {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
                    return [start, end];
                }
            },
            {
                text: '近三年',
                value () {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 365 * 3);
                    return [start, end];
                }
            },
            {
                text: '全部时间',
                value () {
                    const end = new Date();
                    const start = new Date('1990-01-01');
                    return [start, end];
                }
            }
        ]
    }
};
export default config;