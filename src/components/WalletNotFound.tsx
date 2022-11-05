export default function WalletNotFound() {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-screen flex">
        {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
        <div className="max-w-3xl m-auto text-center">
          <div>Please make sure your <a href="https://www.tronlink.org/" target={'_blank'}>TronLink wallet</a> is installed.</div>
        </div>
      </div>
    );
  }
  