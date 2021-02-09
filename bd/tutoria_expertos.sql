create database tutorias_expertos character set="utf8mb4" collate="utf8mb4_unicode_ci";
use tutorias_expertos;

create table if not exists user (
id int unsigned auto_increment primary key,
email varchar(50) not null unique,
user_name varchar(50) not null,
password varchar(30) not null,
name varchar(50) not null,
surname varchar(50) not null,
second_surname varchar(50),
role enum('student', 'expert', 'admin'),
birth_date date not null,
country varchar(50) not null,
avatar tinyblob,
skills set ('html', 'css', 'javascript', 'sql') not null,
last_conection timestamp not null,
status tinyint default 0,
registration_date timestamp not null,
email_validation boolean,

creation_date timestamp default current_timestamp,
update_date timestamp default current_timestamp on update current_timestamp

);

create table if not exists question (
id int unsigned auto_increment primary key,
id_user int unsigned,
title varchar (200) not null,
body varchar (3000) not null,
file varchar(500),
language set ('html', 'css', 'javascript', 'sql') not null,
tag varchar (200) ,
publish_date timestamp not null,
status enum ('open', 'pending', 'closed'),
close_date date,
views int unsigned,
table_creation_date date,

creation_date timestamp default current_timestamp,
update_date timestamp default current_timestamp on update current_timestamp,

constraint question_iduser_fk1
	foreign key (id_user) references user (id) on delete set null	

);

create table if not exists answer (
id int unsigned auto_increment primary key,
id_question int unsigned,
id_user int unsigned,
author varchar (100) not null,
body text not null,
file varchar(500),
publish_date timestamp not null,

creation_date timestamp default current_timestamp,
update_date timestamp default current_timestamp on update current_timestamp,

constraint answer_id_question_fk1
foreign key(id_question) references question (id) on delete set null,
constraint answer_id_user_fk2
foreign key(id_user) references user (id) on delete set null

);

create table if not exists votes (
id int unsigned auto_increment primary key,
id_answer int unsigned,
id_user int unsigned,
value tinyint,

creation_date timestamp default current_timestamp,
update_date timestamp default current_timestamp on update current_timestamp,
	
constraint votes_id_answer_fk1
	foreign key(id_answer) references answer(id) on delete cascade,
constraint votes_id_user_fk2
	foreign key(id_user) references user(id) on delete cascade 

);




