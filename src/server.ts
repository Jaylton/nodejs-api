import { app } from './app';
import { env } from './env';

app.listen({
  port: env.PORT,
}).then(() => {
  console.log('HTTP runnig on port 3000');
});