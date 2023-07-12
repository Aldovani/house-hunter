# Requisitos Funcionais (RF)

## User

- [x] Deve ser possível cadastrar um usuário
- [x] Deve ser possível recuperar a senha
- [x] Deve ser possível pegar os dados do perfil do usuário
- [x] Deve ser possível atualizar a foto
- [x] Deve ser possível atualizar o perfil

## Sessions

- [x] Deve ser possível se autenticar na aplicação (Email, Senha)
- [x] Deve ser possível se autenticar na aplicação com refreshToken

## House

- [ ] Deve ser possível cadastrar uma casa
- [ ] Deve ser possível atualizar uma casa
- [ ] Deve ser possível deletar uma casa
- [ ] Deve ser possível pegar a informação da casa
- [ ] Deve ser possível pesquisar por casa por perto

## Room

- [x] Deve ser possível cadastrar uma parte da casa
- [x] Deve ser possível editar uma parte da casa
- [x] Deve ser possível deletar uma parte da casa

## Contact

- [ ] Deve ser possível cadastrar um novo contato
- [ ] Deve ser possível editar um contato
- [ ] Deve ser possível deletar um contato

## Appointment

- [ ] Deve ser possível cadastrar um agendamento
- [ ] Deve ser possível visualizar todos os agendamentos
- [ ] Deve ser possível cancelar um agendamentos

# Requisitos Negocio (RN)

- [ ] Um usuário só pode marcar um **AGENDAMENTO** com tres horas de intervalo para outro agendamento
- [x] Um usuário não pode se cadastra com email repetido
- [ ] O usuário deve informar pelo menos o valor da venda ou do aluguel da casa
- [ ] A casa não pode ser cadastrada sem nenhuma sala
- [ ] Apenas admins pode cadastra uma sala
- [ ] Não  deve ser possível cadastra uma sala com o mesmo nome
- [x] O tempo máximo para recuperar a senha de ser de duas horas

# Requisitos não funcionais (RNF)

- [x] utilizar banco de dados relacional
- [x] utilizar JWT para se autenticar
