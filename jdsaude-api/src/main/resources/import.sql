-- ============================================================
-- JD SAÚDE — import.sql
-- Spring Boot roda este arquivo automaticamente na inicialização
-- (spring.sql.init.mode=always + spring.jpa.defer-datasource-initialization=true)
-- ============================================================

-- ── PESSOAS (pacientes nas primeiras linhas, profissionais nas últimas) ───
INSERT INTO tb_pessoa (nome, email, cpf) VALUES ('Maria Aparecida Santos',   'maria.santos@email.com',     '11122233344');
INSERT INTO tb_pessoa (nome, email, cpf) VALUES ('João Carlos Pereira',      'joao.pereira@email.com',     '22233344455');
INSERT INTO tb_pessoa (nome, email, cpf) VALUES ('Lucia Ferreira Lima',      'lucia.lima@email.com',       '33344455566');
INSERT INTO tb_pessoa (nome, email, cpf) VALUES ('Pedro Henrique Alves',     'pedro.alves@email.com',      '44455566677');
INSERT INTO tb_pessoa (nome, email, cpf) VALUES ('Roberto Oliveira Souza',   'roberto.oliveira@email.com', '55566677788');
INSERT INTO tb_pessoa (nome, email, cpf) VALUES ('Fernanda Costa Rocha',     'fernanda.costa@email.com',   '66677788899');
-- Profissionais (id 7–10 após inserção sequencial)
INSERT INTO tb_pessoa (nome, email, cpf) VALUES ('Dr. Carlos Eduardo Silva', 'carlos.silva@jdsaude.com',   '77788899900');
INSERT INTO tb_pessoa (nome, email, cpf) VALUES ('Dra. Ana Paula Souza',     'ana.souza@jdsaude.com',      '88899900011');
INSERT INTO tb_pessoa (nome, email, cpf) VALUES ('Enf. Fernando Lima',       'fernando.lima@jdsaude.com',  '99900011122');
INSERT INTO tb_pessoa (nome, email, cpf) VALUES ('Enf. Juliana Costa',       'juliana.costa@jdsaude.com',  '00011122233');

-- ── MEDICAMENTOS ─────────────────────────────────────────────────────────
INSERT INTO tb_medicamento (nome, descricao) VALUES ('Dipirona 500mg',     'Analgésico e antitérmico — uso adulto');
INSERT INTO tb_medicamento (nome, descricao) VALUES ('Paracetamol 750mg',  'Analgésico e antitérmico — uso adulto');
INSERT INTO tb_medicamento (nome, descricao) VALUES ('Ibuprofeno 600mg',   'Anti-inflamatório, analgésico e antitérmico');
INSERT INTO tb_medicamento (nome, descricao) VALUES ('Amoxicilina 500mg',  'Antibiótico de amplo espectro — penicilina');
INSERT INTO tb_medicamento (nome, descricao) VALUES ('Losartana 50mg',     'Anti-hipertensivo — bloqueador do receptor de angiotensina');
INSERT INTO tb_medicamento (nome, descricao) VALUES ('Metformina 850mg',   'Hipoglicemiante oral — tratamento diabetes tipo 2');
INSERT INTO tb_medicamento (nome, descricao) VALUES ('Omeprazol 20mg',     'Inibidor da bomba de prótons — úlcera e refluxo');
INSERT INTO tb_medicamento (nome, descricao) VALUES ('Atenolol 25mg',      'Betabloqueador — hipertensão e arritmias');
INSERT INTO tb_medicamento (nome, descricao) VALUES ('Azitromicina 500mg', 'Antibiótico macrolídeo — infecções respiratórias');
INSERT INTO tb_medicamento (nome, descricao) VALUES ('Prednisona 20mg',    'Corticosteroide — processos inflamatórios e alérgicos');
INSERT INTO tb_medicamento (nome, descricao) VALUES ('Captopril 25mg',     'Inibidor da ECA — hipertensão e insuficiência cardíaca');
INSERT INTO tb_medicamento (nome, descricao) VALUES ('Sinvastatina 20mg',  'Estatina — hipercolesterolemia');
INSERT INTO tb_medicamento (nome, descricao) VALUES ('Dexametasona 4mg',   'Corticosteroide — inflamação e edema');
INSERT INTO tb_medicamento (nome, descricao) VALUES ('Cetirizina 10mg',    'Anti-histamínico — rinite alérgica e urticária');
INSERT INTO tb_medicamento (nome, descricao) VALUES ('Salbutamol 100mcg',  'Broncodilatador — asma e DPOC');

