#!/usr/bin/env bash





dataPath=test/data.txt





echo '' > $dataPath
node "test/rand.js" --number 0 --start > $dataPath

total=1000

echo 'PRNG randombytes-derivative' >> $dataPath
echo 'type: d'                     >> $dataPath
echo "count: $total"               >> $dataPath
echo 'numbit: 31'                  >> $dataPath

node test/rand.js --number $total >> $dataPath

dieharder -g 202 -f $dataPath -a
