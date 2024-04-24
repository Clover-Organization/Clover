FROM ubuntu:latest AS build

RUN apt-get update && apt-get install -y \
    wget \
    unzip \
    && rm -rf /var/lib/apt/lists/*

RUN wget https://download.java.net/java/early_access/alpine/20/binaries/openjdk-20-ea+20_linux-x64-musl_bin.tar.gz \
    && tar xzf openjdk-20-ea+20_linux-x64-musl_bin.tar.gz -C /opt \
    && rm openjdk-20-ea+20_linux-x64-musl_bin.tar.gz

ENV JAVA_HOME /opt/jdk-20
ENV PATH $JAVA_HOME/bin:$PATH

RUN apt-get update && apt-get install -y maven

COPY . .
RUN mvn clean install

FROM openjdk:20-jdk-slim

EXPOSE 8080

COPY --from=build backend/API/target/API-0.0.1-SNAPSHOT.jar app.jar

ENTRYPOINT [ "java", "-jar", "app.jar" ]
