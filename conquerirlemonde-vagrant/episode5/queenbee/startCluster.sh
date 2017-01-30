#!/bin/bash
MASTER_IP=$(ifconfig eth1 | awk '/inet / {print $2}')
POD_NETWORK=10.2.0.0/16
ETCD_SERVER=http://$MASTER_IP:2379

# Create folder
mkdir -p /etc/flannel/

# Replace all file
echo "Set Master_IP in all files"
sed s/#MASTER_IP/$MASTER_IP/g /home/core/template/options.env > /etc/flannel/options.env
sed s/#MASTER_IP/$MASTER_IP/g /home/core/template/kubelet.service > /etc/systemd/system/kubelet.service
sed s/#MASTER_IP/$MASTER_IP/g /home/core/template/kube-apiserver.yaml > /etc/kubernetes/manifests/kube-apiserver.yaml
sed s/#MASTER_IP/$MASTER_IP/g /home/core/template/createMasterCertificats.sh > /etc/kubernetes/ssl/createMasterCertificats.sh

rm /run/systemd/system/etcd2.service.d/20-cloudinit.conf
cat << EOF > /run/systemd/system/etcd2.service.d/20-cloudinit.conf
[Service]
Environment="ETCD_NAME=deathstar"
Environment="ETCD_ADVERTISE_CLIENT_URLS=http://$MASTER_IP:2379"
Environment="ETCD_LISTEN_CLIENT_URLS=http://0.0.0.0:2379,http://0.0.0.0:4001"
EOF

# Generate Certificates
echo "Generate certificats"
chmod +x /etc/kubernetes/ssl/createMasterCertificats.sh
sh /etc/kubernetes/ssl/createMasterCertificats.sh

# Start etcd2
echo "start etcd2"
systemctl stop etcd2
systemctl start etcd2
systemctl enable etcd2

sleep 5
echo "insert network in etcd2"
curl -X PUT -d "value={\"Network\":\"$POD_NETWORK\",\"Backend\":{\"Type\":\"vxlan\"}}" "$ETCD_SERVER/v2/keys/coreos.com/network/config"

echo "start flanneld"
systemctl stop flanneld
systemctl start flanneld
systemctl enable flanneld

echo "start kubelet..."
systemctl stop kubelet
systemctl start kubelet
systemctl enable kubelet
