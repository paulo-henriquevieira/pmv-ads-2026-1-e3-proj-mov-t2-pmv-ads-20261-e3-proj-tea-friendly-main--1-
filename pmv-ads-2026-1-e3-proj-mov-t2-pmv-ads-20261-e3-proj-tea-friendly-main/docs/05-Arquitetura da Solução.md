[Modelo ER _ Tea_Friendly.pdf](https://github.com/user-attachments/files/27136006/Modelo.ER._.Tea_Friendly.pdf)
# Arquitetura da Solução

<span style="color:red">Pré-requisitos: <a href="04-Projeto de Interface.md"> Projeto de Interface</a></span>

O aplicativo será desenvolvido com foco principal no front-end mobile utilizando React Native, permitindo a criação de uma interface moderna, responsiva e multiplataforma (Android e iOS) a partir de uma única base de código. Para o gerenciamento de dados e serviços em nuvem, será utilizado o Firebase, que oferece uma estrutura simplificada com autenticação de usuários, banco de dados em tempo real (Firestore) e armazenamento, eliminando a necessidade de um back-end tradicional neste primeiro momento.

<img width="1536" height="1024" alt="Diagrama de arquitetura de app móvel" src="https://github.com/user-attachments/assets/9c42affc-9564-49ca-b6c6-05c8657e3573" />
<h4 align="center">FIGURA 01 - Aplicação utilizando React Native e Firebase </h4>


📱 React Native (Front-end Mobile)

O React Native é um framework utilizado para o desenvolvimento de aplicações mobile multiplataforma, permitindo a criação de interfaces para Android e iOS a partir de uma única base de código. Baseado em JavaScript e no conceito de componentes, ele possibilita o desenvolvimento de interfaces modernas, responsivas e com boa performance. No contexto do projeto, o React Native é responsável por toda a camada de interação com o usuário, incluindo navegação, telas e lógica de apresentação, sendo o principal foco de desenvolvimento neste semestre.

🔥 Firebase (Back-end como Serviço – BaaS)

O Firebase é uma plataforma de desenvolvimento mantida pelo Google que fornece serviços de back-end prontos, eliminando a necessidade de criação e manutenção de um servidor próprio. No projeto, o Firebase será utilizado para gerenciar autenticação de usuários (Firebase Authentication), armazenamento de dados em tempo real (Firestore Database) e armazenamento de arquivos (Firebase Storage). Essa abordagem permite maior agilidade no desenvolvimento, escalabilidade e integração direta com o front-end, simplificando a arquitetura da aplicação.

## Diagrama de Classes

O diagrama de classes ilustra graficamente como será a estrutura do software, e como cada uma das classes da sua estrutura estarão interligadas. Essas classes servem de modelo para materializar os objetos que executarão na memória.

<img width="4274" height="2126" alt="mermaid-diagram" src="https://github.com/user-attachments/assets/6b491fbe-c0a8-4803-a090-370cf23fd971" />
<h4 align="center">FIGURA 02 – Diagrama de classes do sistema TEA Friendly. </h4>


## Modelo ER

O modelo ER da aplicação TEA Friendly foi estruturado para centralizar informações sobre estabelecimentos acessíveis para pessoas com Transtorno do Espectro Autista.
Os usuários podem interagir com os estabelecimentos por meio de avaliações, comentários e favoritos, enquanto os estabelecimentos podem possuir diversos recursos inclusivos.


<img width="949" height="571" alt="image" src="https://github.com/user-attachments/assets/023e40e7-2731-4e73-a306-a586d9fc9a4c" />


## 1. Entidades e Atributos



### USUÁRIO
- id (int)
- nome (string)
- email (string)
- senha (string)
- tipo_usuario (string)
- data_criacao (datetime)

Representa os usuários do sistema, que podem acessar a plataforma para pesquisar estabelecimentos, favoritar locais, realizar avaliações e comentários.



### ESTABELECIMENTO
- id (int)
- nome (string)
- categoria (string)
- descricao (string)
- endereco (string)
- cidade (string)
- bairro (string)
- media_avaliacao (decimal)

Representa os estabelecimentos cadastrados na plataforma, como restaurantes, clínicas, escolas, parques ou outros locais adequados para pessoas com TEA.



### RECURSO_INCLUSIVO
- id (int)
- nome (string)
- descricao (string)

Armazena os tipos de recursos inclusivos disponíveis na aplicação, como ambiente silencioso, sala calma, acessibilidade, equipe treinada, baixa iluminação, banheiro família, entre outros.



### ESTABELECIMENTO_RECURSO
- id (int)
- estabelecimento_id (int)
- recurso_id (int)

Entidade associativa responsável por relacionar os estabelecimentos aos recursos inclusivos disponíveis.



### AVALIAÇÃO
- id (int)
- usuario_id (int)
- estabelecimento_id (int)
- nota (int)
- comentario (string)
- data_avaliacao (datetime)

Armazena as avaliações realizadas pelos usuários sobre os estabelecimentos.



### COMENTÁRIO
- id (int)
- usuario_id (int)
- estabelecimento_id (int)
- texto (string)
- data_comentario (datetime)

Registra comentários feitos pelos usuários sobre os estabelecimentos.



### FAVORITO
- id (int)
- usuario_id (int)
- estabelecimento_id (int)
- data_favorito (datetime)

Representa os estabelecimentos marcados como favoritos pelos usuários.



### CATEGORIA
- id (int)
- nome (string)
- descricao (string)

Classifica os estabelecimentos (restaurante, clínica, escola, lazer, etc.).



## 2. Relacionamentos Principais

### USUARIO – AVALIAÇÃO
- Um usuário pode realizar várias avaliações ao longo do tempo.
- Cada avaliação pertence a um único usuário.
- Relacionamento: **1:N**



### ESTABELECIMENTO – AVALIAÇÃO
- Um estabelecimento pode receber várias avaliações.
- Cada avaliação pertence a um único estabelecimento.
- Relacionamento: **1:N**



### USUARIO – COMENTÁRIO
- Um usuário pode escrever vários comentários.
- Cada comentário pertence a um único usuário.
- Relacionamento: **1:N**



### ESTABELECIMENTO – COMENTÁRIO
- Um estabelecimento pode possuir vários comentários.
- Cada comentário pertence a um único estabelecimento.
- Relacionamento: **1:N**



### USUÁRIO – FAVORITO
- Um usuário pode favoritar vários estabelecimentos.
- Cada favorito pertence a um único usuário.
- Relacionamento: **1:N**



### ESTABELECIMENTO – FAVORITO
- Um estabelecimento pode ser favoritado por vários usuários.
- Cada favorito pertence a um único estabelecimento.
- Relacionamento: **1:N**



### ESTABELECIMENTO – ESTABELECIMENTO_RECURSO
- Um estabelecimento pode possuir vários recursos inclusivos.
- Cada registro pertence a um único estabelecimento.
- Relacionamento: **1:N**



### RECURSO_INCLUSIVO – ESTABELECIMENTO_RECURSO
- Um recurso pode estar em vários estabelecimentos.
- Cada registro referencia um único recurso.
- Relacionamento: **1:N**

➡️ Representa uma relação **N:M** entre ESTABELECIMENTO e RECURSO_INCLUSIVO.



### CATEGORIA – ESTABELECIMENTO
- Uma categoria pode classificar vários estabelecimentos.
- Cada estabelecimento pertence a uma única categoria.
- Relacionamento: **1:N**



## Esquema Relacional

<img width="1536" height="1024" alt="Esquema relacional da aplicação TEA Friendly (1)" src="https://github.com/user-attachments/assets/8255fdb0-afed-4afb-970f-e16a1a49fad3" />

## Modelo Físico

Para garantir a estruturação eficiente dos dados da aplicação TEA Friendly, foi desenvolvido o **modelo físico** do banco de dados considerando a arquitetura baseada em **Firebase**. Diferente de bancos relacionais tradicionais, o sistema utiliza o **Firestore Database**, que organiza os dados em coleções e documentos, permitindo maior flexibilidade, escalabilidade e integração direta com o front-end.

Nesse modelo, são definidas as coleções responsáveis pelo armazenamento das informações principais da aplicação, como usuários, estabelecimentos, avaliações, favoritos e características inclusivas. Além disso, são aplicadas regras de segurança e validação por meio das configurações do Firebase, garantindo a integridade e o controle de acesso aos dados.

A comunicação entre o aplicativo desenvolvido em **React Native** e o banco de dados é realizada diretamente por meio das APIs do Firebase, eliminando a necessidade de um back-end tradicional e permitindo maior agilidade no desenvolvimento.

## Tecnologias Utilizadas

Para o desenvolvimento da aplicação TEA Friendly, será utilizado um conjunto de tecnologias modernas que garantem eficiência, escalabilidade e uma boa experiência de usuário. 

A seguir, são apresentadas as principais ferramentas e tecnologias adotadas no projeto:

- **React Native:** Framework utilizado para o desenvolvimento do aplicativo mobile, permitindo a criação de interfaces nativas para Android e iOS a partir de um único código, proporcionando uma experiência fluida e responsiva.
- **JavaScript / TypeScript:** Linguagens utilizadas no desenvolvimento da aplicação, garantindo organização do código, tipagem (no caso do TypeScript) e maior confiabilidade.
- **Firebase Authentication:** Serviço utilizado para autenticação de usuários, permitindo login seguro por e-mail e senha.
- **Firestore Database:** Banco de dados NoSQL em tempo real utilizado para armazenar as informações da aplicação, como usuários, estabelecimentos, avaliações e favoritos.
- **Firebase Storage:** Serviço utilizado para armazenamento de arquivos, como imagens dos estabelecimentos.

## Hospedagem

Explique como a hospedagem e o lançamento da plataforma foi feita.

> **Links Úteis**:
>
> - [Website com GitHub Pages](https://pages.github.com/)
> - [Programação colaborativa com Repl.it](https://repl.it/)
> - [Getting Started with Heroku](https://devcenter.heroku.com/start)
> - [Publicando Seu Site No Heroku](http://pythonclub.com.br/publicando-seu-hello-world-no-heroku.html)

## Qualidade de Software

A qualidade de software pode ser definida como o conjunto de características que garantem que um sistema atenda às necessidades dos usuários e stakeholders de forma eficiente, segura e confiável.
O desenvolvimento da aplicação foi estruturado com base na norma de qualidade de software **ISO/IEC 25010**, garantindo aderência às boas práticas de engenharia de software.
Para assegurar a qualidade da aplicação **TEA Friendly**, foi adotada como base essa norma internacional, que define um modelo composto por características e subcaracterísticas essenciais para o desenvolvimento de sistemas modernos.
As características de qualidade foram aplicadas considerando o contexto da aplicação TEA Friendly, especialmente no que diz respeito à acessibilidade, usabilidade e confiabilidade das informações apresentadas aos usuários.
A utilização do Firebase contribui para a confiabilidade, segurança e disponibilidade do sistema, enquanto o React Native garante portabilidade e boa experiência do usuário.

### 1. Adequação Funcional

- **Completude Funcional:** A aplicação permite que usuários busquem estabelecimentos, filtrem por características inclusivas e visualizem informações relevantes.  
- **Correção Funcional:** As funcionalidades, como avaliações e favoritos, operam corretamente, sem inconsistências nos dados.  
- **Apropriação Funcional:** O sistema atende especificamente ao público-alvo (famílias e pessoas com TEA), oferecendo informações úteis e relevantes.  


### 2. Confiabilidade

- **Disponibilidade:** O sistema deve estar disponível sempre que o usuário precisar acessar os estabelecimentos.  
- **Tolerância a Falhas:** Em caso de falhas, o sistema apresenta mensagens claras e permite nova tentativa.  
- **Recuperabilidade:** O sistema é capaz de recuperar dados sem perda de informações em situações de erro.  


### 3. Usabilidade

- **Apreensibilidade:** A interface é simples e intuitiva.  
- **Operacionalidade:** O aplicativo permite navegação fácil, com poucos cliques.  
- **Acessibilidade:** A aplicação considera o público com TEA, utilizando cores suaves, organização visual clara e evitando excesso de estímulos.  


### 4. Eficiência de Desempenho

- **Tempo de Resposta:** As buscas e carregamentos ocorrem de forma rápida.  
- **Utilização de Recursos:** O aplicativo consome poucos recursos do dispositivo.  


### 5. Segurança

- **Confidencialidade:** Proteção dos dados por meio do Firebase Authentication.  
- **Controle de Acesso:** Apenas usuários autenticados podem interagir (avaliar, comentar e favoritar).  
- **Integridade:** Os dados não devem ser alterados indevidamente.  


### 6. Manutenibilidade

- **Modularidade:** Estrutura baseada em componentes (React Native).  
- **Reusabilidade:** Componentes reutilizáveis em diferentes telas.  
- **Analisabilidade:** Uso de logs e ferramentas do Firebase para identificar erros.  


### 7. Portabilidade

- **Adaptabilidade:** Funciona em Android e iOS com a mesma base de código.  
- **Instalabilidade:** Fácil instalação via lojas de aplicativos.  


### 📊 Métricas para Avaliação da Qualidade

Para garantir que os requisitos de qualidade sejam atendidos, serão utilizadas as seguintes métricas:

- **Índice de satisfação do usuário:** Avaliações e feedbacks dos usuários.  
- **Tempo médio de resposta:** Tempo de carregamento das telas.  
- **Taxa de erros:** Quantidade de falhas reportadas.  
- **Disponibilidade do sistema:** Percentual de tempo ativo.  
- **Número de incidentes de segurança:** Monitoramento de acessos indevidos.  
- **Taxa de uso de funcionalidades:** Frequência de uso das principais funções.  
- **Tempo de recuperação:** Tempo para restaurar o sistema após falhas.  

A adoção do modelo de qualidade baseado na norma **ISO/IEC 25010** garante que a aplicação TEA Friendly seja desenvolvida com foco na experiência do usuário, segurança das informações e eficiência operacional, assegurando a confiabilidade do sistema.
