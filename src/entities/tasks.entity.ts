import { Status } from "../enum/status.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Tasks {
    @PrimaryGeneratedColumn("uuid")
    taskId: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({
        default: Status.Incompleted,
    })
    status: Status;
}