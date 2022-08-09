cd src\services\rest-api
CALL openapi-generator-cli generate -i swagger-json.json -g typescript-axios
cd %~dp0\
