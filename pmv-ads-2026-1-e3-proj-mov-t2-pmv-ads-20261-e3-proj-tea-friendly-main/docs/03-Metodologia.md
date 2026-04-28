
# Metodologia

<span style="color:red">Pré-requisitos: <a href="02-Especificação do Projeto.md"> Documentação de Especificação</a></span>

Para o desenvolvimento do TEA Friendly, optou-se pelo framework **Scrum**, visando otimizar a organização e a adaptabilidade da equipe frente aos desafios do projeto. A metodologia segmenta o backlog em ciclos de desenvolvimento dinâmicos, chamado de **SPRINTS**, promovendo uma evolução constante do aplicativo e uma comunicação assertiva entre os membros. Essa abordagem colaborativa favorece a troca de conhecimentos e a resolução ágil de problemas, resultando em um fluxo de trabalho disciplinado que prioriza a inovação e o bem-estar do usuário final, garantindo uma solução tecnológica robusta e humanizada.

## Relação de Ambientes de Trabalho

Os artefatos do projeto são desenvolvidos a partir de diversas plataformas e a relação dos ambientes com seu respectivo propósito deverá ser apresentada em uma tabela que especifica que detalha Ambiente, Plataforma e Link de Acesso. 
Nota: Vide documento modelo do estudo de caso "Portal de Notícias" e defina também os ambientes e frameworks que serão utilizados no desenvolvimento de aplicações móveis.

## Relação de Ambientes de Trabalho

Os artefatos do projeto são desenvolvidos a partir de diversas plataformas e a relação dos ambientes com seu respectivo propósito é apresentada na tabela que se segue:

| Ambiente | Plataforma | Link de Acesso |
| :--- | :--- | :--- |
| **Documentação do Projeto** | GitHub | [Link do Repositório](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2026-1-e3-proj-mov-t2-pmv-ads-20261-e3-proj-tea-friendly/tree/main/docs)|
| **Repositório do Código Fonte** | GitHub | [[Link do Repositório]](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2026-1-e3-proj-mov-t2-pmv-ads-20261-e3-proj-tea-friendly) |
| **Gerenciamento de Tarefas** | GitHub Projects | [Link do Projeto](https://github.com/orgs/ICEI-PUC-Minas-PMV-ADS/projects/2669) |
| **Framework** | React Native | https://reactnative.dev/ |
| **Back-end e Banco de Dados** | Firebase | https://firebase.google.com/ |

Durante o desenvolvimento, utilizaremos o **Expo** para facilitar a criação e o teste da aplicação, permitindo a execução em dispositivos físicos por meio do aplicativo **Expo Go**. Além disso, os emuladores serão utilizados para validação do funcionamento da aplicação em diferentes cenários.


## Controle de Versão

A ferramenta de controle de versão adotada no projeto é o **Git**, sendo que o **GitHub** é utilizado para a hospedagem do repositório, devido à sua facilidade de integração e recursos para trabalho colaborativo. O projeto segue uma convenção baseada no modelo **Gitflow** para a organização do versionamento e gerenciamento de branches.

### Estrutura de Branches

As principais branches adotadas no desenvolvimento da aplicação são:

* **`main`**: branch principal contendo a versão estável do software, já testada e pronta para produção.
* **`dev`**: branch de desenvolvimento onde as novas funcionalidades e correções de bugs são integradas para testes antes de serem enviadas para a produção.
* **`feature`**: branches específicas criadas a partir da `dev` para o desenvolvimento de novas funcionalidades
.
### Gerenciamento de Issues e Etiquetas

Para organizar o fluxo de trabalho e priorizar as atividades do projeto, utilizamos o sistema de **Issues** do GitHub, categorizadas pelas seguintes etiquetas (labels):

* **`documentation`**: utilizada para melhorias ou acréscimos à documentação do projeto.
* **`bug`**: indica que uma funcionalidade do sistema apresenta erros ou problemas técnicos.
* **`enhancement`**: utilizada quando há necessidade de melhorias ou ajustes em funcionalidades já existentes no software.
* **`feature`**: indica que uma nova funcionalidade está sendo introduzida ao sistema.

Cada issue é atribuída a um membro da equipe e o progresso é monitorado através de **Pull Requests**, garantindo que o código passe por revisão antes de ser mesclado às branches principais.

## Gerenciamento de Projeto

Para garantir a eficiência no planejamento e execução do aplicativo TEA Friendly, adotamos o framework ágil Scrum. Esta metodologia permite entregas iterativas e incrementais, facilitando a adaptação do software às necessidades sensoriais e de acessibilidade das nossas personas ao longo do desenvolvimento.

A gestão visual das tarefas é realizada através do GitHub Projects, onde o backlog de atividades é organizado em colunas de status (To Do, In Progress, Done). Essa abordagem assegura a transparência do progresso e a priorização correta dos requisitos funcionais, como os filtros de busca e o sistema de avaliação. Além disso, utilizamos o WhatsApp e reuniões via Microsoft Teams para alinhamento contínuo e resolução de impedimentos, funcionando como nossos ritos de Daily e Sprint Review.



### Divisão de Papéis

A equipe está organizada da seguinte maneira, buscando o equilíbrio entre as frentes de desenvolvimento, design e gestão:

- **Scrum Master:** *Edilson Ferreira Martins.*
- **Product Owner:** *Enzo Gabriel Rodrigues Mendes de Alcantara e Edilson Ferreira Martins.*
- **Equipe de Desenvolvimento:** *Paulo Henrique da Silva Santos Vieira, Rafael Dias Machado, Wally Klitzke, Enzo Gabriel Rodrigues Mendes de Alcantara e Edilson Ferreira Martins.*
- **Equipe de Design:** *Nycolle de Oliveira Cândido Martins e Wally Klitzke.*

### Processo

O grupo utiliza o recurso de gerenciamento de projetos do **GitHub** para acompanhar o andamento das Sprints. O processo é estruturado da seguinte forma:

1.  **Backlog do Produto:** Listagem de todas as funcionalidades e tarefas (Issues) necessárias, priorizadas pelo Product Owner.
2.  **Sprints:** Ciclos de trabalho onde a equipe foca em requisitos específicos, como a implementação da autenticação e as telas de cadastro.
3.  **Quadro Kanban (GitHub Projects):**
    * **New:** Novas tarefas identificadas.
    * **To Do:** Tarefas selecionadas para a Sprint atual.
    * **In Progress:** Funcionalidades em fase de codificação ou design.
    * **Done:** Tarefas concluídas e revisadas pela equipe.

<img width="1152" height="672" alt="image" src="https://github.com/user-attachments/assets/51c8f22e-b16a-48df-9115-e68bf5d6ecd3" />


### Ferramentas

As ferramentas empregadas no desenvolvimento do projeto e suas justificativas são:

* **Editor de Código (VS Code):** Escolhido pela sua ampla integração nativa com o sistema de versão **Git**.
* **Ferramentas de Comunicação (Teams / WhatsApp):** Utilizadas para reuniões de alinhamento e comunicação rápida entre os membros.
* **Desenho de Tela (Figma / Marvel App):** Ferramentas selecionadas para criar diagramas e protótipos que melhor captam as necessidades da nossa solução.
* **Gerenciamento de Projeto (GitHub Projects):** Adotado para permitir o acompanhamento do status de desenvolvimento e execução das tarefas.
* **Repositório de Código (GitHub):** Utilizado para a hospedagem do repositório e controle de versão.
* **Infraestrutura (Firebase):** Utilizado para serviços de autenticação e armazenamento de dados.
