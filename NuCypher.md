- virtualenv /your/path/nucypher-venv
- source /your/path/nucypher-venv/bin/activate
- \$(nucypher-venv) pip3 install -U nucypher // first part will be prepended after step 2

Docker

- docker pull nucypher/nucypher:latest
- docker run -it -v ~/.local/share/nucypher:/root/.local/share/nucypher -v ~/.ethereum/:/root/.ethereum -p 9151:9151 nucypher/nucypher:latest nucypher` <ACTION>``<OPTIONS> `

### URSULA SERVICE

- ursula.service file: place it in /etc/systemd/system/.

### Reference

> https://github.com/ivfedorov/NuCypherChromeExtensionCoinlistHack
