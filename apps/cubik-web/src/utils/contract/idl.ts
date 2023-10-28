export interface CubikContractV2 {
  version: '0.1.0';
  name: 'cubik_contract_v2';
  instructions: [
    {
      name: 'createUser';
      accounts: [
        {
          name: 'authority';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'userAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'rent';
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: 'username';
          type: 'string';
        },
      ];
    },
    {
      name: 'createProject';
      accounts: [
        {
          name: 'owners';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'projectAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'adminAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'userAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'rent';
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: 'counter';
          type: 'string';
        },
        {
          name: 'multiSig';
          type: 'publicKey';
        },
      ];
    },
    {
      name: 'createRound';
      accounts: [
        {
          name: 'authority';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'roundAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'rent';
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: 'counter';
          type: 'string';
        },
        {
          name: 'matchingPool';
          type: 'u64';
        },
        {
          name: 'projectSize';
          type: 'u64';
        },
        {
          name: 'limit';
          type: 'u64';
        },
      ];
    },
    {
      name: 'createAdmin';
      accounts: [
        {
          name: 'authority';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'adminAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'rent';
          isMut: false;
          isSigner: false;
        },
      ];
      args: [];
    },
    {
      name: 'projectRoundJoin';
      accounts: [
        {
          name: 'authority';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'roundVerficationAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'rent';
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: 'roundAccount';
          type: 'publicKey';
        },
        {
          name: 'projectAccount';
          type: 'publicKey';
        },
      ];
    },
    {
      name: 'updateApproveRound';
      accounts: [
        {
          name: 'authority';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'adminAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'roundAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'projectAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'roundVerficationAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'rent';
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: 'roundId';
          type: 'string';
        },
        {
          name: 'counter';
          type: 'string';
        },
        {
          name: 'owner';
          type: 'publicKey';
        },
      ];
    },
    {
      name: 'updateRejectRound';
      accounts: [
        {
          name: 'authority';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'adminAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'roundAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'projectAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'roundVerficationAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'rent';
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: 'roundId';
          type: 'string';
        },
        {
          name: 'counter';
          type: 'string';
        },
        {
          name: 'owner';
          type: 'publicKey';
        },
      ];
    },
    {
      name: 'updateProjectStatusVerified';
      accounts: [
        {
          name: 'authority';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'adminAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'projectAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'userAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'rent';
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: 'counter';
          type: 'string';
        },
        {
          name: 'owner';
          type: 'publicKey';
        },
      ];
    },
    {
      name: 'updateProjectStatusFailed';
      accounts: [
        {
          name: 'authority';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'adminAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'projectAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'userAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'rent';
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: 'counter';
          type: 'string';
        },
        {
          name: 'owner';
          type: 'publicKey';
        },
      ];
    },
    {
      name: 'createContributionSpl';
      accounts: [
        {
          name: 'authority';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'tokenMint';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'tokenAtaSender';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'tokenAtaReceiver';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'tokenAtaAdmin';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'adminAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'roundAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'projectAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'contributionAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'tokenProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'rent';
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: 'roundId';
          type: 'string';
        },
        {
          name: 'counter';
          type: 'string';
        },
        {
          name: 'owner';
          type: 'publicKey';
        },
        {
          name: 'usdAmount';
          type: 'u64';
        },
        {
          name: 'total';
          type: 'u64';
        },
        {
          name: 'split';
          type: 'u64';
        },
      ];
    },
    {
      name: 'updateContributionSpl';
      accounts: [
        {
          name: 'authority';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'tokenMint';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'tokenAtaSender';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'tokenAtaReceiver';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'tokenAtaAdmin';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'adminAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'roundAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'projectAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'contributionAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'tokenProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'rent';
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: 'roundId';
          type: 'string';
        },
        {
          name: 'counter';
          type: 'string';
        },
        {
          name: 'owner';
          type: 'publicKey';
        },
        {
          name: 'usdAmount';
          type: 'u64';
        },
        {
          name: 'total';
          type: 'u64';
        },
        {
          name: 'split';
          type: 'u64';
        },
      ];
    },
    {
      name: 'createContributionSol';
      accounts: [
        {
          name: 'authority';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'receiverAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'adminAccountInfo';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'adminAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'roundAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'projectAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'contributionAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'tokenProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'rent';
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: 'roundId';
          type: 'string';
        },
        {
          name: 'counter';
          type: 'string';
        },
        {
          name: 'owner';
          type: 'publicKey';
        },
        {
          name: 'usdAmount';
          type: 'u64';
        },
        {
          name: 'total';
          type: 'u64';
        },
        {
          name: 'split';
          type: 'u64';
        },
      ];
    },
    {
      name: 'updateContributionSol';
      accounts: [
        {
          name: 'authority';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'receiverAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'adminAccountInfo';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'adminAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'roundAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'projectAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'contributionAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'tokenProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'rent';
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: 'roundId';
          type: 'string';
        },
        {
          name: 'counter';
          type: 'string';
        },
        {
          name: 'owner';
          type: 'publicKey';
        },
        {
          name: 'usdAmount';
          type: 'u64';
        },
        {
          name: 'total';
          type: 'u64';
        },
        {
          name: 'split';
          type: 'u64';
        },
      ];
    },
    {
      name: 'addProof';
      accounts: [
        {
          name: 'authority';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'userAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'admin';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'adminProofAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'rent';
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: 'proof';
          type: 'string';
        },
      ];
    },
    {
      name: 'removeProof';
      accounts: [
        {
          name: 'authority';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'userAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'admin';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'adminProofAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'rent';
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: 'proof';
          type: 'string';
        },
      ];
    },
    {
      name: 'adminProof';
      accounts: [
        {
          name: 'authority';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'adminProofAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'rent';
          isMut: false;
          isSigner: false;
        },
      ];
      args: [];
    },
    {
      name: 'createContributionV2';
      accounts: [
        {
          name: 'authority';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'tokenMint';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'tokenAtaSender';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'tokenAtaReceiver';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'tokenAtaAdmin';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'adminAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'projectAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'contributionAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'tokenProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'rent';
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: 'amount';
          type: 'u64';
        },
        {
          name: 'split';
          type: 'u64';
        },
        {
          name: 'createKey';
          type: 'publicKey';
        },
        {
          name: 'owner';
          type: 'publicKey';
        },
        {
          name: 'roundId';
          type: 'string';
        },
        {
          name: 'counter';
          type: 'string';
        },
      ];
    },
    {
      name: 'projectJoinHackathon';
      accounts: [
        {
          name: 'authority';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'hackathonJoinAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'rent';
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: 'hackathonAccount';
          type: 'publicKey';
        },
        {
          name: 'projectAccount';
          type: 'publicKey';
        },
      ];
    },
  ];
  accounts: [
    {
      name: 'admin';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'authority';
            type: 'publicKey';
          },
          {
            name: 'bump';
            type: 'u8';
          },
        ];
      };
    },
    {
      name: 'contribution';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'authority';
            type: 'publicKey';
          },
          {
            name: 'bump';
            type: 'u8';
          },
          {
            name: 'total';
            type: 'u64';
          },
          {
            name: 'usd';
            type: 'u64';
          },
        ];
      };
    },
    {
      name: 'contributionV2';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'authority';
            type: 'publicKey';
          },
          {
            name: 'bump';
            type: 'u8';
          },
        ];
      };
    },
    {
      name: 'project';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'owner';
            type: 'publicKey';
          },
          {
            name: 'authority';
            type: 'publicKey';
          },
          {
            name: 'counter';
            type: 'u64';
          },
          {
            name: 'status';
            type: {
              defined: 'ProjectVerification';
            };
          },
          {
            name: 'multiSig';
            type: 'publicKey';
          },
          {
            name: 'bump';
            type: 'u8';
          },
        ];
      };
    },
    {
      name: 'round';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'authority';
            type: 'publicKey';
          },
          {
            name: 'roundId';
            type: 'string';
          },
          {
            name: 'bump';
            type: 'u8';
          },
          {
            name: 'matchingPoolSize';
            type: 'u64';
          },
          {
            name: 'limit';
            type: 'u64';
          },
          {
            name: 'projectSize';
            type: 'u64';
          },
        ];
      };
    },
    {
      name: 'roundJoin';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'authority';
            type: 'publicKey';
          },
          {
            name: 'roundAccount';
            type: 'publicKey';
          },
          {
            name: 'projectAccount';
            type: 'publicKey';
          },
          {
            name: 'status';
            type: {
              defined: 'RoundProjectStatus';
            };
          },
          {
            name: 'bump';
            type: 'u8';
          },
        ];
      };
    },
    {
      name: 'joinHackathon';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'authority';
            type: 'publicKey';
          },
          {
            name: 'bump';
            type: 'u8';
          },
        ];
      };
    },
    {
      name: 'user';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'authority';
            type: 'publicKey';
          },
          {
            name: 'project';
            type: 'u64';
          },
          {
            name: 'proof';
            type: {
              vec: {
                defined: 'PROOF';
              };
            };
          },
          {
            name: 'bump';
            type: 'u8';
          },
        ];
      };
    },
  ];
  types: [
    {
      name: 'ProjectVerification';
      type: {
        kind: 'enum';
        variants: [
          {
            name: 'REVIEW';
          },
          {
            name: 'VERIFIED';
          },
          {
            name: 'FAILED';
          },
        ];
      };
    },
    {
      name: 'RoundProjectStatus';
      type: {
        kind: 'enum';
        variants: [
          {
            name: 'PENDING';
          },
          {
            name: 'APPROVED';
          },
          {
            name: 'REJECTED';
          },
        ];
      };
    },
    {
      name: 'PROOF';
      type: {
        kind: 'enum';
        variants: [
          {
            name: 'LAMPORT';
          },
          {
            name: 'SUPERTEAM';
          },
          {
            name: 'MONKEYDAO';
          },
          {
            name: 'CIVIC';
          },
          {
            name: 'SOCIAL';
          },
          {
            name: 'DROPS01';
          },
        ];
      };
    },
  ];
  events: [
    {
      name: 'NewContribution';
      fields: [
        {
          name: 'user';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'usdAmount';
          type: 'u64';
          index: false;
        },
        {
          name: 'total';
          type: 'u64';
          index: false;
        },
        {
          name: 'totalContribution';
          type: 'u64';
          index: false;
        },
        {
          name: 'totalUsdAmount';
          type: 'u64';
          index: false;
        },
        {
          name: 'split';
          type: 'u64';
          index: false;
        },
      ];
    },
    {
      name: 'NewContributionV2';
      fields: [
        {
          name: 'user';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'createKey';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'amount';
          type: 'u64';
          index: false;
        },
        {
          name: 'split';
          type: 'u64';
          index: false;
        },
      ];
    },
    {
      name: 'NewUser';
      fields: [
        {
          name: 'authority';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'username';
          type: 'string';
          index: false;
        },
      ];
    },
    {
      name: 'NewHackathonJoin';
      fields: [
        {
          name: 'authority';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'hackathonAccount';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'projectAccount';
          type: 'publicKey';
          index: false;
        },
      ];
    },
  ];
  errors: [
    {
      code: 6000;
      name: 'MaxLengthExceeded';
      msg: 'max length is 32';
    },
    {
      code: 6001;
      name: 'InvalidStatus';
      msg: 'invalid status';
    },
    {
      code: 6002;
      name: 'InvalidRoundAccount';
      msg: 'invalid round account';
    },
    {
      code: 6003;
      name: 'InvalidProjectVerification';
      msg: 'project not verified';
    },
    {
      code: 6004;
      name: 'ContributionSizeExceded';
      msg: 'contribution size exceded';
    },
    {
      code: 6005;
      name: 'ProofAlreadyExists';
      msg: 'Proof Already Exists';
    },
    {
      code: 6006;
      name: 'ProofDoesNotExists';
      msg: 'Proof Does Not Exists';
    },
    {
      code: 6007;
      name: 'InvalidProofType';
      msg: 'Invalid Proof type';
    },
  ];
}

