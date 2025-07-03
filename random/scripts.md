# Route 53 cli tools

<HOSTED_ZONE_ID> = arnavchauhan.com -> Z08331223JEOLHFMSRDTI

aws route53 get-change --id /change/

aws route53 list-hosted-zones-by-name --dns-name arnavchauhan.com --output json

aws route53 change-resource-record-sets \
  --hosted-zone-id <HOSTED_ZONE_ID> \
  --change-batch file://r53changes/[filename].json
