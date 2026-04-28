# Programação de Funcionalidades

<span style="color:red">Pré-requisitos: <a href="02-Especificação do Projeto.md">Especificação do Projeto</a></span>, 
<a href="03-Metodologia.md">Metodologia</a>, 
<a href="04-Projeto de Interface.md">Projeto de Interface</a>, 
<a href="05-Arquitetura da Solução.md">Arquitetura da Solução</a>.

## Requisitos Funcionais

| ID     | Descrição do Requisito                                                       | Prioridade |
|:------:|-------------------------------------------------------------------------------|:----------:|
| RF-01  | Sistema de cadastro e login de usuários (email/senha ou Google)              | Alta       |
| RF-02  | Criação e edição de perfil do usuário (cuidador ou pessoa com TEA)           | Alta       |
| RF-03  | Cadastro de preferências sensoriais (ruído, luz, movimentação)               | Alta       |
| RF-04  | Listagem de estabelecimentos inclusivos cadastrados                          | Alta       |
| RF-05  | Busca de locais por nome, cidade ou categoria                                | Alta       |
| RF-06  | Filtros de acessibilidade (ambiente silencioso, luz baixa, sala calma, etc.) | Alta       |
| RF-07  | Visualização de detalhes do local (descrição, fotos, estrutura)              | Alta       |
| RF-08  | Sistema de avaliação dos locais (nota e comentários)                         | Alta       |
| RF-09  | Marcar locais como favoritos                                                 | Média      |
| RF-10  | Exibição de locais mais bem avaliados                                        | Média      |
| RF-11  | Cadastro de novos estabelecimentos pelos usuários                            | Média      |
| RF-12  | Sistema de denúncia ou correção de informações de locais                     | Média      |
| RF-13  | Compartilhamento de locais com outros usuários                               | Baixa      |
| RF-14  | Visualização de mapa com localização dos estabelecimentos                    | Alta       |
| RF-15  | Sistema de recomendação baseado no perfil do usuário                         | Média      |



## Requisitos Não Funcionais

| ID     | Descrição do Requisito                                                      | Prioridade |
|:------:|----------------------------------------------------------------------------|:----------:|
| RNF-01 | Desenvolvimento mobile com React Native (Android/iOS)                      | Alta       |
| RNF-02 | Utilização do Firebase (Auth, Firestore e Storage)                         | Alta       |
| RNF-03 | Interface simples, intuitiva e acessível                                   | Alta       |
| RNF-04 | Tempo de resposta inferior a 3 segundos                                    | Alta       |
| RNF-05 | Compatibilidade com diferentes tamanhos de tela                            | Alta       |
| RNF-06 | Segurança dos dados dos usuários (LGPD)                                    | Alta       |
| RNF-07 | Disponibilidade mínima de 99% da aplicação                                 | Média      |
| RNF-08 | Sistema de autenticação seguro (Firebase Auth)                             | Alta       |
| RNF-09 | Armazenamento em nuvem escalável                                           | Alta       |
| RNF-10 | Integração com mapas (Google Maps ou similar)                              | Média      |
| RNF-11 | Suporte a atualizações contínuas (deploy rápido)                           | Média      |
| RNF-12 | Acessibilidade digital (cores, contraste, legibilidade)                    | Alta       |
