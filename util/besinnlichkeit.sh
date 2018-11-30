#!/usr/bin/env bash
begin=$(date -d '12:00' +"%s")
end=$(date -d '20:00' +"%s")
refresh="3m"

timespan=$(( end - begin ))
while now=$(date +"%s")
    (( now < end ))
do
    sleep $refresh

    beer=$( echo "scale=3; ( $end - $now ) / $timespan " | bc )
    besinnlichkeit=$( echo "scale=3; 1 - $beer " | bc )

    if [[ $beer == 1* ]]
    then 
        beer=1
        besinnlichkeit=0
    elif [[ $beer == -* ]]
    then
        beer=0
        besinnlichkeit=1
    fi

    echo "$(date +"%H:%M:%S") beer=$beer besinnlichkeit=$besinnlichkeit"
    sed "/^Verification/aBeer,${beer}\nBesinnlichkeit,${besinnlichkeit}" tapeout-progress.csv > weihnacht-progress.csv
done
