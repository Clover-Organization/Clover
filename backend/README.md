**Documentação para Utilização do Backend Java Spring** 🌱

Esta documentação fornece orientações sobre como configurar e usar o backend Java Spring para desenvolver e implantar aplicativos web.

---

### 1. Configuração do Ambiente 🛠️

Antes de começar, verifique se o seguinte ambiente de desenvolvimento está configurado:

- **JDK (Java Development Kit)**: Certifique-se de ter o JDK na versão 21 instalado em seu sistema. Você pode baixar e instalar o JDK mais recente do [site oficial da Oracle](https://www.oracle.com/br/java/technologies/downloads/) ou usar uma distribuição OpenJDK.

- **Apache Maven**: O Maven é uma ferramenta de automação de compilação amplamente utilizada para projetos Java. Certifique-se de ter o Maven instalado em seu sistema. Você pode baixar o Maven do [site oficial do Apache Maven](https://maven.apache.org/download.cgi) e seguir as instruções de instalação.

- **IDE (Integrated Development Environment)**: Embora você possa usar qualquer IDE de sua preferência, recomenda-se o uso do IntelliJ IDEA ou do Spring Tool Suite (STS), pois eles oferecem suporte robusto para desenvolvimento Spring.

- **MongoDB**: Será necessário o MongoDB para armazenar os dados dos usuários e projetos. Baixe e instale a versão Community do MongoDB no [site oficial](https://www.mongodb.com/try/download/community).

---

### 2. Configuração do Projeto 🚀

Siga estas etapas para configurar um novo projeto Spring Boot:

1. **Crie um novo banco de dados no MongoDB**: Você precisa criar um novo banco de dados chamado "clover" para que o Java seja capaz de identificar o banco onde deverá salvar as coleções.

2. **Crie o primeiro documento com o nome de "users"**: Você precisa criar o primeiro documento com o nome de "users", e a partir dele, todo o restante será criado automaticamente.

---

### 3. Documentação da API com Swagger 📚

Utilize o Swagger para documentar e testar sua API de forma interativa. Acesse a documentação em [http://localhost:8080/swagger-ui/index.html#/](http://localhost:8080/swagger-ui/index.html#/).

---

Siga estas instruções para configurar e usar o backend Java Spring com sucesso em seu projeto. Se precisar de ajuda adicional, consulte a documentação oficial do Spring Boot ou entre em contato com a comunidade. Boa sorte! 🌟