#!/bin/bash
set -euo pipefail
pushd $(dirname "$0")/..

export RPC_URL="http://localhost:5050"

export WORLD_ADDRESS=$(cat ./manifests/deployments/KATANA.json | jq -r '.world.address')

export LOBBY_ADDRESS=$(cat ./manifests/deployments/KATANA.json | jq -r '.contracts[] | select(.name == "dojo_starter::systems::lobby::lobby" ).address')

export BATTLESYSTEM_ADDRESS=$(cat ./manifests/deployments/KATANA.json | jq -r '.contracts[] | select(.name == "dojo_starter::systems::battleSystem::battleSystem" ).address')

echo "---------------------------------------------------------------------------"
echo world : $WORLD_ADDRESS
echo " "
echo lobby : $LOBBY_ADDRESS
echo " "
echo battlesystem : $BATTLESYSTEM_ADDRESS
echo "---------------------------------------------------------------------------"

# enable system -> models authorizations
sozo auth grant --world $WORLD_ADDRESS --wait writer \
  Player,$LOBBY_ADDRESS \
  Game,$LOBBY_ADDRESS \
  >/dev/null

# enable system -> models authorizations
sozo auth grant --world $WORLD_ADDRESS --wait writer \
  Game,$BATTLESYSTEM_ADDRESS \
  Round,$BATTLESYSTEM_ADDRESS \
  >/dev/null

echo "Default authorizations have been successfully set."
