#!/bin/bash
openssl genrsa -out /etc/kubernetes/ssl/ca-key.pem 2048
openssl req -x509 -new -nodes -key /etc/kubernetes/ssl/ca-key.pem -days 10000 -out /etc/kubernetes/ssl/ca.pem -subj "/CN=kube-ca"
openssl genrsa -out /etc/kubernetes/ssl/apiserver-key.pem 2048
openssl req -new -key /etc/kubernetes/ssl/apiserver-key.pem -out /etc/kubernetes/ssl/apiserver.csr -subj "/CN=kube-apiserver" -config /etc/kubernetes/ssl/openssl.cnf
openssl x509 -req -in /etc/kubernetes/ssl/apiserver.csr -CA /etc/kubernetes/ssl/ca.pem -CAkey /etc/kubernetes/ssl/ca-key.pem -CAcreateserial -out /etc/kubernetes/ssl/apiserver.pem -days 365 -extensions v3_req -extfile /etc/kubernetes/ssl/openssl.cnf
openssl genrsa -out /etc/kubernetes/ssl/admin-key.pem 2048
openssl req -new -key /etc/kubernetes/ssl/admin-key.pem -out /etc/kubernetes/ssl/admin.csr -subj "/CN=kube-admin"
openssl x509 -req -in /etc/kubernetes/ssl/admin.csr -CA /etc/kubernetes/ssl/ca.pem -CAkey /etc/kubernetes/ssl/ca-key.pem -CAcreateserial -out /etc/kubernetes/ssl/admin.pem -days 365
