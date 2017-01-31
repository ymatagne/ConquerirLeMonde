#!/bin/bash
MASTER_HOST=172.20.20.248
CERTIFICATES_PATH=/Users/luya/Workspace/conquerirlemonde/conquerirlemonde-vagrant/episode5/queenbee/certificats

scp -r -P 2222 -i /var/root/.vagrant.d/insecure_private_key core@127.0.0.1:/tmp/newssl/* ./certificats/


kubectl config set-cluster default-cluster --server=https://${MASTER_HOST} --certificate-authority=${CERTIFICATES_PATH}/ca.pem
kubectl config set-credentials default-admin --certificate-authority=${CERTIFICATES_PATH}/ca.pem --client-key=${CERTIFICATES_PATH}/admin-key.pem --client-certificate=${CERTIFICATES_PATH}/admin.pem
kubectl config set-context default-system --cluster=default-cluster --user=default-admin
kubectl config use-context default-system

kubectl get nodes

kubectl create -f dns-addon.yml
kubectl create -f kube-dashboard-rc.yaml
kubectl create -f kube-dashboard-svc.yaml
kubectl get pods --namespace=kube-system
echo kubectl port-forward kubernetes-dashboard-v1.4.1-SOME-ID 9090 --namespace=kube-system
