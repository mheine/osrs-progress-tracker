#!/bin/bash

ssh -q mheine.se@ssh.mheine.se exit
STATUS=$?

if [[ "$STATUS" != 0 ]] ; then
	echo "SSH connection refused. Please check the ssh keys."
	exit 0
fi

echo "Starting transfer to osrs.mheine.se"

rsync --recursive --progress css/ mheine.se@ssh.mheine.se:/www/osrs/css/ | tail -n +2
rsync --recursive --progress images/ mheine.se@ssh.mheine.se:/www//osrs/images/ | tail -n +2
rsync --recursive --progress js/ mheine.se@ssh.mheine.se:/www//osrs/js/ | tail -n +2
rsync --recursive --progress index.html mheine.se@ssh.mheine.se:/www/osrs/ | tail -n +2
rsync --recursive --progress metadata.json mheine.se@ssh.mheine.se:/www/osrs/ | tail -n +2

echo "Transfer successful!"


