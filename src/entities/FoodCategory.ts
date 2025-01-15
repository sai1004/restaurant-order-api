import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("food_category")
export class FoodCategory {
    @PrimaryColumn({ name: "id" })
    id: string = "";

    @Column({ name: "name" })
    name: string = "";

    @Column({ name: "summary" })
    summary: string = "";

    @Column({ name: "created_by" })
    createdBy: string = "";

    @Column({ name: "created_on" })
    createdOn: Date = new Date();

    @Column({ name: "updated_by" })
    updatedBy: string = "";

    @Column({ name: "updated_on" })
    updatedOn: Date = new Date();
}
