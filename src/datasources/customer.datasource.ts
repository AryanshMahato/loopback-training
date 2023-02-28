import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'Customer',
  connector: 'postgresql',
  url: 'postgres://username:password@localhost:5454/sourcefuse-training',
  host: 'localhost',
  port: 5454,
  user: 'username',
  password: 'password',
  database: 'sourcefuse-training'
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class CustomerDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'Customer';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.Customer', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
