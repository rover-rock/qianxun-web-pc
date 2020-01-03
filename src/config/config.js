
let config = {
    env: "production",
    API_POINT: 'http://106.52.130.31:3000', //部署
    // API_POINT: 'http://localhost:3000', //开发
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
              to: "/IPO/kechuangban",
              title: "科创板排队"
            },
            {
              name: "2-3",
              to: "/IPO/acquisition_queueing",
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
            }
          ]
        },
        {
          name: "7",
          title: "审计数据",
          children: [
            {
              name: "7-1",
              to: "",
              title: "关键审计事项查询"
            },
            {
              name: "7-2",
              to: "/audit/feibiao",
              title: "非标意见具体内容查询"
            },
            {
              name: "7-3",
              to: "/audit/fees",
              title: "审计收费查询"
            },
            {
              name: "7-5",
              to: "/audit/case",
              title: "券商研报关键词查询"
            },
            {
              name: "7-6",
              to: "/audit/wenda",
              title: "投资者关注问题查询"
            },
            {
              name: "7-9",
              to: "/punish",
              title: "行政处罚"
            },
            {
              name: "7-7",
              to: "/audit/case",
              title: "关联方核查功能"
            },
            {
              name: "7-8",
              to: "/audit/case",
              title: "研发资本化比例查询"
            },
            {
              name: "7-10",
              to: "/audit/case",
              title: "公司负面信息检索"
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
          title: "准则及案例",
          children: [
            {
              name: "3-2",
              to: "",
              title: "联动指标剖析"
            },
            {
              name: "3-4",
              to: "/audit/case",
              title: "会计审计处理及案例查询"
            }
          ]
        },
        {
          name: "8",
          title: "财务分析",
          children: [
            {
              name: "8-2",
              to: "",
              title: "会计审计准则及应用指南查询"
            },
            {
              name: "8-3",
              to: "",
              title: "会计审计处理及案例查询"
            },
            {
              name: "8-4",
              to: "",
              title: "核心财务数据分析"
            },
            {
              name: "8-5",
              to: "",
              title: "财务失真识别"
            },
            {
              name: "8-6",
              to: "",
              title: "财务危机预警"
            }
          ]
        },
        {
          name: "11",
          title: "IT咨询",
          children: [
            {
              name: "11-1",
              to: "/tax/law",
              title: "案例"
            },
            {
              name: "11-2",
              to: "/tax/wenda",
              title: "服务范围"
            }
          ]
        },
        {
          name: "9",
          title: "税后法规及案例",
          children: [
            {
              name: "9-1",
              to: "/tax/law",
              title: "法规查询"
            },
            {
              name: "9-2",
              to: "/tax/wenda",
              title: "税后案例查询"
            }
          ]
        },
        {
          name: "6",
          title: "财经资讯",
          to: "/news"
        }
      ]
};
export default config;