/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-10 16:27:14
 * @LastEditTime: 2019-08-30 19:03:41
 * @LastEditors: Please set LastEditors
 */
import dva from 'dva';
import './index.css';

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/start').default);
app.model(require('./models/seat').default);
app.model(require('./models/menu').default);
app.model(require('./models/order').default);
app.model(require('./models/shopcart').default);
app.model(require('./models/customer').default);
app.model(require('./models/menuDetail').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
