import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
export
@Entity()
class Photo {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  phone: string;
}
