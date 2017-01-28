#!/bin/bash
POD_NETWORK=10.2.0.0/16
ETCD_SERVER=http://192.168.0.11:32379

curl http://127.0.0.1:8080/version
curl -H "Content-Type: application/json" -XPOST -d'{"apiVersion":"v1","kind":"Namespace","metadata":{"name":"kube-system"}}' "http://127.0.0.1:8080/api/v1/namespaces"
curl -s localhost:10255/pods | jq -r '.items[].metadata.name'