-- ── ESPECIALIZAÇÕES ──────────────────────────────────────────────────────
INSERT INTO especializacao (descricao) VALUES ('Clínico Geral');
INSERT INTO especializacao (descricao) VALUES ('Cardiologia');
INSERT INTO especializacao (descricao) VALUES ('Ortopedia');
INSERT INTO especializacao (descricao) VALUES ('Pediatria');
INSERT INTO especializacao (descricao) VALUES ('Dermatologia');
INSERT INTO especializacao (descricao) VALUES ('Enfermagem Geral');
INSERT INTO especializacao (descricao) VALUES ('Enfermagem UTI');

-- ── VÍNCULOS PROFISSIONAL × ESPECIALIZAÇÃO ───────────────────────────────
-- Dr. Carlos (pessoa 7): Clínico Geral + Cardiologia
-- Dra. Ana   (pessoa 8): Cardiologia
-- Enf. Fernando (pessoa 9): Enfermagem Geral
-- Enf. Juliana  (pessoa 10): Enfermagem Geral + UTI
INSERT INTO pessoa_especializacao (id_pessoa_profissional, id_especializacao) VALUES (7, 1);
INSERT INTO pessoa_especializacao (id_pessoa_profissional, id_especializacao) VALUES (7, 2);
INSERT INTO pessoa_especializacao (id_pessoa_profissional, id_especializacao) VALUES (8, 2);
INSERT INTO pessoa_especializacao (id_pessoa_profissional, id_especializacao) VALUES (9, 6);
INSERT INTO pessoa_especializacao (id_pessoa_profissional, id_especializacao) VALUES (10, 6);
INSERT INTO pessoa_especializacao (id_pessoa_profissional, id_especializacao) VALUES (10, 7);

