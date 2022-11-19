import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'
import IUser from '@modules/users/domain/models/IUser'

@Entity('users')
class User implements IUser {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column()
	name: string

	@Column()
	email: string

	@Column()
	password: string

	@Column()
	avatar: string

	@CreateDateColumn()
	created_at: Date

	@CreateDateColumn()
	updated_at: Date
}

export default User
