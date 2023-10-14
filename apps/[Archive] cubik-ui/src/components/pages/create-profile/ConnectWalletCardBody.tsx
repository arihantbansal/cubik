import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Spinner,
  Text,
  useMediaQuery,
  Wrap,
} from "@chakra-ui/react";
import type { WalletName } from "@solana/wallet-adapter-base";
import { WalletReadyState } from "@solana/wallet-adapter-base";
import type { Wallet } from "@solana/wallet-adapter-react";
import { useWallet } from "@solana/wallet-adapter-react";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

export const ConnectWalletCardBody = () => {
  const [isLargerThan480] = useMediaQuery("(max-width: 600px)");
  const { wallets, select, publicKey, connecting } = useWallet();
  const [showMore, setShowMore] = useState(false);
  const [spinning, setSpinning] = useState(true);
  const [connectingWallet, setConnectingWallet] = useState("");

  const [listedWallets, collapsedWallets] = useMemo(() => {
    const installed: Wallet[] = [];
    const loadable: Wallet[] = [];
    const notDetected: Wallet[] = [];

    for (const wallet of wallets) {
      if (wallet.readyState === WalletReadyState.NotDetected) {
        notDetected.push(wallet);
      } else if (wallet.readyState === WalletReadyState.Loadable) {
        loadable.push(wallet);
      } else if (wallet.readyState === WalletReadyState.Installed) {
        installed.push(wallet);
      }
    }

    let listed: Wallet[] = [];
    let collapsed: Wallet[] = [];

    if (installed.length) {
      listed = installed;
      collapsed = [...loadable, ...notDetected];
    } else if (loadable.length) {
      listed = loadable;
      collapsed = notDetected;
    } else {
      collapsed = notDetected;
    }

    return [listed, collapsed];
  }, [wallets]);

  const handleWalletClick = useCallback(
    (walletName: WalletName) => {
      setConnectingWallet(walletName);
      setSpinning(true);
      select(walletName);
    },
    [select]
  );

  // if wallet connection throws error then stop spinner
  useEffect(() => {
    if (connecting) {
      if (publicKey) {
        setSpinning(false);
      }
    }
  }, [publicKey, connecting]);

  function shortenWalletName(walletName: string) {
    return walletName.split(" ")[0];
  }

  const WalletButton = ({ wallet }: { wallet: Wallet }) => {
    return (
      <Flex
        minW={isLargerThan480 ? "96px" : "110px"}
        // h="88px"
        p="16px"
        rounded="12px"
        gap="10px"
        as="button"
        flexDir="column"
        align="center"
        background={isLargerThan480 ? "transparent" : "#FFFFFF08"}
        _hover={{
          background: "#FFFFFF18",
        }}
        cursor="pointer"
        transition="all 0.5s ease-out"
        color="neutral.11"
        position="relative"
        overflow="hidden"
        //border="0.1px solid transparent"
        // onClick={onConnectWallet.bind(null, wallet)}
        onClick={() => {
          handleWalletClick(wallet.adapter.name);
        }}
      >
        <Center
          width={isLargerThan480 ? "48px" : "32px"}
          height={isLargerThan480 ? "48px" : "32px"}
        >
          {spinning ? (
            wallet.adapter.name === connectingWallet ? (
              <Spinner
                thickness="2px"
                speed="0.9s"
                emptyColor="brand.teal4"
                color="brand.teal5"
                size="sm"
                width={6}
                height={6}
              />
            ) : (
              <Image
                width={isLargerThan480 ? 52 : 32}
                height={isLargerThan480 ? 53 : 32}
                src={
                  wallet.adapter.name === "Ledger"
                    ? wallet.adapter.icon
                    : wallet.adapter.icon
                }
                alt={`${wallet.adapter.name} Icon`}
              />
            )
          ) : (
            <Image
              width={24}
              height={24}
              src={
                wallet.adapter.name === "Ledger"
                  ? wallet.adapter.icon
                  : wallet.adapter.icon
              }
              alt={`${wallet.adapter.name} Icon`}
            />
          )}
        </Center>
        <Box
          as="p"
          w="full"
          noOfLines={1}
          textStyle={"title5"}
          textAlign={"center"}
        >
          {shortenWalletName(wallet.adapter.name)}
        </Box>
      </Flex>
    );
  };

  return (
    <>
      {isLargerThan480 ? (
        <HStack overflow={"scroll"} gap="0">
          {[...listedWallets, ...collapsedWallets].map((wallet) => (
            <WalletButton wallet={wallet} key={wallet.adapter.name} />
          ))}
        </HStack>
      ) : (
        <>
          {" "}
          <Wrap gap="16px">
            {listedWallets.length > 0 ? (
              listedWallets.map((wallet) => (
                <WalletButton wallet={wallet} key={wallet.adapter.name} />
              ))
            ) : (
              <Text fontSize={{ base: "xs", md: "sm" }} ml={2} fontWeight={600}>
                No Wallets Detected
              </Text>
            )}
            {showMore &&
              collapsedWallets.map((wallet) => (
                <WalletButton wallet={wallet} key={wallet.adapter.name} />
              ))}
          </Wrap>
          <Center w="full" mt="24px">
            <Button
              onClick={() => setShowMore(!showMore)}
              border="1px solid"
              borderColor="#A8F0E608"
              rounded="8px"
              py="1rem"
              variant="outline"
              w="full"
              rightIcon={
                showMore ? (
                  <BiChevronUp size={20} />
                ) : (
                  <BiChevronDown size={20} />
                )
              }
            >
              <Text fontSize={{ base: "xs", md: "sm" }} ml={2} fontWeight={600}>
                Show {showMore ? "less" : "More"}
              </Text>
            </Button>
          </Center>
        </>
      )}
    </>
  );
};
