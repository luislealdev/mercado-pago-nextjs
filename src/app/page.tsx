'use client'
import { initMercadoPago, Payment, Wallet } from '@mercadopago/sdk-react'
initMercadoPago('TEST-3e7f60df-e8d4-41a7-b24c-2d9b8d49eb95');

export default function Home() {

  const initialization = {
    amount: 100,
    preferenceId: '207446753-ea3adb2e-a4f2-41dd-a656-11cb01b8772c',
  };

  const customization = {
    paymentMethods: {
      atm: 'all',
      ticket: 'all',
      bankTransfer: ['pix'],
      creditCard: 'all',
      debitCard: 'all',
      mercadoPago: 'all',
    },
  };

  return (
    <main>
      <h1>Home</h1>
      {/* <Payment
        initialization={initialization}
        customization={customization}
        onSubmit={async (param) => {
          console.log(param);
        }}
      /> */}
      <Wallet initialization={{ preferenceId: '202809963-920c288b-4ebb-40be-966f-700250fa5370' }} />;
    </main>
  );
}
