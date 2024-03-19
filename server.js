const express = require('express');
var CubejsServerCore = require('@cubejs-backend/server-core').CubejsServerCore;
const { CubejsApi } = require('@cubejs-client/core');
const bodyParser = require('body-parser');
const fetch = require('cross-fetch'); // 确保安装了 cross-fetch

const app = express();
require('dotenv').config();

// 创建Cube.js实例
const cubejsServer = CubejsServerCore.create();

app.use(require('cors')());
app.use(bodyParser.json({ limit: '50mb' }));


app.get('/', (req, res) => {
    res.send('Hello World!');
  });
  
// Cube.js的API端点
app.post('/cubejs-api/v1/load', (req, res) => {
    cubejsServer.apiGateway.load(
    req.body,
    { authInfo: cubejsServer.contextByReq(req) },
    req
    ).then((result) => res.json(result), (err) => res.status(500).json({ error: err.toString() }));
});

// 封装 /data 路由
app.get('/data', async (req, res) => {
    try {
        // 确保使用正确的方法来获取API对象，这里使用 cubejsServer 的api() 方法
        const api = cubejsServer.api();
        
        const resultSet = await api.load({
            measures: ['Orders.count'], // 修改为您的具体度量和维度
            timeDimensions: [],
            dimensions: []
        }, { authInfo: req.user }); // 适当调整以符合您的身份验证逻辑

        res.json(resultSet.rawData());
    } catch (error) {
        console.error('Error fetching data from Cube.js:', error);
        res.status(500).send('Failed to fetch data');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
