**Documentação para Utilização do Backend Java Spring**

Esta documentação fornece informações sobre como configurar e usar o backend Java Spring para desenvolver e implantar aplicativos web.

---

### 1. Configuração do Ambiente

Antes de começar, verifique se o seguinte ambiente de desenvolvimento está configurado:

- **JDK (Java Development Kit)**: Certifique-se de ter o JDK na versao 21 instalado em seu sistema. Você pode baixar e instalar o JDK mais recente do site oficial da Oracle ou usar uma distribuição OpenJDK.

<a href="https://www.oracle.com/br/java/technologies/downloads/">JAVA JDK DOWNLOAD</a>
  
- **Apache Maven**: O Maven é uma ferramenta de automação de compilação amplamente utilizada para projetos Java. Certifique-se de ter o Maven instalado em seu sistema. Você pode baixar o Maven do site oficial do Apache Maven e seguir as instruções de instalação.

<a href="https://maven.apache.org/download.cgi">MAVEN DOWNLOAD</a>

- **IDE (Integrated Development Environment)**: Embora você possa usar qualquer IDE de sua preferência, recomenda-se o uso do IntelliJ IDEA ou do Spring Tool Suite (STS), pois eles oferecem suporte robusto para desenvolvimento Spring.

- **MongoDB**: Será necessário o mongoDB para que seja possível armazenar os dados dos usuários e projetos.

<a href="https://www.mongodb.com/try/download/community">MongoDB community DOWNLOAD</a>
---

### 2. Configuração do Projeto

Siga estas etapas para configurar um novo projeto Spring Boot:

1. **Crie um novo banco de dados no MongoDB**: Você precisa criar um novo banco de dados chamado clover para que o java seja capaz de de identificar o banco onde deverá salvar as coleções.

2. **Crie o primeiro documento com nome de users**: Você precisa criar o primeiro documento com o nome de users e a partir dele todo o restante será criado automáticamente

---

### 3. Swagger documentation API

**http://localhost:8080/swagger-ui/index.html#/**