export const signInWithMetaMaskHandler = async () => {
   try {
      if (window.ethereum) {
         const message = `bs game ${Date.now()}`;
         const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts',
         });
         const account = accounts[0];
         const signature = await window.ethereum.request({
            method: 'personal_sign',
            params: [message, account],
         });
         const obj = {
            walletAddress: account,
            signatureHash: signature,
            timestamp: Date.now(),
         };

         if (obj) {
            return obj;
         }

         console.error(obj);
      } else {
         return {
            walletAddress: null,
            message: 'Metamask not found',
         };
      }
   } catch (err) {
      if (err) {
         console.log(err);
      }
   }
};
