CREATE TABLE IF NOT EXISTS tb_ATRATIVOS (
	id INTEGER PRIMARY KEY,
	nome_atrativo VARCHAR(150) NOT NULL,
	descricao_atrativo VARCHAR(1000) NOT NULL,
	tipo_atrativo VARCHAR(150) NOT NULL,
	disponibilidade_atrativo VARCHAR(150) NOT NULL,
	taxas_atrativo VARCHAR(150) NOT NULL
);

INSERT INTO tb_ATRATIVOS (nome_atrativo,
descricao_atrativo,
tipo_atrativo,
disponibilidade_atrativo,
taxas_atrativo) VALUES ('Praia Litorânea',
'A Praia Litorânea é uma das mais visitadas e famosas de São Luís, é uma verdadeira beleza natural. Além da bela paisagem, essa praia possui uma escultura de serpente instagramável. E também conta com restaurantes, food trucks, bares, entre outras coisas.',
'Praia', 'Aberto todos os dias. 24h', 'Entrada Gratuita'
);

INSERT INTO tb_ATRATIVOS (nome_atrativo,
descricao_atrativo,
tipo_atrativo,
disponibilidade_atrativo,
taxas_atrativo) VALUES ('Parque do Rangedor',
'O Parque Estadual do Sítio do Rangedor é uma unidade de conservação brasileira localizada na cidade de São Luís. O parque conta com quadras de esporte, brinquedos para crianças, ciclovias, entre outras coisas.',
'Parque Ambiental', 'Aberto todos os dias. 05h até 22h', 'Entrada Gratuita'
); 

INSERT INTO tb_ATRATIVOS (nome_atrativo,
descricao_atrativo,
tipo_atrativo,
disponibilidade_atrativo,
taxas_atrativo) VALUES ('Museu do Palácio dos Leões',
'Palácio dos Leões é o edifício-sede do governo do estado Maranhão. Localiza-se no centro histórico da cidade de São Luís, na área designada Patrimônio Mundial pela UNESCO. Com uma história que começa no início do século XVII, o Palácio dos Leões é um dos maiores símbolos da cultura maranhense. Para conhecê-lo é necessário agendamento prévio.',
'Museu', 'Aberto de Terça a Domingo. Terça: 10h às 17h, Quarta a Domingo: 09h às 17h', 'Entrada Gratuita'
);

INSERT INTO tb_ATRATIVOS (nome_atrativo,
descricao_atrativo,
tipo_atrativo,
disponibilidade_atrativo,
taxas_atrativo) VALUES ('Teatro Arthur Azevedo',
'O Teatro Arthur Azevedo localiza-se na cidade de São Luís. Foi inaugurado em 1817, e em 1852 recebeu o nome de Teatro São Luiz e, na década de 1920, ganhou o nome atual em homenagem ao grande dramaturgo maranhense Artur de Azevedo.',
'Estrutura Histórica', 'Aberto de Terça a Domingo. 13h30 às 17h', 'Entrada Paga'
);

INSERT INTO tb_ATRATIVOS (nome_atrativo,
descricao_atrativo,
tipo_atrativo,
disponibilidade_atrativo,
taxas_atrativo) VALUES ('Espigão Costeiro',
'O Espigão Costeiro da Ponta da Areia é uma estrutura costeira que tem por finalidade principal proteger a costa da ação das ondas do mar, localizado em São Luís. O espigão possui 572 metros de extensão e 8 metros de altura.',
'Praia', 'Aberto Todos os dias. 24h', 'Entrada Gratuita'
);

INSERT INTO tb_ATRATIVOS (nome_atrativo,
descricao_atrativo,
tipo_atrativo,
disponibilidade_atrativo,
taxas_atrativo) VALUES ('Centro de Pesquisa de História Natural e Arqueologia do Maranhão',
'Fundado em março de 2002, esse centro tem como objetivo o estudo, valorização e preservação do acervo patrimonial maranhense, especificamente os recursos e bens arqueológicos, paleontológicos e a cultura material e tradições dos povos indígenas no Maranhão.',
'Museu', 'Aberto de Segunda a Sexta. Manhã 8h às 1h. Tarde 14h às 18h.', 'Entrada Gratuita'
);

CREATE TABLE IF NOT EXISTS tb_DESTINOS (
	id INTEGER PRIMARY KEY,
	nome_destino VARCHAR(150) NOT NULL,
	descricao_destino VARCHAR(1000) NOT NULL
);

INSERT INTO tb_DESTINOS (nome_destino, descricao_destino) VALUES ('São Luís',
'São Luís é a capital do estado do Maranhão, fundada no dia 8 de setembro de 1612. Localiza-se na ilha Upaon-Açu. É a principal cidade da Região Metropolitana Grande São Luís e possui 1.108.975 habitantes (Estimativa do IBGE, 2020). São Luís é a única cidade brasileira fundada pelos franceses, sendo uma das três capitais brasileiras localizadas em ilhas.');

INSERT INTO tb_DESTINOS (nome_destino, descricao_destino) VALUES ('Barreirinhas',
'Barreirinhas é um município brasileiro do estado do Maranhão. O município é conhecido como "Portal dos Lençóis maranhenses" pelo fato de ser a principal base de acesso ao Parque nacional dos Lençóis Maranhenses, uma região turística que consiste numa vasta área de altas dunas de areias brancas e de lagos e lagoas.');

INSERT INTO tb_DESTINOS (nome_destino, descricao_destino) VALUES ('Caxias',
'Caxias é a quinta mais populosa cidade do estado do Maranhão, com uma população de 156 970 habitantes, conforme dados do IBGE de 2022. É um dos maiores centros econômicos do estado graças a seu grande desempenho industrial, e um importante centro político, cultural e populacional do estado do Maranhão.');

