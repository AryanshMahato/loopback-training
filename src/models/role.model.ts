import {Entity, model, property, hasMany} from '@loopback/repository';
import {v4 as uuid} from 'uuid';
import {RoleKey} from './role.enum';
import {User} from './user.model';

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
    jsonSchema: {
      enum: Object.values(RoleKey),
    },
  })
  key: RoleKey;

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

  @hasMany(() => User)
  users: User[];

  constructor(data?: Partial<Role>) {
    super(data);
  }
}

export interface RoleRelations {}

export type RoleWithRelations = Role & RoleRelations;
