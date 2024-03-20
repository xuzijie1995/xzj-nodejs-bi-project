// schema/Orders.js
cube(`Orders`, {
    sql_table: `bidata.bidata`,
  
    data_source: `default`,
    
    joins: {
      
    },
    
    measures: {
      count: {
        type: `count`
      }
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
      },
      status: {
        sql: `status`,
        type: `number`
      },
      statusDesc: {
        sql: `statusDesc`,
        type: `String`
      }
    }
  });