Start Master Fleet
===================
aws ec2 run-instances --image-id ami-ac8fd4ca --count 1 --instance-type t2.medium --security-groups snowcamp --user-data file://fleet/user-data.yml

Start Kubernetes Fleet
===================
aws ec2 run-instances --image-id ami-ac8fd4ca --count 1 --instance-type t2.medium --security-groups snowcamp --user-data file://kubernetes/user-data.yml
