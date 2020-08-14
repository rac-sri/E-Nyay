from nucypher.blockchain.eth.interfaces import BlockchainInterfaceFactory
BlockchainInterfaceFactory.initialize_interface(provider_uri='https://rinkeby.infura.io/v3/3dc8b2e3489c4260904f45a4e74a56dc')

 
from nucypher.characters.lawful import Bob, Ursula, Enrico, Alice

import random
from umbral import config, keys, signing, pre
from umbral.curve import SECP256K1


config.set_default_curve(SECP256K1)
print('aslkjdsals')
# **************************************************************************

rachit_private_key = keys.UmbralPrivateKey.gen_key()
rachit_public_key = rachit_private_key.get_pubkey()

rachit_signing_key = keys.UmbralPrivateKey.gen_key()
rachit_verifying_key = rachit_signing_key.get_pubkey()
rachit_signer = signing.Signer(private_key=rachit_signing_key)

Apoorv_private_key = keys.UmbralPrivateKey.gen_key()
Apoorv_public_key = Apoorv_private_key.get_pubkey()

# **************************************************************************

plaintext = b'Hackathon!'
ciphertext, capsule = pre.encrypt(rachit_public_key, plaintext)
cleartext = pre.decrypt(ciphertext=ciphertext,capsule=capsule,decrypting_key=rachit_private_key)   




# Giving Access. Here rachit -> Apoorv

# Re-encryption key fragments, or “kfrags”.  rachit creates 20 kfrags, but Apoorv needs to get only 10 re-encryptions to activate the capsule.

Rachitkfrags = pre.generate_kfrags(delegating_privkey=rachit_private_key,signer=rachit_signer,receiving_pubkey=Apoorv_public_key,threshold=10,N=20)


# def openCapsule():
#     capsule = "<fetch the capsule through a side-channel>"
#     kfrags = random.sample(Rachitkfrags,10)
#     capsule.set_correctness_keys(delegating=rachit_public_key,receiving=Apoorv_public_key,verifying=rachit_verifying_key)
#     cfrags = list()
#     for kfrag in kfrags:
#         cfrag = pre.reencrypt(kfrag=kfrag, capsule=capsule)
#         cfrags.append(cfrag)  

#     capsule.set_correctness_keys(delegating=rachit_public_key,receiving=Apoorv_public_key,verifying=rachit_verifying_key)
#     for cfrag in cfrags:
#         capsule.attach_cfrag(cfrag)
#     cleartext = pre.decrypt(ciphertext=ciphertext,capsule=capsule,decrypting_key=Apoorv_private_key)
   
