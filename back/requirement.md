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

- [x] Deve ser possível cadastrar uma casa
- [x] Deve ser possível atualizar uma casa
- [x] Deve ser possível deletar uma casa
- [x] Deve ser possível pegar a informação da casa
- [x] Deve ser possível pegar todas as casas de um usuário
- [x] Deve ser possível pesquisar por casa por perto

## Room

- [x] Deve ser possível cadastrar uma parte da casa
- [x] Deve ser possível editar uma parte da casa
- [x] Deve ser possível deletar uma parte da casa

## Contact

- [x] Deve ser possível cadastrar um novo contato
- [x] Deve ser possível editar um contato
- [x] Deve ser possível deletar um contato

## Appointment

- [x] Deve ser possível cadastrar um agendamento
- [x] Deve ser possível visualizar todos os agendamentos
- [x] Deve ser possível cancelar um agendamentos
- [x] Deve ser possível confirmar um agendamentos

# Requisitos Negocio (RN)

- [x] Um usuário só pode marcar um **AGENDAMENTO** com tres horas de intervalo para outro agendamento
- [x] uma casa só pode ter um **AGENDAMENTO** por hora
- [x] Um usuário não pode se cadastra com email repetido
- [x] A casa não pode estar no estado de "disponível" sem nenhuma sala e nenhum contato
- [x] Apenas admins pode cadastra sala e categorias de contato
- [x] Não deve ser possível cadastra uma sala com o mesmo nome
- [x] O tempo máximo para recuperar a senha de ser de duas horas

# Requisitos não funcionais (RNF)

- [x] utilizar banco de dados relacional
- [x] utilizar JWT para se autenticar