-- ── ATENDIMENTOS ─────────────────────────────────────────────────────────
-- Hoje
INSERT INTO atendimento (data_registro, data_realizacao, situacao, id_pessoa_paciente, id_pessoa_profissional) VALUES (CURDATE(), CURDATE(), 'AGENDADO',     1, 7);
INSERT INTO atendimento (data_registro, data_realizacao, situacao, id_pessoa_paciente, id_pessoa_profissional) VALUES (CURDATE(), CURDATE(), 'AGENDADO',     2, 8);
INSERT INTO atendimento (data_registro, data_realizacao, situacao, id_pessoa_paciente, id_pessoa_profissional) VALUES (CURDATE(), CURDATE(), 'EM_ANDAMENTO', 3, 7);
INSERT INTO atendimento (data_registro, data_realizacao, situacao, id_pessoa_paciente, id_pessoa_profissional) VALUES (CURDATE(), CURDATE(), 'EM_ANDAMENTO', 4, 9);
INSERT INTO atendimento (data_registro, data_realizacao, situacao, id_pessoa_paciente, id_pessoa_profissional) VALUES (CURDATE(), CURDATE(), 'CONCLUIDO',    5, 8);
INSERT INTO atendimento (data_registro, data_realizacao, situacao, id_pessoa_paciente, id_pessoa_profissional) VALUES (CURDATE(), CURDATE(), 'CANCELADO',    6, 10);
-- Ontem
INSERT INTO atendimento (data_registro, data_realizacao, situacao, id_pessoa_paciente, id_pessoa_profissional) VALUES (DATE_SUB(CURDATE(),INTERVAL 1 DAY), DATE_SUB(CURDATE(),INTERVAL 1 DAY), 'CONCLUIDO', 1, 7);
INSERT INTO atendimento (data_registro, data_realizacao, situacao, id_pessoa_paciente, id_pessoa_profissional) VALUES (DATE_SUB(CURDATE(),INTERVAL 1 DAY), DATE_SUB(CURDATE(),INTERVAL 1 DAY), 'CONCLUIDO', 2, 9);
INSERT INTO atendimento (data_registro, data_realizacao, situacao, id_pessoa_paciente, id_pessoa_profissional) VALUES (DATE_SUB(CURDATE(),INTERVAL 1 DAY), DATE_SUB(CURDATE(),INTERVAL 1 DAY), 'CANCELADO', 3, 8);
-- 3 dias atrás
INSERT INTO atendimento (data_registro, data_realizacao, situacao, id_pessoa_paciente, id_pessoa_profissional) VALUES (DATE_SUB(CURDATE(),INTERVAL 3 DAY), DATE_SUB(CURDATE(),INTERVAL 3 DAY), 'CONCLUIDO', 4, 7);
INSERT INTO atendimento (data_registro, data_realizacao, situacao, id_pessoa_paciente, id_pessoa_profissional) VALUES (DATE_SUB(CURDATE(),INTERVAL 3 DAY), DATE_SUB(CURDATE(),INTERVAL 3 DAY), 'CONCLUIDO', 5, 8);
INSERT INTO atendimento (data_registro, data_realizacao, situacao, id_pessoa_paciente, id_pessoa_profissional) VALUES (DATE_SUB(CURDATE(),INTERVAL 3 DAY), DATE_SUB(CURDATE(),INTERVAL 3 DAY), 'CONCLUIDO', 6, 10);
-- 7 dias atrás
INSERT INTO atendimento (data_registro, data_realizacao, situacao, id_pessoa_paciente, id_pessoa_profissional) VALUES (DATE_SUB(CURDATE(),INTERVAL 7 DAY), DATE_SUB(CURDATE(),INTERVAL 7 DAY), 'CONCLUIDO', 1, 9);
INSERT INTO atendimento (data_registro, data_realizacao, situacao, id_pessoa_paciente, id_pessoa_profissional) VALUES (DATE_SUB(CURDATE(),INTERVAL 7 DAY), DATE_SUB(CURDATE(),INTERVAL 7 DAY), 'CONCLUIDO', 2, 7);
INSERT INTO atendimento (data_registro, data_realizacao, situacao, id_pessoa_paciente, id_pessoa_profissional) VALUES (DATE_SUB(CURDATE(),INTERVAL 7 DAY), DATE_SUB(CURDATE(),INTERVAL 7 DAY), 'CANCELADO', 4, 8);
-- 14 dias atrás
INSERT INTO atendimento (data_registro, data_realizacao, situacao, id_pessoa_paciente, id_pessoa_profissional) VALUES (DATE_SUB(CURDATE(),INTERVAL 14 DAY), DATE_SUB(CURDATE(),INTERVAL 14 DAY), 'CONCLUIDO', 5, 7);
INSERT INTO atendimento (data_registro, data_realizacao, situacao, id_pessoa_paciente, id_pessoa_profissional) VALUES (DATE_SUB(CURDATE(),INTERVAL 14 DAY), DATE_SUB(CURDATE(),INTERVAL 14 DAY), 'CONCLUIDO', 6, 8);
INSERT INTO atendimento (data_registro, data_realizacao, situacao, id_pessoa_paciente, id_pessoa_profissional) VALUES (DATE_SUB(CURDATE(),INTERVAL 14 DAY), DATE_SUB(CURDATE(),INTERVAL 14 DAY), 'CONCLUIDO', 3, 9);
-- Futuros
INSERT INTO atendimento (data_registro, data_realizacao, situacao, id_pessoa_paciente, id_pessoa_profissional) VALUES (CURDATE(), DATE_ADD(CURDATE(),INTERVAL 1 DAY), 'AGENDADO', 1, 7);
INSERT INTO atendimento (data_registro, data_realizacao, situacao, id_pessoa_paciente, id_pessoa_profissional) VALUES (CURDATE(), DATE_ADD(CURDATE(),INTERVAL 1 DAY), 'AGENDADO', 3, 8);
INSERT INTO atendimento (data_registro, data_realizacao, situacao, id_pessoa_paciente, id_pessoa_profissional) VALUES (CURDATE(), DATE_ADD(CURDATE(),INTERVAL 2 DAY), 'AGENDADO', 2, 9);
INSERT INTO atendimento (data_registro, data_realizacao, situacao, id_pessoa_paciente, id_pessoa_profissional) VALUES (CURDATE(), DATE_ADD(CURDATE(),INTERVAL 2 DAY), 'AGENDADO', 4, 10);
INSERT INTO atendimento (data_registro, data_realizacao, situacao, id_pessoa_paciente, id_pessoa_profissional) VALUES (CURDATE(), DATE_ADD(CURDATE(),INTERVAL 5 DAY), 'AGENDADO', 5, 7);
INSERT INTO atendimento (data_registro, data_realizacao, situacao, id_pessoa_paciente, id_pessoa_profissional) VALUES (CURDATE(), DATE_ADD(CURDATE(),INTERVAL 7 DAY), 'AGENDADO', 6, 8);

