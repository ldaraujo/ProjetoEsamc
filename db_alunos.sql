create database db_alunos;

use db_alunos;

create table tb_cadastro(
	id int not null auto_increment primary key,
    nome varchar(255) not null,
    curso varchar(30) not null,
    nacionalidade varchar(20) not null,
    uf varchar(2) not null,
	cpf varchar(15) not null,
    dt_nasc date not null,
    sexo char(1) not null,
    email varchar(255)
);

select * from tb_cadastro;

insert into tb_cadastro (nome, rg, orgao, uf, cpf, dt_nasc, sexo, email) values ('Leonardo', '111222333', 'SSP', 'SP', '44455566677', '1998-11-11' ,'M','teste@gmail.com');


create table tb_cadprof(
	id int not null auto_increment primary key,
    nome varchar(255) not null,
    curso varchar(30) not null,
    telefone varchar(15) not null,
    uf varchar(2) not null,
	cpf varchar(15) not null,
    dt_admissao date not null,
    sexo char(1) not null,
    email varchar(255)
);

select * from tb_cadprof;

insert into tb_cadprof (nome, curso, telefone, uf, cpf, dt_admissao, sexo, email) 
values ('Leonardo', 'direito', '13998735765', 'SP', '44455566677', '2019-11-11' ,'M','teste@gmail.com');