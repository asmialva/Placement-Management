create database asmi_placement;
use asmi_placement;

CREATE TABLE Contacts (
    ContactID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(50) NOT NULL,
    Email VARCHAR(100),
    Subject VARCHAR(20),
    Message VARCHAR(255)
);
create table Company (
CompanyID int primary key auto_increment,
Name varchar(20),
Mail varchar(50),
website varchar(25),
Package INT,
description text,
gpa_range_min int, gpa_range_max int, 
Domain varchar(30),
interview_date date,
accepted int default 0
);
insert into company values(2,'dddd','ddddd','dddd','1','dsfa',2,4,'fasdfa',null,null);

create table student(
usn char(10) primary key ,
name varchar(20),
mail varchar(50),
password varchar(20),
gpa decimal(10,2),
phone varchar(15),
current_sem int
);

insert into student values('4sn21ai00w','asdfsa','dasfads','fdasf',324.3,'fasdfa',2);
select * from student;

create table admins(
id int primary key,
username varchar(25),
password varchar(25)
);

create table student_company(
usn char(10),
company int,
accepted boolean,
constraint student_company_user_fk foreign key (usn) references student(usn) on delete cascade,
constraint student_company_company_fk foreign key(company) references company(CompanyID) on delete cascade
);

select * from company;
