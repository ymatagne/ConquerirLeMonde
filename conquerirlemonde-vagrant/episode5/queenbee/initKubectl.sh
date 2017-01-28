#!/bin/bash
MASTER_HOST=192.168.0.11:30443
CERTIFICATES_PATH=/Users/luya/Workspace/conquerirlemonde/conquerirlemonde-vagrant/episode5/queenbee/certificats

kubectl config set-cluster default-cluster --server=https://${MASTER_HOST} --certificate-authority=${CERTIFICATES_PATH}/ca.pem
kubectl config set-credentials default-admin --certificate-authority=${CERTIFICATES_PATH}/ca.pem --client-key=${CERTIFICATES_PATH}/admin-key.pem --client-certificate=${CERTIFICATES_PATH}/admin.pem
kubectl config set-context default-system --cluster=default-cluster --user=default-admin
kubectl config use-context default-system

