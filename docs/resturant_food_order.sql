/*
 
 0. OTP Auth
 1. show food items
 2. add food items to cart
 3. checkout cart >> place order without payment
 4. show all active orders to kitchen members
 5. make payment and close the order
 
 food_items_id
 cart_quantity 
 sub_total = food_items_id.price * quantity
 
 */
create database food_order_db;

use food_order_db;

create table food_item (
    id varchar(245) primary key not null,
    name varchar(199) not null,
    title varchar(199),
    sub_title varchar(99),
    summary text,
    type enum('veg', 'non-veg') not null, 
    in_stock smallint(255) not null,
    price decimal(19, 2) not null,
    img_id varchar(199),
    is_display boolean default true not null,
    food_category_id varchar(199),
    created_by varchar(128) not null default 'system',
    created_on timestamp not null default now(),
    updated_by varchar(128) not null default 'system',
    updated_on timestamp not null default now()
);

-- dish of the day, deserts, starters, coffee, etc
create table food_category (
    id varchar(245) primary key not null,
    name varchar(199) not null,
    summary varchar(199),
    created_by varchar(128) not null default 'system',
    created_on timestamp not null default now(),
    updated_by varchar(128) not null default 'system',
    updated_on timestamp not null default now()
);

create table cart (
    id varchar(245) not null,
    food_item_id varchar(128),
    quantity int(5) not null default 1,
    created_by varchar(128) not null default 'system',
    created_on timestamp not null default now(),
    updated_by varchar(128) not null default 'system',
    updated_on timestamp not null default now()
);

alter table
    cart
add
    constraint cart_fk_food_item_id foreign key (food_item_id) references food_item(id);

create table orders (
    id primary key not null,
    type enum('takeaway', 'dinein') not null,
    table_no int,
    customer_name varchar(199) not null,
    mobile varchar(199),
    is_open boolean default true not null,
    persons_in_table int,
    cart_id varchar(128),
    created_by varchar(128) not null default 'system',
    created_on timestamp not null default now(),
    updated_by varchar(128) not null default 'system',
    updated_on timestamp not null default now()
);

create table payment (
    id primary key not null,
    discount_percent,
    discount_price,
    sub_total,
    grand_total
);

create table img (
    id varchar(128) primary key,
    name varchar(128) NOT NULL default 'Upload',
    src longtext,
    ref varchar(128) not null,
    ref_type varchar(128),
    is_secure boolean default false
);