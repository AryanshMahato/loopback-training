import {Getter, inject} from '@loopback/core';
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  repository,
} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Customer, User, UserRelations} from '../models';
import {CustomerRepository} from './customer.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {
  public readonly customer: BelongsToAccessor<
    Customer,
    typeof User.prototype.id
  >;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('CustomerRepository')
    protected customerRepositoryGetter: Getter<CustomerRepository>,
  ) {
    super(User, dataSource);
    this.customer = this.createBelongsToAccessorFor(
      'customer',
      customerRepositoryGetter,
    );
    this.registerInclusionResolver('customer', this.customer.inclusionResolver);
  }
}
