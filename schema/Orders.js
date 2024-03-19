// schema/Orders.js
cube(`Orders`, {
    sql: `SELECT * FROM orders`, // 定义查询数据的SQL语句
    
    measures: {
      count: {
        type: `count`,
        drillMembers: [id, createdAt]
      },
    },
    
    dimensions: {
      id: {
        sql: `id`,
        type: `number`,
        primaryKey: true
      },
      createdAt: {
        sql: `created_at`,
        type: `time`
      }
    }
  });