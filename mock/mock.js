var Mock = require('mockjs')
import Config from "../src/config/config";
Mock.mock(Config.API_POINT + '/tool/package/get',
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
     [{
        status:0,
        msg:'',
        'result':{
            expName:'sf',
            'list|1-10':[{
            status:"sdfsdf",
            time:"2019-09"
        }]
        }
            
    }]
)
// 输出结果