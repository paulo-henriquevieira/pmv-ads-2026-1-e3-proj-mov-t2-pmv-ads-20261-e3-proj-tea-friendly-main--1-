# Especificações do Projeto

A presente seção tem como objetivo apresentar a definição do problema e a ideia de solução sob a perspectiva dos usuários que irão interagir com a plataforma. Além disso, detalha-se como esses elementos foram analisados e transformados em artefatos essenciais da Engenharia de Requisitos, como personas, histórias de usuários, requisitos funcionais e não funcionais, bem como as restrições do projeto que delimitam o escopo da solução.

Este conjunto de especificações orienta diretamente o desenvolvimento do sistema TEA Friendly, garantindo que a solução proposta esteja alinhada às necessidades reais das pessoas com Transtorno do Espectro Autista, seus cuidadores e os estabelecimentos interessados em acessibilidade.

##  Personas
---

### 👩 Persona 1: Maria Santos
> **Mãe de criança com TEA**
> 
> * **Idade:** 32 anos
> * **Profissão:** Auxiliar administrativa
> * **Tecnologia:** Usuária intermediária (familiarizada com apps de mapas, redes sociais e grupos de apoio).

| **Dores** | **Objetivos** | **Motivações** |
| :--- | :--- | :--- |
| Medo de que o filho tenha crises sensoriais em locais desconhecidos. | Encontrar lugares tranquilos e adequados para o filho. | Garantir o bem-estar e a segurança do filho. |
| Falta de informações claras sobre ambientes preparados. | Reduzir a ansiedade ao planejar saídas de casa. | Promover a participação da família na comunidade. |
| Dificuldade em planejar passeios com segurança e previsibilidade. | Ter acesso a detalhes do ambiente antes de visitá-lo. | Encontrar locais acolhedores e verdadeiramente inclusivos. |

---

### 🧑 Persona 2: João Pereira
> **Adulto com TEA Nível 1**
> 
> * **Idade:** 22 anos
> * **Profissão:** Estudante de programação
> * **Tecnologia:** Domínio alto (usuário avançado de smartphone e computador).

| **Dores** | **Objetivos** | **Motivações** |
| :--- | :--- | :--- |
| Ambientes barulhentos, superlotados e imprevisíveis. | Identificar espaços sensorialmente adequados. | Conquistar maior autonomia no dia a dia. |
| Insegurança ao visitar locais novos sem informações prévias. | Reduzir a exposição a situações de estresse sensorial. | Sentir-se confortável e acolhido em espaços públicos. |
| Dificuldade em gerenciar estímulos sensoriais intensos. | Tomar decisões de lazer mais independentes. | Evitar episódios de sobrecarga (meltdown/shutdown). |

---

### 👩‍💼 Persona 3: Carla Moreira
> **Gerente de Estabelecimento**
> 
> * **Idade:** 35 anos
> * **Profissão:** Gerente de restaurante
> * **Tecnologia:** Usuária intermediária (opera sistemas de gestão e redes sociais).

| **Dores** | **Objetivos** | **Motivações** |
| :--- | :--- | :--- |
| Desconhecimento sobre como tornar o negócio acessível para o público TEA. | Adequar a infraestrutura e o atendimento do espaço. | Aumentar o alcance, o público e a reputação do local. |
| Falta de orientações práticas sobre boas práticas sensoriais. | Capacitar a equipe para um acolhimento adequado. | Atender à diversidade de clientes com alta qualidade. |
| Baixa visibilidade para atrair famílias e pessoas autistas. | Divulgar o estabelecimento como um local inclusivo. | Gerar impacto social positivo através do seu negócio. |


## Histórias de Usuários

Com base na análise das personas, foram identificadas as seguintes histórias de usuários para guiar o desenvolvimento da solução:

