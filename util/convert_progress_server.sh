#!/usr/bin/env bash

csv_location="/var/www/html/tapeout-progress.csv"
tmp_location="/tmp/tapeout-progress.tmp"

dd status=none of="$tmp_location"
xlsx2csv -s 1 "$tmp_location" |
awk 'BEGIN { FS =","; OFS=","} $1 ~ /TX Frontend|RX Frontend|RX ADC|Digital|Synthese|Verification/ {print $1,$4+$5/2}; $1 =="Progress" {print "Total",$2}' |
tee "$csv_location"
chmod o+r "$csv_location"
rm "$tmp_location"
