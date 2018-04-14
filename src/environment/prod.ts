import { EnvironmentSchema } from './schema';

const env: EnvironmentSchema = {
  name: 'production',
};

env['reloadTag'] = (new Date).getMonth(); // reload every month.
export default env;
