import {belongsTo, Entity, hasOne, model, property} from '@loopback/repository';
import {v4 as uuid} from 'uuid';
import {Customer, CustomerWithRelations} from './customer.model';
import {Role, RoleWithRelations} from './role.model';

@model()
export class User extends Entity {
  @property({
    type: 'string',
    id: true,
    default: () => uuid(),
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  username: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'string',
  })
  gender?: string;

  @belongsTo(() => Customer)
  customerId: string;

  @hasOne(() => Role)
  role: Role;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  customer?: CustomerWithRelations;
  role?: RoleWithRelations;
}

export type UserWithRelations = User & UserRelations;
