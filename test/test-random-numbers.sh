#!/usr/bin/env bash





dataPath=test/test-data.txt





rm   $dataPath
node "test/rand.js" --number 0 --start >> $dataPath



perLoop=1000
loops=1000
total="$(($perLoop * $loops))"

echo 'PRNG randombytes-derivative' >> $dataPath
echo 'type: d'                     >> $dataPath
echo "count: $total"               >> $dataPath
echo 'numbit: 31'                  >> $dataPath





for ith in `seq 1 $loops`;
do

	>&2 echo "$ith"
	node test/rand.js --number $perLoop >> $dataPath

done





dieharder -g 202 -f $dataPath -a