| PERSONA | FUNCIONALIDADE | MOTIVO/VALOR |
| :--- | :--- | :--- |
| **Maria Santos** | Pesquisar locais com filtros de ruído e iluminação. | Encontrar ambientes que não causem crises sensoriais no meu filho. |
| **João Pereira** | Visualizar fotos detalhadas e avaliações de outros autistas. | Ter previsibilidade e autonomia ao visitar novos lugares. |
| **Carla Moreira** | Cadastrar o perfil do meu estabelecimento e suas adaptações. | Atrair o público TEA e ser reconhecida como um local inclusivo. |
| **Usuário do Sistema** | Criar uma conta e salvar locais favoritos. | Acessar rapidamente os estabelecimentos que já sei que são seguros. |
| **Público Geral** | Avaliar a experiência inclusiva de um local após a visita. | Ajudar a comunidade a identificar locais realmente preparados. |
| **Administrador** | Moderar comentários e validar novos cadastros de locais. | Garantir a veracidade das informações e a segurança da plataforma. |
| **Administrador** | Alterar permissões de usuários e gerenciar contas. | Manter a governança e o funcionamento adequado do sistema. |

---


## Modelagem do Processo de Negócio 

### Análise da Situação Atual

Atualmente, pessoas com Transtorno do Espectro Autista (TEA) e seus cuidadores enfrentam dificuldades para identificar ambientes públicos que sejam sensorialmente adequados. O processo de escolha de locais é feito, em sua maioria, de forma empírica, por meio de indicações informais, redes sociais ou tentativa e erro.
Os principais problemas observados no cenário atual são:

Falta de informações padronizadas sobre acessibilidade sensorial dos estabelecimentos;
Ausência de um canal centralizado para avaliação de ambientes sob a perspectiva do público TEA;
Insegurança no planejamento de atividades externas;
Pouca orientação para estabelecimentos que desejam se tornar mais inclusivos.

Esses fatores contribuem para o isolamento social e para a limitação da autonomia de pessoas com TEA e seus familiares.

### Descrição Geral da Proposta

O TEA Friendly é uma plataforma digital que tem como objetivo conectar pessoas com TEA, cuidadores e estabelecimentos preparados para oferecer ambientes sensorialmente acessíveis. A solução permite a consulta, avaliação e divulgação de locais inclusivos, promovendo previsibilidade, segurança e acolhimento.
A proposta busca melhorar o processo de decisão dos usuários por meio de:

Centralização de informações sobre acessibilidade sensorial;
Avaliações baseadas na experiência real da comunidade TEA;
Orientações práticas para estabelecimentos interessados em inclusão.

### Processo 1 – Busca e Avaliação de Estabelecimentos

Oportunidades de melhoria

* Facilitar a busca por locais sensorialmente adequados;
* Reduzir a ansiedade no planejamento de saídas;
* Aumentar a previsibilidade da experiência do usuário.

Descrição do processo:
O usuário acessa a plataforma, aplica filtros sensoriais (ruído, iluminação, lotação, recursos inclusivos), visualiza os estabelecimentos disponíveis, consulta avaliações e decide se o local atende às suas necessidades.


<img width="2853" height="555" alt="busca_avaliacao (1)" src="https://github.com/user-attachments/assets/61c94434-0ef0-47a9-a7b3-9774b276d0bf" />



### Processo 2 – Cadastro e Adequação de Estabelecimentos

Oportunidades de melhoria

* Incentivar práticas inclusivas nos estabelecimentos;
* Padronizar informações sobre acessibilidade;
* Ampliar a visibilidade de locais preparados para o público TEA.

Descrição do processo:
O responsável pelo estabelecimento cadastra seu perfil, informa as adaptações disponíveis, submete o local para validação e passa a ser avaliado pelos usuários da plataforma.

<img width="2328" height="504" alt="cadastro_adequacao (1)" src="https://github.com/user-attachments/assets/c3e932db-b810-4f13-b35c-990927a1803f" />

## Indicadores de Desempenho


## Indicadores de Desempenho

