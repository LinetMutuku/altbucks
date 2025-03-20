import dynamic from 'next/dynamic';

// Dynamic import with SSR disabled - standard approach
const WalletWithNoSSR = dynamic(() => import('./wallet-client'), {
  ssr: false,
  loading: () => <div className="p-8 text-center">Loading wallet...</div>
});

export default function WalletPage() {
  return <WalletWithNoSSR />;
}