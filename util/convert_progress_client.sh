#!/usr/bin/env bash

file="${1:-Progress.xlsx}"
server="${2:-user@host}"

dd if="$file" status=none | ssh $server 'sudo ~/convert_progress_server.sh'
