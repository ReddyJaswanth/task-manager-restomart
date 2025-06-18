import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

export enum TaskStatus {
    TODO = "todo",
    IN_PROGRESS = "in_progress",
    DONE = "done"
}

@Entity()
export class Task {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar", length: 255 })
    title: string;

    @Column({ type: "text", nullable: true })
    description: string;

    @Column({
        type: "varchar",
        enum: TaskStatus,
        default: TaskStatus.TODO
    })
    status: TaskStatus;

    @Column({ type: "datetime", nullable: true })
    dueDate: Date | null;

    @CreateDateColumn({ type: "datetime" })
    createdAt: Date;

    @UpdateDateColumn({ type: "datetime" })
    updatedAt: Date;
} 