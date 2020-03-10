
let config = {
    env: "production",
    API_POINT: 'http://106.52.130.31:3000', //部署
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
    },
    menu:[
        {
          name: "1",
          title: "公告检索",
          children: [
            {
              name: "1-1",
              to: "/report/Astock",
              title: "A股"
            },
            {
              name: "1-2",
              to: "/report/xinsan",
              title: "新三板"
            },
            {
              name: "1-4",
              to: "/company-basic",
              title: "上市公司基本信息"
            }
          ]
        },
        {
          name: "2",
          title: "IPO",
          children: [
            {
              name: "2-1",
              to: "/IPO/sanban",
              title: "主板、中小板、创业板排队"
            },
            {
              name: "2-2",
              to: "/IPO/kcb",
              title: "科创板排队"
            },
            {
              name: "2-3",
              to: "/IPO/acquisition",
              title: "并购重组排队"
            },
            {
              name: "2-4",
              to: "/IPO/zrz_queueing",
              title: "再融资排队"
            },
            {
              name: "2-5",
              to: "/IPO/failure_case",
              title: "IPO被否案例"
            },
            {
              name: "2-6",
              to: "/IPO/yupilu",
              title: "A股、科创板预披露"
            },
            {
              name: "2-7",
              to: "/IPO/yupilu",
              title: "科创板问询"
            },
            {
              name: "2-8",
              to: "/IPO/yupilu",
              title: "反馈意见（首次公开发行意见、并购重组、再融资）"
            },
            {
              name: "2-9",
              to: "/IPO/yupilu",
              title: "发审会公告（A股、并购重组、科创板）"
            },
            {
              name: "2-10",
              to: "/IPO/yupilu",
              title: "辅导信息"
            }

          ]
        },
        {
          name: "7",
          title: "审计数据",
          children: [
            {
              name: "7-1",
              to: "/audit/keyaudit",
              title: "关键审计事项"
            },
            {
              name: "7-2",
              to: "/audit/feibiao",
              title: "非标意见"
            },
            {
              name: "7-3",
              to: "/audit/fees",
              title: "审计收费"
            },
            {
              name: "7-6",
              to: "/audit/wenda",
              title: "投资者关注问题"
            },
            {
              name: "7-9",
              to: "/punish",
              title: "行政处罚"
            },
            {
              name: "7-4",
              to: "/audit/equity",
              title: "股权质押"
            },
            {
              name: "7-10",
              to: "/audit/repurchase",
              title: "股份回购"
            },
            {
              name: "7-12",
              to: "/audit/forecast",
              title: "业绩预告"
            },
            {
              name: "7-14",
              to: "/audit/disclosure",
              title: "财务报表披露日期"
            }
          ]
        },
        {
          name: "3-5",
          to: "/audit/tools",
          title: "审计工具"
        },
        {
          name: "10",
          title: "案例",
          children: [
            {
              name: "3-1",
              to: "/audit/case",
              title: "视野案例"
            },
            {
              name: "3-2",
              to: "/tax/wenda",
              title: "税务案例"
            }
          ]
        },
        {
          name: "9",
          title: "法规法库",
          children: [
            {
              name: "9-1",
              to: "/tax/law",
              title: "税务"
            },
            {
              name: "9-2",
              to: "/tax/zhunze",
              title: "财务与会计"
            }
          ]
        }
      ]
};
export default config;