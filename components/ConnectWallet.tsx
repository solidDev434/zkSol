import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { truncateWalletAddress } from "../lib/utils";
import { FC } from "react";
import { Button } from "./ui/Button";

type ConnectWalletProps = {
	className?: string;
}

const ConnectWallet: FC<ConnectWalletProps> = ({ className }) => {
	const { connected, disconnect, publicKey } = useWallet();

	return (
		<div className={`sol ${className}`}>
			{connected ? (
                <Button onClick={() => disconnect()}>
                    {truncateWalletAddress(publicKey?.toString())}
                </Button>
			) : (
				<WalletMultiButton />
			)}
		</div>
	);
};

export default ConnectWallet;