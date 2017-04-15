Start Master Fleet
===================
aws ec2 run-instances --image-id ami-1df22072 --count 1 --instance-type t2.medium --security-groups mixit --user-data file://fleet/user-data.yml

Start Kubernetes Fleet
===================
aws ec2 run-instances --image-id ami-1df22072 --count 1 --instance-type t2.medium --security-groups mixit --user-data file://kubernetes/user-data.yml
