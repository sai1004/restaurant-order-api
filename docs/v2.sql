create table food_category (
    id varchar(245) primary key,
    name varchar(199) not null,
    summary varchar(199),
    created_by varchar(128) not null default 'system',
    created_on timestamp not null default now(),
    updated_by varchar(128) not null default 'system',
    updated_on timestamp not null default now()
);

create table food_item (
    id varchar(245) primary key,
    name varchar(199) not null,
    title varchar(199),
    sub_title varchar(99),
    summary text,
    type enum('veg', 'non-veg') not null, 
    in_stock smallint not null,
    price decimal(10, 2) not null,
    img_id varchar(199),
    is_display boolean not null default true,
    food_category_id varchar(245),
    created_by varchar(128) not null default 'system',
    created_on timestamp not null default now(),
    updated_by varchar(128) not null default 'system',
    updated_on timestamp not null default now(),
    
    -- foreign key (food_category_id) references food_category(id),
    -- foreign key (img_id) references img(id)
);

alter table food_item
add constraint food_item_fk_category
foreign key (food_category_id) references food_category(id);

alter table food_item
add constraint food_item_fk_img
foreign key (img_id) references img(id);


create table img (
    id varchar(128) primary key,
    name varchar(128) not null default 'Upload',
    src longtext,
    ref varchar(128),
    ref_type varchar(128),
    is_secure boolean default false
);


create table cart (
    id varchar(245) primary key,
    created_by varchar(128) not null default 'system',
    created_on timestamp not null default now(),
    updated_by varchar(128) not null default 'system',
    updated_on timestamp not null default now()
);

create table cart_items (
    id varchar(245) primary key,
    cart_id varchar(245) not null,
    food_item_id varchar(245) not null,
    quantity int not null default 1,
    created_on timestamp not null default now(),
    
    foreign key (cart_id) references cart(id),
    foreign key (food_item_id) references food_item(id)
);


create table orders (
    id varchar(245) primary key,
    type enum('dinein') not null default 'dinein',
    table_no int,
    customer_name varchar(199) not null,
    mobile varchar(20),
    is_open boolean not null default true,
    persons_in_table int,
    cart_id varchar(245),
    order_status enum('pending', 'in-prep', 'served', 'completed', 'cancelled') default 'pending',
    created_by varchar(128) not null default 'system',
    created_on timestamp not null default now(),
    updated_by varchar(128) not null default 'system',
    updated_on timestamp not null default now(),
    
    foreign key (cart_id) references cart(id)
);


create table payment (
    id varchar(245) primary key,
    order_id varchar(245) not null,
    discount_percent decimal(5, 2) default 0.00,
    discount_price decimal(10, 2) default 0.00,
    sub_total decimal(10, 2) not null,
    grand_total decimal(10, 2) not null,
    payment_type enum('cash', 'card', 'upi') not null,
    payment_status enum('pending', 'paid', 'failed') default 'pending',
    paid_on timestamp default null,
    
    foreign key (order_id) references orders(id)
);


create table dining_table (
    table_no int primary key,
    capacity int not null,
    is_occupied boolean default false
);



-- 🍽️ Sample Inserts: food_category

insert into food_order_db.food_category (id, name, summary)
values
('cat001', 'Starters', 'Begin your meal with delicious starters'),
('cat002', 'Main Course', 'Filling and satisfying dishes'),
('cat003', 'Desserts', 'Sweet treats to finish your meal'),
('cat004', 'Beverages', 'Hot and cold drinks');


-- 🍲 Sample Inserts: food_item

insert into food_order_db.food_item (id, name, title, sub_title, summary, type, in_stock, price, food_category_id) values
('food001', 'Paneer Tikka', 'Grilled Paneer Tikka', 'Spicy & Grilled', 'Soft cottage cheese grilled with spices', 'veg', 10, 220.00, 'cat001'),
('food002', 'Butter Chicken', 'Classic Butter Chicken', 'Rich & Creamy', 'Creamy tomato gravy with tender chicken', 'non-veg', 8, 310.00, 'cat002'),
('food003', 'Chocolate Brownie', 'Chocolate Dessert', 'Warm & Gooey', 'Served with ice cream', 'veg', 5, 150.00, 'cat003'),
('food004', 'Masala Chai', 'Indian Tea', 'Hot Beverage', 'Strong tea with spices and milk', 'veg', 15, 40.00, 'cat004');


-- 🛒 Sample Inserts: cart and cart_items

insert into food_order_db.cart (id, created_by)
values ('cart001', 'user001');

insert into food_order_db.cart_items (id, cart_id, food_item_id, quantity)
values
('ci001', 'cart001', 'food001', 2),
('ci002', 'cart001', 'food003', 1);


-- 📋 Sample Insert: orders

insert into food_order_db.orders (id, type, table_no, customer_name, mobile, persons_in_table, cart_id, created_by)
values ('order001', 'dinein', 5, 'Rahul Sharma', '9876543210', 2, 'cart001', 'user001');


-- 💰 Sample Insert: payment

insert into food_order_db.payment (id, order_id, discount_percent, discount_price, sub_total, grand_total, payment_type, payment_status, paid_on)
values (
    'pay001', 'order001', 10.00, 37.00, 370.00, 333.00, 'upi', 'paid', now()
);


-- 🪑 Optional Insert: dining_table

insert into food_order_db.dining_table (table_no, capacity, is_occupied)
values 
(1, 2, false),
(2, 4, true),
(3, 6, false),
(5, 2, true);