| **Indicador** | **Objetivos** | **Descrição** | **Cálculo** | **Fonte de dados** | **Perspectiva** |
|--------------|---------------|---------------|-------------|-------------------|-----------------|
| **Percentual de Estabelecimentos Validados** | Avaliar a confiabilidade das informações cadastradas na plataforma | Mede o percentual de estabelecimentos aprovados após moderação em relação ao total cadastrado | (Estabelecimentos validados / Estabelecimentos cadastrados) × 100 | Tabela Estabelecimentos | Processos Internos |
| **Número de Usuários Ativos** | Avaliar o engajamento dos usuários na plataforma | Quantidade de usuários que acessam o sistema em um determinado período | Contagem de usuários ativos no período | Tabela Usuários | Clientes |
| **Quantidade de Avaliações Realizadas** | Medir a participação da comunidade TEA | Total de avaliações registradas sobre os estabelecimentos | Contagem de avaliações | Tabela Avaliações | Clientes |
| **Índice de Satisfação dos Usuários** | Avaliar a aceitação e a qualidade percebida da plataforma | Mede a média das avaliações realizadas pelos usuários | Soma das notas / Total de avaliações | Tabela Feedbacks | Aprendizado e Crescimento |
| **Taxa de Denúncias de Informações Incorretas** | Monitorar a qualidade e atualização das informações | Mede o percentual de denúncias registradas em relação ao total de estabelecimentos | (Denúncias registradas / Estabelecimentos cadastrados) × 100 | Tabela Denúncias | Aprendizado e Crescimento |


## Requisitos

###  Técnica de Priorização MoSCoW:

A priorização foi realizada considerando o impacto direto na autonomia do usuário com TEA e na segurança do cuidador:
* **ALTA (Must Have):** Funcionalidades essenciais para que o projeto cumpra seu propósito de informar sobre acessibilidade sensorial.
* **MÉDIA (Should Have):** Funcionalidades importantes para o engajamento da comunidade e personalização da experiência.
* **BAIXA (Could Have):** Incrementos que melhoram a usabilidade ou estética, mas não impedem o uso principal da aplicação.ção.

As tabelas abaixo apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto. 

### Requisitos Funcionais

| ID | Descrição do Requisito | Prioridade |
| :--- | :--- | :--- |
| **RF-001** | O sistema deve permitir o cadastro e login de usuários por e-mail e senha para acesso às funcionalidades da plataforma. | ALTA |
| **RF-002** | O sistema deve permitir que usuários visualizem estabelecimentos cadastrados na plataforma. | ALTA |
| **RF-003** | O sistema deve permitir a busca de estabelecimentos por nome, cidade ou categoria. | ALTA |
| **RF-004** | O sistema deve permitir filtrar estabelecimentos por recursos inclusivos, como sala calma, ambiente silencioso, baixa iluminação, equipe treinada, área kids, acessibilidade e banheiro família. | ALTA |
| **RF-005** | O sistema deve permitir a busca de locais por filtros sensoriais, como nível de ruído, iluminação e lotação do ambiente. | ALTA |
| **RF-006** | O sistema deve exibir os detalhes completos de um estabelecimento, incluindo nome, descrição, endereço, categoria, telefone, horário de funcionamento, fotos, selos de acessibilidade e recursos inclusivos. | ALTA |
| **RF-007** | O sistema deve permitir que usuários avaliem estabelecimentos com nota em estrelas considerando a experiência e o acolhimento sensorial do ambiente. | ALTA |
| **RF-008** | O sistema deve permitir que usuários escrevam comentários sobre sua experiência no estabelecimento. | ALTA |
| **RF-009** | O sistema deve permitir que o usuário edite sua própria avaliação e comentário. | MÉDIA |
| **RF-010** | O sistema deve permitir que o usuário exclua sua própria avaliação, caso necessário. | MÉDIA |
| **RF-011** | O sistema deve permitir que usuários favoritem estabelecimentos e visualizem a lista de seus locais favoritos. | MÉDIA |
| **RF-012** | O sistema deve permitir que proprietários cadastrem seus estabelecimentos e informem as adaptações e recursos inclusivos disponíveis. | ALTA |
| **RF-013** | O sistema deve permitir que administradores gerenciem usuários e estabelecimentos cadastrados na plataforma. | MÉDIA |
| **RF-014** | O sistema deve oferecer um mapa interativo para visualização de locais próximos via geolocalização. | BAIXA |
| **RF-015** | O sistema deve permitir a denúncia de informações falsas ou desatualizadas sobre estabelecimentos. | MÉDIA |
---
### Requisitos Não Funcionais

