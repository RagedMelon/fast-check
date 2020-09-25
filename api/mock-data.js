// 模拟数据
var Mock = require('mock.js') //模拟数据

function mockData(mockType) {
  if (mockType == 1) {
    var res = Mock.mock(json[0]) // 模拟数据发回数组
  } else if (mockType == 2) {
    var res = Mock.mock(json[1]) // 模拟数据发回对象
  }
  return res
}
const json = [
  // 数组
  {
    'error_code': 0,
    'error_msg': '成功',
    'data|10': [{
      'id|+1': 1,
      'img': "@image('200x100', '#4A7BF7','#fff','pic')", //相片
      'title': '@ctitle(3,8)', //标题
      'city': "@county(true)", //城市
      'stock_num': '@integer(0,100)', //库存数量  
      'marketing_start': '@datetime()',
      'marketing_stop': '@now()',
      'price': '@integer(100,2000)', //现价，单位：分  
      'original_price': '@integer(100,3000)'
    }]
  },
  // 对象
  {
    'error_code': 0,
    'error_msg': '成功',
    'data': {
      'id': 1,
      'img': "@image('200x100', '#4A7BF7','#fff','pic')", //相片
      'title': '@ctitle(3,8)', //标题
      'city': "@county(true)", //城市
      'stock_num': '@integer(0,100)', //库存数量  
      'marketing_start': '@datetime()',
      'marketing_stop': '@now()',
      'price': '@integer(100,2000)', //现价，单位：分  
      'original_price': '@integer(100,3000)'
    }
  }
]
export { mockData }