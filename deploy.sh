#!/usr/bin/env bash

REMOTE_USER="pi"
REMOTE_SERVER="rpi.beckerewing.com"
REMOTE_DIRECTORY_ROOT="~/src/capstone-POV"

FE_DIRECTORY_ROOT="frontend"
FE_BUILT_SOURCES_DIRECTORY="${FE_DIRECTORY_ROOT}/dist/"
FE_REMOTE_DIRECTORY_DEST="${REMOTE_DIRECTORY_ROOT}/frontend"

BE_DIRECTORY_ROOT="server"
BE_EXCLUDE_LIST=`'server/__pycache__', 'server/db.sqlite3', 'server/README.md', 'server/server.egg-info', 'serever/.idea', 'server/.DS_Store'`
BE_REMOTE_DIRECTORY_DEST="${REMOTE_DIRECTORY_ROOT}"
# Build FE code

cd $FE_DIRECTORY_ROOT
yarn install && yarn build

# Ensure everything went swimmingly. Abort deploy if not.
result=$?
if [ $result -ne 0 ]; then
  echo "(${0##*/}): Failed to build FE sources! Exiting..."
  exit 1
fi
cd ..

echo "###########################################################"
echo "# (${0##*/}) Copying Files to Host ${REMOTE_SERVER}  #"
echo "###########################################################"

# Copy Files
rsync -vrzc --delete ${FE_BUILT_SOURCES_DIRECTORY} ${REMOTE_USER}@${REMOTE_SERVER}:${FE_REMOTE_DIRECTORY_DEST} 
rsync -vrzc --delete --exclude={$BE_EXCLUDE_LIST} ${BE_DIRECTORY_ROOT} ${REMOTE_USER}@${REMOTE_SERVER}:${BE_REMOTE_DIRECTORY_DEST}

echo "###################################################################"
echo "# (${0##*/}) Starting Django Server on Host ${REMOTE_SERVER}  #"
echo "###################################################################"

# Start Servers
ssh ${REMOTE_USER}@${REMOTE_SERVER} "cd ${REMOTE_DIRECTORY_ROOT}/server && poetry install && poetry run task run &"