-- ── TRIAGENS ─────────────────────────────────────────────────────────────
-- Referência: atendimento 1=hoje/Maria/Carlos, 2=hoje/João/Ana, 3=hoje/Lucia/Carlos, 4=hoje/Pedro/Fernando
-- 7=ontem/Maria/Carlos, 8=ontem/João/Fernando, 10=3dias/Pedro/Carlos, 12=3dias/Fernanda/Juliana
INSERT INTO triagem (data_registro, descricao, id_atendimento, id_pessoa_profissional) VALUES (NOW(), 'PA: 148/96 | FC: 88bpm | Temp: 36.7C | SpO2: 97% | Peso: 74kg | Queixa: cefaleia e tontura',             1,  9);
INSERT INTO triagem (data_registro, descricao, id_atendimento, id_pessoa_profissional) VALUES (NOW(), 'PA: 130/85 | FC: 95bpm | Temp: 37.6C | SpO2: 98% | Peso: 82kg | Queixa: dor de garganta ha 3 dias',      2,  10);
INSERT INTO triagem (data_registro, descricao, id_atendimento, id_pessoa_profissional) VALUES (NOW(), 'PA: 125/80 | FC: 102bpm | Temp: 38.1C | SpO2: 96% | Peso: 61kg | Queixa: tosse seca e falta de ar',      3,  9);
INSERT INTO triagem (data_registro, descricao, id_atendimento, id_pessoa_profissional) VALUES (NOW(), 'PA: 120/78 | FC: 76bpm | Temp: 36.5C | SpO2: 99% | Peso: 90kg | Queixa: dor lombar cronica',             4,  10);
INSERT INTO triagem (data_registro, descricao, id_atendimento, id_pessoa_profissional) VALUES (DATE_SUB(NOW(),INTERVAL 1 DAY), 'PA: 150/100 | FC: 91bpm | Temp: 36.8C | SpO2: 97% | Queixa: palpitacoes',     7,  9);
INSERT INTO triagem (data_registro, descricao, id_atendimento, id_pessoa_profissional) VALUES (DATE_SUB(NOW(),INTERVAL 1 DAY), 'PA: 118/76 | FC: 84bpm | Temp: 37.2C | SpO2: 98% | Queixa: cansaco excessivo', 8,  10);
INSERT INTO triagem (data_registro, descricao, id_atendimento, id_pessoa_profissional) VALUES (DATE_SUB(NOW(),INTERVAL 3 DAY), 'PA: 135/88 | FC: 78bpm | Temp: 36.6C | SpO2: 98% | Queixa: dor no joelho',    10, 9);
INSERT INTO triagem (data_registro, descricao, id_atendimento, id_pessoa_profissional) VALUES (DATE_SUB(NOW(),INTERVAL 3 DAY), 'PA: 122/80 | FC: 73bpm | Temp: 36.4C | SpO2: 99% | Queixa: manchas na pele',  12, 10);

