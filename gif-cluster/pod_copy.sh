#! /bin/sh
touch hosts

for podIP in $(kubectl get pods -o json| jq -r '.items[].status.podIP');
   do
       echo "${podIP}" >> hosts
   done

