import { HTTP } from '../../api/http.js'
class IndexModel extends HTTP {
    // 检验首页接口
    getGame() {
        return this.request({
            mock: 1,
            url: 'https://fastcheck.id-cas.cn/fastcheck/marketInfo.do?action=list',
            data: {

            }
        })
    }


}

export { IndexModel }