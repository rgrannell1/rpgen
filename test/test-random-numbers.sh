#!/usr/bin/env bash





# to prevent a memory leak!

for ith in `seq 1 10000`;
do
	node test/rand.js --number 1000 >>  test/test-data.txt
done





dieharder -g 202 -f test/test-data.txt -a
