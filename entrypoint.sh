#!/bin/bash

# Initialize IPFS
ipfs init

# Start IPFS daemon
ipfs daemon &

# Start libp2p
# (Add your libp2p startup command here)

# Start Apache Spark
${SPARK_HOME}/sbin/start-all.sh

# Keep the container running
tail -f /dev/null