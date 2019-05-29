import dva from 'dva';
import './index.css';

// 1. Initialize
const app = dva();

// console.log('index.js');

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/global').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
