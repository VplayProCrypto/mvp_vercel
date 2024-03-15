FROM openjdk:8-jdk-slim

# Install necessary dependencies
RUN apt-get update && \
    apt-get install -y wget curl gnupg2 && \
    rm -rf /var/lib/apt/lists/*

# Install Apache Spark
ENV SPARK_VERSION=3.1.2
ENV SPARK_HOME=/opt/spark

RUN wget https://archive.apache.org/dist/spark/spark-${SPARK_VERSION}/spark-${SPARK_VERSION}-bin-hadoop2.7.tgz && \
    tar -xzf spark-${SPARK_VERSION}-bin-hadoop2.7.tgz && \
    mv spark-${SPARK_VERSION}-bin-hadoop2.7 ${SPARK_HOME} && \
    rm spark-${SPARK_VERSION}-bin-hadoop2.7.tgz

# Install IPFS
ENV IPFS_VERSION=0.8.0

RUN wget https://dist.ipfs.io/go-ipfs/v${IPFS_VERSION}/go-ipfs_v${IPFS_VERSION}_linux-amd64.tar.gz && \
    tar -xzf go-ipfs_v${IPFS_VERSION}_linux-amd64.tar.gz && \
    mv go-ipfs/ipfs /usr/local/bin/ && \
    rm -rf go-ipfs && \
    rm go-ipfs_v${IPFS_VERSION}_linux-amd64.tar.gz

# Install libp2p
RUN curl -s https://deb.nodesource.com/setup_14.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g libp2p

# Set up the entrypoint script
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Expose necessary ports
EXPOSE 4001 5001 8080 7077

# Set the entrypoint
ENTRYPOINT ["/entrypoint.sh"]