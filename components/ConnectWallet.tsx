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
                <Button onClick={disconnect}>
                    {truncateWalletAddress(publicKey?.toString() as string)}
                </Button>
			) : (
				<WalletMultiButton 
					style={{ 
						height: "36px", 
						background: "oklch(90.5% 0.182 98.111)", 
						color: "black", 
						padding: "8px 16px", 
						width: "max-content",
						borderRadius: "6px"
					}} 
				/>
			)}
		</div>
	);
};

export default ConnectWallet;