-- ── DIAGNÓSTICOS ─────────────────────────────────────────────────────────
-- Apenas atendimentos CONCLUIDOS recebem diagnóstico (ids: 5, 7, 8, 10, 11, 12, 13, 14, 16, 17, 18)
INSERT INTO diagnostico (descricao, id_atendimento) VALUES ('Hipertensão arterial sistêmica leve — PA 145/95. Controle alimentar e atividade física recomendados.', 5);
INSERT INTO diagnostico (descricao, id_atendimento) VALUES ('Infecção viral das vias aéreas superiores — faringite aguda. Repouso e hidratação.',                   7);
INSERT INTO diagnostico (descricao, id_atendimento) VALUES ('Diabetes mellitus tipo 2 — glicemia em jejum 145 mg/dL. Ajuste medicamentoso necessário.',             8);
INSERT INTO diagnostico (descricao, id_atendimento) VALUES ('Lombalgia crônica — dor lombar inespecífica. Fisioterapia indicada.',                                  10);
INSERT INTO diagnostico (descricao, id_atendimento) VALUES ('Arritmia cardíaca leve — ECG com extrassístoles atriais. Holter de 24h solicitado.',                   11);
INSERT INTO diagnostico (descricao, id_atendimento) VALUES ('Dermatite atópica — lesões eritematosas em membros superiores.',                                       12);
INSERT INTO diagnostico (descricao, id_atendimento) VALUES ('Infecção do trato urinário — urocultura positiva para E. coli. Antibioticoterapia iniciada.',          13);
INSERT INTO diagnostico (descricao, id_atendimento) VALUES ('Consulta de rotina — exames laboratoriais dentro da normalidade.',                                     14);
INSERT INTO diagnostico (descricao, id_atendimento) VALUES ('Pneumonia bacteriana leve — consolidação em lobo inferior direito no RX.',                             16);
INSERT INTO diagnostico (descricao, id_atendimento) VALUES ('Transtorno de ansiedade generalizada — encaminhamento para psicologia e psiquiatria.',                 17);
INSERT INTO diagnostico (descricao, id_atendimento) VALUES ('Tendinite no ombro direito — ultrassonografia sugere lesão parcial do manguito rotador.',              18);

-- ── RECEITAS ─────────────────────────────────────────────────────────────
-- Losartana p/ HAS (atend 5), Dipirona+Paracetamol p/ faringite (atend 7)
-- Metformina+Atenolol p/ diabetes (atend 8), Ibuprofeno p/ lombalgia (atend 10)
-- Captopril p/ arritmia (atend 11), Omeprazol+Amoxicilina p/ ITU (atend 13)
-- Azitromicina+Prednisona+Sinvastatina p/ pneumonia (atend 16), Dipirona+Ibuprofeno p/ tendinite (atend 18)
INSERT INTO receita (descricao, id_atendimento, id_medicamento) VALUES ('1 comprimido de 12 em 12h — uso continuo',              5,  5);
INSERT INTO receita (descricao, id_atendimento, id_medicamento) VALUES ('1 comprimido de 8 em 8h por 5 dias',                    7,  1);
INSERT INTO receita (descricao, id_atendimento, id_medicamento) VALUES ('1 comprimido se febre acima de 37.8C — max 4x ao dia',  7,  2);
INSERT INTO receita (descricao, id_atendimento, id_medicamento) VALUES ('1 comprimido de 12 em 12h — uso continuo',              8,  6);
INSERT INTO receita (descricao, id_atendimento, id_medicamento) VALUES ('1 comprimido de 12 em 12h — uso continuo',              8,  8);
INSERT INTO receita (descricao, id_atendimento, id_medicamento) VALUES ('1 comprimido de 8 em 8h por 7 dias',                   10,  3);
INSERT INTO receita (descricao, id_atendimento, id_medicamento) VALUES ('1 comprimido de 12 em 12h — uso continuo',             11, 11);
INSERT INTO receita (descricao, id_atendimento, id_medicamento) VALUES ('1 capsula ao dia antes do cafe — protecao gastrica',   13,  7);
INSERT INTO receita (descricao, id_atendimento, id_medicamento) VALUES ('1 comprimido de 12 em 12h por 7 dias',                 13,  4);
INSERT INTO receita (descricao, id_atendimento, id_medicamento) VALUES ('1 comprimido ao dia por 5 dias',                       16,  9);
INSERT INTO receita (descricao, id_atendimento, id_medicamento) VALUES ('1 comprimido ao dia por 5 dias — anti-inflamatorio',   16, 10);
INSERT INTO receita (descricao, id_atendimento, id_medicamento) VALUES ('1 comprimido ao deitar — uso continuo',                16, 12);
INSERT INTO receita (descricao, id_atendimento, id_medicamento) VALUES ('2 comprimidos se dor — max 4x ao dia',                 18,  1);
INSERT INTO receita (descricao, id_atendimento, id_medicamento) VALUES ('1 comprimido de 8 em 8h por 10 dias',                  18,  3);