export const IDL: CubikContractV2 = {
  version: '0.1.0',
  name: 'cubik_contract_v2',
  instructions: [
    {
      name: 'createUser',
      accounts: [
        {
          name: 'authority',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'userAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'username',
          type: 'string',
        },
      ],
    },
    {
      name: 'createProject',
      accounts: [
        {
          name: 'owners',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'projectAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'adminAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'userAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'counter',
          type: 'string',
        },
        {
          name: 'multiSig',
          type: 'publicKey',
        },
      ],
    },
    {
      name: 'createRound',
      accounts: [
        {
          name: 'authority',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'roundAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'counter',
          type: 'string',
        },
        {
          name: 'matchingPool',
          type: 'u64',
        },
        {
          name: 'projectSize',
          type: 'u64',
        },
        {
          name: 'limit',
          type: 'u64',
        },
      ],
    },
    {
      name: 'createAdmin',
      accounts: [
        {
          name: 'authority',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'adminAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'projectRoundJoin',
      accounts: [
        {
          name: 'authority',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'roundVerficationAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'roundAccount',
          type: 'publicKey',
        },
        {
          name: 'projectAccount',
          type: 'publicKey',
        },
      ],
    },
    {
      name: 'updateApproveRound',
      accounts: [
        {
          name: 'authority',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'adminAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'roundAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'projectAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'roundVerficationAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'roundId',
          type: 'string',
        },
        {
          name: 'counter',
          type: 'string',
        },
        {
          name: 'owner',
          type: 'publicKey',
        },
      ],
    },
    {
      name: 'updateRejectRound',
      accounts: [
        {
          name: 'authority',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'adminAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'roundAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'projectAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'roundVerficationAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'roundId',
          type: 'string',
        },
        {
          name: 'counter',
          type: 'string',
        },
        {
          name: 'owner',
          type: 'publicKey',
        },
      ],
    },
    {
      name: 'updateProjectStatusVerified',
      accounts: [
        {
          name: 'authority',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'adminAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'projectAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'userAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'counter',
          type: 'string',
        },
        {
          name: 'owner',
          type: 'publicKey',
        },
      ],
    },
    {
      name: 'updateProjectStatusFailed',
      accounts: [
        {
          name: 'authority',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'adminAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'projectAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'userAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'counter',
          type: 'string',
        },
        {
          name: 'owner',
          type: 'publicKey',
        },
      ],
    },
    {
      name: 'createContributionSpl',
      accounts: [
        {
          name: 'authority',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'tokenMint',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'tokenAtaSender',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'tokenAtaReceiver',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'tokenAtaAdmin',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'adminAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'roundAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'projectAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'contributionAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'roundId',
          type: 'string',
        },
        {
          name: 'counter',
          type: 'string',
        },
        {
          name: 'owner',
          type: 'publicKey',
        },
        {
          name: 'usdAmount',
          type: 'u64',
        },
        {
          name: 'total',
          type: 'u64',
        },
        {
          name: 'split',
          type: 'u64',
        },
      ],
    },
    {
      name: 'updateContributionSpl',
      accounts: [
        {
          name: 'authority',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'tokenMint',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'tokenAtaSender',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'tokenAtaReceiver',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'tokenAtaAdmin',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'adminAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'roundAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'projectAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'contributionAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'roundId',
          type: 'string',
        },
        {
          name: 'counter',
          type: 'string',
        },
        {
          name: 'owner',
          type: 'publicKey',
        },
        {
          name: 'usdAmount',
          type: 'u64',
        },
        {
          name: 'total',
          type: 'u64',
        },
        {
          name: 'split',
          type: 'u64',
        },
      ],
    },
    {
      name: 'createContributionSol',
      accounts: [
        {
          name: 'authority',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'receiverAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'adminAccountInfo',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'adminAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'roundAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'projectAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'contributionAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'roundId',
          type: 'string',
        },
        {
          name: 'counter',
          type: 'string',
        },
        {
          name: 'owner',
          type: 'publicKey',
        },
        {
          name: 'usdAmount',
          type: 'u64',
        },
        {
          name: 'total',
          type: 'u64',
        },
        {
          name: 'split',
          type: 'u64',
        },
      ],
    },
    {
      name: 'updateContributionSol',
      accounts: [
        {
          name: 'authority',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'receiverAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'adminAccountInfo',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'adminAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'roundAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'projectAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'contributionAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'roundId',
          type: 'string',
        },
        {
          name: 'counter',
          type: 'string',
        },
        {
          name: 'owner',
          type: 'publicKey',
        },
        {
          name: 'usdAmount',
          type: 'u64',
        },
        {
          name: 'total',
          type: 'u64',
        },
        {
          name: 'split',
          type: 'u64',
        },
      ],
    },
    {
      name: 'addProof',
      accounts: [
        {
          name: 'authority',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'userAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'admin',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'adminProofAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'proof',
          type: 'string',
        },
      ],
    },
    {
      name: 'removeProof',
      accounts: [
        {
          name: 'authority',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'userAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'admin',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'adminProofAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'proof',
          type: 'string',
        },
      ],
    },
    {
      name: 'adminProof',
      accounts: [
        {
          name: 'authority',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'adminProofAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'createContributionV2',
      accounts: [
        {
          name: 'authority',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'tokenMint',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'tokenAtaSender',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'tokenAtaReceiver',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'tokenAtaAdmin',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'adminAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'projectAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'contributionAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'amount',
          type: 'u64',
        },
        {
          name: 'split',
          type: 'u64',
        },
        {
          name: 'createKey',
          type: 'publicKey',
        },
        {
          name: 'owner',
          type: 'publicKey',
        },
        {
          name: 'roundId',
          type: 'string',
        },
        {
          name: 'counter',
          type: 'string',
        },
      ],
    },
    {
      name: 'projectJoinHackathon',
      accounts: [
        {
          name: 'authority',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'hackathonJoinAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'hackathonAccount',
          type: 'publicKey',
        },
        {
          name: 'projectAccount',
          type: 'publicKey',
        },
      ],
    },
  ],
  accounts: [
    {
      name: 'admin',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'authority',
            type: 'publicKey',
          },
          {
            name: 'bump',
            type: 'u8',
          },
        ],
      },
    },
    {
      name: 'contribution',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'authority',
            type: 'publicKey',
          },
          {
            name: 'bump',
            type: 'u8',
          },
          {
            name: 'total',
            type: 'u64',
          },
          {
            name: 'usd',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'contributionV2',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'authority',
            type: 'publicKey',
          },
          {
            name: 'bump',
            type: 'u8',
          },
        ],
      },
    },
    {
      name: 'project',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'owner',
            type: 'publicKey',
          },
          {
            name: 'authority',
            type: 'publicKey',
          },
          {
            name: 'counter',
            type: 'u64',
          },
          {
            name: 'status',
            type: {
              defined: 'ProjectVerification',
            },
          },
          {
            name: 'multiSig',
            type: 'publicKey',
          },
          {
            name: 'bump',
            type: 'u8',
          },
        ],
      },
    },
    {
      name: 'round',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'authority',
            type: 'publicKey',
          },
          {
            name: 'roundId',
            type: 'string',
          },
          {
            name: 'bump',
            type: 'u8',
          },
          {
            name: 'matchingPoolSize',
            type: 'u64',
          },
          {
            name: 'limit',
            type: 'u64',
          },
          {
            name: 'projectSize',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'roundJoin',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'authority',
            type: 'publicKey',
          },
          {
            name: 'roundAccount',
            type: 'publicKey',
          },
          {
            name: 'projectAccount',
            type: 'publicKey',
          },
          {
            name: 'status',
            type: {
              defined: 'RoundProjectStatus',
            },
          },
          {
            name: 'bump',
            type: 'u8',
          },
        ],
      },
    },
    {
      name: 'joinHackathon',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'authority',
            type: 'publicKey',
          },
          {
            name: 'bump',
            type: 'u8',
          },
        ],
      },
    },
    {
      name: 'user',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'authority',
            type: 'publicKey',
          },
          {
            name: 'project',
            type: 'u64',
          },
          {
            name: 'proof',
            type: {
              vec: {
                defined: 'PROOF',
              },
            },
          },
          {
            name: 'bump',
            type: 'u8',
          },
        ],
      },
    },
  ],
  types: [
    {
      name: 'ProjectVerification',
      type: {
        kind: 'enum',
        variants: [
          {
            name: 'REVIEW',
          },
          {
            name: 'VERIFIED',
          },
          {
            name: 'FAILED',
          },
        ],
      },
    },
    {
      name: 'RoundProjectStatus',
      type: {
        kind: 'enum',
        variants: [
          {
            name: 'PENDING',
          },
          {
            name: 'APPROVED',
          },
          {
            name: 'REJECTED',
          },
        ],
      },
    },
    {
      name: 'PROOF',
      type: {
        kind: 'enum',
        variants: [
          {
            name: 'LAMPORT',
          },
          {
            name: 'SUPERTEAM',
          },
          {
            name: 'MONKEYDAO',
          },
          {
            name: 'CIVIC',
          },
          {
            name: 'SOCIAL',
          },
          {
            name: 'DROPS01',
          },
        ],
      },
    },
  ],
  events: [
    {
      name: 'NewContribution',
      fields: [
        {
          name: 'user',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'usdAmount',
          type: 'u64',
          index: false,
        },
        {
          name: 'total',
          type: 'u64',
          index: false,
        },
        {
          name: 'totalContribution',
          type: 'u64',
          index: false,
        },
        {
          name: 'totalUsdAmount',
          type: 'u64',
          index: false,
        },
        {
          name: 'split',
          type: 'u64',
          index: false,
        },
      ],
    },
    {
      name: 'NewContributionV2',
      fields: [
        {
          name: 'user',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'createKey',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'amount',
          type: 'u64',
          index: false,
        },
        {
          name: 'split',
          type: 'u64',
          index: false,
        },
      ],
    },
    {
      name: 'NewUser',
      fields: [
        {
          name: 'authority',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'username',
          type: 'string',
          index: false,
        },
      ],
    },
    {
      name: 'NewHackathonJoin',
      fields: [
        {
          name: 'authority',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'hackathonAccount',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'projectAccount',
          type: 'publicKey',
          index: false,
        },
      ],
    },
  ],
  errors: [
    {
      code: 6000,
      name: 'MaxLengthExceeded',
      msg: 'max length is 32',
    },
    {
      code: 6001,
      name: 'InvalidStatus',
      msg: 'invalid status',
    },
    {
      code: 6002,
      name: 'InvalidRoundAccount',
      msg: 'invalid round account',
    },
    {
      code: 6003,
      name: 'InvalidProjectVerification',
      msg: 'project not verified',
    },
    {
      code: 6004,
      name: 'ContributionSizeExceded',
      msg: 'contribution size exceded',
    },
    {
      code: 6005,
      name: 'ProofAlreadyExists',
      msg: 'Proof Already Exists',
    },
    {
      code: 6006,
      name: 'ProofDoesNotExists',
      msg: 'Proof Does Not Exists',
    },
    {
      code: 6007,
      name: 'InvalidProofType',
      msg: 'Invalid Proof type',
    },
  ],
};