| ID | Descrição do Requisito | Prioridade |
| :--- | :--- | :--- |
| **RNF-001** | **Acessibilidade Visual:** A interface deve utilizar cores suaves e baixo contraste para evitar sobrecarga sensorial. | ALTA |
| **RNF-002** | **Responsividade:** O sistema deve ser responsivo para funcionar em smartphones, tablets e desktops. | ALTA |
| **RNF-003** | **Segurança:** O sistema deve proteger os dados dos usuários conforme as diretrizes da LGPD. | ALTA |
| **RNF-004** | **Performance:** As consultas de busca devem ser processadas em no máximo 3 segundos. | MÉDIA |
| **RNF-005** | **Disponibilidade:** O sistema deve estar disponível 24/7 com uma taxa de uptime de 99%. | BAIXA |

---

## Restrições

O projeto está delimitado pelos itens apresentados na tabela a seguir, que impõem limitações ao desenvolvimento e à arquitetura da solução:

| ID | Restrição |
| :--- | :--- |
| **RE-01** | O projeto deverá ser entregue obrigatoriamente até o final do semestre letivo. |
| **RE-02** | O desenvolvimento do sistema deve utilizar apenas ferramentas gratuitas ou de licença acadêmica. |
| **RE-03** | A equipe deve colaborar ativamente em todas as etapas do projeto, incluindo análise, desenvolvimento e documentação. |
| **RE-04** | Todo o código-fonte do projeto deve ser disponibilizado em um repositório público ou acadêmico no GitHub. |
| **RE-05** | A equipe não poderá contratar serviços externos de desenvolvimento ou design durante a execução do projeto. |
| **RE-06** | A solução deve ser gratuita para o usuário final e utilizar preferencialmente tecnologias open-source. |


## Diagrama de Casos de Uso
![image alt](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2026-1-e3-proj-mov-t2-pmv-ads-20261-e3-proj-tea-friendly/blob/ac43c3ab4adb4b30b554fbd6d142d832c400f9c1/docs/img/Diagrama%20caso%20de%20uso.jpeg)

# Matriz de Rastreabilidade

A matriz de rastreabilidade é uma ferramenta usada para facilitar a visualização dos relacionamento entre requisitos e outros artefatos ou objetos, permitindo a rastreabilidade entre os requisitos e os objetivos de negócio. 

A matriz deve contemplar todos os elementos relevantes que fazem parte do sistema, conforme a figura apresentada a seguir.

| Relacionamento REQ. | RF-001 | RF-002 | RF-003 | RF-004 | RF-005 | RF-006 | RF-007 | RF-008 | RF-009 | RF-010 | RF-011 | RF-012 | RF-013 | RF-014 | RF-015 |  
|---------------------|--------|--------|--------|--------|--------|--------|--------|--------|--------|--------|--------|--------|--------|--------|--------|
| **RF-001**          |    x   |        |        |        |        |        |        |        |        |        |        |        |    x   |        |        |    
| **RF-002**          |        |   x    |        |        |        |        |        |        |        |        |        |        |        |        |        |      
| **RF-003**          |        |        |    x   |        |        |        |        |        |        |        |        |        |        |        |        |        
| **RF-004**          |        |        |        |    x   |        |        |        |        |        |        |        |        |        |        |        |       
| **RF-005**          |        |        |        |        |    x   |        |        |        |        |        |        |        |        |        |        |        
| **RF-006**          |        |        |        |        |        |    x   |        |        |        |        |        |        |        |        |        |        
| **RF-007**          |        |        |        |        |        |        |   x    |        |        |        |        |        |        |        |        |        
| **RF-008**          |        |        |        |        |        |        |        |   x    |        |        |        |        |        |        |        |        
| **RF-009**          |        |        |        |        |        |        |        |        |    x   |        |        |        |        |        |        |        
| **RF-010**          |        |        |        |        |        |        |        |        |        |   x    |        |        |        |        |        |        
| **RF-011**          |        |        |        |        |        |        |        |        |        |        |   x    |        |        |        |        |        
| **RF-012**          |        |    x   |    x   |    x   |    x   |    x   |    x   |   x    |   x    |   x    |   x    |   x    |   x    |        |        |        
| **RF-013**          |        |        |        |        |        |        |        |        |        |        |        |        |   x    |        |        |       
| **RF-014**          |        |        |        |        |        |        |        |        |        |        |        |        |        |   x    |        |       
| **RF-015**          |        |        |        |        |        |        |        |        |        |        |        |        |        |        |   x    |        


