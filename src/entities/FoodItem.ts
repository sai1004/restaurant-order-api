import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("food_item")
export class FoodItem {
    @PrimaryColumn({ name: "id" })
    id: string = "";

    @Column({ name: "name" })
    name: string = "";

    @Column({ name: "title" })
    title: string = "";

    @Column({ name: "sub_title" })
    subTitle: string = "";

    @Column({ name: "summary" })
    summary: string = "";

    @Column({ name: "in_stock" })
    inStock: number = 0;

    @Column({ name: "price" })
    price: number = 0;

    @Column({ name: "img_id" })
    imgId: string = "";

    @Column({ name: "is_display" })
    isDisplay: boolean = false;

    @Column({ name: "food_category_id" })
    foodCategoryId: string = "";

    @Column({ name: "created_by" })
    createdBy: string = "";

    @Column({ name: "created_on" })
    createdOn: Date = new Date();

    @Column({ name: "updated_by" })
    updatedBy: string = "";

    @Column({ name: "updated_on" })
    updatedOn: Date = new Date();
}
