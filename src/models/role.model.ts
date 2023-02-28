import {belongsTo, Entity, model, property} from '@loopback/repository';
import {User, UserWithRelations} from '.';
import {v4 as uuid} from 'uuid';

@model()
export class Role extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  key: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @property({
    type: 'string',
    id: true,
    default: () => uuid(),
  })
  id: string;

  @belongsTo(() => User)
  userId: string;

  constructor(data?: Partial<Role>) {
    super(data);
  }
}

export interface RoleRelations {
  user?: UserWithRelations;
}

export type RoleWithRelations = Role & RoleRelations;
