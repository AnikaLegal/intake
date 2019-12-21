#/bin/bash
set -e
pip install --user awscli
mkdir ~/.aws/
touch ~/.aws/credentials
cat > ~/.aws/credentials << EOF
[anika]
aws_access_key_id = $AWS_ACCESS_KEY_ID
aws_secret_access_key = $AWS_SECRET_ACCESS_KEY
EOF
