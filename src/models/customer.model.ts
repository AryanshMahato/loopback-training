import {Entity, hasMany, model, property} from '@loopback/repository';
import {v4 as uuid} from 'uuid';
import {User, UserWithRelations} from './user.model';

@model()
export class Customer extends Entity {
  @property({
    type: 'string',
    id: true,
    default: () => uuid(),
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
  })
  website?: string;

  @property({
    type: 'string',
  })
  address?: string;

  @hasMany(() => User)
  users: User[];

  constructor(data?: Partial<Customer>) {
    super(data);
  }
}

export interface CustomerRelations {
  users?: UserWithRelations[];
}

export type CustomerWithRelations = Customer & CustomerRelations;
