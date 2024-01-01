// 该服务为 vercel serve跨域处理
const {
    createProxyMiddleware
} = require('http-proxy-middleware')

module.exports = (req, res) => {
    let target = 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation'
    console.log(req.url);
    if (req.url.startsWith('/ai')) {
        target = 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation'
    }
    // 创建代理对象并转发请求
    createProxyMiddleware({
        target,
        changeOrigin: true,
    })(req, res)
}