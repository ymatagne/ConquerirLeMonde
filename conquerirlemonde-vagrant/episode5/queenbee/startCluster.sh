#!/bin/bash
POD_NETWORK=10.2.0.0/16
ETCD_SERVER=http://192.168.0.11:32379

curl -X PUT -d "value={\"Network\":\"$POD_NETWORK\",\"Backend\":{\"Type\":\"vxlan\"}}" "$ETCD_SERVER/v2/keys/coreos.com/network/config"

sudo systemctl start flanneld
sudo systemctl enable flanneld

sudo systemctl start kubelet
sudo systemctl enable kubelet