-- ── ESCALAS ──────────────────────────────────────────────────────────────
-- Dr. Carlos (7): disponível na maioria dos dias
INSERT INTO escala (data, horario, disponibilidade, id_pessoa_profissional) VALUES (DATE_SUB(CURDATE(),INTERVAL 2 DAY), '07:00:00', 'DISPONIVEL',   7);
INSERT INTO escala (data, horario, disponibilidade, id_pessoa_profissional) VALUES (DATE_SUB(CURDATE(),INTERVAL 1 DAY), '07:00:00', 'DISPONIVEL',   7);
INSERT INTO escala (data, horario, disponibilidade, id_pessoa_profissional) VALUES (CURDATE(),                          '07:00:00', 'DISPONIVEL',   7);
INSERT INTO escala (data, horario, disponibilidade, id_pessoa_profissional) VALUES (DATE_ADD(CURDATE(),INTERVAL 1 DAY), '07:00:00', 'DISPONIVEL',   7);
INSERT INTO escala (data, horario, disponibilidade, id_pessoa_profissional) VALUES (DATE_ADD(CURDATE(),INTERVAL 2 DAY), '13:00:00', 'DISPONIVEL',   7);
INSERT INTO escala (data, horario, disponibilidade, id_pessoa_profissional) VALUES (DATE_ADD(CURDATE(),INTERVAL 4 DAY), '07:00:00', 'DISPONIVEL',   7);
INSERT INTO escala (data, horario, disponibilidade, id_pessoa_profissional) VALUES (DATE_ADD(CURDATE(),INTERVAL 5 DAY), '07:00:00', 'DISPONIVEL',   7);
INSERT INTO escala (data, horario, disponibilidade, id_pessoa_profissional) VALUES (DATE_ADD(CURDATE(),INTERVAL 7 DAY), '13:00:00', 'DISPONIVEL',   7);
-- Dra. Ana (8): um dia indisponível
INSERT INTO escala (data, horario, disponibilidade, id_pessoa_profissional) VALUES (DATE_SUB(CURDATE(),INTERVAL 2 DAY), '13:00:00', 'DISPONIVEL',   8);
INSERT INTO escala (data, horario, disponibilidade, id_pessoa_profissional) VALUES (DATE_SUB(CURDATE(),INTERVAL 1 DAY), '13:00:00', 'DISPONIVEL',   8);
INSERT INTO escala (data, horario, disponibilidade, id_pessoa_profissional) VALUES (CURDATE(),                          '13:00:00', 'DISPONIVEL',   8);
INSERT INTO escala (data, horario, disponibilidade, id_pessoa_profissional) VALUES (DATE_ADD(CURDATE(),INTERVAL 1 DAY), '13:00:00', 'INDISPONIVEL', 8);
INSERT INTO escala (data, horario, disponibilidade, id_pessoa_profissional) VALUES (DATE_ADD(CURDATE(),INTERVAL 2 DAY), '07:00:00', 'DISPONIVEL',   8);
INSERT INTO escala (data, horario, disponibilidade, id_pessoa_profissional) VALUES (DATE_ADD(CURDATE(),INTERVAL 5 DAY), '13:00:00', 'DISPONIVEL',   8);
INSERT INTO escala (data, horario, disponibilidade, id_pessoa_profissional) VALUES (DATE_ADD(CURDATE(),INTERVAL 6 DAY), '07:00:00', 'DISPONIVEL',   8);
-- Enf. Fernando (9)
INSERT INTO escala (data, horario, disponibilidade, id_pessoa_profissional) VALUES (DATE_SUB(CURDATE(),INTERVAL 1 DAY), '07:00:00', 'DISPONIVEL',   9);
INSERT INTO escala (data, horario, disponibilidade, id_pessoa_profissional) VALUES (CURDATE(),                          '07:00:00', 'DISPONIVEL',   9);
INSERT INTO escala (data, horario, disponibilidade, id_pessoa_profissional) VALUES (CURDATE(),                          '13:00:00', 'DISPONIVEL',   9);
INSERT INTO escala (data, horario, disponibilidade, id_pessoa_profissional) VALUES (DATE_ADD(CURDATE(),INTERVAL 1 DAY), '07:00:00', 'DISPONIVEL',   9);
INSERT INTO escala (data, horario, disponibilidade, id_pessoa_profissional) VALUES (DATE_ADD(CURDATE(),INTERVAL 3 DAY), '07:00:00', 'DISPONIVEL',   9);
INSERT INTO escala (data, horario, disponibilidade, id_pessoa_profissional) VALUES (DATE_ADD(CURDATE(),INTERVAL 4 DAY), '13:00:00', 'DISPONIVEL',   9);
INSERT INTO escala (data, horario, disponibilidade, id_pessoa_profissional) VALUES (DATE_ADD(CURDATE(),INTERVAL 6 DAY), '07:00:00', 'DISPONIVEL',   9);
-- Enf. Juliana (10): turno da noite + um dia indisponível
INSERT INTO escala (data, horario, disponibilidade, id_pessoa_profissional) VALUES (DATE_SUB(CURDATE(),INTERVAL 2 DAY), '19:00:00', 'DISPONIVEL',   10);
INSERT INTO escala (data, horario, disponibilidade, id_pessoa_profissional) VALUES (DATE_SUB(CURDATE(),INTERVAL 1 DAY), '19:00:00', 'DISPONIVEL',   10);
INSERT INTO escala (data, horario, disponibilidade, id_pessoa_profissional) VALUES (CURDATE(),                          '19:00:00', 'DISPONIVEL',   10);
INSERT INTO escala (data, horario, disponibilidade, id_pessoa_profissional) VALUES (DATE_ADD(CURDATE(),INTERVAL 2 DAY), '19:00:00', 'DISPONIVEL',   10);
INSERT INTO escala (data, horario, disponibilidade, id_pessoa_profissional) VALUES (DATE_ADD(CURDATE(),INTERVAL 4 DAY), '07:00:00', 'DISPONIVEL',   10);
INSERT INTO escala (data, horario, disponibilidade, id_pessoa_profissional) VALUES (DATE_ADD(CURDATE(),INTERVAL 5 DAY), '19:00:00', 'INDISPONIVEL', 10);
INSERT INTO escala (data, horario, disponibilidade, id_pessoa_profissional) VALUES (DATE_ADD(CURDATE(),INTERVAL 7 DAY), '07:00:00', 'DISPONIVEL',   10);

-- ── USUÁRIOS ─────────────────────────────────────────────────────────────
-- Vinculados aos profissionais (pessoas 7, 8, 9) e a Maria como admin (pessoa 1)
INSERT INTO tb_usuario (login, senha, perfil, pessoa_id) VALUES ('admin',        'admin123',  'ADMIN',      1);
INSERT INTO tb_usuario (login, senha, perfil, pessoa_id) VALUES ('secretaria',   'sec123',    'SECRETARIO', 2);
INSERT INTO tb_usuario (login, senha, perfil, pessoa_id) VALUES ('dr.carlos',    'medico123', 'SERVIDOR',   7);
INSERT INTO tb_usuario (login, senha, perfil, pessoa_id) VALUES ('dra.ana',      'medico123', 'SERVIDOR',   8);
INSERT INTO tb_usuario (login, senha, perfil, pessoa_id) VALUES ('enf.fernando', 'enf123',    'SERVIDOR',   9);
INSERT INTO tb_usuario (login, senha, perfil, pessoa_id) VALUES ('enf.juliana',  'enf123',    'SERVIDOR',   10);