# Gerenciamento de Projeto

Para a realização do projeto **TEA Friendly**, foram utilizadas como referência as diretrizes do **PMBOK v6 (Project Management Body of Knowledge)**, com o objetivo de garantir uma abordagem estruturada para o planejamento, execução e controle do desenvolvimento da aplicação. A adoção dessas práticas permite organizar as atividades do projeto de forma sistemática, contribuindo para maior clareza na definição de responsabilidades, acompanhamento das etapas e gestão dos recursos envolvidos.

O gerenciamento do projeto foi estruturado considerando áreas fundamentais como **gestão do tempo**, **gestão da equipe** e **gestão de recursos**, buscando assegurar que o desenvolvimento do aplicativo ocorra de forma organizada, colaborativa e alinhada aos objetivos do projeto. Dessa forma, pretende-se garantir a entrega de uma solução funcional, com qualidade e dentro do prazo estabelecido para o semestre letivo.

## Gerenciamento de Tempo

O gerenciamento do tempo foi realizado por meio do Diagrama de Gantt, que permite o acompanhamento das tarefas do projeto de forma visual. Com essa ferramenta, o gerente de projetos pode:

- Agendar e coordenar tarefas de forma eficiente, evitando sobrecarga de trabalho.
- Monitorar a evolução das atividades, permitindo ajustes caso ocorram atrasos ou imprevistos.

Dessa forma, conseguimos garantir que o desenvolvimento da Aplicação do TEA-Friendly ocorra de maneira organizada e dentro dos prazos estabelecidos.

<img width="1648" height="455" alt="Grafico de Gantt" src="https://github.com/user-attachments/assets/9e85bb6f-135c-49d5-a38d-218d10bf68f4" />


## Gerenciamento de Equipe

Foi utilizada a ferramenta **Projects do Github** para a gestão da equipe e distribuição das tarefas. A comunicação aconteceu via grupo no Whatsapp e reuniões semanais através do Teams da equipe.

<img width="1583" height="685" alt="image" src="https://github.com/user-attachments/assets/5cff149f-0c12-4a87-b8a1-2890c0e605ae" />


## Gestão de Orçamento

A tabela abaixo apresenta uma estimativa de custos para o desenvolvimento da solução (valores simulados):

| Recursos Necessários | Custos Estimados (R$) |
| :--- | :--- |
| **Recursos Humanos** (Desenvolvedores Front-end, UX Designers, Especialistas em Acessibilidade) | 180.000,00 |
| **Hardware** (Notebooks de alto desempenho e dispositivos móveis para testes sensoriais) | 15.000,00 |
| **Rede** (Serviços de infraestrutura, hospedagem Cloud e domínio) | 1.200,00 |
| **Software** (Licenças de softwares de design, prototipagem e ferramentas de teste) | 5.000,00 |
| **Serviços** (Consultorias externas e serviços de simulação de dados/API Mock) | 3.000,00 |
| **TOTAL** | **204.200,00** |


