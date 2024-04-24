#!/bin/bash

# Define server details
SERVER_IP="102.37.23.165"
SERVER_USERNAME="nour"
SERVER_PASSWORD="@legendarynour1"

# Define remote directory
REMOTE_DIR="/path/to/remote/directory"

# Copy files to the server
#rsync -avz --delete ./ $SERVER_USERNAME@$SERVER_IP:$REMOTE_DIR

# Execute remote commands
sshpass -p $SERVER_PASSWORD ssh $SERVER_USERNAME@$SERVER_IP << EOF
    #cd $REMOTE_DIR
    # Run any necessary commands on the server
    # For example, restart the server or update dependencies
    # ./run.sh
    # npm install
    # etc.
EOF